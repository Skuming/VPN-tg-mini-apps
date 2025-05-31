import { Bot, InlineKeyboard, GrammyError, HttpError, InputFile } from "grammy";
import dotenv from "dotenv";
import text from "../bot/text.json";
import { AddFund } from "../DB/DB";
dotenv.config();

const bot = new Bot(`${process.env.BOT_TOKEN}`);

export default function StartBot() {
  bot.command("start", async (ctx) => {
    const lang = ctx.from?.language_code?.split("-")[0];

    await ctx.replyWithPhoto(new InputFile("../server/bot/img/start.png"), {
      caption: lang === "ru" ? text.startRU : text.startENG,
      reply_markup: new InlineKeyboard().webApp(
        `${lang === "ru" ? "Открыть" : "Open"}`,
        "https://my-mini-apps-vpn.loca.lt"
      ),
    });
  });

  bot.on(":successful_payment", async (ctx) => {
    console.log(ctx.message?.successful_payment);

    const payment = ctx.message?.successful_payment;

    await AddFund(
      BigInt(ctx.from?.id!),
      payment?.total_amount !== undefined
        ? payment?.currency === "XTR"
          ? payment.total_amount * 1.5
          : payment.total_amount / 100
        : 0
    );
  });

  bot.command("refund", async (ctx) => {
    try {
      const transactionId = ctx.message?.text.split(" ")[1]; // /refund <transaction_id>

      if (!transactionId) {
        await ctx.reply(
          "Укажите идентификатор транзакции: /refund <transaction_id>"
        );
        return;
      }

      await bot.api.refundStarPayment(ctx.from?.id!, transactionId);
      await ctx.reply(
        `Возврат средств для транзакции ${transactionId} выполнен успешно.`
      );
    } catch (error) {
      console.error("Ошибка при возврате средств:", error);
      await ctx.reply(
        "Произошла ошибка при возврате средств. Попробуйте позже."
      );
    }
  });

  bot.on("pre_checkout_query", async (ctx) => {
    const isValid = true;
    if (isValid) {
      await ctx.api.answerPreCheckoutQuery(ctx.preCheckoutQuery.id, true);
    } else {
      await ctx.api.answerPreCheckoutQuery(ctx.preCheckoutQuery.id, false);
    }
  });

  bot.start();

  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Ошибка в запросе:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Не удалось связаться с Telegram:", e);
    } else {
      console.error("Неизвестная ошибка:", e);
    }
  });
}

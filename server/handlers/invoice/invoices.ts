import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export async function CreateStarInvoice(amount: number, chatID: number) {
  const response = await axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/createInvoiceLink`,
    {
      chat_id: chatID,
      title: "Пополнение баланса",
      description: `Пополнение баланса на ${amount}`,
      payload: `order ${chatID} ${Date.now()}`,
      currency: "XTR",
      prices: [{ label: "Пополнение NetGuard", amount: amount }],
    }
  );

  return await response.data.result;
}
export async function CreateRubInvoice(amount: number, chatID: number) {
  const response = await axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/createInvoiceLink`,
    {
      chat_id: chatID,
      title: "Пополнение баланса",
      description: `Пополнение баланса NetGuard на ${amount}`,
      payload: `order ${chatID} ${Date.now()}`,
      currency: "RUB",
      prices: [{ label: "Пополнение NetGuard", amount: amount + "00" }],
      provider_token: process.env.PROVIDER_TOKEN,
    }
  );

  return await response.data.result;
}

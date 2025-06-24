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
      need_email: true,
      send_email_to_provider: true,
      provider_data: JSON.stringify({
        receipt: {
          customer: {},
          items: [
            {
              description: "Пополнение баланса NetGuard",
              quantity: 1.0,
              amount: {
                value: amount,
                currency: "RUB",
              },
              vat_code: 1,
              payment_mode: "full_payment",
              payment_subject: "service",
            },
          ],
          tax_system_code: 1,
        },
      }),
    }
  );

  console.log(response);

  return await response.data.result;
}

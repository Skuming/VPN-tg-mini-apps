import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default async function DeleteClient(userID: bigint) {
  try {
    // Игнорирование ошибок сертификатов
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    // Авторизация
    const authResponse = await axios.post(
      `http://${process.env.SERVER_3X}/login`,
      {
        username: process.env.ADMIN_3X,
        password: process.env.PASSWORD_3X,
      }
    );

    const cookies = authResponse.headers["set-cookie"];
    if (!cookies || !cookies[1]) {
      throw new Error("Куки не найдены");
    }

    const deleteClient = await axios.post(
      `http://${process.env.SERVER_3X}/panel/api/inbounds/${Number(
        process.env.PANEL_ID
      )}/delClient/${userID}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies[1],
        },
      }
    );

    return deleteClient;
  } catch (error) {
    console.log(error);
  }
}

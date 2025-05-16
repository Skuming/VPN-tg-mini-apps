import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function GetExpiryDate(userID: number) {
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

    const apiResponse = await axios.get(
      `http://${process.env.SERVER_3X}/panel/api/inbounds/getClientTrafficsById/${userID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies[1],
        },
      }
    );

    if (typeof apiResponse.data === "object") {
      return apiResponse.data.obj[0].expiryTime;
    } else {
      console.log("Ответ сервера (HTML):", apiResponse.data);
    }
  } catch (error) {}
}

export default GetExpiryDate;

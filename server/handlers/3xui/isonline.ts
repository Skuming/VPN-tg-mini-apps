import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function isonline(username: string) {
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

    const apiResponse = await axios.post(
      `http://${process.env.SERVER_3X}/panel/api/inbounds/onlines`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies[1], // Передаём куки в headers, а не в data
        },
      }
    );

    const arr = apiResponse.data.obj;

    return arr !== null
      ? arr.some((item: string) => item.startsWith(username))
      : false;
  } catch (error) {
    return error;
  }
}
export default isonline;

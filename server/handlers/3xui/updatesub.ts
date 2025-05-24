import axios from "axios";
import dotenv from "dotenv";
import { GetUserInfo } from "../../DB/DB";

dotenv.config({ path: "../../.env" });

async function UpdateSub(
  userID: bigint,
  username: string,
  expirydate: number,
  newExpiryDate: number
) {
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

    const userInfo = await GetUserInfo(userID);
    const updateClientResponse = await axios.post(
      `http://${process.env.SERVER_3X}/panel/api/inbounds/updateClient/${userID}`,
      {
        id: 1,
        settings: JSON.stringify({
          clients: [
            {
              id: `${userID}`,
              flow: "",
              email: username + userInfo.expiry_date,
              limitIp: 0,
              totalGB: "",
              expiryTime: newExpiryDate,
              enable: true,
              tgId: "",
              subId: "",
              reset: 0,
            },
          ],
        }),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookies[1],
        },
      }
    );

    console.log(await updateClientResponse);
  } catch (error) {
    console.log(error);
  }
}
export default UpdateSub;

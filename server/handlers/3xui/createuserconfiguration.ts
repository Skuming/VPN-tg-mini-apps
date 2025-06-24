import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

async function CreateConfig(
  userID: bigint,
  username: string,
  expirydate: number
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

    const createConfigResponse = await axios.post(
      `http://${process.env.SERVER_3X}/panel/api/inbounds/addClient`,
      {
        id: Number(process.env.PANEL_ID),
        settings: JSON.stringify({
          clients: [
            {
              id: `${userID}`,
              flow: "",
              email: username + expirydate,
              limitIp: 0,
              totalGB: "",
              expiryTime: expirydate,
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
    // console.log(createConfigResponse.status);
    if (createConfigResponse.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export default CreateConfig;

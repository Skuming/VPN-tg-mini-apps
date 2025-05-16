import express, { Request, Response } from "express";
import { GetUserInfo } from "./DB/DB";
import cors from "cors";
import ValidateInitData from "./handlers/validate";
import CreateToken from "./handlers/createtoken";
// import GetExpiryDate from "./handlers/3xui/getexpirydate";
import GetTraficData from "./handlers/3xui/gettraficdata";

const app = express();

app.use(
  express.json(),
  cors({ origin: "https://my-mini-apps-vpn.loca.lt", credentials: true }) // On production change to real domain
);

app.post("/api/validate", async (req: Request, res: Response) => {
  if (req.body.rawdata !== "") {
    const validateResult = await ValidateInitData(req.body.rawdata);
    if (validateResult.status === 200) {
      const userDBInfo = await GetUserInfo(validateResult.user.id);
      const trafic = await GetTraficData(userDBInfo.user_id);
      // const expiryTime = await GetExpiryDate(userDBInfo.user_id);

      const userInfo3X = {
        ...userDBInfo,
        photo_url: validateResult.user.photo_url,
        first_name: validateResult.user.first_name,
        lang: validateResult.user.language_code.split("-")[0],
        ...trafic,
      };
      const userInfo = {
        ...userDBInfo,
        photo_url: validateResult.user.photo_url,
        first_name: validateResult.user.first_name,
        lang: validateResult.user.language_code.split("-")[0],
      };
      const token = await CreateToken(userInfo);

      await res
        .status(validateResult.status)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 60 * 60 * 1000,
        })
        .send(userDBInfo.have_sub === 1 ? userInfo3X : userInfo);
    } else {
      await res.status(validateResult.status).send(validateResult.error);
    }
  } else {
    res.status(401).send("Use Telegram client!");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started... " + process.env.PORT);
});

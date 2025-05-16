import express, { Request, response, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GetUserInfo } from "./DB/DB";
import ValidateInitData from "./handlers/validate";
import CreateToken from "./handlers/createtoken";
import ValidateToken from "./handlers/validatetoken";
import GetExpiryDate from "./handlers/3xui/getexpirydate";
import GetTraficData from "./handlers/3xui/gettraficdata";
import UpdateSub from "./handlers/3xui/updatesub";

const app = express();

app.use(
  express.json(),
  cors({ origin: true, credentials: true }), // On production change to real domain
  cookieParser()
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
        username: validateResult.user.username,
        ...trafic,
      };
      const userInfo = {
        ...userDBInfo,
        photo_url: validateResult.user.photo_url,
        first_name: validateResult.user.first_name,
        lang: validateResult.user.language_code.split("-")[0],
        username: validateResult.user.username,
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

app.post("/api/renewsub", async (req: Request, res: Response) => {
  // console.log(req.cookies.token);
  // console.log(req.body);

  const days: number = req.body.renewDays;

  const prices: Map<number, number> = new Map([
    [15, 30],
    [30, 50],
    [45, 100],
    [60, 120],
    [75, 135],
    [90, 150],
    [105, 250],
    [120, 300],
  ]);

  const user: any = await ValidateToken(req.cookies.token);

  if (user !== "error") {
    if (prices.has(days)) {
      const userDBInfo = await GetUserInfo(user.user_id);

      if (Number(userDBInfo.balance) >= prices.get(days)!) {
        const expirydate = await GetExpiryDate(userDBInfo.user_id);
        const newExpiryDate = expirydate + days * 24 * 60 * 60 * 1000;
        await UpdateSub(
          userDBInfo.user_id,
          user.username,
          expirydate,
          newExpiryDate
        );
      } else {
        res.status(404).send({ status: "Error" });
      }
    } else {
      res.status(404).send({ status: "Invalid days!" });
    }
  } else {
    res.status(401).send({ status: "Your token are invalid!" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started... " + process.env.PORT);
});

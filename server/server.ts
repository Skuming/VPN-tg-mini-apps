import express, { Request, response, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GetUserInfo, ChangeBalance, AddConfig } from "./DB/DB";
import ValidateInitData from "./handlers/validate";
import CreateToken from "./handlers/createtoken";
import ValidateToken from "./handlers/validatetoken";
import GetExpiryDate from "./handlers/3xui/getexpirydate";
import GetTraficData from "./handlers/3xui/gettraficdata";
import UpdateSub from "./handlers/3xui/updatesub";
import CreateConfig from "./handlers/3xui/createuserconfiguration";
import DeleteClient from "./handlers/3xui/deleteuserconfiguration";
import {
  CreateStarInvoice,
  CreateRubInvoice,
} from "./handlers/invoice/invoices";

import isonline from "./handlers/3xui/isonline";
import StartBot from "./bot/bot";
import path from "path";

StartBot();

const app = express();

app.use(
  express.json(),
  cors({ origin: "https://network-guard.site/", credentials: true }), // On production change to real domain
  cookieParser(),
  express.static(path.join(__dirname, "../dist"))
);

app.post("/api/validate", async (req: Request, res: Response) => {
  if (req.body.rawdata !== "") {
    const validateResult = await ValidateInitData(req.body.rawdata);
    const user: any = await ValidateToken(req.cookies.token);
    const existToken = req.cookies.token;

    if (validateResult.status === 200) {
      const userDBInfo = await GetUserInfo(validateResult.user.id);
      const trafic = await GetTraficData(userDBInfo.user_id);
      const isOnline =
        userDBInfo.have_sub === 1
          ? await isonline(validateResult.user.username)
          : "";

      const { id, ...userDBInfoNoID } = await userDBInfo;
      if (trafic?.expiryTime < Date.now()) {
        await AddConfig(userDBInfo.user_id, null, userDBInfo.expiry_date, 0);
        await DeleteClient(userDBInfo.user_id);
      }

      const userInfo3X = {
        ...userDBInfoNoID,
        photo_url: validateResult.user.photo_url,
        first_name: validateResult.user.first_name,
        lang: validateResult.user.language_code.split("-")[0],
        username: validateResult.user.username,
        ...trafic,
        isOnline: isOnline,
      };
      const userInfo = {
        ...userDBInfoNoID,
        photo_url: validateResult.user.photo_url,
        first_name: validateResult.user.first_name,
        lang: validateResult.user.language_code.split("-")[0],
        username: validateResult.user.username,
      };
      const token = user !== "error" ? existToken : await CreateToken(userInfo);

      if (user !== "error") {
        await res
          .status(validateResult.status)
          .send(userDBInfo.have_sub === 1 ? userInfo3X : userInfo);
      } else if (user === "error") {
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
        await res
          .status(validateResult.status)
          .cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 60 * 60 * 1000,
          })
          .send(userDBInfo.have_sub === 1 ? userInfo3X : userInfo);
      }
    } else {
      await res.status(validateResult.status).send(validateResult.error);
    }
  } else {
    res.status(401).send("Use Telegram client!");
  }
});

app.post("/api/renewsub", async (req: Request, res: Response) => {
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

      if (
        Number(userDBInfo.balance) >= prices.get(days)! &&
        userDBInfo.have_sub === 1
      ) {
        const expirydate = await GetExpiryDate(userDBInfo.user_id);
        const newExpiryDate = expirydate + days * 24 * 60 * 60 * 1000;
        await UpdateSub(
          userDBInfo.user_id,
          user.username,
          expirydate,
          newExpiryDate
        );
        await ChangeBalance(userDBInfo.user_id, prices.get(days)!);
        res.status(200).send({ status: "Succses!" });
      } else {
        res.status(400).send({ status: "Error" });
      }
    } else {
      res.status(400).send({ status: "Invalid days!" });
    }
  } else {
    res.status(401).send({ status: "Your token are invalid!" });
  }
});

app.post("/api/buy", async (req, res) => {
  const userData = req.body.purchaseData;
  const user: any = await ValidateToken(req.cookies.token);

  const prices = new Map<string, { price: number; date: number }>([
    ["1m", { price: 50, date: 30 }],
    ["3m", { price: 150, date: 90 }],
    ["6m", { price: 300, date: 120 }],
    ["1y", { price: 600, date: 360 }],
  ]);

  if (user !== "error" && user.username) {
    const userDBInfo = await GetUserInfo(user.user_id);
    if (
      prices.has(userData) &&
      userDBInfo.balance >= prices.get(userData)?.price! &&
      userDBInfo.have_sub === 0
    ) {
      const expiryDate =
        Date.now() + prices.get(userData)?.date! * 24 * 60 * 60 * 1000;

      const deleteClient = await DeleteClient(userDBInfo.user_id);

      const createSub = await CreateConfig(
        userDBInfo.user_id,
        user.username,
        expiryDate
      );

      console.log("CREATE SUB", createSub);

      if ((await createSub) === true) {
        const vpn = `vless://${userDBInfo.user_id}${process.env.PATH}${
          user.username + expiryDate
        }`;
        await ChangeBalance(userDBInfo.user_id, prices.get(userData)?.price!);
        await AddConfig(userDBInfo.user_id, vpn, expiryDate, 1);
        res.status(200).send({ status: "Succses" });
      } else {
        res.status(400).send({ status: "Eternal error!" });
      }
    } else if (userDBInfo.have_sub !== 0) {
      res.status(403).send({ status: "You already have a subscribtion!" });
    } else {
      res.status(403).send({ status: "Insufficient funds" });
    }
  } else {
    res.status(401).send({ status: "Your token are invalid!" });
  }
});

app.post("/api/invoice", async (req: Request, res: Response) => {
  const user: any = await ValidateToken(req.cookies.token);

  if (user !== "error") {
    if (req.body.currency === "star") {
      // // star
      const link = await CreateStarInvoice(req.body.amount, user.user_id);
      res.status(200).send({ status: "ok", link: link });
    }
    if (req.body.currency === "rub") {
      // rub

      if (req.body.amount > 59) {
        const link = await CreateRubInvoice(req.body.amount, user.user_id);
        res.status(200).send({ status: "ok", link: link });
      } else {
        res.status(401).send({ status: "Amount is less than 60 RUB!" });
      }
    }
  } else {
    res.status(401).send({ status: "Your token are invalid!" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started... " + process.env.PORT);
});

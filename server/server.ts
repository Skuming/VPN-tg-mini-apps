import express, { Request, Response } from "express";
import { GetUserInfo } from "./DB/DB";
import cors from "cors";
import ValidateInitData from "./handlers/validate";

const app = express();

app.use(express.json(), cors());

app.post("/api/validate", async (req: Request, res: Response) => {
  // console.log(ValidateInitData(req.body.rawdata));

  if (req.body.rawdata !== "") {
    const validateResult = await ValidateInitData(req.body.rawdata);
    if (validateResult.status === 200) {
      const userDBInfo = await GetUserInfo(validateResult.user.id);

      const userInfo = {
        ...userDBInfo,
        photo_url: validateResult.user.photo_url,
        first_name: validateResult.user.first_name,
        lang: validateResult.user.language_code.split("-")[0],
      };
      await res.status(validateResult.status).send(userInfo);
    } else {
      await res.status(validateResult.status).send(validateResult.error);
    }
  } else {
    res.status(401).send("Use Telegram client!");
  }

  // Need to send to front-end ValidateInitData(req.body.rawdata) or maybe
  // should add another func to validate in DB and after that send it :)
});

app.listen(process.env.PORT, () => {
  console.log("Server started... " + process.env.PORT);
});

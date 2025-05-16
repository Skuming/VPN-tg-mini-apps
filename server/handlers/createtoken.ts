import jwt from "jsonwebtoken";
import { User } from "../Interfaces/interfaces";
import dotenv from "dotenv";

dotenv.config();

export default async function CreateToken(userInfo: User) {
  const token = await jwt.sign(userInfo, `${process.env.SECRET_KEY}`, {
    expiresIn: "1h",
  });
  return token;
}

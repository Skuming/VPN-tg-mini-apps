import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function ValidateToken(token: string) {
  try {
    const validate = jwt.verify(token, `${process.env.SECRET_KEY}`);
    return validate;
  } catch (error) {
    return "error";
  }
}

export default ValidateToken;

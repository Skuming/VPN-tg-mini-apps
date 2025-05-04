import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const botToken = process.env.BOT_TOKEN;

function ValidateInitData(rawData: string) {
  if (!botToken) throw new Error("No token in .env");

  const params = new URLSearchParams(rawData);

  if (!params.get("hash")) return { status: 401, error: "Invalid data!" };

  const userParams: any = params.get("user");

  const user = JSON.parse(decodeURI(userParams));

  const hash = params.get("hash");

  params.delete("hash");

  const dataCheckString = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  const computedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  if (computedHash === hash) {
    return { status: 200, user: user };
  } else {
    return { status: 401, error: "Invalid data!" };
  }
}

export default ValidateInitData;

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.post("/api/validate", (res, req) => {});

app.listen(process.env.PORT);

console.log("Server started... " + process.env.PORT);

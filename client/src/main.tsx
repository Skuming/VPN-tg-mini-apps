import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { InfoContext } from "../services/context.ts";
import ValidateData from "../services/telegram.ts";
import { User } from "./interfaces/interfaces.ts";
import "./index.css";
import App from "./App.tsx";

/* @ts-expect-error || React can`t init this*/
const tg = window.Telegram.WebApp;
const data = tg.initData;

tg.expand();
tg.enableClosingConfirmation();
tg.setHeaderColor("#0B0C0E");
tg.setBackgroundColor("#0B0C0E");

export function Main() {
  const [info, setInfo] = useState<User>();

  useEffect(() => {
    const validate = async () => {
      setInfo(await ValidateData(data));
      console.log(await ValidateData(data));
    };
    validate();
  }, []);

  return (
    <StrictMode>
      <InfoContext.Provider value={{ info, setInfo }}>
        <App />
      </InfoContext.Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);

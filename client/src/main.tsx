import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { InfoContext } from "../services/context.ts";
import ValidateData from "../services/telegram.ts";
import { User } from "./interfaces/interfaces.ts";
import "./index.css";
import App from "./App.tsx";
import WebApp from "@twa-dev/sdk";

const tg = WebApp;
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
    };

    validate();
    const intervalId = setInterval(
      validate,
      info?.have_sub === 0 ? 10000 : 15000
    );

    return () => clearInterval(intervalId);
  }, []);

  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      <App />
    </InfoContext.Provider>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);

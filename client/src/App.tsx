import "./scss/App.css";
import Home from "./pages/Home";
// import InitUser from "../services/telegram";
// import axios from "axios"; <--- connect when backend is ready

/* @ts-expect-error || React can`t init this*/
const tg = window.Telegram.WebApp;
const data = tg.initData;
console.log(tg);
tg.expand();
tg.enableClosingConfirmation();
tg.setHeaderColor("#0B0C0E");
tg.setBackgroundColor("#0B0C0E");

function App() {
  return <Home />;
}

export default App;

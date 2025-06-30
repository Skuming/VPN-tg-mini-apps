import "./scss/App.css";
import Home from "./pages/Home";
import { useContext } from "react";
import { InfoContext } from "../services/context";
// import ValidateData from "../services/telegram";

// import { useEffect, useState } from "react";
// import axios from "axios"; <--- connect when backend is ready

function App() {
  const { info } = useContext(InfoContext);

  if (!info) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="rounded-full bg-white w-[100px] h-[100px] animate-bounce"></div>
      </div>
    );
  }

  if (!info.username) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-1">
        <div className="rounded-full bg-white w-[100px] h-[100px] animate-bounce"></div>
        <h1 className="text-2xl text-white">Set username in telegram!</h1>
      </div>
    );
  }

  return (
    <>
      <Home></Home>
    </>
  );
}

export default App;

import Header from "../components/Header";
import Footer from "../components/Footer";
import linkImg from "../assets/linkarrow.svg";
import buyImg from "../assets/buyicon.svg";
import ValidateData from "../../services/telegram";
import { useEffect, useState } from "react";
import { User } from "../interfaces/interfaces";

function Home() {
  /* @ts-expect-error || React can`t init this*/
  const tg = window.Telegram.WebApp;
  const data = tg.initData;
  tg.expand();
  const [info, setInfo] = useState<User | null>(null);

  useEffect(() => {
    const validate = async () => {
      const result = await ValidateData(data);
      await setInfo(result);
    };
    validate();
  }, [data]);

  if (info === null)
    return (
      <>
        <div className="flex w-full h-full justify-center items-center tg__txt flex-col">
          <div className="w-[80px] h-[80px] animate-pulse bg-gray-900 rounded-full">
            <div className="w-[80px] h-[80px] border-b-4 rounded-full animate-spin"></div>
          </div>
          {data === "" ? <p>Use telegram client!</p> : ""}
        </div>
      </>
    );
  return (
    <>
      <Header
        first_name={info.first_name}
        photo_url={info.photo_url}
        balance={info.balance}
        lang={info.lang}
      ></Header>
      <div className="h-full w-full flex lg:flex-row flex-col justify-evenly items-center p-2.5">
        <section className="w-full h-[75%] lg:h-full rounded-2xl tg__section border-1"></section>
        <div className="btns flex w-full justify-around h-[50px]">
          <a
            href="https://t.me/CokiVPN_Bot?start"
            className="h-full w-[47%] tg__btn rounded-4xl border-1 cursor-pointer flex items-center justify-center"
          >
            <span className="flex justify-center items-center gap-2">
              <p className="tg__btn__txt ">Купить</p>
              <span className="btn__img">
                <img src={buyImg} alt="" className="h-[20px]" />
              </span>
            </span>
          </a>
          <a
            href="https://t.me/CokiVPN_Bot?start"
            className="h-full w-[47%] tg__btn rounded-4xl border-1 cursor-pointer flex items-center justify-center"
          >
            <span className="flex justify-center items-center gap-0.5">
              <p className="tg__btn__txt ">Перейти в бота</p>
              <span className="btn__img">
                <img src={linkImg} alt="" className="h-[30px]" />
              </span>
            </span>
          </a>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;

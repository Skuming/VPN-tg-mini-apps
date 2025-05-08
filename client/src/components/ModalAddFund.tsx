import { memo } from "react";
import exclamImg from "../assets/exclamation.svg";
import linkImg from "../assets/linkarrow.svg";
import plusImg from "../assets/plus.svg";
import { ModalFund } from "../interfaces/interfaces";

const ModalAddFund = memo(({ handleClickFund, lang }: ModalFund) => {
  return (
    <>
      <div
        className="h-screen w-screen bg-[#00000093] absolute"
        onClick={handleClickFund}
      ></div>
      <div className="h-1/2 w-[90%] lg:w-[40%] lg:h-[70%] tg__section rounded-2xl absolute top-1/5 z-50">
        <button
          className="h-[10%] flex flex-row-reverse w-full p-2"
          onClick={handleClickFund}
        >
          <span>
            <img
              src={plusImg}
              alt=""
              className="h-[32px] rotate-45 cursor-pointer"
            />
          </span>
        </button>
        <div className="add__fund__info tg__txt flex flex-col h-[90%] items-center justify-evenly">
          <img src={exclamImg} alt="" className="w-[20%] " />
          <h1 className="w-[70%] text-lg text-center lg:w-[50%]">
            {lang === "ru"
              ? "В данный момент пополнение доступно только через бота!"
              : "At the moment, replenishment is only available through the bot!"}
          </h1>
          <a
            href="https://t.me/CokiVPN_Bot?start"
            className="h-[50px] w-[50%] tg__btn rounded-4xl cursor-pointer flex items-center justify-center "
          >
            <span className="flex justify-center items-center gap-0.5">
              <p className="tg__btn__txt ">
                {lang === "ru" ? "Перейти в бота" : "Go to bot"}
              </p>
              <span className="btn__img">
                <img src={linkImg} alt="" className="h-[30px]" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </>
  );
});

export default ModalAddFund;

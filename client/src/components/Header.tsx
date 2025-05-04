import { User } from "../interfaces/interfaces";
import { useState } from "react";
import plusImg from "../assets/plus.svg";

function Header({ first_name, balance, photo_url, lang }: User) {
  const [addFund, setAddFund] = useState(false);

  const handleClickFund = () => {
    setAddFund((prev) => !prev);
  };

  return (
    <>
      <header className="w-full h-[13%] tg__header border-1 flex justify-evenly rounded-b-3xl">
        <div className="left__side w-[45%] h-full flex items-center">
          <div className="tg__btn h-[55%] rounded-full w-[80%] flex items-center justify-center gap-1.5 p-1">
            <p className="tg__txt rounded-full text-center pl-1.5 pr-1.5">
              {balance} ₽
            </p>
            <button
              className="flex items-center justify-center h-full"
              onClick={handleClickFund}
            >
              <span>
                <img
                  src={plusImg}
                  alt=""
                  className="h-[22px] w-[22px] rounded-full"
                />
              </span>
            </button>
          </div>
        </div>
        <div className="right__side w-[45%] flex items-center flex-row-reverse gap-2">
          <img src={photo_url} alt="" className="w-[42px] rounded-full" />
          <p>{first_name}</p>
        </div>
      </header>
      {addFund === true ? (
        <>
          <div
            className="h-screen w-screen bg-[#00000093] absolute"
            onClick={handleClickFund}
          ></div>
          <div className="h-1/2 w-[90%] lg:w-[40%] lg:h-[70%] tg__section rounded-2xl absolute top-1/5">
            <button
              className="h-[48px] flex flex-row-reverse w-full p-2"
              onClick={handleClickFund}
            >
              <span>
                <img src={plusImg} alt="" className="h-[32px] rotate-45" />
              </span>
            </button>
            <div className="add__fund__info tg__txt">
              <h1></h1>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Header;

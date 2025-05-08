import { useState } from "react";
import eyeImg from "../assets/Eye.svg";
import eyeHideImg from "../assets/EyeHide.svg";
import arrowImg from "../assets/arrow.svg";

function HomeScreen() {
  const [hide, setHide] = useState(false);
  const handleHideId = () => {
    setHide((prev) => !prev);
  };

  const tgId = 11298762;

  return (
    <section className="main__info flex flex-col items-center gap-[10px] overflow-y-scroll scroll-smooth">
      <div className="user__info">
        <img src="" alt="" className="info__user__pfp" />
        <h1 className="info__heading">Tg nick</h1>
        <div className="info__user__id">
          <p className="user__id">
            {hide === true ? `ID: XXXXXX` : `ID: ${tgId}`}
          </p>
          <button className="user__show__id" onClick={handleHideId}>
            <span>
              <img src={hide === true ? eyeHideImg : eyeImg} alt="" />
            </span>
          </button>
        </div>
        <button className="info__balance__btn">
          <span>Balance</span>
        </button>
      </div>
      <div className="vpn__info">
        <div className="top__wrapper">
          <h1 className="vpn__info__heading">NetGuard</h1>
          <div className="vpn__status">
            <div className="indicate__status bg-[#50C878]"></div>
            <p className="status">Вы онлайн</p>
          </div>
        </div>
        <div className="center__wrapper">
          <p className="vpn__expire">Ваша подписка истекает:</p>
          <p className="vpn__expire__date">09.02.02</p>
        </div>
        <div className="bottom__wrapper">
          <div className="two__btns">
            <button className="vpn__button">
              <span className="vpn__btn__text">Конфигурация</span>
            </button>
            <button className="vpn__button">
              <span className="vpn__btn__text">Перейти в бота</span>
            </button>
          </div>
          <button className="vpn__large__button">
            <span className="vpn__btn__text">Конфигурация</span>
          </button>
        </div>
      </div>

      <div className="traffic__info">
        <div className="top__wrapper">
          <div className="left__wrapper">
            <p className="traffic__text">Заргузка</p>
            <img src={arrowImg} alt="" />
          </div>
          <div className="right__wrapper">
            <p className="traffic__text">Отдача</p>
            <img src={arrowImg} alt="" />
          </div>
        </div>
        <div className="bottom__wrapper">
          <div className="download">
            <p>56 / MB</p>
          </div>
          <div className="upload">
            <p>56 / MB</p>
          </div>
        </div>
      </div>
      <p>Бу!</p>
    </section>
  );
}

export default HomeScreen;

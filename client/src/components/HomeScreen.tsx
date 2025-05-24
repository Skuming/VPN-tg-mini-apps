import { useContext, useState } from "react";
import { InfoContext } from "../../services/context";
import eyeImg from "../assets/Eye.svg";
import eyeHideImg from "../assets/EyeHide.svg";
import arrowImg from "../assets/arrow.svg";
import errorImg from "../assets/Error.svg";
import plusImg from "../assets/plus.svg";

import ModalConfiguartion from "./ModalConfiguartion";
import ModalContinueSub from "./ModalContinueSub";
import ModalBuyVpn from "./ModalBuyVpn";
import ModalAddFund from "./ModalAddFund";

function HomeScreen() {
  const [hide, setHide] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalSub, setShowModalSub] = useState(false);
  const [showModalBuy, setShowModalBuy] = useState(false);
  const [showModalAddFund, setShowModalAddFund] = useState(false);

  console.log(showModalAddFund);

  const handleModalAddFund = () => {
    setShowModalAddFund((prev) => !prev);
  };

  const handleModalConf = () => {
    setShowModal((prev) => !prev);
  };

  const handleModalSub = () => {
    setShowModalSub((prev) => !prev);
  };

  const handelModalBuy = () => {
    setShowModalBuy((prev) => !prev);
  };

  const handleHideId = () => {
    setHide((prev) => !prev);
  };

  const { info } = useContext(InfoContext);

  // Expiry date
  const expiryDate = info?.expiryTime ? new Date(info.expiryTime) : null;

  const formattedDate = expiryDate?.toLocaleDateString() || "";

  return (
    <section className="main__info flex flex-col items-center gap-[10px] overflow-y-scroll scroll-smooth">
      <div className="user__info">
        <img src={info?.photo_url} alt="" className="info__user__pfp" />
        <h1 className="info__heading">{info?.first_name}</h1>
        <div className="info__user__id">
          <p className="user__id">
            {hide === true ? `ID: XXXXXX` : `ID: ${info?.user_id}`}
          </p>
          <button className="user__show__id" onClick={handleHideId}>
            <span>
              <img src={hide === true ? eyeHideImg : eyeImg} alt="" />
            </span>
          </button>
        </div>

        <button className="info__balance__btn" onClick={handleModalAddFund}>
          <span className="info__balance">{info?.balance} ₽</span>
          <span className="info__add__balance">
            <img src={plusImg} alt="" />
          </span>
        </button>
      </div>
      <div className="vpn__info">
        {info?.have_sub !== 0 && info?.vpn !== null ? (
          <>
            <div className="top__wrapper">
              <h1 className="vpn__info__heading">NetGuard</h1>
              <div className="vpn__status">
                <div className="indicate__status bg-[#50C878]"></div>
                <p className="status">Вы онлайн</p>
              </div>
            </div>
            <div className="center__wrapper">
              <p className="vpn__expire">Ваша подписка истекает:</p>
              <p className="vpn__expire__date">{formattedDate}</p>
            </div>
            <div className="bottom__wrapper">
              <div className="two__btns">
                <button className="vpn__button" onClick={handleModalConf}>
                  <span className="vpn__btn__text">Конфигурация</span>
                </button>
                <button className="vpn__button">
                  <span className="vpn__btn__text">Перейти в бота</span>
                </button>
              </div>
              <button className="vpn__large__button" onClick={handleModalSub}>
                <span className="vpn__btn__text">Продлить подписку</span>
              </button>
            </div>
          </>
        ) : (
          <div className="no__sub">
            <img src={errorImg} alt="" />
            <h1 className="no__sub__text">У вас нету подписки</h1>
            <button onClick={handelModalBuy}>Купить</button>
          </div>
        )}
      </div>
      {info?.have_sub !== 0 && info?.vpn !== null ? (
        <>
          {" "}
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
                <p>
                  {info?.down === 0
                    ? 0
                    : info?.down
                    ? Math.round(info?.down / (1024 * 1024))
                    : null}{" "}
                  МБ
                </p>
              </div>
              <div className="upload">
                <p>
                  {info?.up === 0
                    ? 0
                    : info?.up
                    ? Math.round(info?.up / (1024 * 1024))
                    : null}{" "}
                  МБ
                </p>
              </div>
            </div>
          </div>
          {/* Zone for more */}
        </>
      ) : (
        ""
      )}
      <ModalConfiguartion
        heading="Конфигурация"
        content={info?.vpn}
        setShowModal={handleModalConf}
        showModal={showModal}
      ></ModalConfiguartion>

      <ModalContinueSub
        heading="Продлить подписку"
        content="Выберите продолжительность"
        setShowModal={handleModalSub}
        showModal={showModalSub}
      />

      <ModalBuyVpn
        heading={info?.lang === "ru" ? "Покупка" : "Buy"}
        content={"*Преобретая данную услуг вы "}
        setShowModal={handelModalBuy}
        showModal={showModalBuy}
      />

      <ModalAddFund
        heading={info?.lang === "ru" ? "Пополнить" : "Top-up"}
        content={info?.lang === "ru" ? "Введите сумму: " : "Enter amount: "}
        setShowModal={handleModalAddFund}
        showModal={showModalAddFund}
      />
    </section>
  );
}

export default HomeScreen;

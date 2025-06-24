import { Renew } from "../../services/api";
import { GlobalModal } from "../interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import plusImg from "../assets/plus.svg";
import { useState, useEffect, useContext } from "react";

import WebApp from "@twa-dev/sdk";
import { InfoContext } from "../../services/context";

function ModalContinueSub({
  heading,
  content,
  showModal,
  setShowModal,
}: GlobalModal) {
  const [addDays, setAddDays] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSucces, setIsSucces] = useState<boolean>(false);

  const tg = WebApp;

  const { info } = useContext(InfoContext);

  useEffect(() => {
    setIsLoading(false);
    setIsError(false);
    setAddDays(0);
  }, [showModal]);

  const plusDays = () => {
    if (addDays < 120) {
      setAddDays((prev) => (prev += 15));
      tg.HapticFeedback.impactOccurred("soft");
    } else {
      tg.HapticFeedback.notificationOccurred("error");
    }
  };

  const minusDays = () => {
    if (addDays !== 0) {
      setAddDays((prev) => (prev -= 15));
      tg.HapticFeedback.impactOccurred("soft");
    } else {
      tg.HapticFeedback.notificationOccurred("error");
    }
  };

  const handleRenewSub = async () => {
    if (addDays !== 0) {
      setIsLoading(true);
      setIsError(false);
      tg.HapticFeedback.impactOccurred("soft");

      try {
        const buy = await Renew(addDays);

        if (buy.status === 200) {
          setIsLoading(false);
          setIsSucces(true);
          setTimeout(() => setIsSucces(false), 2000);
          tg.HapticFeedback.notificationOccurred("success");
        } else if (buy.status !== 200) {
          throw new Error("Неуспешный ответ сервера");
        }
      } catch {
        setIsError(true);
        setIsLoading(false);
        setTimeout(() => setIsError(false), 2000);
        tg.HapticFeedback.notificationOccurred("error");
      }
    }
  };

  const prices: Map<number, number> = new Map([
    [15, 30],
    [30, 50],
    [45, 100],
    [60, 120],
    [75, 135],
    [90, 150],
    [105, 250],
    [120, 300],
  ]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal__window"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            transition={{ duration: 0.3 }}
            style={{ top: "100px", height: "200px" }}
          >
            <button className="close__btn" onClick={setShowModal}>
              <span>
                <img src={plusImg} alt="" />
              </span>
            </button>
            {isSucces ? (
              <>
                <div className="loading flex justify-center h-[200px] items-center flex-col gap-[10px]">
                  <h1 className="modal__heading">
                    {info?.lang === "ru" ? "Успех!" : "Succses!"}
                  </h1>
                  <div className="loader"></div>
                </div>
              </>
            ) : isLoading ? (
              <>
                <div className="loading flex justify-center h-[200px] items-center flex-col gap-[10px]">
                  <h1 className="modal__heading">
                    {info?.lang === "ru" ? "Заргузка..." : "Loading..."}
                  </h1>
                  <div className="loader "></div>
                </div>
              </>
            ) : isError === true ? (
              <>
                <div className="error flex justify-center h-[200px] items-center flex-col gap-[8px]">
                  <h1 className="modal__heading">
                    {info?.lang === "ru" ? "Ошибка!" : "Error!"}
                  </h1>
                  <p className="modal__content">
                    {info?.lang === "ru"
                      ? "Попробуйте позже!"
                      : "Try again later!"}
                  </p>
                  <div className="loader "></div>
                </div>
              </>
            ) : (
              <>
                <h1 className="modal__heading">{heading}</h1>
                <p className="content">{content}</p>
                <div className="modal__sub__content">
                  <div className="modal__sub__btns">
                    <button className="control__days" onClick={minusDays}>
                      <span>-</span>
                    </button>
                    <div className="sub__days">
                      <span className="days">
                        {addDays} {info?.lang === "ru" ? "дней" : "days"}
                      </span>
                    </div>
                    <button className="control__days" onClick={plusDays}>
                      <span>+</span>
                    </button>
                  </div>
                  <button
                    className={`submit__btn ${
                      addDays === 0 ? `!bg-[#193e50] !cursor-default` : ""
                    }`}
                    onClick={handleRenewSub}
                  >
                    <span>
                      {info?.lang === "ru" ? "Продлить" : "Renew for"}
                      {addDays > 0 ? ` ${prices.get(addDays)}` + "₽" : ""}{" "}
                    </span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalContinueSub;

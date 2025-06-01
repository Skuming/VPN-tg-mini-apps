import { AnimatePresence, motion } from "framer-motion";
import { GlobalModal } from "../interfaces/interfaces";
import plusImg from "../assets/plus.svg";
import { useContext, useState } from "react";
import { Buy } from "../../services/api";
import { AxiosError } from "axios";
import { InfoContext } from "../../services/context";

function ModalBuyVpn({
  heading,
  content,
  showModal,
  setShowModal,
}: GlobalModal) {
  const [showNoFunds, setShowNoFunds] = useState<boolean>(false);
  const [showSuccses, setShowSuccses] = useState<boolean>(false);
  const [isPresses, setIsPresses] = useState<boolean>(false);

  const { info } = useContext(InfoContext);

  const handlePlanSelect = async (planId: string) => {
    if (isPresses === false) {
      try {
        await setIsPresses(true);
        const buy = await Buy(planId);
        if (buy.status === 200) {
          setShowSuccses(true);
          setTimeout(async () => {
            await setShowSuccses(false);
            await setShowModal();
            await setIsPresses(false);
          }, 3000);
        }
      } catch (error) {
        await setIsPresses(false);
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 403) {
            setShowNoFunds(true);
            setTimeout(() => {
              setShowNoFunds(false);
            }, 5000);
          }
        }
      }
    }
  };

  const plans = [
    {
      id: "1m",
      duration: info?.lang === "ru" ? "1 месяц" : "1 month",
      price: "50₽",
    },
    {
      id: "3m",
      duration: info?.lang === "ru" ? "3 месяца" : "3 months",
      price: "150₽",
    },
    {
      id: "6m",
      duration: info?.lang === "ru" ? "6 месяцев" : "6 months",
      price: "300₽",
    },
    {
      id: "1y",
      duration: info?.lang === "ru" ? "1 год" : "1 year",
      price: "600₽",
    },
  ];

  return (
    <>
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
            >
              <button
                className="close__btn"
                onClick={() => {
                  setShowModal();
                  setIsPresses(false);
                }}
              >
                <span>
                  <img src={plusImg} alt="" />
                </span>
              </button>
              <h1 className="modal__heading">{heading}</h1>
              <div className="modal__buy__btns">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    className={`modal__btn__btn ${
                      isPresses === true ? "opacity-50" : ""
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <span>{plan.duration}</span>
                    <span>{plan.price}</span>
                  </button>
                ))}
              </div>
              <i className="modal__content !text-[10px]">
                {content}
                <a
                  href="https://teletype.in/@cookiie/EZdxhSVH2DJ"
                  target="_blank"
                  className="text-blue-500"
                >
                  соглашаетесь с правилами
                </a>
              </i>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNoFunds && (
          <motion.div
            className="popup__buy no__funds"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span>
              {info?.lang === "ru"
                ? "Недостаточно средств!"
                : "Insufficient funds!"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSuccses && (
          <motion.div
            className="popup__buy succses"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span>
              {info?.lang === "ru"
                ? "Успешно! Подождите 10-15 секунд!"
                : "Succses! Please wait 10-15 seconds!"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ModalBuyVpn;

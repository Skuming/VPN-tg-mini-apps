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

  const { info } = useContext(InfoContext);

  const handlePlanSelect = async (planId: string) => {
    try {
      const buy = await Buy(planId);
      if (buy.status === 200) {
        setShowSuccses(true);
        setTimeout(async () => {
          await setShowSuccses(false);
          await setShowModal();
        }, 5000);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 403) {
          setShowNoFunds(true);
          setTimeout(() => {
            setShowNoFunds(false);
          }, 5000);
        }
      }
    }
  };

  const plans = [
    { id: "1m", duration: "1 месяц", price: "50₽" },
    { id: "3m", duration: "3 месяца", price: "150₽" },
    { id: "6m", duration: "6 месяцев", price: "300₽" },
    { id: "1y", duration: "1 год", price: "600₽" },
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
              <button className="close__btn" onClick={setShowModal}>
                <span>
                  <img src={plusImg} alt="" />
                </span>
              </button>
              <h1 className="modal__heading">{heading}</h1>
              <div className="modal__buy__btns">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    className={`modal__btn__btn`}
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
                ? "Успешно! Подождите"
                : "Succses! Please wait!"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ModalBuyVpn;

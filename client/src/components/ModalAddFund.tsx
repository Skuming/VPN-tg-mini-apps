import { GlobalModal } from "../interfaces/interfaces";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import plusImg from "../assets/plus.svg";
import WebApp from "@twa-dev/sdk";
import { GetInvoice } from "../../services/api";
import { InfoContext } from "../../services/context";

function ModalAddFund({ heading, showModal, setShowModal }: GlobalModal) {
  const [inputValue, setInputValue] = useState<string>("");
  const [currency, setCurrency] = useState<string>("star");
  const [showCurrModal, setShowCurrModal] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccses, setShowSuccses] = useState<boolean>(false);

  const tg = WebApp;

  const { info } = useContext(InfoContext);

  const handleValue = async () => {
    if (Number(inputValue) && /^\d+$/.test(inputValue)) {
      console.log(inputValue, currency);
      if (
        (currency === "rub" && Number(inputValue) > 59) ||
        (currency === "star" && Number(inputValue) !== 0)
      ) {
        const invoice = await GetInvoice(Number(inputValue), currency);

        console.log(invoice);

        if (invoice.status !== 200) {
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
        } else {
          await tg.openInvoice(invoice.data.link, async (status) => {
            if (status === "paid") {
              tg.HapticFeedback.notificationOccurred("success");
              setShowSuccses(true);
              setTimeout(() => {
                setShowSuccses(false);
              }, 5000);
              await setShowModal();
            } else if (status === "cancelled") {
              setShowError(true);
              setTimeout(() => {
                setShowError(false);
              }, 5000);
              tg.HapticFeedback.notificationOccurred("error");

              console.log(showError);
            }
          });
        }
      }
    }
  };

  const handleShowCurrModal = () => {
    setShowCurrModal((prev) => !prev);
    tg.HapticFeedback.impactOccurred("soft");
  };

  const handleCurr = (curr: string) => {
    setCurrency(curr);
    setShowCurrModal(false);
  };
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
                  setInputValue("");
                  setShowCurrModal(false);
                }}
              >
                <span>
                  <img src={plusImg} alt="" />
                </span>
              </button>
              <h1 className="modal__heading">{heading}</h1>
              <div className="input__container">
                <div className="input__wrapper relative flex">
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder={
                      currency === "rub" ? "от 60 руб" : "от 1 звезды"
                    }
                    className="input__fund__amount"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value !== "0" &&
                        !(value.startsWith("0") && inputValue.length === 0)
                      ) {
                        setInputValue(value);
                      }
                    }}
                  />
                  <span className="input__currency">{currency}</span>
                </div>
                <div className="currency__wrapper">
                  <button className="currency" onClick={handleShowCurrModal}>
                    <span>⬇</span>
                  </button>
                  {showCurrModal && (
                    <div className="currency__modal">
                      <button
                        onClick={() => {
                          handleCurr("star");
                          tg.HapticFeedback.impactOccurred("soft");
                        }}
                      >
                        <span>⭐</span>
                      </button>
                      <hr />
                      <button
                        onClick={() => {
                          handleCurr("rub");
                          tg.HapticFeedback.impactOccurred("soft");
                        }}
                      >
                        <span>₽</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                className={`modal__btn ${
                  inputValue === "" ||
                  (currency === "rub" && Number(inputValue) < 60)
                    ? `!bg-[#193e50] !cursor-default`
                    : ""
                }`}
                onClick={() => {
                  handleValue();
                  tg.HapticFeedback.impactOccurred("soft");
                }}
              >
                <span>Пополнить</span>
              </button>
            </motion.div>
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
              {info?.lang === "ru" ? "Баланс пополнен!" : "Balance is updated!"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showError && (
          <motion.div
            className="popup__buy no__funds"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span>{info?.lang === "ru" ? "Отклонено" : "Rejected"}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ModalAddFund;

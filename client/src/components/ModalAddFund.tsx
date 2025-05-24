import { GlobalModal } from "../interfaces/interfaces";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import plusImg from "../assets/plus.svg";

function ModalAddFund({
  heading,
  content,
  showModal,
  setShowModal,
}: GlobalModal) {
  const [inputValue, setInputValue] = useState<string>("");
  const [currency, setCurrency] = useState<string>("star");
  const [showCurrModal, setShowCurrModal] = useState<boolean>(false);

  const handleValue = () => {
    console.log(inputValue, currency);
  };

  const handleShowCurrModal = () => {
    setShowCurrModal((prev) => !prev);
  };

  const handleCurr = (curr: string) => {
    setCurrency(curr);
    setShowCurrModal(false);
  };
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
          >
            <button className="close__btn" onClick={setShowModal}>
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
                  placeholder={content!}
                  className="input__fund__amount"
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <span className="input__currency">{currency}</span>
              </div>
              <div className="currency__wrapper">
                <button className="currency" onClick={handleShowCurrModal}>
                  <span>⬇</span>
                </button>
                {showCurrModal && (
                  <div className="currency__modal">
                    <button onClick={() => handleCurr("star")}>
                      <span>⭐</span>
                    </button>
                    <hr />
                    <button onClick={() => handleCurr("rub")}>
                      <span>₽</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button className="modal__btn" onClick={handleValue}>
              <span>Пополнить</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalAddFund;

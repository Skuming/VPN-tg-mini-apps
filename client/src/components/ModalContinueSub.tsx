import Buy from "../../services/api";

import { GlobalModal } from "../interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import plusImg from "../assets/plus.svg";
import { useState } from "react";

function ModalContinueSub({
  heading,
  content,
  showModal,
  setShowModal,
}: GlobalModal) {
  const [addDays, setAddDays] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const plusDays = () => {
    if (addDays < 120) {
      setAddDays((prev) => (prev += 15));
    }
  };

  const minusDays = () => {
    if (addDays > 0) {
      setAddDays((prev) => (prev -= 15));
    }
  };

  const handleRenewSub = async () => {
    await setIsLoading(true);
    const buy = await Buy(addDays);
    console.log(await buy);
    await setIsLoading(false);
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
            <p className="content">{content}</p>
            <div className="modal__sub__content">
              <div className="modal__sub__btns">
                <button className="control__days" onClick={minusDays}>
                  <span>-</span>
                </button>
                <div className="sub__days">
                  <span className="days">{addDays} дней</span>
                </div>
                <button className="control__days" onClick={plusDays}>
                  <span>+</span>
                </button>
              </div>
              <button
                className={`submit__btn ${
                  addDays === 0 ? "!bg-[#193e50]" : ""
                }`}
                onClick={handleRenewSub}
              >
                <span>Продлить</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalContinueSub;

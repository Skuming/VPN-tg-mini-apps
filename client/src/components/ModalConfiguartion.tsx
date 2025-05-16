import { GlobalModal } from "../interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import plusImg from "../assets/plus.svg";

function ModalConfiguartion({
  heading,
  content,
  showModal,
  setShowModal,
}: GlobalModal) {
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
            <p className="modal__content">{content}</p>
            <button
              className="modal__btn"
              onClick={() =>
                navigator.clipboard.writeText(
                  typeof content === "string" ? content : "Error"
                )
              }
            >
              <span>Скопировать в буфер обмена</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalConfiguartion;

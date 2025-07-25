import { GlobalModal } from "../interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import plusImg from "../assets/plus.svg";
import { useContext } from "react";
import { InfoContext } from "../../services/context";
import WebApp from "@twa-dev/sdk";

function ModalConfiguartion({
  heading,
  content,
  showModal,
  setShowModal,
}: GlobalModal) {
  const { info } = useContext(InfoContext);
  const tg = WebApp;
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
            <div className="modal__bottom__btns">
              <button
                className="modal__btn"
                onClick={() => {
                  navigator.clipboard.writeText(
                    typeof content === "string" ? content : "Error"
                  );
                  tg.HapticFeedback.notificationOccurred("success");
                }}
              >
                <span>{info?.lang === "ru" ? "Скопировать" : "Copy"}</span>
              </button>
              <a
                href="https://teletype.in/@cookiie/W4OZLZezOJo"
                target="_blank"
              >
                <button className="modal__btn">
                  <span>{info?.lang === "ru" ? "Подключить" : "Connect"}</span>
                </button>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalConfiguartion;

import settingsImg from "../assets/settings.svg";
import userImg from "../assets/User.svg";
import homeImg from "../assets/Home.svg";
import { useContext } from "react";
import { InfoContext } from "../../services/context";
import WebApp from "@twa-dev/sdk";

function Footer() {
  const { info } = useContext(InfoContext);
  const tg = WebApp;

  return (
    <footer>
      <nav className="footer__nav">
        <a
          href="#"
          className="footer__buttons"
          onClick={() => {
            tg.showPopup({
              message: `${
                info?.lang === "ru"
                  ? "Этот раздел пока что недоступен"
                  : "This section is not available yet"
              }`,
            });
          }}
        >
          <img src={settingsImg} alt="" className="opacity-20" />
          <p className="nav__text">
            {info?.lang === "ru" ? "Настройки" : "Settings"}
          </p>
        </a>
        <a href="#" className="footer__buttons">
          <img src={homeImg} alt="" />
          <p className="nav__text">
            {info?.lang === "ru" ? "Главная" : "Home"}
          </p>
        </a>
        <a
          href="#"
          className="footer__buttons"
          onClick={() => {
            tg.showPopup({
              message: `${
                info?.lang === "ru"
                  ? "Этот раздел пока что недоступен"
                  : "This section is not available yet"
              }`,
            });
          }}
        >
          <img src={userImg} alt="" className="opacity-20" />
          <p className="nav__text">
            {info?.lang === "ru" ? "Профиль" : "Profile"}
          </p>
        </a>
      </nav>
    </footer>
  );
}

export default Footer;

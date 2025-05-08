import settingsImg from "../assets/settings.svg";
import userImg from "../assets/User.svg";
import homeImg from "../assets/Home.svg";
function Footer() {
  return (
    <footer>
      <nav className="footer__nav">
        <a href="" className="footer__buttons">
          <img src={settingsImg} alt="" className="opacity-20" />
          <p className="nav__text">Настройки</p>
        </a>
        <a href="" className="footer__buttons">
          <img src={homeImg} alt="" />
          <p className="nav__text">Главная</p>
        </a>
        <a href="" className="footer__buttons">
          <img src={userImg} alt="" className="opacity-20" />
          <p className="nav__text">Профиль</p>
        </a>
      </nav>
    </footer>
  );
}

export default Footer;

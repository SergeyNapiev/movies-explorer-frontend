import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({ loggedIn }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isOverlayVisible, setOverlayVisible] = React.useState(false);

  const location = useLocation();
  const isPinkimage = location.pathname === "/";
  const activePath = location.pathname;

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth >= 1280) {
      setMobileMenuOpen(false);
      setCloseButtonVisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const [isCloseButtonVisible, setCloseButtonVisible] = React.useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setCloseButtonVisible(!isMobileMenuOpen);
    setOverlayVisible(!isMobileMenuOpen);
  };

  const overlayClassName = `navigation__overlay ${isMobileMenuOpen ? "navigation__overlay_active" : ""}`;


  return (
    <section className="navigation">
      {loggedIn ? (
        <button className="navigation__nav-button" onClick={handleMobileMenuToggle}>
          &#x2630;
        </button>
      ) : (
        <div className="navigation__container">
          <Link to="/signup" className="navigation__link">
            Регистрация
          </Link>
          <Link to="/signin" className="navigation__link navigation__link_color_black">
            Войти
          </Link>
        </div>
      )}
      <ul className={`navigation__roster ${isMobileMenuOpen ? "navigation__roster_opened" : ""}`}>
        <button
          className={`navigation__close-button ${isCloseButtonVisible ? '' : 'navigation__close-button_hidden'}`}
          onClick={handleMobileMenuToggle}
        >
          &times;
        </button>
        {loggedIn && (
          <>
            <li className="navigation__list navigation__list_first-of-type">
              <Link to="/" className={`navigation__link ${activePath === "/" ? "navigation__link_active" : ""}`}>
                Главная
              </Link>
            </li>
            <li className="navigation__list">
              <Link to="/movies" className={`navigation__link ${activePath === "/movies" ? "navigation__link_active" : ""}`}>
                Фильмы
              </Link>
            </li>
            <li className="navigation__list">
              <Link to="/saved-movies" className={`navigation__link ${activePath === "/saved-movies" ? "navigation__link_active" : ""}`}>
                Сохраненные фильмы
              </Link>
            </li>
          </>
        )}
        {loggedIn && (
          <li className="navigation__list navigation__list_item_last">
            <Link to="/profile" className={`navigation__link navigation__link__item_last ${activePath === "/profile" ? "navigation__link_active" : ""}`}>
              Аккаунт
              <div className={`navigation__icon ${!isMobileMenuOpen && isPinkimage ? 'navigation__icon_color_pink' : ''}`}></div>
            </Link>
          </li>)}
      </ul>
      <div className={overlayClassName}></div>
    </section>
  )
}

export default Navigation;
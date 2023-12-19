import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isAuthenticated = true;
  const location = useLocation();
  const isPinkimage = location.pathname === "/";


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
  };

  return (
    <section className="navigation">
      {isAuthenticated ? ( // Условие для отображения кнопки навигации
        <button className="navigation__nav-button" onClick={handleMobileMenuToggle}>
          &#x2630;
        </button>
      ) : (
        <div className="navigation__container">
          <li className="navigation__list navigation__list_item_last">
            <Link to="/signup" className="navigation__list navigation__list_item_last">
              Регистрация
            </Link>
          </li>
          <Link to="/signin" className="navigation__button">
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
        {isAuthenticated && (
          <>
            <li className="navigation__list">
              <Link to="/movies" className="navigation__list">
                Фильмы
              </Link>
            </li>
            <li className="navigation__list">
              <Link to="/saved-movies" className="navigation__list">
                Сохраненные фильмы
              </Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <li className="navigation__list navigation__list_item_last">
            <Link to="/signup" className="navigation__list">
              Аккаунт
              <div className={`navigation__icon ${isPinkimage ? 'navigation__icon_color_pink' : ''}`}></div>
            </Link>
          </li>)}
      </ul>
    </section>
  )
}

export default Navigation;
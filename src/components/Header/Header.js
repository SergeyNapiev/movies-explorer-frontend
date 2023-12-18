import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {

  const isAuthenticated = true;
  const location = useLocation();
  const isPinkBackground = location.pathname === "/";

  return (
    <header className={`header ${isPinkBackground ? 'header_color_pink' : ''}`}>
      <button className="header__logo"></button>
      <ul className="header__container">
        {isAuthenticated ? (
          <>
            <li className="header__list">
              <Link to="/movies" className="header__list">
                Фильмы
              </Link>
            </li>
            <li className="header__list">
              <Link to="/savedmovies" className="header__list">
                Сохраненные фильмы
              </Link>
            </li>
          </>
        ) : (
          <li className="header__list">Регистрация</li>
        )}
        <li className="header__list header__list_item_last">
          Аккаунт
          <div className="header__icon"></div>
        </li>
      </ul>
    </header>
  );
}

export default Header;
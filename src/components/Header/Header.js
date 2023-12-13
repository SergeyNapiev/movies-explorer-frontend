import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header className="header">
          <button className="header__logo"></button>
          <ul className="header__container">
            <li className="header__list">Фильмы</li>
            <li className="header__list">Сохраненные фильмы</li>
            <li className="header__list header__list_item_last">Аккаунт
                <div className="header__icon"></div>
            </li>
          </ul>
        </header>
      );
};

export default Header;
import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation.js";

function Header() {

  const location = useLocation();
  const isPinkBackground = location.pathname === "/";

  return (
    <header className={`header ${isPinkBackground ? 'header_color_pink' : ''}`}>
      <div className="header__logo"></div>
      <Navigation />
    </header>
  );
}

export default Header;
import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation.js";

function Header() {

  const location = useLocation();
  const isPinkBackground = location.pathname === "/";

  return (
    <header className={`header ${isPinkBackground ? 'header_color_pink' : ''}`}>
      <Link to="/" className="header__logo"></Link>
      <Navigation />
    </header>
  );
}

export default Header;
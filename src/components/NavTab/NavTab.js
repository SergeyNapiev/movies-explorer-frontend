import React from "react";
import "./NavTab.css";

function NavTab() {
    return (
        <section className="navtab">
            <ul className="navtab__container">
                <li><a href="#about" className="navtab__link">О проекте</a></li>
                <li><a href="#technologies" className="navtab__link">Технологии</a></li>
                <li><a href="#student" className="navtab__link">Студент</a></li>
            </ul>
        </section>
    )
}

export default NavTab;
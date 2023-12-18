import React from "react";
import "./Footer.css";

function Footer() {

    const date = new Date().getFullYear();

    return (
        <section className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__date">&copy; {date}</p>
                <ul className="footer__services">
                    <li className="footer__list">
                        <a className="footer__srvice" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__list">
                        <a className="footer__srvice" href="https://github.com/">Github</a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Footer;
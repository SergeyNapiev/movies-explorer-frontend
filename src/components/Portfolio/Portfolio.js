import React from "react";
import "./Portfolio.css";

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__projects">
                <li className="portfolio__list">
                    <a className="portfolio__link" href="https://github.com/SergeyNapiev/how-to-learn" target="blank">
                        <p className="portfolio__project">Статичный сайт</p>
                        <button className="portfolio__button">↗</button>
                    </a>
                </li>
                <li className="portfolio__list">
                    <a className="portfolio__link" href="https://github.com/SergeyNapiev/russian-travel" target="blank">
                        <p className="portfolio__project">Адаптивный сайт</p>
                        <button className="portfolio__button">↗</button>
                    </a>
                </li>
                <li className="portfolio__list">
                    <a className="portfolio__link" href="https://sergeynapiev.nomoredomainsmonster.ru" target="blank">
                        <p className="portfolio__project">Одностраничное приложение</p>
                        <button className="portfolio__button">↗</button>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;
import React from "react";
import "./AboutProject.css";

function AboutProject() {
    return (
        <sectiom className="about">
            <h2 className="about__title">О проекте</h2>
            <ul className="about__container">
                <li>
                    <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about__list">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li>
                    <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about__list">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <ul className="about__container">
                <li>
                    <p className="about__time">1 неделя</p>
                    <p className="about__tech">Back-end</p>
                </li>
                <li>
                    <p className="about__time">4 недели</p>
                    <p className="about__tech">Front-end</p>
                </li>
            </ul>
        </sectiom>
    )
}

export default AboutProject;
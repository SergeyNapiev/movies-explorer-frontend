import React from "react";
import "./AboutMe.css";

function AboutMe() {
    return (
        <section className="me">
            <div className="me__comtainer">
                <h2 className="me__title">Студент</h2>
                <p className="me__name">Сергей</p>
                <p className="me__description">Я родился в Москве, живу в Кокшетау, закончил факультет машиностроительных технологий в МГТУ им.Н.Э.Баумана. У меня есть любимая жена. Я люблю слушать музыку, а ещё увлекаюсь кроссфитом. Недавно начал кодить. С 2017 по 2022 года работал в компании «Лабиринт». Сейчас работаю в ТОО КАИК. Планирую набраться опыта на стажировка и потом сменить профессию на web-программиста.</p>
                <a className="me__github" href="https://github.com/SergeyNapiev/" target="blank">Github</a>
            </div>
            <img className="me__photo" src="../../images/photo_2022-10-07_10-36-36.png" alt="Моё фото"/>
        </section>
    )
}

export default AboutMe;
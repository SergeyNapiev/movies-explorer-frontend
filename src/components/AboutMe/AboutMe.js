import React from "react";
import "./AboutMe.css";

function AboutMe() {
    return (
        <section className="me">
            <div className="me__comtainer">
                <h2 className="me__title">Студент</h2>
                <p className="me__name">Сергей</p>
                <p className="me__description">Я родился в Москве, живу в Кокшетау, закончил факультет машиностроительных технологий в МГТУ им.Н.Э.Баумана. У меня есть любимая жена. Я люблю слушать музыку, а ещё увлекаюсь кроссфитом. Недавно начал кодить. С 2017 по 2022 года работал в компании «Лабиринт». Сейчас работаю в ТОО КАИК.</p>
                <a className="me__github" href="https://github.com/SergeyNapiev/">Github</a>
            </div>
            <img className="me__photo" />
        </section>
    )
}

export default AboutMe;
import React from "react";
import "./AboutMe.css";

function AboutMe() {
    return (
        <section className="me" id="student">
            <h2 className="me__title">Студент</h2>
            <div className="me__container">
                <div className="me__info">
                    <p className="me__name">Сергей</p>
                    <p className="me__profession">Фронтенд-разработчик, 30 лет</p>
                    <p className="me__description">Я родился в Москве, живу в Кокшетау, закончил факультет машиностроительных технологий в МГТУ им.Н.Э.Баумана. У меня есть любимая жена. Я люблю слушать музыку, а ещё увлекаюсь кроссфитом. Недавно начал кодить. Планирую набраться опыта на стажировках и потом сменить профессию на web-программиста.</p>
                    <a className="me__github" href="https://github.com/SergeyNapiev/" target="blank">Github</a>
                </div>
                <img className="me__photo" src="#" style={{ backgroundImage: 'url(../../images/photo_2022-10-07_10-36-36.png)' }} alt="Моё фото" />
            </div>
        </section>
    )
}

export default AboutMe;
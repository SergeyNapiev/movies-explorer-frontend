import React from "react";
import "./Promo.css";
import imagePath from "../../images/pic__COLOR_landing-logo.svg"


function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <img className="promo__img" src={imagePath} alt="Логотип" />
            </div>
        </section>
    )
}

export default Promo;
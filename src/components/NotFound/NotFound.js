import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-4);
    };

    return (
        <section className="not-found">
            <div className="not-found__error">404</div>
            <p className="not-found__description">Страница не найдена</p>
            <button className="not-found__back" onClick={handleGoBack}>Назад</button>
        </section>
    )
}

export default NotFound;
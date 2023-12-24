import React from "react";
import "../Register/Register.css";
import { Link, useLocation } from "react-router-dom";

function Login() {

    const location = useLocation();
    const isSignInRoute = location.pathname === "/signin";

    return (
        <section className="signup">
            <div className="signup__header">
                <div className="signup__logo"></div>
                <h3 className="signup__welcome">Рады видеть!</h3>
            </div>
            <form className="signup__form">
                <label htmlFor="email" className="signup__label">E-mail</label>
                <input id="email" className="signup__input" type="email" placeholder="E-mail" required/>
                <label htmlFor="password" className="signup__label">Пароль</label>
                <input id="password" className="signup__input" type="password" placeholder="Пароль" required/>
                <span className="signup__error"></span>
                <button className={`signup__submit ${isSignInRoute ? "signup__submit_on_login" : ""}`}>
                    Войти
                </button>
            </form>
            <div className="signup__container">
                <p className="signup__text">Ещё не зарегистрированы?
                    <Link to="/signup" className="signup__link">
                        Регистрация
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default Login;
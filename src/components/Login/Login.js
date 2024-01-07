import React from "react";
import "../Register/Register.css";
import { Link, useLocation } from "react-router-dom";

function Login({signIn, setIsWarning, isWarning }) {
    const initialFormData = {
        email: "",
        password: "",
    };
    const [formData, setFormData] = React.useState(initialFormData);
    const [nameError, setNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // здесь обрабатываем вход в систему
        signIn(formData.password, formData.email);
    };
    const location = useLocation();
    const isSignInRoute = location.pathname === "/signin";

    return (
        <section className="signup">
            <div className="signup__header">
                <div className="signup__logo"></div>
                <h3 className="signup__welcome">Рады видеть!</h3>
            </div>
            <form className="signup__form" noValidate onSubmit={handleSubmit}>
                <label htmlFor="email" className="signup__label">E-mail</label>
                <input id="email" name="email" className="signup__input" type="email" placeholder="E-mail" required onChange={handleChange} />
                <label htmlFor="password" className="signup__label">Пароль</label>
                <input id="password" name="password" className="signup__input" type="password" placeholder="Пароль" required onChange={handleChange}/>
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
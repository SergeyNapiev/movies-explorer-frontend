import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register({ signUp }) {

    const initialFormData = {
        name: "",
        email: "",
        password: "",
    };
    const [formData, setFormData] = React.useState(initialFormData);

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
        signUp(formData);
    };

    return (
        <section className="signup">
            <div className="signup__header">
                <div className="signup__logo"></div>
                <h3 className="signup__welcome">Добро пожаловать!</h3>
            </div>
            <form className="signup__form" noValidate onSubmit={handleSubmit}>
                <label htmlFor="name" className="signup__label">Имя</label>
                <input id="name" name="name" className="signup__input" type="text" placeholder="Имя" required onChange={handleChange} />
                <label htmlFor="email" className="signup__label">E-mail</label>
                <input id="email" name="email" className="signup__input" type="email" placeholder="E-mail" required onChange={handleChange} />
                <label htmlFor="password" className="signup__label">Пароль</label>
                <input id="password" name="password" className="signup__input" type="password" placeholder="Пароль" required onChange={handleChange} />
                <span className="signup__error">Что-то пошло не так...</span>
                <button className="signup__submit">Зарегистрироваться</button>
            </form>
            <div className="signup__container">
                <p className="signup__text">Уже зарегистрированы?
                    <Link to="/signin" className="signup__link">
                        Войти
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default Register;
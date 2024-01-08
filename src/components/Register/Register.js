import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register({ signUp, isWarning, isSignedUp }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const errors = {};

    // Валидация на пустоту
    if (formData.name.trim().length === 0) {
      errors.name = "Введите имя";
    } else if (formData.name.length < 2 || formData.name.length > 30) {
      errors.name = "Имя должно содержать от 2 до 30 символов.";
    }

    if (formData.email.trim().length === 0) {
      errors.email = "Введите email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Некорректный email";
    }

    if (formData.password.trim().length === 0) {
      errors.password = "Введите пароль";
    } else if (formData.password.length < 6) {
      errors.password = "Пароль должен содержать не менее 6 символов";
    }

    setFormErrors(errors);

    // Check if there are any errors or any field is empty
    const isValid =
      Object.values(errors).every((error) => !error) &&
      Object.values(formData).every((value) => value.trim().length > 0);

    setIsFormValid(isValid);

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const errors = { ...formErrors };

    switch (name) {
      case "name":
        errors.name = value.trim().length >= 2 ? "" : "Введите имя (от 2 до 30 символов)";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errors.email = emailRegex.test(value) ? "" : "Введите корректный email";
        break;
      case "password":
        errors.password = value.length >= 6 || !value.trim() ? "" : "Пароль должен содержать не менее 6 символов";
        break;
      default:
        break;
    }

    setFormErrors(errors);

    // Check if there are any errors or any field is empty
    const isValid =
      Object.values(errors).every((error) => !error) &&
      Object.values(formData).every((value) => value.trim().length > 0);

    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      signUp(formData);
    } else {
      console.log("Form data is invalid");
    }
  };

  return (
    <section className="signup">
      <div className="signup__header">
        <Link to="/" className="signup__logo"></Link>
        <h3 className="signup__welcome">Добро пожаловать!</h3>
      </div>
      <form className="signup__form" noValidate onSubmit={handleSubmit}>
        <label htmlFor="name" className="signup__label">
          Имя
        </label>
        <input
          id="name"
          minLength="2"
          maxLength="30"
          name="name"
          className={`signup__input ${formErrors.name && "signup__input_error"}`}
          type="text"
          placeholder="Имя"
          required
          onChange={handleChange}
        />
        {formErrors.name && <span className="signup__error">{formErrors.name}</span>}

        <label htmlFor="email" className="signup__label">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          className={`signup__input ${formErrors.email && "signup__input_error"}`}
          type="email"
          placeholder="E-mail"
          required
          onChange={handleChange}
        />
        {formErrors.email && <span className="signup__error">{formErrors.email}</span>}

        <label htmlFor="password" className="signup__label">
          Пароль
        </label>
        <input
          id="password"
          minLength="6"
          maxLength="30"
          name="password"
          className={`signup__input ${formErrors.password && "signup__input_error"}`}
          type="password"
          placeholder="Пароль"
          required
          onChange={handleChange}
        />
        {formErrors.password && <span className="signup__error">{formErrors.password}</span>}
        {isWarning && <span className="signup__error">Что-то пошло не так...</span>}
        {isSignedUp && <span className="signup__error">Регистрация прошла успешно!</span>}
        <button className={`signup__submit ${(!isFormValid || isWarning || isSignedUp) && "signup__submit_disabled"}`} disabled={!isFormValid || isWarning || isSignedUp}>
          Зарегистрироваться
        </button>
      </form>
      <div className="signup__container">
        <p className="signup__text">
          Уже зарегистрированы?
          <Link to="/signin" className="signup__link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
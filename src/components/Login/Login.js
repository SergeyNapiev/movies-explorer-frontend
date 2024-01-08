import React, { useState } from "react";
import "../Register/Register.css";
import { Link, useLocation } from "react-router-dom";

function Login({ signIn, isWarningLogin, isSigningIn }) {
  console.log("login", isSigningIn);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Введите email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Некорректный email";
    }

    if (!formData.password) {
      errors.password = "Введите пароль";
    } else if (formData.password.length < 6) {
      errors.password = "Пароль должен содержать не менее 6 символов";
    }

    setFormErrors(errors);

    // Check if there are any errors in either email or password
    const isEmailValid = !errors.email;
    const isPasswordValid = !errors.password;

    // Check if both fields are filled and valid
    const isValid = isEmailValid && isPasswordValid && formData.email && formData.password;

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
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errors.email = emailRegex.test(value) ? "" : "Введите корректный email";
        break;
      case "password":
        errors.password = value.length >= 6 || !value.trim()
          ? ""
          : "Пароль должен содержать не менее 6 символов";
        break;
      default:
        break;
    }

    setFormErrors(errors);

    // Check if there are any errors in either email or password
    const isEmailValid = !errors.email;
    const isPasswordValid = !errors.password;

    // Check if both fields are filled and valid
    const isValid = isEmailValid && isPasswordValid && formData.email && formData.password;

    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      signIn(formData);
    } else {
      console.log("Form data is invalid");
    }
  };

  const location = useLocation();
  const isSignInRoute = location.pathname === "/signin";

  return (
    <section className="signup">
      <div className="signup__header">
        <Link to="/" className="signup__logo"></Link>
        <h3 className="signup__welcome">Рады видеть!</h3>
      </div>
      <form className="signup__form" noValidate onSubmit={handleSubmit}>
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
          name="password"
          className={`signup__input ${formErrors.password && "signup__input_error"}`}
          type="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="30"
          required
          onChange={handleChange}
        />
        {formErrors.password && <span className="signup__error">{formErrors.password}</span>}
        {isWarningLogin && <span className="signup__error">Что-то пошло не так...</span>}
        <button
          disabled={!isFormValid || isSigningIn}
          className={`signup__submit ${isSignInRoute ? "signup__submit_on_login" : ""}
            ${!isFormValid || isSigningIn ? "signup__submit_disabled" : ""}`}
        >
          Войти
        </button>
      </form>
      <div className="signup__container">
        <p className="signup__text">
          Ещё не зарегистрированы?
          <Link to="/signup" className="signup__link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
import React from "react";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Profile({ signOut, onUpdateUser, successUpdate, isWarning }) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [isEditing, setIsEditing] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({});
    const [isFormValid, setIsFormValid] = React.useState(true);

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    const validateForm = () => {
        const errors = {};

        if (name.length === 0) {
            errors.name = "";
        } else if (name.length < 2 || name.length > 30) {
            errors.name = "Имя должно содержать от 2 до 30 символов.";
        }

        if (!email) {
            errors.email = "";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = "Некорректный email";
        }

        setFormErrors(errors);
        const isValid = Object.values(errors).every((error) => !error);
        setIsFormValid(isValid);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onUpdateUser({
                name,
                email,
            });
            setIsEditing(false);
        } else {
            console.log("Form data is invalid");
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setIsEditing(true);

        const errors = { ...formErrors };
        errors.name = e.target.value.trim().length >= 2 ? "" : "Введите имя (от 2 до 30 символов)";
        setFormErrors(errors);
        const isValid = Object.values(errors).every((error) => !error);
        setIsFormValid(isValid);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsEditing(true);

        const errors = { ...formErrors };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errors.email = emailRegex.test(e.target.value) ? "" : "Введите корректный email";
        setFormErrors(errors);
        const isValid = Object.values(errors).every((error) => !error);
        setIsFormValid(isValid);
    };

    return (
        <section className="profile">
            <h2 className="profile__welcome">Привет, Сергей!</h2>
            <form className="profile__form" onSubmit={handleSubmit}>
                <div className="profile__container">
                    <label className="profile__label">Имя</label>
                    <input
                        className={`profile__input ${formErrors.name && "profile__input_error"}`}
                        id="name"
                        minLength="2"
                        maxLength="30"
                        name="name"
                        required
                        onChange={handleNameChange}
                        placeholder="Имя"
                        value={name || ""}
                    />
                    {formErrors.name && <label className="profile__error-imput">{formErrors.name}</label>}
                </div>
                <div className="profile__container">
                    <label className="profile__label">E-mail</label>
                    <input
                        className={`profile__input ${formErrors.email && "profile__input_error"}`}
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={handleEmailChange}
                        placeholder="E-mail"
                        value={email || ""}
                    />
                    {formErrors.email && <label className="profile__error-imput">{formErrors.email}</label>}
                </div>
                {isEditing ? (
                    <>
                        {isWarning && <span className="profile__error">Что-то пошло не так...</span>}
                        <button className={`profile__save ${!isFormValid ? 'profile__save_disabled' : ''}`} type="submit" disabled={!isFormValid}>
                            Сохранить
                        </button>
                    </>
                ) : (
                    <p className="profile__edit">Редактировать</p>
                )}
            </form>
            {!isEditing ? (
                <button className="profile__signout" onClick={signOut}>
                    Выйти из аккаунта
                </button>
            ) : (
                ""
            )}
        </section>
    );
}

export default Profile;
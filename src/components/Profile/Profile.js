import React from "react";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Profile({ signOut, onUpdateUser, successUpdate, isWarning, isUpdatinUser }) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [isEditing, setIsEditing] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({});
    const [isFormValid, setIsFormValid] = React.useState(true);
    const [isDataUnchanged, setIsDataUnchanged] = React.useState(true);
    console.log(isWarning);
    console.log("обновление ", isUpdatinUser);
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
            setIsDataUnchanged(true);
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
            if (isDataUnchanged) {
                console.log("Вы не внесли изменений. Форма не будет отправлена.");
            } else {
                onUpdateUser({
                    name,
                    email,
                });
                setIsEditing(false);
            }
        } else {
            console.log("Форма содержит ошибки. Проверьте введенные данные.");
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
        setIsDataUnchanged(currentUser && currentUser.name === e.target.value && currentUser.email === email);
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
        setIsDataUnchanged(currentUser && currentUser.name === name && currentUser.email === e.target.value);
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
                {isWarning && <span className="profile__error">Что-то пошло не так...</span>}
                {successUpdate && <span className="profile__error">Данные обновлены!</span>}
                {isEditing ? (
                    <>
                        {isDataUnchanged && <span className="profile__error">Вы не внесли изменений.</span>}
                        <button className={`profile__save ${(!isFormValid || isDataUnchanged || isUpdatinUser) ? 'profile__save_disabled' : ''}`} type="submit" disabled={!isFormValid || isDataUnchanged || isUpdatinUser}>
                        Сохранить
                    </button>
                    </>
                ) : (
                    <p className="profile__edit" onClick={() => setIsEditing(true)}>Редактировать</p>
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
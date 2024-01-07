import React from "react";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Profile({ signOut, onUpdateUser, successUpdate }) {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const [isEditing, setIsEditing] =  React.useState(false);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            email,
        });
        setIsEditing(false);
    }

    function handleNameChange(e) {
        setName(e.target.value);
        setIsEditing(true);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        setIsEditing(true);
    }

    return (
        <section className="profile">
            <h2 className="profile__welcome">Привет, Сергей!</h2>
            <form className="profile__form" onSubmit={handleSubmit}>
                <div className="profile__container">
                    <label className="profile__label">Имя</label>
                    <input
                        className="profile__input"
                        id="text"
                        name="text"
                        required
                        onChange={handleNameChange}
                        placeholder="Имя"
                        value={name || ""}
                    />
                </div>
                <div className="profile__container">
                    <label className="profile__label">E-mail</label>
                    <input
                        className="profile__input"
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={handleEmailChange}
                        placeholder="E-mail"
                        value={email || ""}
                    />
                </div>
                {isEditing ? (
                    <>
                        {successUpdate ? (<label className="profile__error">1</label>) : (<label className="profile__error">22</label>)}
                        <button className="profile__save" type="submit">
                            Сохранить
                        </button>
                    </>
                ) : (
                    <p className="profile__edit">Редактировать</p>
                )}
            </form>
            {!isEditing ? (
                <button className="profile__signout" onClick={signOut}>Выйти из аккаунта</button>
            ) : ("")}
        </section>
    )
}

export default Profile;
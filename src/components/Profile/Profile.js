import React from "react";
import "./Profile.css";

function Profile() {

    const [isEditing, setIsEditing] = React.useState(false);

    const handleInputChange = () => {
        setIsEditing(true);
    };

    return (
        <section className="profile">
            <h2 className="profile__welcome">Привет, Сергей!</h2>
            <form className="profile__form">
                <div className="profile__container">
                    <label className="profile__label">Имя</label>
                    <input
                        className="profile__input"
                        id="text"
                        name="text"
                        required
                        onChange={handleInputChange}
                        placeholder="Имя"
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
                        onChange={handleInputChange}
                        placeholder="E-mail"
                    />
                </div>
                {isEditing ? (
                    <>
                        <label className="profile__error"></label>
                        <button className="profile__save" type="submit">
                            Сохранить
                        </button>
                    </>
                ) : (
                    <p className="profile__edit">Редактировать</p>
                )}
            </form>
            {!isEditing ? (
                <button className="profile__signout">Выйти из аккаунта</button>
            ) : ("")}
        </section>
    )
}

export default Profile;
import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function formatDuration(durationInSeconds) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);

    return `${hours}ч ${minutes}мин`;
}

function MoviesCard({ name, link, duration, onDelete }) {

    const [isSaved, setIsSaved] = React.useState(false);

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
    };

    const location = useLocation();
    const isSavedMoviesPage = location.pathname === "/saved-movies";
    const formattedDuration = formatDuration(duration);
    const handleRemoveClick = () => {
        onDelete();
      };
    return (
        <section className="card">
            {isSavedMoviesPage ? (
        <button className="card__remove" onClick={handleRemoveClick}></button>
      ) : (
        <button
          className={isSaved ? "card__saved" : "card__save"}
          onClick={handleSaveClick}
        >
          {isSaved ? null : "Сохранить"}
        </button>
      )}
      <img src={link} className="card__image" alt="Заставка" />
      <div className="card__info">
        <p className="card__title">{name}</p>
        <p className="card__timing">{formattedDuration}</p>
      </div>
    </section>
  );
}

export default MoviesCard;
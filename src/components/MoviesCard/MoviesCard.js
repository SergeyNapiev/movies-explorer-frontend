import React, { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MoviesCard.css";

function formatDuration(durationInMinutes) {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  return `${hours}ч ${minutes}мин`;
}

const MoviesCard = memo(({ data, handleRemoveMovie, handleSaveMovie, isSaved, handleRemoveFromMoviePage}) => {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === "/saved-movies";
  const formattedDuration = formatDuration(data.duration);



  return (
    <section className="card">
      {isSavedMoviesPage ? (
        <button className="card__remove" onClick={() => handleRemoveMovie(data._id)}></button>
      ) : (
        <button
          className={isSaved ? "card__saved" : "card__save"}
          onClick={() => {
            isSaved ? handleRemoveFromMoviePage(data) : handleSaveMovie(data);
          }}
        >
          {isSaved ? null : "Сохранить"}
        </button>
      )}
      <Link to={data.trailerLink} target="blank">
        <img src={isSavedMoviesPage ? (data.image) : ('https://api.nomoreparties.co' + data.image.url)} className="card__image" alt="Заставка" />
      </Link>
      <div className="card__info">
        <p className="card__title">{data.nameRU}</p>
        <p className="card__timing">{formattedDuration}</p>
      </div>
    </section>
  );
});

export default MoviesCard;
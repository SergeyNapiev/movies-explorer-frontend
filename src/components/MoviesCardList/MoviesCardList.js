import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";

function MoviesCardList({ mergedMovies, savedMovies, handleRemoveMovie, handleSaveMovie, isLoading, handleRemoveFromMoviePage }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === "/saved-movies";

  // Создаем новую переменную для данных, которые будут отображаться на текущей странице
  const currentMovies = isSavedMoviesPage ? savedMovies : mergedMovies;

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      <div className="cards__container">
        {currentMovies.map((data, key) => (
          <MoviesCard
            key={data._id}
            data={data}
            handleRemoveMovie={handleRemoveMovie}
            handleSaveMovie={handleSaveMovie}
            handleRemoveFromMoviePage={handleRemoveFromMoviePage}
            isSaved={data.saved} // Передаем значение свойства saved в MoviesCard
          />
        ))}
      </div>
      <button className="cards__load">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
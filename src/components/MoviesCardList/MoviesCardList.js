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

  const [cardsToShow, setCardsToShow] = useState(getInitialCardsToShow());

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getInitialCardsToShow());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getInitialCardsToShow() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280) {
      return 12;
    } else if (screenWidth >= 768) {
      return 8;
    } else {
      return 5;
    }
  }

  const handleLoadMore = () => {
    setCardsToShow(prevCardsToShow => prevCardsToShow + getCardsToAdd());
  };

  function getCardsToAdd() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280) {
      return 3;
    } else if (screenWidth >= 768) {
      return 2;
    } else {
      return 2;
    }
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      <div className="cards__container">
        {currentMovies.slice(0, cardsToShow).map((data, index) => (
          <MoviesCard
            key={index}
            data={data}
            handleRemoveMovie={handleRemoveMovie}
            handleSaveMovie={handleSaveMovie}
            handleRemoveFromMoviePage={handleRemoveFromMoviePage}
            isSaved={data.saved} // Передаем значение свойства saved в MoviesCard
          />
        ))}
      </div>
      {cardsToShow < currentMovies.length && (
        <button className="cards__load" onClick={handleLoadMore}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
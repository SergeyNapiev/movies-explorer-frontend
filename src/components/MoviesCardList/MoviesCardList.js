import React, { useState } from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";

function MoviesCardList({ mergedMovies, savedMovies, handleRemoveMovie, handleSaveMovie, isLoading, handleRemoveFromMoviePage }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === "/saved-movies";
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitialVisibleMoviesCount());

  function getInitialVisibleMoviesCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 12;
    } else if (screenWidth >= 768) {
      return 8;
    } else {
      return 5;
    }
  }

  const loadMoreMovies = () => {
    const screenWidth = window.innerWidth;
    let additionalMoviesCount = 0;
    if (screenWidth >= 1280) {
      additionalMoviesCount = 3;
    } else if (screenWidth >= 768) {
      additionalMoviesCount = 2;
    } else {
      additionalMoviesCount = 2;
    }

    setVisibleMoviesCount((prevCount) => prevCount + additionalMoviesCount);
  };

  const currentMovies = isSavedMoviesPage ? savedMovies : mergedMovies;

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      <div className="cards__container">
        {currentMovies.slice(0, visibleMoviesCount).map((data, index) => (
          <MoviesCard
            key={index}
            data={data}
            handleRemoveMovie={handleRemoveMovie}
            handleSaveMovie={handleSaveMovie}
            handleRemoveFromMoviePage={handleRemoveFromMoviePage}
            isSaved={data.saved}
          />
        ))}
      </div>
      {visibleMoviesCount < currentMovies.length && (
        <button className="cards__load" onClick={loadMoreMovies}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
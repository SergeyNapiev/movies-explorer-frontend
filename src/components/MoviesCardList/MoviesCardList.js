import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";

function MoviesCardList({ mergedMovies, savedMovies, handleRemoveMovie, handleSaveMovie, isLoading, handleRemoveFromMoviePage, searchQuery, shortMovies }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === "/saved-movies";
  const [visibleMovies, setVisibleMovies] = useState(null);
  const [hasMoreMovies, setHasMoreMovies] = useState(false);

  useEffect(() => {
    setVisibleMovies(getInitialVisibleMovies());
  }, [searchQuery, shortMovies, mergedMovies, savedMovies]);

  function getInitialVisibleMovies() {
    const filteredMovies = filterMovies(isSavedMoviesPage ? savedMovies : mergedMovies);
    const initialVisibleMoviesCount = getInitialVisibleMoviesCount();
    setHasMoreMovies(filteredMovies.length > initialVisibleMoviesCount);
    return filteredMovies.slice(0, initialVisibleMoviesCount);
  }

  function filterMovies(movies) {
    return movies.filter((movie) => {
      const matchTitle = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDuration = shortMovies ? movie.duration <= 40 : true;
      return matchTitle && matchDuration;
    });
  }

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

    setVisibleMovies((prevMovies) => {
      const filteredMovies = filterMovies(isSavedMoviesPage ? savedMovies : mergedMovies);
      const newVisibleMovies = filteredMovies.slice(0, prevMovies.length + additionalMoviesCount);
      setHasMoreMovies(newVisibleMovies.length < filteredMovies.length);
      return newVisibleMovies;
    });
  };

  if (visibleMovies === null) {
    return null;
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {visibleMovies.length === 0 ? (
        <p className="cards__not-found">Ничего не найдено</p>
      ) : (
        <div className="cards__container">
          {visibleMovies.map((data, index) => (
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
      )}
      {hasMoreMovies && (
        <button className="cards__load" onClick={loadMoreMovies}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
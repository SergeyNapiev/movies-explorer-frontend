import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import {
  INITIAL_VISIBLE_MOVIES_COUNT_LARGE,
  INITIAL_VISIBLE_MOVIES_COUNT_MEDIUM,
  INITIAL_VISIBLE_MOVIES_COUNT_SMALL,
  ADDITIONAL_MOVIES_COUNT_LARGE,
  ADDITIONAL_MOVIES_COUNT_MEDIUM,
  ADDITIONAL_MOVIES_COUNT_SMALL,
  DURATION_THRESHOLD,
  SCREEN_WIDTH_LARGE,
  SCREEN_WIDTH_MEDIUM,
} from "../../utils/constants.js"
import { deleteMovie, addMovie } from "../../utils/MainApi.js";
import { useMoviesContext } from "../../contexts/MoviesContext.js";

const MoviesCardList = ({
  isLoading,
  movies: filteredMovies,
  savedMovies: filteredSavedMovies,
}) => {
  const { movies, savedMovies, updateSavedMovies } = useMoviesContext();
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === "/saved-movies";
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(0);

  useEffect(() => {
    setVisibleMovies(isSavedMoviesPage ? filteredSavedMovies : filteredMovies);
  }, [isSavedMoviesPage, filteredSavedMovies, filteredMovies]);

  useEffect(() => {
    const handleResize = () => {
      updateVisibleMoviesCount();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    updateVisibleMoviesCount();
  }, [visibleMovies]);

  const updateVisibleMoviesCount = () => {
    const screenWidth = window.innerWidth;

    if (isSavedMoviesPage) {
      setVisibleMoviesCount(savedMovies.length);
    } else if (screenWidth >= SCREEN_WIDTH_LARGE) {
      setVisibleMoviesCount(INITIAL_VISIBLE_MOVIES_COUNT_LARGE);
    } else if (screenWidth >= SCREEN_WIDTH_MEDIUM) {
      setVisibleMoviesCount(INITIAL_VISIBLE_MOVIES_COUNT_MEDIUM);
    } else {
      setVisibleMoviesCount(INITIAL_VISIBLE_MOVIES_COUNT_SMALL);
    }
  };

  const handleLoadMore = () => {
    const screenWidth = window.innerWidth;

    let additionalCount = 0;
    if (screenWidth >= SCREEN_WIDTH_LARGE) {
      additionalCount = ADDITIONAL_MOVIES_COUNT_LARGE;
    } else if (screenWidth >= SCREEN_WIDTH_MEDIUM) {
      additionalCount = ADDITIONAL_MOVIES_COUNT_MEDIUM;
    } else {
      additionalCount = ADDITIONAL_MOVIES_COUNT_SMALL;
    }

    setVisibleMoviesCount((prevCount) => prevCount + additionalCount);
  };

  const handleSaveMovie = React.useCallback((data) => {
    const token = localStorage.getItem("token");
    if (token) {
      addMovie(data, token)
        .then((res) => {
          updateSavedMovies([res, ...savedMovies]);
          
        })
        .catch((error) => {
          console.log("Ошибка при сохранении фильма:", error);
        });
    }
  }, [savedMovies, updateSavedMovies]);

  const handleRemoveFromMoviePage = React.useCallback((data) => {
    const movieName = data.nameRU;
    const foundMovie = savedMovies.find(savedMovie => savedMovie.nameRU === movieName);
    const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie.nameRU !== movieName);
    updateSavedMovies(updatedSavedMovies);
  
    const token = localStorage.getItem("token");
    if (token) {
      deleteMovie(foundMovie._id, token)
        .then(() => {
        })
        .catch((error) => {
          console.error(`Ошибка удаления фильма: ${error}`);
        });
    }
  }, [savedMovies, updateSavedMovies]);

  function handleRemoveMovie(deleteId) {
    const token = localStorage.getItem("token");
    deleteMovie(deleteId, token)
      .then(() => {
        updateSavedMovies(savedMovies.filter(movie => movie._id !== deleteId));
      })
      .catch((error) => console.error(`Ошибка удаления ${error}`));
  }

  return (
    <section className="cards">
      {!isLoading && visibleMovies.length === 0 ? (
        <p className="cards__not-found">Ничего не найдено</p>
      ) : (
        <div className="cards__container">
          {visibleMovies.slice(0, visibleMoviesCount).map((data, key) => (
            <MoviesCard
              key={key}
              data={data}
              handleRemoveMovie={() => handleRemoveMovie(data._id)}
              handleSaveMovie={() => handleSaveMovie(data)}
              handleRemoveFromMoviePage={() => handleRemoveFromMoviePage(data)}
              isSaved={data.isSaved}
            />
          ))}
        </div>
      )}
      {isSavedMoviesPage || (visibleMovies.length > visibleMoviesCount && (
        <button className="cards__load" onClick={handleLoadMore}>
          Ещё
        </button>
      ))}
    </section>
  );
};

export default MoviesCardList;
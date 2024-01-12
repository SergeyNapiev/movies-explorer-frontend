import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";
import {
  INITIAL_VISIBLE_MOVIES_COUNT_LARGE,
  INITIAL_VISIBLE_MOVIES_COUNT_MEDIUM,
  INITIAL_VISIBLE_MOVIES_COUNT_SMALL,
  ADDITIONAL_MOVIES_COUNT_LARGE,
  ADDITIONAL_MOVIES_COUNT_MEDIUM,
  ADDITIONAL_MOVIES_COUNT_SMALL,
  ADDITIONAL_MOVIES_COUNT_ZERO,
  DURATION_THRESHOLD,
  SCREEN_WIDTH_LARGE,
  SCREEN_WIDTH_MEDIUM,
} from "../../utils/constants.js"
import { getMovies, deleteMovie, addMovie } from "../../utils/MainApi.js";
import { useMoviesContext } from "../../contexts/MoviesContext.js";


const MoviesCardList = ({
  mergedMovies, 
  // handleRemoveMovie, 
  // handleSaveMovie, 
  // isLoading, 
  // handleRemoveFromMoviePage, 
  // searchQuery, 
  // shortMovies 
}) => {
  const {  movies, savedMovies, getAllMoviesCalled, updateSavedMovies, updateMovies, setGetAllMoviesCalled  } = useMoviesContext();
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === "/saved-movies";
  const [isLoading, setIsLoading] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState([]);
  useEffect(() => {
    // Set the initial state for visibleMovies based on the page
    setVisibleMovies(isSavedMoviesPage ? savedMovies : movies);
  }, [isSavedMoviesPage, savedMovies, movies]);
  // const [visibleMovies, setVisibleMovies] = useState(null);
  // const [hasMoreMovies, setHasMoreMovies] = useState(false);

  // useEffect(() => {
  //   setVisibleMovies(getInitialVisibleMovies());
  // }, [searchQuery, shortMovies, mergedMovies, savedMovies, location.pathname]);

  // function getInitialVisibleMovies() {
  //   if (isSavedMoviesPage) {
  //     return savedMovies;
  //   }

  //   const filteredMovies = filterMovies(mergedMovies);
  //   const initialVisibleMoviesCount = getInitialVisibleMoviesCount();
  //   setHasMoreMovies(filteredMovies.length > initialVisibleMoviesCount);
  //   return filteredMovies.slice(ADDITIONAL_MOVIES_COUNT_ZERO, initialVisibleMoviesCount);
  // }

  // function filterMovies(movies) {
  //   return movies.filter((movie) => {
  //     const matchTitle = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
  //     const matchTitle = movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
  //     const matchDuration = shortMovies ? movie.duration <= DURATION_THRESHOLD : true;
  //     return matchTitle && matchDuration;
  //   });
  // }

  // function getInitialVisibleMoviesCount() {
  //   const screenWidth = window.innerWidth;
  //   if (screenWidth >= SCREEN_WIDTH_LARGE) {
  //     return INITIAL_VISIBLE_MOVIES_COUNT_LARGE;
  //   } else if (screenWidth >= SCREEN_WIDTH_MEDIUM) {
  //     return INITIAL_VISIBLE_MOVIES_COUNT_MEDIUM;
  //   } else {
  //     return INITIAL_VISIBLE_MOVIES_COUNT_SMALL;
  //   }
  // }

  // const loadMoreMovies = () => {
  //   const screenWidth = window.innerWidth;
  //   let additionalMoviesCount = 0;
  //   if (screenWidth >= SCREEN_WIDTH_LARGE) {
  //     additionalMoviesCount = ADDITIONAL_MOVIES_COUNT_LARGE;
  //   } else if (screenWidth >= SCREEN_WIDTH_MEDIUM) {
  //     additionalMoviesCount = ADDITIONAL_MOVIES_COUNT_MEDIUM;
  //   } else {
  //     additionalMoviesCount = ADDITIONAL_MOVIES_COUNT_SMALL;
  //   }

  //   setVisibleMovies((prevMovies) => {
  //     const filteredMovies = filterMovies(isSavedMoviesPage ? savedMovies : mergedMovies);
  //     const newVisibleMovies = filteredMovies.slice(0, prevMovies.length + additionalMoviesCount);
  //     setHasMoreMovies(newVisibleMovies.length < filteredMovies.length);
  //     return newVisibleMovies;
  //   });
  // };

  // if (visibleMovies === null) {
  //   return null;
  // }

  // const [addedMovies, setAddedMovies] = useState([]);
  const [removedMovies, setRemovedMovies] = useState([]);

  const handleSaveMovie = React.useCallback((data) => {
    const token = localStorage.getItem("token");
    if (token) {
      addMovie(data, token)
        .then((res) => {
          updateSavedMovies([res, ...savedMovies]);
          // setAddedMovies([res, ...addedMovies]);
        })
        .catch((error) => {
          console.log("Ошибка при сохранении фильма:", error);
        });
    }
  }, [savedMovies]);
  
  const handleRemoveFromMoviePage = React.useCallback((data) => {
    const movieName = data.nameRU;
    const foundMovie = savedMovies.find(savedMovie => savedMovie.nameRU === movieName);
    const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie.nameRU !== movieName);
    updateSavedMovies(updatedSavedMovies);
    setRemovedMovies([foundMovie, ...removedMovies]);
  
    const token = localStorage.getItem("token");
    if (token) {
      deleteMovie(foundMovie._id, token)
        .then(() => {
        })
        .catch((error) => {
          console.error(`Ошибка удаления фильма: ${error}`);
        });
    }
  }, [savedMovies, removedMovies]);

  function handleRemoveMovie(deleteId) {
    const token = localStorage.getItem("token");
    deleteMovie(deleteId, token)
      .then(() => {
        updateSavedMovies(savedMovies.filter(movie => !removedMovies.includes(movie) && movie._id !== deleteId));
      })
      .catch((error) => console.error(`Ошибка удаления ${error}`));
  }

  return (
    <section className="cards">
      {visibleMovies.length === 0 ? (
        <p className="cards__not-found">Ничего не найдено</p>
      ) : (
        <div className="cards__container">
          {visibleMovies.map((data, key) => (
            <MoviesCard
              key={key}
              data={data}
              handleRemoveMovie={handleRemoveMovie}
              handleSaveMovie={handleSaveMovie}
              handleRemoveFromMoviePage={handleRemoveFromMoviePage}
              isSaved={data.isSaved}
            />
          ))}
        </div>
      )}
      {/* {hasMoreMovies && ( */}
        <button className="cards__load" 
        // onClick={loadMoreMovies}
        >
          Ещё
        </button>
      {/* )} */}
    </section>
  );
};

export default MoviesCardList;
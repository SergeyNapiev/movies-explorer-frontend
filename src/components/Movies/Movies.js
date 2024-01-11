import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import moviesApi from "../../utils/MoviesApi.js";
import { getMovies, deleteMovie, addMovie } from "../../utils/MainApi.js";
import { useMoviesContext } from "../../contexts/MoviesContext.js";

function Movies({ mergedMovies, handleSaveMovie, isSaved, handleRemoveMovie, handleRemoveFromMoviePage }) {
  const { movies, getAllMoviesCalled, updateMovies, setGetAllMoviesCalled } = useMoviesContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [shortMovies, setShortMovies] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMovies, setErrorMovies] = useState(false);
  // const [movies, setMovies] = useState([]);
  // const [getAllMoviesCalled, setGetAllMoviesCalled] = useState(
  //   JSON.parse(localStorage.getItem("getAllMoviesCalled")) || false
  // );

  const getAllMovies = () => {
    setIsLoading(true);

    moviesApi
      .getMovies()
      .then((moviesData) => {
        updateMovies(moviesData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Ошибка при получении данных карточек:", error);
        setErrorMovies(error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

useEffect(() => {
  if (!getAllMoviesCalled && searchPerformed) {
    setGetAllMoviesCalled(true);
    getAllMovies();
  }
  //  else if (getAllMoviesCalled && searchPerformed && movies.length > 0) {
  //   const existingMovies = [...movies];
  //   updateMovies(existingMovies);
  // }
}, [getAllMoviesCalled, searchPerformed, 
  // movies
]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchPerformed(true);
  };

  const handleCheckboxChange = (isChecked) => {
    setShortMovies(isChecked);
  };

  return (
    <section className="movies">
      <SearchForm onSearch={handleSearch} onCheckboxChange={handleCheckboxChange} />
      {isLoading && <Preloader />}
      {!isLoading && errorMovies && searchPerformed && (
        <p className="movies__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер
          недоступен. Подождите немного и попробуйте ещё раз.
        </p>
      )}
      {searchPerformed && !errorMovies && (
        <MoviesCardList
        movies={movies}
          mergedMovies={mergedMovies}
          searchQuery={searchQuery}
          shortMovies={shortMovies}
          handleSaveMovie={handleSaveMovie}
          isSaved={isSaved}
          handleRemoveMovie={handleRemoveMovie}
          handleRemoveFromMoviePage={handleRemoveFromMoviePage}
        />
      )}
    </section>
  );
}

export default Movies;
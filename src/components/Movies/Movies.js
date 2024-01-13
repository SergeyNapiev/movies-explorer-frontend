import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import moviesApi from "../../utils/MoviesApi.js";
import { getMovies, deleteMovie, addMovie } from "../../utils/MainApi.js";
import { useMoviesContext } from "../../contexts/MoviesContext.js";

function Movies({ mergedMovies, handleSaveMovie, isSaved, handleRemoveMovie, handleRemoveFromMoviePage }) {
  const {  movies, savedMovies, getAllMoviesCalled, updateSavedMovies, updateMovies, setGetAllMoviesCalled  } = useMoviesContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [shortMovies, setShortMovies] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMovies, setErrorMovies] = useState(false);
  // const [movies, setMovies] = useState([]);
  // const [getAllMoviesCalled, setGetAllMoviesCalled] = useState(
  //   JSON.parse(localStorage.getItem("getAllMoviesCalled")) || false
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
  
        // Запрос фильмов с внешнего API
        const moviesData = await moviesApi.getMovies();
  
        // Запрос сохраненных фильмов из MainApi
        const token = localStorage.getItem("token");
        const savedMoviesData = token ? await getMovies(token) : [];
  
        // Обработка данных и обновление состояния
        const updatedMovies = moviesData.map((movie) => {
          const foundSavedMovie = savedMoviesData.find((savedMovie) => savedMovie.nameRU === movie.nameRU);
          return {
            ...movie,
            isSaved: !!foundSavedMovie,
          };
        });
  
        updateMovies(updatedMovies);
        updateSavedMovies(savedMoviesData);
  
        setIsLoading(false);
      } catch (error) {
        console.log("Ошибка при получении данных:", error);
        setErrorMovies(error);
        setIsLoading(false);
      }
    };
  
    if (!getAllMoviesCalled && searchPerformed) {
      setGetAllMoviesCalled(true);
      fetchData();
    }
  }, [getAllMoviesCalled, searchPerformed]);

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
        isLoading={isLoading}
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
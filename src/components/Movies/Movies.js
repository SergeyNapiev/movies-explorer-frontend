import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import moviesApi from "../../utils/MoviesApi.js";
import { getMovies, deleteMovie, addMovie } from "../../utils/MainApi.js";
import { useMoviesContext } from "../../contexts/MoviesContext.js";

function Movies({
  handleSaveMovie,
  isSaved,
  handleRemoveMovie,
  handleRemoveFromMoviePage,
}) {
  const {
    movies,
    savedMovies,
    getAllMoviesCalled,
    updateSavedMovies,
    updateMovies,
    setGetAllMoviesCalled,
  } = useMoviesContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [shortMovies, setShortMovies] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMovies, setErrorMovies] = useState(false);

  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const lastSearchQuery = localStorage.getItem("lastSearchQuery") || "";
    setSearchQuery(lastSearchQuery);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const moviesData = await moviesApi.getMovies();
        const token = localStorage.getItem("token");
        const savedMoviesData = token ? await getMovies(token) : [];

        const updatedMovies = moviesData.map((movie) => {
          const foundSavedMovie = savedMoviesData.find(
            (savedMovie) => savedMovie.nameRU === movie.nameRU
          );
          return {
            ...movie,
            isSaved: !!foundSavedMovie,
          };
        });

        updateMovies(updatedMovies);
        updateSavedMovies(savedMoviesData);

        setIsLoading(false);

        // Update filteredMovies after data is fetched
        handleFiltering(updatedMovies);
      } catch (error) {
        console.log("Ошибка при получении данных:", error);
        setErrorMovies(error);
        setIsLoading(false);
      }
    };

    const handleFiltering = (moviesToFilter) => {
      const filtered = moviesToFilter.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const finalFiltered = shortMovies
        ? filtered.filter((movie) => movie.duration <= 40)
        : filtered;

      setFilteredMovies(finalFiltered);
    };

    if (!getAllMoviesCalled && searchPerformed) {
      setGetAllMoviesCalled(true);
      fetchData();
      localStorage.setItem("lastSearchQuery", searchQuery);
    } else if (searchPerformed) {
      handleFiltering(movies);
    }
  }, [getAllMoviesCalled, searchPerformed, searchQuery, shortMovies, movies]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchPerformed(true);
  };

  const handleCheckboxChange = (isChecked) => {
    setShortMovies(isChecked);
  };

  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSearch}
        onCheckboxChange={handleCheckboxChange}
      />
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
          movies={filteredMovies}
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
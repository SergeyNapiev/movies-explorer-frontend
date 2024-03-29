import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import moviesApi from "../../utils/MoviesApi.js";
import { getMovies } from "../../utils/MainApi.js";
import { useMoviesContext } from "../../contexts/MoviesContext.js";

function Movies({
  handleSaveMovie,
  isSaved,
  handleRemoveMovie,
  handleRemoveFromMoviePage,
}) {
  const {

    savedMovies,

    updateSavedMovies,
    updateMovies,

  } = useMoviesContext();
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("lastSearchQuery") || ""
  );
  const [shortMovies, setShortMovies] = useState(
    JSON.parse(localStorage.getItem("isShortMovies")) || false
  );
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMovies, setErrorMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const fetchSavedFilmsData = async () => {

    try {
      const storedMovies = JSON.parse(localStorage.getItem("updatedMovies")) || [];
      const token = localStorage.getItem("token");
      const savedMoviesData = token ? await getMovies(token) : [];
      const updatedMovies = storedMovies.map((movie) => {
        const foundSavedMovie = savedMoviesData.find(
          (savedMovie) => savedMovie.nameRU === movie.nameRU
        );
        return {
          ...movie,
          isSaved: !!foundSavedMovie,
        };
      });
      localStorage.setItem("updatedMovies", JSON.stringify(updatedMovies));
      updateSavedMovies(savedMoviesData);
      handleFiltering(updatedMovies);
    } catch (error) {
      console.log("Ошибка при получении данных:", error);
      setErrorMovies(error);
      setIsLoading(false);
    }
  };

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
      localStorage.setItem("updatedMovies", JSON.stringify(updatedMovies));
      updateMovies(updatedMovies);
      updateSavedMovies(savedMoviesData);

      setIsLoading(false);

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

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem("lastSearchQuery");
    const savedShortMovies = JSON.parse(localStorage.getItem("isShortMovies"));
    if (savedSearchQuery && savedShortMovies !== null) {
      setSearchQuery(savedSearchQuery);
      setShortMovies(savedShortMovies);
      setSearchPerformed(true);
    }
    if (localStorage.getItem("updatedMovies") !== null) {
      fetchSavedFilmsData();
    }
    if ((localStorage.getItem("updatedMovies") === null) && (localStorage.getItem("lastSearchQuery") !== "")) {
      fetchData();
      localStorage.setItem("lastSearchQuery", searchQuery);
      localStorage.setItem("isShortMovies", JSON.stringify(shortMovies));
    }

  }, [searchQuery, shortMovies]);


  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchPerformed(true);
  };

  const handleCheckboxChange = (isChecked) => {
    setShortMovies(isChecked);
    handleSearch(searchQuery);
  };

  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSearch}
        onCheckboxChange={handleCheckboxChange}
        searchQuery={searchQuery}
      />
      {searchPerformed && isLoading && <Preloader />}
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
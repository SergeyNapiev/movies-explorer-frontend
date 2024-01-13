import React, { useState, useEffect } from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import { getMovies } from "../../utils/MainApi.js";
import { useMoviesContext } from "../../contexts/MoviesContext.js";

function SavedMovies({handleRemoveMovie }) {
  const { movies, savedMovies, getAllMoviesCalled, updateSavedMovies, updateMovies, setGetAllMoviesCalled } = useMoviesContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [shortMovies, setShortMovies] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCheckboxChange = (isChecked) => {
    setShortMovies(isChecked);
  };

  useEffect(() => {
    getSavedMovies();
  }, []);

    const getSavedMovies = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      getMovies(token)
        .then((moviesData) => {
          updateSavedMovies(moviesData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Ошибка при получении сохраненных фильмов:", error);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <section className="movies">
      <SearchForm onSearch={handleSearch} onCheckboxChange={handleCheckboxChange} />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          savedMovies={savedMovies}
          searchQuery={searchQuery}
          shortMovies={shortMovies}
          handleRemoveMovie={handleRemoveMovie}
        />
      )}
    </section>
  );
}

export default SavedMovies;
import React, { useState, useEffect } from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import moviesApi from "../../utils/MoviesApi.js";
import { getMovies, deleteMovie, addMovie } from "../../utils/MainApi.js";

function SavedMovies({handleRemoveMovie }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [shortMovies, setShortMovies] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
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
          setSavedMovies(moviesData);
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
import React, { useState, useEffect } from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import { getMovies } from "../../utils/MainApi.js";
import { useMoviesContext } from "../../contexts/MoviesContext.js";

function SavedMovies({ handleRemoveMovie }) {
  const {
    savedMovies,
    getAllMoviesCalled,
    updateSavedMovies,
    setGetAllMoviesCalled,
  } = useMoviesContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [shortMovies, setShortMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCheckboxChange = (isChecked) => {
    setShortMovies(isChecked);
  };

  useEffect(() => {
    if (!getAllMoviesCalled) {
      getSavedMovies();
    } else {
      filterMovies();
    }
  }, [savedMovies, getAllMoviesCalled, searchQuery, shortMovies]);

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
          setGetAllMoviesCalled(true);
        });
    }
  };

  const filterMovies = () => {
    let filtered = savedMovies;

    if (searchQuery) {
      const queryLowerCase = searchQuery.toLowerCase();
      filtered = savedMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(queryLowerCase) ||
          movie.nameEN.toLowerCase().includes(queryLowerCase)
      );
    }

    if (shortMovies) {
      filtered = filtered.filter((movie) => movie.duration <= 40);
    }

    setFilteredMovies(filtered);
  };
  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSearch}
        onCheckboxChange={handleCheckboxChange}
        searchQuery={searchQuery}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          savedMovies={filteredMovies}
          searchQuery={searchQuery}
          shortMovies={shortMovies}
          handleRemoveMovie={handleRemoveMovie}
        />
      )}
    </section>
  );
}

export default SavedMovies;
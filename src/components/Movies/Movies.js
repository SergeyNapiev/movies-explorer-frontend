import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function Movies({ mergedMovies, errorMovies, isLoading, handleSaveMovie, isSaved, handleRemoveMovie, handleRemoveFromMoviePage }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [shortMovies, setShortMovies] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

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
      {errorMovies && searchPerformed && <p className="movies__not-found">Ничего не найдено</p>}
      {!isLoading && errorMovies && searchPerformed && (
        <p className="movies__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер
          недоступен. Подождите немного и попробуйте ещё раз.
        </p>
      )}
      {searchPerformed && !errorMovies && (
        <MoviesCardList
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
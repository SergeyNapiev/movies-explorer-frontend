import React, { useState, useEffect } from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function SavedMovies({ savedMovies, isLoading, handleRemoveMovie }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [shortMovies, setShortMovies] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCheckboxChange = (isChecked) => {
    setShortMovies(isChecked);
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
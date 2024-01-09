import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ onSearch, onCheckboxChange }) {
  const location = useLocation();
  const isMoviesPage = location.pathname === "/movies";

  const [searchValue, setSearchValue] = useState("");
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const pageKey = isMoviesPage ? "movies" : "saved-movies";
    const storedSearchQuery = localStorage.getItem(`${pageKey}-searchQuery`);
    const storedIsShortMovies = localStorage.getItem(`${pageKey}-isShortMovies`);

    if (storedSearchQuery && isMoviesPage) {
      setSearchValue(storedSearchQuery);
      onSearch(storedSearchQuery);
    }

    if (storedIsShortMovies) {
      setIsShortMovies(storedIsShortMovies === "true");
      onCheckboxChange(storedIsShortMovies === "true");

      if (isMoviesPage) {
        localStorage.setItem("movies-isShortMovies", storedIsShortMovies);
      }
    }
  }, [onSearch, onCheckboxChange, isMoviesPage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      setSearchError("Нужно ввести ключевое слово");
      return;
    }

    setSearchError("");
    onSearch(searchValue);

    const pageKey = isMoviesPage ? "movies" : "saved-movies";
    localStorage.setItem(`${pageKey}-searchQuery`, searchValue);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCheckboxChange = (isChecked) => {
    setIsShortMovies(isChecked);
    onCheckboxChange(isChecked);

    const pageKey = isMoviesPage ? "movies" : "saved-movies";
    localStorage.setItem(`${pageKey}-isShortMovies`, isChecked.toString());
  };

  return (
    <section className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
        <input
          type="text"
          className="search__input"
          placeholder="Фильм"
          required
          value={searchValue}
          onChange={handleChange}
        />
        {searchError && <span className="search__error">{searchError}</span>}
        <button type="submit" className="search__button" aria-label="Найти">
          Найти
        </button>
        <FilterCheckbox
          onCheckboxChange={handleCheckboxChange}
          isShortMovies={isShortMovies}
          disabled={!isMoviesPage} // Disable the checkbox on the /saved-movies route
        />
      </form>
    </section>
  );
}

export default SearchForm;
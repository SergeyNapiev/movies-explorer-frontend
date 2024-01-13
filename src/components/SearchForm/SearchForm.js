import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ onSearch, onCheckboxChange }) {
  const location = useLocation();
  const isMoviesPage = location.pathname === "/movies";

  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("lastSearchQuery") || ""
  );
  const [isShortMovies, setIsShortMovies] = useState(
    JSON.parse(localStorage.getItem("isShortMovies")) || false
  );
  const [searchError, setSearchError] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setSearchError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue.trim() === "") {
      setSearchError("Нужно ввести ключевое слово");
      return;
    }

    onSearch(searchValue);
  };

  const handleCheckboxChange = (isChecked) => {
    setIsShortMovies(isChecked);
    onCheckboxChange(isChecked);
  };

  useEffect(() => {
    localStorage.setItem("lastSearchQuery", searchValue);
  }, [searchValue]);

  useEffect(() => {
    localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies));
  }, [isShortMovies]);

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
          disabled={!isMoviesPage}
        />
      </form>
    </section>
  );
}

export default SearchForm;
import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ onSearch, onCheckboxChange, pageKey }) {
  const [searchValue, setSearchValue] = useState("");
  const [isShortMovies, setIsShortMovies] = useState(false);

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem(`${pageKey}-searchQuery`);
    const storedIsShortMovies = localStorage.getItem(`${pageKey}-isShortMovies`);

    if (storedSearchQuery) {
      setSearchValue(storedSearchQuery);
      onSearch(storedSearchQuery);
    }

    if (storedIsShortMovies) {
      setIsShortMovies(storedIsShortMovies === "true");
      onCheckboxChange(storedIsShortMovies === "true");
    }
  }, [onSearch, onCheckboxChange, pageKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
    localStorage.setItem(`${pageKey}-searchQuery`, searchValue);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCheckboxChange = (isChecked) => {
    setIsShortMovies(isChecked);
    onCheckboxChange(isChecked);
    localStorage.setItem(`${pageKey}-isShortMovies`, isChecked.toString());
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search__input"
          placeholder="Фильм"
          required
          value={searchValue}
          onChange={handleChange}
        />
        <button type="submit" className="search__button" aria-label="Найти">
          Найти
        </button>
        <FilterCheckbox onCheckboxChange={handleCheckboxChange} isShortMovies={isShortMovies} />
      </form>
    </section>
  );
}

export default SearchForm;
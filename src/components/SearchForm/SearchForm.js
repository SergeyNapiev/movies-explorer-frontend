import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ onSearch, onCheckboxChange }) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem("searchQuery");

    if (storedSearchQuery) {
      setSearchValue(storedSearchQuery);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
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
        <FilterCheckbox onCheckboxChange={onCheckboxChange} />
      </form>
    </section>
  );
}

export default SearchForm;
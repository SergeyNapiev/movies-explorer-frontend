import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ onCheckboxChange, isShortMovies }) {
  const handleCheckboxChange = (e) => {
    onCheckboxChange(e.target.checked);
  };

  return (
    <section className="filter">
      <label className="filter__checkbox-container">
        Короткометражки
        <input className="filter__checkbox" type="checkbox" onChange={handleCheckboxChange} checked={isShortMovies} />
        <span className="filter__checkmark"></span>
      </label>
    </section>
  );
}

export default FilterCheckbox;
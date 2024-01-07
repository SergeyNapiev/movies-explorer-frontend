import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ onCheckboxChange }) {
  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (e) => {
    // Вызываем функцию изменения состояния чекбокса и передаем новое значение
    onCheckboxChange(e.target.checked);
  };

  return (
    <section className="filter">
      <label className="filter__checkbox-container">
        Короткометражки
        <input className="filter__checkbox" type="checkbox" onChange={handleCheckboxChange} />
        <span className="filter__checkmark"></span>
      </label>
    </section>
  );
}

export default FilterCheckbox;
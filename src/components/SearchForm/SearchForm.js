import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <div className="search__icon"></div>
                <input type="text" className="search__input" placeholder="Фильм" required/>
                <button type="submit" className="search__button" aria-label="Найти">Найти</button>
                <FilterCheckbox />
            </form>
        </section>
    )
}

export default SearchForm;
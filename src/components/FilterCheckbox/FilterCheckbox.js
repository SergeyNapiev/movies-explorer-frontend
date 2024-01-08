import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
    return (
        <section className="filter">
            <label className="filter__checkbox-container">Короткометражки
                <input className="filter__checkbox" type="checkbox"/>
                <span className="filter__checkmark"></span>
            </label>
        </section>
    )
}

export default FilterCheckbox;
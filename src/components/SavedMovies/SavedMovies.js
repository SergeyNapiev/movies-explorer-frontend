import React from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";


function SavedMovies({ savedMovies, isLoading, handleRemoveMovie, removedMovie }) {


    return (
        <section className="movies">
            <SearchForm />
            {isLoading && <Preloader />}
            {!isLoading && <MoviesCardList
                savedMovies={savedMovies}
                handleRemoveMovie={handleRemoveMovie}
            />}
        </section>
    )
}

export default SavedMovies;
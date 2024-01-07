import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function Movies({ mergedMovies, errorMovies, isLoading, handleSaveMovie, isSaved, handleRemoveMovie, handleRemoveFromMoviePage }) {

    return (
        <section className="movies">
            <SearchForm  />
            {isLoading && <Preloader />}

            {errorMovies && <p className="movies__not-found">Ничего не найдено</p> }


            {!isLoading && errorMovies && (
                <p className="movies__error">
                    Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер
                    недоступен. Подождите немного и попробуйте ещё раз.
                </p>
            )}

                <MoviesCardList
                    mergedMovies={mergedMovies}
                    handleSaveMovie={handleSaveMovie}
                    isSaved={isSaved}
                    handleRemoveMovie={handleRemoveMovie}
                    handleRemoveFromMoviePage={handleRemoveFromMoviePage}
                />

        </section>
    );
}

export default Movies;
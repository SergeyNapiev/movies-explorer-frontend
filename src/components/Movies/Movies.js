import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";


function Movies() {

    const [isLoading, setIsLoading] = React.useState(false);


    return (
        <section className="movies">
            <SearchForm />
            {isLoading && <Preloader />}
            {!isLoading && <MoviesCardList />}
        </section>
    )
}

export default Movies;
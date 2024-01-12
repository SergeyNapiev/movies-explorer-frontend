import React, { createContext, useContext, useState } from 'react';

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [getAllMoviesCalled, setGetAllMoviesCalled] = useState(
    JSON.parse(localStorage.getItem('getAllMoviesCalled')) || false
  );

  const updateMovies = (newMovies) => {
    setMovies(newMovies);
  };

  const updateSavedMovies = (newSavedMovies) => { // Функция для обновления сохраненных фильмов
    setSavedMovies(newSavedMovies);
  };

  return (
    <MoviesContext.Provider value={{ movies, savedMovies, getAllMoviesCalled, updateSavedMovies, updateMovies, setGetAllMoviesCalled }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesContext = () => {
  return useContext(MoviesContext);
};
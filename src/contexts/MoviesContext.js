import React, { createContext, useContext, useState } from 'react';

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [getAllMoviesCalled, setGetAllMoviesCalled] = useState(
    JSON.parse(localStorage.getItem('getAllMoviesCalled')) || false
  );

  const updateMovies = (newMovies) => {
    setMovies(newMovies);
  };

  return (
    <MoviesContext.Provider value={{ movies, getAllMoviesCalled, updateMovies, setGetAllMoviesCalled }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesContext = () => {
  return useContext(MoviesContext);
};
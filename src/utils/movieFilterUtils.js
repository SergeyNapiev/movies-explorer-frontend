export const filterMovies = (movies, searchQuery, shortMovies) => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
  
    return movies.filter((movie) => {
      const hasMatchingTitle =
        movie.nameRU.toLowerCase().includes(normalizedSearchQuery) ||
        movie.nameEN.toLowerCase().includes(normalizedSearchQuery);
  
      const meetsDurationCriteria = !shortMovies || movie.duration <= 40;
  
      return hasMatchingTitle && meetsDurationCriteria;
    });
  };
  
  export const saveSearchResultsToLocalStorage = (searchQuery, shortMovies, movies) => {
    const searchResults = {
      searchQuery,
      shortMovies,
      movies,
    };
  
    localStorage.setItem('searchResults', JSON.stringify(searchResults));
  };
  
  export const getSearchResultsFromLocalStorage = () => {
    const savedSearchResults = localStorage.getItem('searchResults');
    return savedSearchResults ? JSON.parse(savedSearchResults) : null;
  };
  
  export const clearLocalStorageSearchResults = () => {
    localStorage.removeItem('searchResults');
  };
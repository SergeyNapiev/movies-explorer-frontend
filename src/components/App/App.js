import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Main from "../Main/Main.js";
import NotFound from "../NotFound/NotFound.js";
import Footer from "../Footer/Footer.js";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import * as MainApi from "../../utils/MainApi.js";
import moviesApi from "../../utils/MoviesApi.js";
import { getMovies, deleteMovie, addMovie } from "../../utils/MainApi.js";
import { MoviesProvider } from "../../contexts/MoviesContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [successUpdate, isSuccessUpdate] = useState(false);
  const location = useLocation();
  // const [errorMovies, setErrorMovies] = useState(null);
  const [isWarning, setIsWarning] = useState(false);
  const [isWarningLogin, setIsWarningLogin] = useState(false);
  const hideHeaderOnPages = ['/signup', '/signin', '/404'];
  const hideFooterOnPages = ['/profile', '/signup', '/signin', '/404'];

  const shouldShowHeader = !hideHeaderOnPages.includes(location.pathname);
  const shouldShowFooter = !hideFooterOnPages.includes(location.pathname);

  const [isSignedUp, setIsSignedUp] = useState(false);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.clear();
    setLoggedIn(false);
    navigate("/", { replace: true });
  }

  const handleTokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      MainApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setName(res.name);
            setEmail(res.email);
            navigate(location.pathname, { replace: true });
          }
        })
        .catch((error) => {
          setLoggedIn(false);
          console.log(error);
          console.error("Ошибка проверки токена:", error);
        });
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const [isUpdatinUser, setIsUpdatingUser] = useState(false);

  function handleUpdateUser({ name, email }) {
    setIsUpdatingUser(true);
    const token = localStorage.getItem('token');
    MainApi.setUserInfo({ name, email }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        isSuccessUpdate(true);
        setIsWarning(false);
        setIsUpdatingUser(false);
      })
      .catch((error) => {
        console.log("Ошибка при обновлении данных пользователя:", error);
        isSuccessUpdate(false);
        setIsWarning(true);
        setIsUpdatingUser(false);
      });
  }

  const [isSigningUp, setIsSigningUp] = useState(false);
  
  function signUp({ password, email, name }) {
    setIsSigningUp(true);
    MainApi.register(password, email, name)
      .then((res) => {
        setIsSigningUp(false);
        setIsSignedUp(true);
        setTimeout(() => {
          setIsSignedUp(false);
          signIn({ password, email });
        }, 1000); // 1 секунда
        
      })
      .catch((error) => {
        setIsSigningUp(false);
        setIsWarning(true);
        console.error(`Ошибка при регистрации ${error}`);
      })
  }

  const [isSigningIn, setIsSigningIn] = useState(false);

  function signIn({ password, email }) {
    setIsSigningIn(true);
    MainApi.authorize(password, email)
      .then((res) => {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        setEmail(email);
        setIsSigningIn(false);
      })
      .catch((error) => {
        setIsWarningLogin(true);
        setIsSigningIn(false);
        console.error(`Ошибка при авторизации ${error}`);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo(localStorage.token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => {
          setIsWarning(true)
          console.log("Ошибка при получении данных пользователя:", error);
        });
    }
  }, [loggedIn]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [movies, setMovies] = useState([]);
  // const [savedMovies, setSavedMovies] = useState([]);

  // // const [addedMovies, setAddedMovies] = useState([]);
  // const [removedMovies, setRemovedMovies] = useState([]);

  // const getSavedMovies = () => {
  //   setIsLoading(true);
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     getMovies(token)
  //       .then((moviesData) => {
  //         setSavedMovies(moviesData);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log("Ошибка при получении сохраненных фильмов:", error);
  //         setIsLoading(false);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   getSavedMovies();
  // }, []);

  // useEffect(() => {
  //   getAllMovies();
  // }, []);

  // const getAllMovies = () => {
  //   setIsLoading(true);

  //   moviesApi
  //     .getMovies()
  //     .then((moviesData) => {
  //       setMovies(moviesData);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log("Ошибка при получении данных карточек:", error);
  //       setErrorMovies(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  // const handleSaveMovie = React.useCallback((data) => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     addMovie(data, token)
  //       .then((res) => {
  //         setSavedMovies([res, ...savedMovies]);
  //         // setAddedMovies([res, ...addedMovies]);
  //       })
  //       .catch((error) => {
  //         console.log("Ошибка при сохранении фильма:", error);
  //       });
  //   }
  // }, [savedMovies]);
  
  // const handleRemoveFromMoviePage = React.useCallback((data) => {
  //   const movieName = data.nameRU;
  //   const foundMovie = savedMovies.find(savedMovie => savedMovie.nameRU === movieName);
  //   const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie.nameRU !== movieName);
  //   setSavedMovies(updatedSavedMovies);
  //   setRemovedMovies([foundMovie, ...removedMovies]);
  
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     deleteMovie(foundMovie._id, token)
  //       .then(() => {
  //       })
  //       .catch((error) => {
  //         console.error(`Ошибка удаления фильма: ${error}`);
  //       });
  //   }
  // }, [savedMovies, removedMovies]);

  // function handleRemoveMovie(deleteId) {
  //   const token = localStorage.getItem("token");
  //   deleteMovie(deleteId, token)
  //     .then(() => {
  //       setSavedMovies(savedMovies.filter(movie => !removedMovies.includes(movie) && movie._id !== deleteId));
  //     })
  //     .catch((error) => console.error(`Ошибка удаления ${error}`));
  // }

  // const mergeMoviesWithSavedStatus = (movies, savedMovies) => {
  //   return movies.map(movie => {
  //     const foundSavedMovie = savedMovies.find(savedMovie => savedMovie.nameRU === movie.nameRU);
  //     return {
  //       ...movie,
  //       saved: !!foundSavedMovie,
  //     };
  //   });
  // };

  // const [mergedMovies, setMergedMovies] = useState([]);

  // useEffect(() => {
  //   const updatedMovies = mergeMoviesWithSavedStatus(movies, savedMovies);
  //   setMergedMovies(updatedMovies);
  // }, [movies, savedMovies,  removedMovies]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MoviesProvider>
      <div className="App">
        <div className="body">
          <div className="page">
            {shouldShowHeader && <Header loggedIn={loggedIn} />}
            <Routes>
              <Route path="/movies" element={
                <ProtectedRouteElement
                  element={(props) => (<Movies
                    // handleSaveMovie={handleSaveMovie}
                    // errorMovies={errorMovies}
                    // isLoading={isLoading}
                    // mergedMovies={mergedMovies}
                    // handleRemoveMovie={handleRemoveMovie}
                    // handleRemoveFromMoviePage={handleRemoveFromMoviePage}
                  />)}
                  loggedIn={loggedIn}
                />} />
              <Route path="/saved-movies" element={
                <ProtectedRouteElement
                  element={(props) => (<SavedMovies
                    // isLoading={isLoading}
                    // savedMovies={savedMovies}
                    // handleRemoveMovie={handleRemoveMovie}
                  />)}
                  loggedIn={loggedIn}
                />} />
              <Route path="/profile" element={
                <ProtectedRouteElement
                  element={(props) => (<Profile
                    signOut={signOut}
                    successUpdate={successUpdate}
                    onUpdateUser={handleUpdateUser}
                    isWarning={isWarning}
                    isUpdatinUser={isUpdatinUser}
                    {...props}
                  />)}
                  loggedIn={loggedIn}
                />} />
              <Route
                path="/signup"
                element={
                  loggedIn ? (
                    <Navigate to="/movies" replace />
                  ) : (
                    <Register signUp={signUp} isWarning={isWarning} isSignedUp={isSignedUp} isSigningUp={isSigningUp} />
                  )
                }
              />
              <Route
                path="/signin"
                element={
                  loggedIn ? (
                    <Navigate to="/movies" replace />
                  ) : (
                    <Login signIn={signIn} isWarningLogin={isWarningLogin} isSigningIn={isSigningIn}/>
                  )
                }
              />
              <Route path="/" element={<Main />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/*" element={<Navigate to="/404" />} />
            </Routes>
            {shouldShowFooter && <Footer />}
          </div>
        </div>
      </div>
      </MoviesProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
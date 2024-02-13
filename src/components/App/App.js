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
import { MoviesProvider } from "../../contexts/MoviesContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [successUpdate, isSuccessUpdate] = useState(false);
  const location = useLocation();
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
  
  const logNavigationHistory = () => {
    const history = JSON.parse(localStorage.getItem("navigationHistory")) || [];
    const updatedHistory = [...history, location.pathname];
    localStorage.setItem("navigationHistory", JSON.stringify(updatedHistory));
  };

  // Запуск функции при каждом изменении пути
  useEffect(() => {
    logNavigationHistory();
  }, [location.pathname]);

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
                    element={(props) => (<Movies />)}
                    loggedIn={loggedIn}
                  />} />
                <Route path="/saved-movies" element={
                  <ProtectedRouteElement
                    element={(props) => (<SavedMovies />)}
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
                      <Login signIn={signIn} isWarningLogin={isWarningLogin} isSigningIn={isSigningIn} />
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
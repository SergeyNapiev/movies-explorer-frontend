import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import React from "react";
import Header from "../Header/Header.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Main from "../Main/Main.js";
import NotFound from "../NotFound/NotFound.js";
import Footer from "../Footer/Footer.js";

function App() {
    const location = useLocation();

    const hideHeaderOnPages = ['/signup', '/signin', '/404'];
    const hideFooterOnPages = ['/profile', '/signup', '/signin', '/404']

    const shouldShowHeader = !hideHeaderOnPages.includes(location.pathname);
    const shouldShowFooter = !hideFooterOnPages.includes(location.pathname);
    return (
        <div className="App">
            <div className="body">
                <div className="page">
                    {shouldShowHeader && <Header />}
                    <Routes>
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/saved-movies" element={<SavedMovies />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/signin" element={<Login />} />
                        <Route path="/" element={<Main />} />
                        <Route path="404" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                    {shouldShowFooter && <Footer />}
                </div>
            </div>    
        </div>
    );
}

export default App;

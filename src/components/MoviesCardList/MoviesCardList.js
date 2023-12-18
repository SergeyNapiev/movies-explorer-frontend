import React from "react";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import { initialCards } from "../../utils/constants.js";
import { savedCards } from "../../utils/constants.js";

function MoviesCardList() {
    const location = useLocation();
    const isSavedMoviesPage = location.pathname === "/saved-movies";
  
    // Используем состояние для хранения массива карточек
    const [cards, setCards] = React.useState(isSavedMoviesPage ? savedCards : initialCards);
  
    const handleDelete = (cardIndex) => {
      const updatedCards = [...cards];
      updatedCards.splice(cardIndex, 1);
      setCards(updatedCards);
    };
  
    return (
      <section className="cards">
        <div className="cards__container">
          {cards.map((card, index) => (
            <MoviesCard
              key={index}
              name={card.name}
              link={card.link}
              duration={card.duration}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
        <button className="cards__load">Ещё</button>
      </section>
    );
  }
  
  export default MoviesCardList;
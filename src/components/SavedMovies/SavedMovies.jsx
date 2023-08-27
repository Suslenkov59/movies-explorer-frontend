import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, onDelete }) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [, savedMovies, searchQuery]);

  const filterMovies = (query) => {
    let filtered = [];
    if (query.isShortFilmChecked) {
      filtered = savedMovies.filter((m) => {
        return (
          m.duration <= 40 &&
          m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase())
        );
      });
      setFilteredMovies(filtered);
    } else if (!query.isShortFilmChecked) {
      filtered = savedMovies.filter((m) => {
        return m.nameRU
          .toLowerCase()
          .trim()
          .includes(query.searchText.toLowerCase());
      });
      setFilteredMovies(filtered);
    }
  };

  const handleResetInput = () => {
    setFilteredMovies([]);
    setSearchQuery({});
  };

  return (
    <section className="saved-movies">
      <SearchForm
        onFilter={filterMovies}
        searchQuery={searchQuery}
        onResetInput={handleResetInput}
      />
      {filteredMovies.length ? (
        <MoviesCardList movies={filteredMovies} onDelete={onDelete} />
      ) : (
        filteredMovies && (
          <p className="movies__not-found">
            По вашему запросу ничего не найдено
          </p>
        )
      )}
    </section>
  );
}

export default SavedMovies;

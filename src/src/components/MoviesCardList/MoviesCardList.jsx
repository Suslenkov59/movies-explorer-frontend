import { useState, useMemo, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import useResize from "../../hooks/useResize.js";

export default function MoviesCardList({
  movies,
  savedMovies,
  onLike,
  onDelete,
}) {
  let size = useResize();
  const location = useLocation();
  const [moviesToAdd, setMoviesToAdd] = useState(0);

  useEffect(() => {
    setMoviesToAdd(0);
  }, [movies]);

  const moviesToRender = useMemo(() => {
    const countToRender = size.width < 768 ? 5 : size.width < 1280 ? 8 : 12;
    if (location.pathname === "/movies") {
      return movies.slice(0, countToRender + moviesToAdd);
    } else {
      return movies;
    }
  }, [movies, moviesToAdd, size]);

  return (
    <>
      <ul className="movies-cardlist">
        {moviesToRender.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              savedMovies={savedMovies}
              onLike={onLike}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
      {location.pathname === "/movies" &&
        movies.length > moviesToRender.length && (
          <button
            onClick={() => {
              setMoviesToAdd((prev) => prev + (size.width >= 1280 ? 3 : 2));
            }}
            className="movies__more-btn"
          >
            Еще
          </button>
        )}
    </>
  );
}

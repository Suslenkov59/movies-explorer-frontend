import React from 'react';
import {useLocation} from 'react-router-dom';
import './MoviesCardList.css';

import useResize from '../../hooks/useResize.js';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({movies}) => {
    let size = useResize();
    let location = useLocation();

    movies =
        location.pathname === '/saved-movies'
            ? movies.filter((m) => m.isLiked)
            : movies;
    return (
        <ul className="movies-cardlist">
            {size.width <= 450
                ? movies?.slice(0, 5).map((movie) => {
                    return <MoviesCard key={movie.movieId} movie={movie}/>;
                })
                : size.width <= 850
                    ? movies?.slice(0, 8).map((movie) => {
                        return <MoviesCard key={movie.movieId} movie={movie}/>;
                    })
                    : movies?.map((movie) => {
                        return <MoviesCard key={movie.movieId} movie={movie}/>;
                    })}
        </ul>
    );
};

export default MoviesCardList;

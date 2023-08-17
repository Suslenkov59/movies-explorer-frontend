import './MoviesCard.css';
import {getHoursAndMinutes} from '../../utils/convertMinutes.js';
import {useLocation} from 'react-router-dom';
import {BEATFILM_URL} from '../../utils/constants';

export default function MoviesCard({movie, savedMovies, onLike, onDelete}) {
    let location = useLocation();

    const imageUrl = movie.image.url
        ? `${BEATFILM_URL}${movie.image.url}`
        : movie.image;

    const savedMovie = savedMovies
        ? savedMovies.find((item) => item.movieId === movie.id.toString())
        : '';

    const isLikeButton = location.pathname === '/movies';
    const isLiked = savedMovies
        ? savedMovies.some((i) => i.movieId === movie.id.toString())
        : false;

    const isDeleteButton = location.pathname === '/saved-movies';

    return (
        <li className="card">
            <a
                className="card__image-container"
                href={movie.trailerLink}
                target="_blank"
                rel="noreferrer"
            >
                <img className="card__image" src={imageUrl} alt={movie.nameRU}/>
            </a>

            <div className="card__details">
                <p className="card__name">{movie.nameRU}</p>
                <p className="card__duration">
                    {getHoursAndMinutes(movie.duration)}
                </p>

                {isLikeButton && (
                    <button
                        onClick={() => onLike(movie, isLiked, savedMovie?._id)}
                        className={`card__like-btn ${
                            isLiked ? ' card__like-btn_liked' : ''
                        }`}
                    ></button>
                )}

                {isDeleteButton && (
                    <button
                        onClick={() => onDelete(movie._id)}
                        className={`card__delete-btn`}
                    ></button>
                )}
            </div>
        </li>
    );
}

import React, {useState, useEffect} from 'react';

import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function Movies ({movies, savedMovies, onLike, apiErrors}) {
    const searchedMovies = localStorage.getItem('searchedMovies');
    const queries = localStorage.getItem('searchQueryMovies');
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchedMovies) {
            setFilteredMovies(JSON.parse(searchedMovies));
        }
    }, [searchedMovies]);

    useEffect(() => {
        if (queries) {
            setSearchQuery(JSON.parse(queries));
        }
    }, [queries]);

    const filterMovies = (query) => {
        if (!filteredMovies.length) {
            setIsLoading(true);
        }
        setTimeout(
            () => {
                let filtered = [];
                localStorage.setItem('searchQueryMovies', JSON.stringify(query));

                if (query.isShortFilmChecked) {
                    filtered = movies.filter((m) => {
                        return (
                            m.duration <= 40 &&
                            m.nameRU
                                .toLowerCase()
                                .trim()
                                .includes(query.searchText.toLowerCase())
                        );
                    });

                    setFilteredMovies(filtered);
                    localStorage.setItem('searchedMovies', JSON.stringify(filtered));
                } else if (!query.isShortFilmChecked) {
                    filtered = movies.filter((m) => {
                        return m.nameRU
                            .toLowerCase()
                            .trim()
                            .includes(query.searchText.toLowerCase());
                    });

                    setFilteredMovies(filtered);
                    localStorage.setItem('searchedMovies', JSON.stringify(filtered));
                }
                setIsLoading(false);
            },
            filteredMovies.length ? 0 : 300
        );
    };

    const handleResetInput = () => {
        setFilteredMovies([]);
        setSearchQuery({});
        localStorage.removeItem('searchedMovies');
        localStorage.removeItem('searchQueryMovies');
    };

    return (
        <section className="movies">
            <SearchForm
                onFilter={filterMovies}
                searchQuery={searchQuery}
                onResetInput={handleResetInput}
                apiErrors={apiErrors}
            />

            {apiErrors?.movies && Object.keys(apiErrors?.movies).length !== 0 ? (
                <p className="movies__api-error">
                    Во время запроса произошла ошибка. Возможно, проблема с соединением
                    или сервер недоступен. Подождите немного и попробуйте ещё раз
                </p>
            ) : (
                ''
            )}

            {isLoading ? (
                <Preloader/>
            ) : filteredMovies.length ? (
                <MoviesCardList
                    movies={filteredMovies}
                    savedMovies={savedMovies}
                    onLike={onLike}
                />
            ) : (
                searchedMovies && (
                    <p className="movies__not-found">
                        По вашему запросу ничего не найдено
                    </p>
                )
            )}
        </section>
    );
}

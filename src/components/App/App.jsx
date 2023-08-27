import './App.css';
import {useState, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import {moviesApi} from '../../utils/MoviesApi';
import {auth} from '../../utils/Auth';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({});
    const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
    const footerPaths = ['/', '/movies', '/saved-movies'];
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [apiErrors, setApiErrors] = useState({
        login: {}, register: {}, profile: {}, movies: {}
    });
    const [isOK, setIsOK] = useState(false);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);

    const mainApi = new MainApi({
        url: 'https://api.movies.suslenkov.nomoredomains.xyz', headers: {
            'Content-Type': 'application/json', authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    });

    useEffect(() => {
        setApiErrors({
            login: {}, register: {}, profile: {}
        });
    }, [location]);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth
                .checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true);
                        navigate(location.pathname);
                    }
                })
                .catch((error) => {
                    if (error.status === 401) {
                        localStorage.removeItem('jwt');
                    }
                    console.log(error);
                });
        }
    }, []);

    useEffect(() => {
        isLoggedIn && mainApi
            .getUserInfo()
            .then((user) => {
                setCurrentUser(user);
            })
            .catch((error) => {
                console.log(`Что-то пошло не так... (${error})`);
            });

        isLoggedIn && mainApi
            .getSavedMovies()
            .then((data) => {
                setSavedMovies(data);
                localStorage.setItem('savedMovies', JSON.stringify(data));
            })
            .catch((error) => console.log(error));
    }, [isLoggedIn]);


    useEffect(() => {
        if (isLoggedIn) {
            if (localStorage.getItem('movies')) {
                setMovies(JSON.parse(localStorage.getItem('movies')));
            } else {
                moviesApi
                    .getMovies()
                    .then((movies) => {
                        localStorage.setItem('movies', JSON.stringify(movies));
                        setMovies(movies);
                        setApiErrors({...apiErrors, movies: {}});
                    })
                    .catch((error) => {
                        setApiErrors({...apiErrors, movies: error});
                        console.log(error);
                    });
            }
        }
    }, [isLoggedIn]);

    useEffect(() => {
        isLoggedIn && localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }, [savedMovies, isLoggedIn]);

    const handleRegister = (values) => {
        auth
            .register(values.name, values.email, values.password)
            .then((res) => {
                handleLogin(values);
            })
            .catch((error) => {
                setIsOK(false);
                setApiErrors({...apiErrors, register: error});
                console.log(error);
            });
    };

    const handleLogin = (values) => {
        auth
            .authorize(values.email, values.password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setIsLoggedIn(true);
                    navigate('/movies');
                }
            })
            .catch((error) => {
                setIsOK(false);
                setApiErrors({...apiErrors, login: error});
                console.log(error);
            });
    };

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/');
        setIsLoggedIn(false);
    };

    const handleUpdateUser = (user) => {
        mainApi
            .editProfile(user)
            .then(() => {
                setApiErrors({...apiErrors, profile: {}});
                setCurrentUser({
                    ...currentUser, name: user.name, email: user.email
                });
                setIsOK(true);
            })
            .catch((error) => {
                setIsOK(false);
                setApiErrors({...apiErrors, profile: error});
                console.log(error);
            });
    };

    const handleLikeMovie = (movie, isLiked, id) => {
        if (isLiked) {
            handleDeleteMovie(id);
        } else {
            mainApi
                .saveMovie(movie)
                .then((res) => {
                    setSavedMovies([...savedMovies, res]);
                    console.log(res);
                })
                .catch((error) => console.log(error));
        }
    };

    const handleDeleteMovie = (id) => {
        const searchedSavedMovies = JSON.parse(localStorage.getItem('searchedSavedMovies'));

        mainApi
            .deleteMovie(id)
            .then((res) => {
                const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== id);
                setSavedMovies(updatedSavedMovies);

                if (searchedSavedMovies) {
                    const updatedSearchedSavedMovies = searchedSavedMovies.filter((movie) => movie._id !== id);
                    localStorage.setItem('searchedSavedMovies', JSON.stringify(updatedSearchedSavedMovies));
                }
            })
            .catch((error) => console.log(error));
    };

    return (<div className="App">
            <CurrentUserContext.Provider value={{currentUser}}>

                {headerPaths.includes(location.pathname) && (<Header
                        isLoggedIn={isLoggedIn}/>)}
                <main>
                    <Routes>
                        <Route path="/"
                               element={<Main/>}/>

                        <Route
                            path="/signin"
                            element={<Login
                                onLogin={handleLogin}
                                isLoggedIn={isLoggedIn}
                                apiErrors={apiErrors}
                            />}
                        />

                        <Route
                            path="/signup"
                            element={<Register
                                onRegister={handleRegister}
                                isLoggedIn={isLoggedIn}
                                apiErrors={apiErrors}
                            />}
                        />

                        <Route
                            path="/movies"
                            element={<ProtectedRoute
                                element={Movies}
                                isLoggedIn={isLoggedIn}
                                movies={movies}
                                savedMovies={savedMovies}
                                onLike={handleLikeMovie}
                                apiErrors={apiErrors}
                            />}
                        />

                        <Route
                            path="/saved-movies"
                            element={<ProtectedRoute
                                element={SavedMovies}
                                savedMovies={savedMovies}
                                onDelete={handleDeleteMovie}
                                isLoggedIn={isLoggedIn}
                            />}
                        />

                        <Route
                            path="/profile"
                            element={<ProtectedRoute
                                element={Profile}
                                isLoggedIn={isLoggedIn}
                                apiErrors={apiErrors}
                                isOK={isOK}
                                onSignOut={handleSignOut}
                                onUpdateUser={handleUpdateUser}
                            />}
                        />

                        <Route path="*" element={<NotFound isLoggedIn={isLoggedIn}/>}/>
                    </Routes>
                </main>
                {footerPaths.includes(location.pathname) && <Footer/>}
            </CurrentUserContext.Provider>
        </div>);
}

export default App;

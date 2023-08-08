import React from 'react';
import {Link} from 'react-router-dom';
import useResize from '../../hooks/useResize.js';

import './Header.css';

import Navigation from '../Navigation/Navigation';
import Menu from '../Menu/Menu';

import Logo from '../../images/logo.svg';

const Header = ({isLoggedIn}) => {
    const size = useResize();
    return (
        <header className="header">
            <Link className="header__route" to="/">
                <img className="header__logo" src={Logo} alt="Логотип"/>
            </Link>

            {size.width > 768 ? (
                <Navigation isLoggedIn={isLoggedIn}/>
            ) : isLoggedIn ? (
                <Menu isLoggedIn={isLoggedIn}/>
            ) : (
                <Navigation isLoggedIn={isLoggedIn}/>
            )}
        </header>
    );
};

export default Header;

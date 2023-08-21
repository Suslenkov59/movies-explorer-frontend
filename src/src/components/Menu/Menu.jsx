import {useState, useEffect, useCallback} from 'react';
import './Menu.css';
import Navigation from '../Navigation/Navigation';

const Menu = ({isLoggedIn}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        };

        document.addEventListener('keydown', closeByEscape);

        return () => document.removeEventListener('keydown', closeByEscape);
    }, [isOpen, closeMenu]);

    return (
        <div className="menu">
            <button className="menu__burger-btn" onClick={toggleMenu}></button>
            {isOpen && <div className="menu__overlay" onClick={closeMenu}></div>}
            <div onClick={(e) => (e.target.href ? closeMenu() : '')}
                 className={`menu__container ${isOpen ? 'menu__container_open' : ''}`}>
                <button className="menu__close-btn" onClick={closeMenu}></button>
                <Navigation isLoggedIn={isLoggedIn}/>
            </div>
        </div>
    );
};

export default Menu;

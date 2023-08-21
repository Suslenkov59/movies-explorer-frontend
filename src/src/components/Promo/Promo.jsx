import React from 'react';
import './Promo.css';
import PromoLogo from '../../images/promo-logo.svg';

const Promo = () => {
    return (
        <section className="promo">
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <img className="promo__logo" src={PromoLogo} alt="Логотип"/>
        </section>
    );
};

export default Promo;

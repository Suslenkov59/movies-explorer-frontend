import React from 'react';
import './AboutMe.css';
import StudentPhoto from '../../images/avatar.jpg';

const AboutMe = () => {
    return (
        <section className="about-me" id="aboutme">
            <h3 className="about-me__title">Студент</h3>

            <div className="about-me__container">
                <div className="about-me__description">
                    <p className="about-me__description-name">Антон</p>
                    <p className="about-me__description-about">
                        Фронтенд-разработчик, 25 лет
                    </p>
                    <p className="about-me__description-text">
                        Я родился и живу в Перми, закончил экономический факультет ПГНИУ, специальность таможенное дело.
                        Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. После того, как прошёл курс
                        по веб-разработке, начал
                        заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>

                    <a className="about-me__link"
                       href="https://github.com/Suslenkov59"
                       target="_blank"
                       rel="noreferrer">
                        Github
                    </a>
                </div>
                <div className="about-me__img-container">
                    <img className="about-me__description-photo"
                         src={StudentPhoto}
                         alt="Фотография студента"/>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;

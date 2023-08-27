import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h3 className="portfolio__section-title">Портфолио </h3>

            <div className="portfolio__links">
                <a
                    className="portfolio__link"
                    href="https://suslenkov59.github.io/how-to-learn/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span>Статичный сайт</span>{' '}
                    <h4 className="portfolio__link-img">↗</h4>
                </a>

                <a
                    className="portfolio__link"
                    href="https://suslenkov59.github.io/russian-travel/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span>Адаптивный сайт</span>{' '}
                    <h4 className="portfolio__link-img">↗</h4>
                </a>

                <a
                    className="portfolio__link"
                    href="https://suslenkov59.github.io/mesto/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span>Одностраничное приложение</span>{' '}
                    <h4 className="portfolio__link-img">↗</h4>
                </a>
            </div>
        </section>
    );
};

export default Portfolio;

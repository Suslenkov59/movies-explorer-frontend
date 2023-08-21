import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox ({isChecked, onCheck}) {
    return (
        <>
            <div className="filter-checkbox">
                <input
                    type="checkbox"
                    id="switch"
                    className="filter-checkbox__input"
                    onChange={onCheck}
                    checked={isChecked || ''}
                />
                <label className="filter-checkbox__label" htmlFor="switch"></label>
                <span className="filter-checkbox__text">Короткометражки</span>
            </div>
        </>
    );
}

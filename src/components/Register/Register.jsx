import {useEffect} from 'react';
import './Register.css';
import {Link, useNavigate} from 'react-router-dom';
import {useFormAndValidation} from '../../hooks/useFormAndValidation';
import Logo from '../../images/logo.svg';
import {validateEmail, validateName} from '../../utils/validation';

export default function Register ({onRegister, isLoggedIn, apiErrors}) {
    const {values, handleChange, errors, isValid} = useFormAndValidation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/movies');
        }
    }, [isLoggedIn]);

    return (
        <section className="register-page">
            <Link className="register-page__route" to="/">
                <img className="register-page__logo" src={Logo} alt="Лого"/>
            </Link>

            <h1 className="register-page__title">Добро пожаловать!</h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onRegister(values);
                }}
                className="register-form"
            >
                <div className="register-form__input-field">
                    <label className="register-form__label" htmlFor="user-name-input">
                        Имя
                    </label>
                    <input
                        type="text" name="name" id="user-name-input"
                        className="register-form__input"
                        placeholder="Введите имя" minLength="2" maxLength="40" required value={values.name || ''}
                        onChange={handleChange}
                    />
                    <span className={`register-form__input-error`}>
            {validateName(values.name).message}
          </span>
                </div>

                <div className="register-form__input-field">
                    <label className="register-form__label" htmlFor="user-email-input">
                        E-mail
                    </label>
                    <input
                        type="email" name="email" id="user-email-input"
                        className="register-form__input"
                        placeholder="Введите почту" minLength="2" maxLength="40" required value={values.email || ''}
                        onChange={handleChange}
                    />
                    <span className={`form__input-error form__input-error_active`}>
            {validateEmail(values.email).message}
          </span>
                </div>

                <div className="register-form__input-field">
                    <label className="register-form__label" htmlFor="user-password-input">
                        Пароль
                    </label>
                    <input
                        type="password" name="password" id="user-password-input"
                        className="register-form__input"
                        placeholder="Введите пароль" minLength="1" maxLength="40" required value={values.password || ''}
                        onChange={handleChange}
                    />
                    <span
                        className={`register-form__input-error ${
                            isValid ? '' : 'register-form__input-error_active'
                        }`}
                    >
            {errors.password}
          </span>
                    <span className="register-form__api-error">
            {apiErrors.register.message === 'Failed to fetch'
                ? 'При регистрации пользователя произошла ошибка.'
                : apiErrors.register.errorText}
          </span>
                </div>

                <button
                    type="submit"
                    className="register-form__btn"
                    disabled={
                        !isValid ||
                        validateEmail(values.email).invalid ||
                        validateName(values.name).invalid
                    }
                >
                    Зарегистрироваться
                </button>

                <div className="register-page__text">
                    <span>Уже зарегистрированы? </span>
                    <Link to="/signin" className="register-page__link">
                        Войти
                    </Link>
                </div>
            </form>
        </section>
    );
}

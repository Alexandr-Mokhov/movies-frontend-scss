import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormWithValidation } from '../../utils/formValidator';
import Form from '../Form/Form';
import { authorizeUser } from '../../utils/MainApi';
import handleError from '../../utils/handleError';
import { EMAIL_RULE } from '../../constans';
import './Login.css';

export default function Login({
  setLoggedIn,
  isLoading,
  setIsLoading
}) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm, isRegEx } = useFormWithValidation();
  const [errorText, setErrorText] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setErrorText('');

    authorizeUser({
      email: values['email'],
      password: values['password'],
    })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
          resetForm();
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        const page = 'login';
        setLoggedIn(false);
        setErrorText(handleError(err, page));
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <main className="auth">
      <section className="auth__container">
        <Link className="auth__link" to="/"><div className="auth__logo" /></Link>
        <h1 className="auth__title">Рады видеть!</h1>
        <Form
          name={"login"}
          buttonText={isLoading ? 'Вход...' : 'Войти'}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isDisabledButton={!isValid}
          errorText={errorText}
        >
          <label className="form__label" htmlFor="input-email">E-mail</label>
          <input
            id="input-email"
            className={`form__input ${errors['email'] && 'form__input_type_error'}`}
            name="email"
            type="email"
            placeholder="Ваша почта"
            required
            value={values['email'] || ''}
            onChange={handleChange}
            autoComplete="off"
            pattern=".+@.+\.[a-z]{2,}"
          />
          <span className="form__input-error">
            {errors['email'] && !isRegEx['email'] && values['email'] ? EMAIL_RULE : errors['email']}
          </span>
          <label className="form__label" htmlFor="input-password">Пароль</label>
          <input
            id="input-password"
            className={`form__input ${errors['password'] && 'form__input_type_error'}`}
            name="password"
            type="password"
            placeholder="Пароль"
            required
            minLength="4"
            value={values['password'] || ''}
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="form__input-error">{errors['password']}</span>
        </Form>
      </section>
    </main>
  )
}

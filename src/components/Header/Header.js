import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ loggedIn }) {
  const { pathname } = useLocation();
  const isMain = pathname === '/';
  const isMovies = pathname === '/movies';
  const isSavedMovies = pathname === '/saved-movies';
  const isProfile = pathname === '/profile';

  return (
    <header className={`header ${!isMain && "header_light"}`}>
      {isMain || isMovies || isSavedMovies || isProfile ?
        <header className="header__container">
          <Link className="header__logo" to="/" />
          {
            loggedIn ? <Navigation /> :
              <div className="header__links-authorization">
                <Link to="/sign-up" className={`header__link ${isMain && "header__link_type_light"}`}>
                  Регистрация
                </Link>
                <Link className="header__link header__link_type_login" to="/sign-in">Войти</Link>
              </div>
          }
        </header>
        : ''}
    </header>
  );
}

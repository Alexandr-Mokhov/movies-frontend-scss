import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  foundMovies,
  notFoundMovies,
  errorFoundMovies,
  startItems,
  savedFilms,
  setSavedFilms,
  shortFilms,
  checkedShort,
  setIsInfoTooltipOpen,
  setInfoTooltipMessage,
  foundSavedMovies,
}) {
  const { pathname } = useLocation();

  function createMovieCard(movie, id) {
    return <MoviesCard
      movie={movie}
      savedFilms={savedFilms}
      setSavedFilms={setSavedFilms}
      setIsInfoTooltipOpen={setIsInfoTooltipOpen}
      setInfoTooltipMessage={setInfoTooltipMessage}
      key={id}
    />
  }

  function createMovieList(list) {
    return list.slice(0, startItems).map((movieItem) => createMovieCard(movieItem, movieItem.id));
  }

  const movieFoundItems = () => {
    return checkedShort ? createMovieList(shortFilms) : createMovieList(foundMovies);
  }

  const movieSavedItems = () => {
    if (savedFilms[0]) {
      return foundSavedMovies.map((movieItem) => createMovieCard(movieItem, movieItem.movieId));
    }
  }

  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {pathname === '/movies' ? movieFoundItems() : movieSavedItems()}
      </div>
      {notFoundMovies && <h2 className="movies-list__not-found">Ничего не найдено</h2>}
      {errorFoundMovies && <h3 className="movies-list__error-found">
        Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз.
      </h3>}
    </section>
  )
}

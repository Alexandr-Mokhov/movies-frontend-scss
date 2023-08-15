/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import SearchForm from '../../../components/SearchForm/SearchForm';
import MoviesCardList from '../../../components/MoviesCardList/MoviesCardList';
import filterMovies from '../../../utils/filterMovies';
import { SHORT_FILMS_DURATION } from '../../../constans';
import './SavedMovies.css';

export default function SavedMovies({
  savedFilms,
  setSavedFilms,
  notFoundMovies,
  setNotFoundMovies,
  setIsInfoTooltipOpen,
  setInfoTooltipMessage,
}) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [checkedShortSaved, setCheckedShortSaved] = useState(false);

  useEffect(() => {
    if (foundSavedMovies[0]) {
      handleVisibledFilms(checkedShortSaved);
    } else {
      setFoundSavedMovies(savedFilms);
    }
  }, [savedFilms])

  useEffect(() => {
    foundSavedMovies.length === 0 ?
    setNotFoundMovies(true) :
    setNotFoundMovies(false);
  }, [foundSavedMovies, checkedShortSaved])

  function handleChange(evt) {
    setValue(evt.target.value);
    if (evt.target.value === '') {
      setIsValid(false);
      setButtonDisabled(true);
      if (checkedShortSaved) {
        setFoundSavedMovies(savedFilms.filter(movie => movie.duration < SHORT_FILMS_DURATION));
      } else {
        setFoundSavedMovies(savedFilms);
      }
    } else {
      setIsValid(true);
      setButtonDisabled(false);
    }
  }

  function handleVisibledFilms(checked) {
    if (checked) {
      setFoundSavedMovies(filterMovies(savedFilms, value, true));
    } else {
      setFoundSavedMovies(filterMovies(savedFilms, value, false));
    }
  }

  function handleChecked() {
    setCheckedShortSaved(!checkedShortSaved);
    handleVisibledFilms(!checkedShortSaved);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleVisibledFilms(checkedShortSaved);
  }

  return (
    <main className="saved-movies" aria-label="Сохранённые фильмы">
      <SearchForm
        value={value}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isValid={isValid}
        buttonDisabled={buttonDisabled}
        checkedShortSaved={checkedShortSaved}
        handleChecked={handleChecked}
      />
      <MoviesCardList
        savedFilms={savedFilms}
        setSavedFilms={setSavedFilms}
        notFoundMovies={notFoundMovies}
        setIsInfoTooltipOpen={setIsInfoTooltipOpen}
        setInfoTooltipMessage={setInfoTooltipMessage}
        foundSavedMovies={foundSavedMovies}
      />
    </main>
  )
}

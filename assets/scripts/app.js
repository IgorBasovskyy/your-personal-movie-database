const addMovieModal         = document.getElementById('add-modal');
const startAddMovieButton   = document.querySelector('header button');
const backdrop              = document.getElementById('backdrop');
const cancelAddMovieButton  = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs            = addMovieModal.querySelectorAll('input');
const entryTextSection      = document.getElementById('entry-text');
const listRoot              = document.getElementById('movie-list');
const deleteMovieModal      = document.getElementById('delete-modal');
const cancelDeletionBtn     = deleteMovieModal.querySelector('.btn--passive');
let confirmDeletionBtn      = deleteMovieModal.querySelector('.btn--danger');

const movies = [];

const updateUI = () => movies.length === 0 ? entryTextSection.classList.remove('close') : entryTextSection.classList.add('close');

const cancelMovieDeletion = () => {
  toggleModal(deleteMovieModal);
}

const toggleBackdrop = () => backdrop.classList.toggle('visible');

const deleteMovie = movieId => {
  movies.forEach((element, index) => {
    if (element.id === movieId) {
      movies.splice(index, 1);
      listRoot.children[index].remove();
    }
  });
  updateUI();
  toggleModal(deleteMovieModal);
}

const deleteMovieHandler = movieId => {
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionBtn.removeEventListener('click', cancelMovieDeletion);

  cancelDeletionBtn.addEventListener('click', cancelMovieDeletion);
  confirmDeletionBtn.addEventListener('click', deleteMovie.bind(null, movieId));

  toggleModal(deleteMovieModal);
}

const toggleModal = (modal) => {
  modal.classList.toggle('visible');
  toggleBackdrop();
}

const renderNewMovieElement = ({id, title, image, rating}) => {
  const newMovieElement = document.createElement('li');

  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;

  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
  listRoot.append(newMovieElement);
  toggleBackdrop();
}

const closeMovieModal = () => {
  toggleModal(addMovieModal);
}

const showMovieModal = () => {
  toggleModal(addMovieModal);
}

const clearMovieInputs = () => {
  [...userInputs].forEach((element) => {
    element.value = '';
  })
}

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInputs();
}

const backdropClickHandler = () => {
  closeMovieModal();
  clearMovieInputs();
  cancelMovieDeletion();
  toggleBackdrop();
}

const addMovieHandler = () => {
  const [{ value: titleValue }, { value: imgUrlValue }, { value: ratingValue }] = userInputs;
  
  if (
    titleValue.trim() === '' ||
    imgUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5 ||
    isNaN(+ratingValue)
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imgUrlValue,
    rating: ratingValue
  }

  movies.push(newMovie);
  closeMovieModal();
  toggleBackdrop();
  renderNewMovieElement(newMovie);
  clearMovieInputs();
  updateUI();
}

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);



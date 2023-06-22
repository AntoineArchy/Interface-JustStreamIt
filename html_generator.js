async function generateStarMovie(movie) {
  // Create and append a new "tile" to the document
  const section = document.createElement('section');
  section.classList.add('JSI-tile-content');

  const container = document.createElement('div');
  container.classList.add('container');
  section.appendChild(container);

  // Create and append the movie title to the tile
  const movieTitle = document.createElement('h1');
  movieTitle.innerHTML = movie[2];
  container.appendChild(movieTitle);

  // Create and append a new content div to the tile
  const startContent = document.createElement('div');
  startContent.classList.add('star-movie-content');
  container.appendChild(startContent);

  // Create and append a new image to the content div
  const movieCover = document.createElement('img');
  movieCover.src = movie[0];
  movieCover.setAttribute('alt', movie[2]);
  startContent.appendChild(movieCover);

  // Create and append a button used to open the modal to the content div
  const modalButton = document.createElement('button');
  modalButton.setAttribute('onclick', `openModal("${movie[1]}")`);
  modalButton.innerHTML = 'More...';
  startContent.appendChild(modalButton);

  // Create and append the movie description to the content div
  const desc = document.createElement('p');
  desc.innerHTML = movie[3];
  startContent.appendChild(desc);
  return section;
}


async function generateMovieBox(movie) {
  // Create new box to hold movie details and action
  const box = document.createElement('div');
  box.classList.add('movie');
  box.setAttribute('onclick', `openModal("${movie[1]}")`);

  // Create and append a new movie cover to the box
  const movieCover = document.createElement('img');
  movieCover.src = movie[0];
  movieCover.setAttribute('alt', movie[2]);
  box.appendChild(movieCover);

  // Create and append an overlay to display the movie title when user will hoover the box
  const overlay = document.createElement('div');
  const title = document.createElement('p');
  overlay.classList.add('movie-title');
  title.innerHTML = movie[2];
  overlay.appendChild(title);
  box.appendChild(overlay);
  return box;
}

async function buildControlButtonHtml(carousel_categorie) {
  // Create a div used store the carousel button html
  const controls = document.createElement('div');
  controls.classList.add('controls');

  // Create a button used to call the moveCarouselLeft func when clicked
  const leftButton = document.createElement('button');
  leftButton.classList.add('car-btn');
  leftButton.classList.add('left');
  leftButton.setAttribute('id', `${carousel_categorie}-left`);
  leftButton.setAttribute('onclick', `moveCarouselLeft("${carousel_categorie}")`);
  controls.appendChild(leftButton);

  // Create an image to represent the button
  const chev = document.createElement('img');
  chev.src = 'images/bouton.png';
  chev.setAttribute('alt', 'left');
  leftButton.appendChild(chev);

  // Create a button used to call the moveCarouselRight func when clicked
  const rightButton = document.createElement('button');
  rightButton.classList.add('car-btn');
  rightButton.classList.add('right');
  rightButton.classList.add('show');
  rightButton.setAttribute('id', `${carousel_categorie}-right`);
  rightButton.setAttribute('onclick', `moveCarouselRight("${carousel_categorie}")`);
  controls.appendChild(rightButton);

  // Create an image to represent the button
  const movieCover = document.createElement('img');
  movieCover.src = 'images/bouton.png';
  movieCover.setAttribute('alt', 'right');
  rightButton.appendChild(movieCover);

  return controls;
}

async function buildCarouselHtml(carousel_categorie, carousel_parent) {
  // Create and append a new "tile" to the document
  const section = document.createElement('section');
  section.classList.add('JSI-tile-content');
  document.querySelector(carousel_parent).appendChild(section);

  const carousel = document.createElement('div');
  section.appendChild(carousel);
  carousel.classList.add('container');

  // Create and append the carousel category to the tile
  const categoryTitle = document.createElement('h2');
  carousel.append(categoryTitle);
  categoryTitle.innerHTML = `${carousel_categorie}`;

  // Create and append a new carousel container to the tile
  const carouselContainer = document.createElement('div');
  carousel.appendChild(carouselContainer);
  carouselContainer.classList.add('carousel-container');

  // Create and append a new content div to the carousel container
  const carouselContent = document.createElement('div');
  carouselContainer.appendChild(carouselContent);
  carouselContent.setAttribute('id', `${carousel_categorie}-movies`);
  carouselContent.classList.add('carousel-content');

  // Get and append the carousel button to the carousel container
  buildControlButtonHtml(carousel_categorie).then(controls => {
    carouselContainer.appendChild(controls);
  })
  return carouselContent;
}

function moveCarouselRight(category) {
  let carrouselContent = document.querySelector('#' + category + '-movies');
  let carrouselLeftBtn = document.querySelector('#' + category + '-left');
  let carrouselRightBtn = document.querySelector('#' + category + '-right');

  carrouselContent.style.left = '-560px';
  carrouselRightBtn.classList.remove('show');
  carrouselLeftBtn.classList.add('show');
}

function moveCarouselLeft(category) {
  let carrouselContent = document.querySelector('#' + category + '-movies');
  let carrouselLeftBtn = document.querySelector('#' + category + '-left');
  let carrouselRightBtn = document.querySelector('#' + category + '-right');

  carrouselContent.style.left = '0px';
  carrouselRightBtn.classList.add('show');
  carrouselLeftBtn.classList.remove('show');
}

function feedModalData(data) {
  // Receive data parsed from the API and insert them into the modal Html
  document.getElementById('modal-cover').src = data['image_url'];
  document.getElementById('modal-title').innerHTML = data['title'];

  document.getElementById('modal-year').innerHTML = data['year'];
  document.getElementById('modal-duration').innerHTML = data['duration'] + ' min';
  document.getElementById('modal-genres').innerHTML = data['genres'];
  document.getElementById('modal-imdb').innerHTML = data['imdb_score'] + ' / 10';

  document.getElementById('modal-directors').innerHTML = data['directors'];
  document.getElementById('modal-cast').innerHTML = data['actors'] + '...';
  document.getElementById('modal-country').innerHTML = data['countries'];
  document.getElementById('modal-rating').innerHTML = data['rated'];
  
  let gross = data['worldwide_gross_income'] + ' ' + data['budget_currency'];
  modalBoxOffice = document.getElementById('modal-box-office').innerHTML = gross;
  document.getElementById('modal-desc').innerHTML = '<em>' + data['long_description'] + '<em>';
}

function openModal(id) {
  let modal = document.getElementById('modal');
  let close = document.getElementsByClassName('close')[0];

  modal_data = FromUrlToModal(URL_API + id);
  modal.style.display = 'block';

  //Si l'utilisateur clique sur le X, il souhaite fermer le modal
  close.onclick = function () {
  modal.style.display = 'none';
}

  window.onclick = function (event) {
    // Si l'utilisateur clique sur le modal (et pas le modal content), c'est qu'il est hors de
    // l'affichage du modal, on le ferme aussi.
    if (event.target === modal)
      modal.style.display = 'none';
  }
}
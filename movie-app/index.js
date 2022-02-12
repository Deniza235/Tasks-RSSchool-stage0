const urlOrigin = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=bb688b4f51d077d6cd81d7e4b053257b';
const popularLink = urlOrigin + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const imageUrl = 'https://image.tmdb.org/t/p/w500/';
const movieContainer = document.querySelector('.main');
const form = document.querySelector('.header__form');
const searchForm = document.querySelector('.header__form-input');
const searchLink = urlOrigin + '/search/movie?' + apiKey;


async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}
getData(popularLink);

function showMovies(data) {
  movieContainer.innerHTML = '';

  data.forEach(elem => {
    const {title, poster_path, vote_average, overview} = elem;
    
    let movie = document.createElement('div');
    movie.classList.add('main__movie-card');
    movieContainer.append(movie);

    let imageMovie = document.createElement('img');
    imageMovie.classList.add('main__movie-poster');
    imageMovie.src = `${imageUrl + poster_path}`;
    imageMovie.alt = `${title}`;
    movie.append(imageMovie);

    let titleMovie = document.createElement('h2');
    titleMovie.classList.add('main__movie-title');
    titleMovie.textContent = `${title}`;
    movie.append(titleMovie);

    let voteMovie = document.createElement('span');
    voteMovie.classList.add(`${getColorVote(voteMovie)}`);
    voteMovie.textContent = `${vote_average}`;
    movie.append(voteMovie);

    let overviewMovie = document.createElement('p');
    overviewMovie.classList.add('main__movie-overview');
    overviewMovie.textContent = `${overview}`;
    movie.append(overviewMovie);

  });
}


function getColorVote(vote_average) {
  if (vote_average >= 8) {
    return 'green';
  } else if(vote_average >= 5) {
    return 'orange';
  } else {
    return 'red'
  }
}

form.addEventListener('submit', (el) => {
  el.preventDefault();

  let searchList = searchForm.value;
  
  if (searchList) {
    getData(searchLink + '&query=' + searchList);
  } else {
    getData(popularLink);
  }
})
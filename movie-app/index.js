const urlOrigin = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=bb688b4f51d077d6cd81d7e4b053257b';
const popularLink = urlOrigin + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const imageUrl = 'https://image.tmdb.org/t/p/w500/';
const movieContainer = document.querySelector('.main');
const form = document.querySelector('.header__form');
const searchForm = document.querySelector('.header__form-input');
const searchLink = urlOrigin + '/search/movie?' + apiKey;
const error = 'Nothing found for your request';


async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  const dataResult = data.results;
  movieContainer.innerHTML = '';
  if (dataResult.length === 0) {
    emptyResult();
  } else {
    showMovies(dataResult);
  }

}
getData(popularLink);

function emptyResult() {
    const emptyResult = document.createElement("div");
    emptyResult.classList.add('main__nothing');
    emptyResult.textContent = 'Nothing found for your request';
    movieContainer.append(emptyResult);
}

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

    let movieInfo = document.createElement('div');
    movieInfo.classList.add('main__movie-info');
    movie.append(movieInfo);

    let titleMovie = document.createElement('h2');
    titleMovie.classList.add('main__movie-title');
    titleMovie.textContent = `${title}`;
    movieInfo.append(titleMovie);

    let voteMovie = document.createElement('span');
    voteMovie.classList.add(`${getColorVote(vote_average)}`);
    voteMovie.textContent = `${vote_average}`;
    movieInfo.append(voteMovie);

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

form.addEventListener('submit', async (el) => {

  el.preventDefault();

  let searchList = searchForm.value;
  
  if (searchList) {
    getData(searchLink + '&query=' + searchList);
  } else {
    getData(popularLink);
  }
})
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

console.log('1.Вёрстка +10\n- на странице есть несколько карточек фильмов и строка поиска. На каждой карточке фильма есть постер и название фильма. Также на карточке может быть другая информация, которую предоставляет API, например, описание фильма, его рейтинг на IMDb и т.д. +5\n- в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n2. При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10\n3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10\n4. Поиск +30\n- при открытии приложения курсор находится в поле ввода +5\n- есть placeholder +5\n- автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n- поисковый запрос можно отправить нажатием клавиши Enter +5\n- после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n- в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5\n5. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n- высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо;\n- дополнительным функционалом может быть, например, наличие на карточке фильма его описания и рейтинга на IMDb.\n\nScore: 70/70.\n\nЗдравствуйте! Надеюсь, что моя работа Вам понравится. Я постаралась сделать внешне приятный интерфейс приложения, а также добавила:\n- анимацию звездного неба на заднем фоне;\n- рейтинг фильмов и описание;\n- убрала внешнюю визуализацию скролла, но он при этом присутствует и в карточках и на странице;\n- отличное от демо оформление карточек.\n\nЕсли у Вас появятся вопросы по поводу моей работы, напишите мне, пожалуйста, в дискорд: Mariya Ivonina#5288\nСпасибо!')
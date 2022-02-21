const main = document.querySelector('.main');
const cards = document.querySelectorAll('.main__card');
const listCard = document.querySelector('.main__list-card');
const screen = document. querySelector('.main__screen');
const btnRefresh = document.querySelector('.main__btn-return');
const score = document.querySelector('.main__score');
const scoreTable = document.querySelector('.header__score-table');
const table = document.querySelector('.header__table');
let flip = document.querySelector('.header__player-score');
let time = document.querySelector('.header__time-duration');
let flips = 0;
let maxTime = 75;
let timeLeft = maxTime;
let matchedCard = 0;
let firstCard, secondCard, timer;
let isDisableDeck = false;
let isPlay = false;
let result = [];

function startTimer() {
  if(timeLeft === 0) {
    loseGame();
    return clearInterval(timer);
  }
  timeLeft--;
  time.innerText = timeLeft;
}

function flipCard({target: clickCard}) {
  if(!isPlay) {
    isPlay = true;
    timer = setInterval(startTimer, 1000);
  }
  if(clickCard !== firstCard && !isDisableDeck && timeLeft > 0) {
    flips++;
    flip.innerText = flips;
    clickCard.classList.add('rotate');
    if(!firstCard) {
      return firstCard = clickCard;
    }
    secondCard = clickCard;
    isDisableDeck = true;
    let cardFirstImg = firstCard.querySelector('.main__card-image').src;
    let cardSecondImg = secondCard.querySelector('.main__card-image').src;
    matchCards(cardFirstImg, cardSecondImg);
  }   
}

function matchCards(firstImg, secondImg) {
  if( firstImg === secondImg) {
    matchedCard++;
    if(matchedCard === 12 && timeLeft > 0) {
      clearInterval(timer);
      return returnGame();
    }
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard = secondCard = '';
    return isDisableDeck = false;
  }   
  setTimeout(() => {
    firstCard.classList.add('shake');
    secondCard.classList.add('shake');
  }, 400)
  
  setTimeout(() => {
    firstCard.classList.remove('shake', 'rotate');
    secondCard.classList.remove('shake', 'rotate');
    firstCard = secondCard = '';
    isDisableDeck = false;
  }, 1200)
}

function returnGame() {
  listCard.classList.add('refresh');
  screen.classList.add('refresh');
  btnRefresh.classList.add('refresh');
  document.querySelector('.main-heading').textContent = 'You Win!!!';
  score.textContent = `Score: ${flips}`;
  result.push(flips);
}

function showScore() {
  if (result.length === 0) {
    let olList = document.createElement('ol');
    olList.textContent = 'No game results yet. Let\'s play!';
    table.append(olList);
  } /* else 
    for(let i = 0; i < result.length; i++) */
  
}

function loseGame() {
  listCard.classList.add('refresh');
  screen.classList.add('refresh');
  document.querySelector('.main-heading').textContent = 'You lose =(';
  btnRefresh.classList.add('refresh');
}

function shuffleCard() {
  timeLeft = maxTime;
  flips = matchedCard = 0;
  isDisableDeck = isPlay = false;
  firstCard = secondCard = '';
  clearInterval(timer);
  time.innerText = timeLeft;
  flip.innerText = flips;

  let arrCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // arrCards.sort(() => Math.random() > .5 ? 1 : -1);

  cards.forEach((card, index) => {
    card.classList.remove('rotate');
    card.addEventListener('click', flipCard);
    let imgNum = card.querySelector('.main__card-image');
    imgNum.src = `./assets/img/img-${arrCards[index]}.webp`
  })
}
shuffleCard();

btnRefresh.addEventListener('click', () => {
  listCard.classList.remove('refresh');
  screen.classList.remove('refresh');
  btnRefresh.classList.remove('refresh');
  shuffleCard();
})


cards.forEach(card => {
  card.addEventListener('click', flipCard);
})

scoreTable.addEventListener('click', () => {
  table.classList.toggle('table');
  showScore();

})

function getLocalStorage() {
  if(localStorage.getItem('result')) {
    const res = localStorage.getItem('result');
    result = JSON.parse(res);
  }
}

function setLocalStorage() {
  localStorage.setItem('result', JSON.stringify(result));
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);
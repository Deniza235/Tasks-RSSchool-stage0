const cards = document.querySelectorAll('.main__card');
let flip = document.querySelector('.header__player-score');
let time = document.querySelector('.header__time-duration')
let flips = 0;
let maxTime = 45;
let timeLeft = maxTime;
let matchedCard = 0;
let firstCard, secondCard, timer;
let isDisableDeck = false;
let isPlay = false;

function startTimer() {
  if(timeLeft === 0) {
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
      return clearInterval(timer);
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

function shuffleCard() {
  timeLeft = maxTime;
  flips = matchedCard = 0;
  isDisableDeck = isPlay = false;
  firstCard = secondCard = '';
  clearInterval(timer);
  time.innerText = timeLeft;
  flip.innerText = flips;

  let arrCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  arrCards.sort(() => Math.random() > .5 ? 1 : -1);

  cards.forEach((card, index) => {
    card.classList.remove('rotate');
    card.addEventListener('click', flipCard);
    let imgNum = card.querySelector('.main__card-image');
    imgNum.src = `./assets/img/img-${arrCards[index]}.webp`
  })
}

shuffleCard();

cards.forEach(card => {
  card.addEventListener('click', flipCard);
})
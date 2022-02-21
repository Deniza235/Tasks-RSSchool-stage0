const cards = document.querySelectorAll('.main__card');

let matchedCard = 0;
let firstCard, secondCard;
let isDisableDeck = false;

function flipCard(el) {
  let clickCard = el.target;
  if(clickCard !== firstCard && !isDisableDeck) {
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
    if(matchedCard === 12) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000)
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
  matchedCard = 0;
  isDisableDeck = false;
  firstCard = secondCard = '';
  let arrCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  arrCards.sort(() => Math.random() > .5 ? 1 : -1)
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
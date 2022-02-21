const cards = document.querySelectorAll('.main__card');

let firstCard, secondCard;

function flipCard(el) {
  let clickCard = el.target;
  if(clickCard !== firstCard) {
    clickCard.classList.add('rotate');
    if(!firstCard) {
      return firstCard = clickCard;
    }
    secondCard = clickCard;

    let cardFirstImg = firstCard.querySelector('.main__card-image').src;
    let cardSecondImg = secondCard.querySelector('.main__card-image').src;
    matchCards(cardFirstImg, cardSecondImg);
  }
}

function matchCards(firstImg, secondImg) {
  if( firstImg === secondImg) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard = secondCard = '';
    return;
  }
  
  setTimeout(() => {
    firstCard.classList.add('shake');
    secondCard.classList.add('shake');
  }, 400)
  
  setTimeout(() => {
    firstCard.classList.remove('shake', 'rotate');
    secondCard.classList.remove('shake', 'rotate');
    firstCard = secondCard = '';
  }, 1200)
}

cards.forEach(card => {
  card.addEventListener('click', flipCard);
})
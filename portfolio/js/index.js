import i18Obj from '../js/translate.js';
window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#burger').addEventListener('click', function() {
    document.querySelector('#burger').classList.toggle('is-active');
    document.querySelector('.header__bg-overlay').classList.toggle('shadow');
  })

  document.querySelector('.header__bg-overlay').addEventListener('click', function(){
    document.querySelector('.header__bg-overlay').classList.toggle('shadow');
    document.querySelector('#burger').classList.remove('is-active');
  })

  const btnPortfolio = document.querySelector('.portfolio__btn');
  const btnsPortfolio = document.querySelectorAll('.portfolio__btn')
  const btnListPortfolio = document.querySelector('.portfolio__list-btn');
  const imgPortfolio = document.querySelectorAll('.portfolio__picture');

  
  function changeImg(event) {
    const season = event.target.dataset.season;
    if(event.target.classList.contains('portfolio__btn')) {
      imgPortfolio.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
    }
  }

  function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach((elem) => {
      for(let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `../assets/img/${elem}/${i}.jpg`;
      }
    })
  }

  preloadImages();

  btnListPortfolio.addEventListener('click', changeImg);


  function activeState(items, activeName) {
    for (let i = 0; i < items.length; i++) {
      if(items[i].classList.contains(activeName)) {
        items[i].classList.remove(activeName);
      }
    }
  }

  for(let i = 0; i < btnsPortfolio.length; i++) {
    btnsPortfolio[i].addEventListener('click', function(el) {
      activeState(btnsPortfolio, 'active-btn');
      el.target.classList.add('active-btn');
    })
  }

  const rusLang = document.querySelector('.header__switch-ru');
  const engLang = document.querySelector('.header__switch-en');
  const translate = document.querySelectorAll('[data-i18]');

  rusLang.addEventListener('click', getTranslate);
  engLang.addEventListener('click', getTranslateReverse);
  

  function getTranslate () {
    translate.forEach((elem) => 
      elem.textContent = i18Obj['ru'][elem.dataset.i18]
    );
  }

  function getTranslateReverse () {
    translate.forEach((elem) => 
      elem.textContent = i18Obj['en'][elem.dataset.i18]
    );
  }

  const switcher = document.querySelectorAll('.switch');

  for(let i = 0; i < switcher.length; i++) {
    switcher[i].addEventListener('click', function(el) {
      activeState(switcher, 'active-lang');
      el.target.classList.add('active-lang');
    })
  }
})
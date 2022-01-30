import i18Obj from '../js/translate.js';
window.addEventListener('DOMContentLoaded', function() {
  // burger menu
  document.querySelector('#burger').addEventListener('click', function() {
    document.querySelector('#burger').classList.toggle('is-active');
    document.querySelector('.header__bg-overlay').classList.toggle('shadow');
  })

  document.querySelector('.header__bg-overlay').addEventListener('click', function(){
    document.querySelector('.header__bg-overlay').classList.toggle('shadow');
    document.querySelector('#burger').classList.remove('is-active');
  })

  // portfolio btn and change pictures

  //image caching
  const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach((elem) => {
      for(let i = 1; i < 6; i++) {
        const img = new Image();
        img.src = `./assets/img/${elem}/${i}.jpg`;
      }
    })
  
  const btnsPortfolio = document.querySelectorAll('.portfolio__btn')
  const btnListPortfolio = document.querySelector('.portfolio__list-btn');
  const imgPortfolio = document.querySelectorAll('.portfolio__picture');

  
  function changeImg(event) {
    const season = event.target.dataset.season;
    if(event.target.classList.contains('portfolio__btn')) {
      imgPortfolio.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
    }
  }
  
  btnListPortfolio.addEventListener('click', changeImg);

  // function for active btn
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
  
  // switch lang
  const rusLang = document.querySelector('.header__switch-ru');
  const engLang = document.querySelector('.header__switch-en');
  const translate = document.querySelectorAll('[data-i18n]');
  let lang = 'en';

  const switcher = document.querySelectorAll('.switch');

  rusLang.addEventListener('click', ()  => {getTranslate('ru')});
  engLang.addEventListener('click', () => {getTranslate('en')});

  function getTranslate (language) {
    translate.forEach((elem) => {
      if(["input", "textarea"].includes(elem.localName)) {
        elem.placeholder = i18Obj[language][elem.dataset.i18n]
      } else {
        elem.textContent = i18Obj[language][elem.dataset.i18n];
      }
    });
      lang = language;
      [rusLang, engLang].forEach((elem) => {
      if (elem.id === lang) {
        elem.classList.add('active-lang');
      } else {
        elem.classList.remove('active-lang');
      }
      })
  }
  
  // change theme html

  const iconChange = document.querySelector('.header__theme-change');
  const headerCont = document.querySelector('.header__container');
  const headerOverlay = document.querySelector('.header__bg-overlay');
  const headerMenu = document.querySelector('.header__menu');
  const heroCont = document.querySelector('.hero__container');
  const contactsCont = document.querySelector('.contacts__container');
  const contactsInput = document.querySelectorAll('.contacts__form-input')
  const contactsTextarea = document.querySelector('.contacts__form-textarea')
  const title = document.querySelectorAll('.title');
  const btnWhite = document.querySelectorAll('.btn-color-white');
  const btnGold = document.querySelectorAll('.btn-light')
  const htmlBackground = document.querySelector('html');
  const themeChange = [iconChange, ...title, ...btnWhite, ...btnGold, htmlBackground, headerCont, headerOverlay, headerMenu, heroCont, contactsCont, ...contactsInput, contactsTextarea];
  let theme = 'dark';

  iconChange.addEventListener('click', function() {
    let sunMoon = iconChange.firstElementChild.href.baseVal;
    let topic = (sunMoon === './assets/svg/sprite-light.svg#sun') ? 'light' : 'dark';
    selectTheme(topic);
  })

  const selectTheme = (topic) => {
    if(topic === 'light') {
      themeChange.forEach((elem) => elem.classList.add('light-theme'));
      iconChange.firstElementChild.href.baseVal = './assets/svg/sprite-light.svg#moon';
      theme = 'light';
      document.documentElement.style.setProperty('--text-color', '#000');
      document.documentElement.style.setProperty('--active-switch', '#fff');
      document.documentElement.style.setProperty('--color-line', '#000');
      document.documentElement.style.setProperty('--btn-color', '#bdae82');
    } else {
      themeChange.forEach((elem) => elem.classList.remove('light-theme'));
      iconChange.firstElementChild.href.baseVal = './assets/svg/sprite-light.svg#sun';
      theme = 'dark';
      document.documentElement.style.setProperty('--text-color', '#fff');
      document.documentElement.style.setProperty('--active-switch', '#bdae82');
      document.documentElement.style.setProperty('--color-line', '#bdae82');
      document.documentElement.style.setProperty('--btn-color', '#000');
    }
  }

  // Local Storage
  function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
  }
  window.addEventListener('beforeunload', setLocalStorage);

  function getLocalStorage() {
    if(localStorage.getItem('lang')) {
      let lang = localStorage.getItem('lang');
      getTranslate(lang);
    }

    if(localStorage.getItem('theme')) {
      const theme = localStorage.getItem('theme');
      selectTheme(theme);
    }
  }
  window.addEventListener('load', getLocalStorage);
})

console.log('Выполненные требования:\n1.Смена изображений в секции portfolio +25\n- при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20\n- кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5\n2.Перевод страницы на два языка +25\n- при клике по надписи ru англоязычная страница переводится на русский язык +10\n- при клике по надписи en русскоязычная страница переводится на английский язык +10\n- надписи en или ru, соответствующие текущему языку страницы, становятся активными, т.е. выделяются стилем +5\n3.Переключение светлой и тёмной темы +25\n- тёмная тема приложения сменяется светлой +10\n- светлая тема приложения сменяется тёмной +10\n- после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5\n4.Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5\n5.Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5\n\nScore: 85/85\n\nЗдравствуйте! Надеюсь, что моя работа Вам понравится.\nЕсли у Вас появятся вопросы по поводу моей работы, напишите мне, пожалуйста, в дискорд: Mariya Ivonina#5288\nСпасибо!');
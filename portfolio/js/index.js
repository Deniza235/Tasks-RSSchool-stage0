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
      imgPortfolio.forEach((img, index) => img.src = `../assets/img/${season}/${index + 1}.jpg`);
    }
  }

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
      el.target.classList.add('active-btn')
    })
  }



/*  btnPortfolio.classList.remove('active-btn');

  function changeclassActive() {
    
  }

  btnPortfolio.addEventListener('click', changeclassActive);
 */
  // надо доработать кеширование

  /* function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach(elem) => {
      for(let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `../assets/img/${elem}/${i}.jpg`;
      }
    }
    
  } */


})



// console.log('1.Вёрстка соответствует макету. Ширина экрана 768px +48\n - блок <header> +6\n - секция hero +6\n - секция skills +6\n - секция portfolio +6\n - секция video +6\n - секция price +6\n - секция contacts +6\n - блок <footer> +6\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22\n - при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2\n - при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4\n - высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4\n - при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4\n -бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2\n - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2\n - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4\n\nScore: 85/85.\n\nP.s. Здравствуйте! Надеюсь, что моя работа Вам понравится. Я постаралась сделать так, чтобы при уменьшении контент был читаемым и визуально был приятен. При этом контент я нигде не обрезала, а работала с масштабированием картинок, что разрешено и не является ошибкой.\nЕсли у Вас появятся вопросы по поводу моей работы, напишите мне, пожалуйста, в дискорд: Mariya Ivonina#5288\nСпасибо!');
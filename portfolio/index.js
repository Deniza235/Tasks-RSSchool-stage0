window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#burger').addEventListener('click', function() {
    document.querySelector('#burger').classList.toggle('is-active');
    document.querySelector('.header__bg-overlay').classList.toggle('shadow');
  })
})
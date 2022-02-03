
window.addEventListener('DOMContentLoaded', function() {

  // progress-bar

  const progressBar = document.querySelector('.player__progress-bar');

  progressBar.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #73eba1 0%, #10bcc9 ${value}%, #fff ${value}%, white 100%)`
  })
})




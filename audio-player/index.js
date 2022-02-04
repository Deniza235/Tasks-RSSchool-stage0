window.addEventListener('DOMContentLoaded', function() {

  let allMusic = [
    {
      name: 'Leave a Light On',
      artist: 'Tom Walker',
      img: 'image-1',
      src: 'song-1'
    },
    {
      name: 'Numb',
      artist: 'Linkin Park',
      img: 'image-2',
      src: 'song-2'
    },
    {
      name: 'Broken Parts',
      artist: 'Smash Into Pieces',
      img: 'image-3',
      src: 'song-3'
    },
    {
      name: 'You don\'t fool me',
      artist: 'Queen',
      img: 'image-4',
      src: 'song-4'
    },
    {
      name: 'Возьми моё сердце',
      artist: 'Filatov & Karas, Burito',
      img: 'image-5',
      src: 'song-5'
    },
    {
      name: 'Луна',
      artist: 'Леша Свик',
      img: 'image-6',
      src: 'song-6'
    },
    {
      name: 'Moonlight Sonata',
      artist: 'Hidden Citizens & Людвиг ван Бетховен',
      img: 'image-7',
      src: 'song-7'
    }
  ];

  const player = document.querySelector('.player__wrapper');
  const cover = document.querySelector('.player__cover');
  const songName = document.querySelector('.player__song-name');
  const songArtist = document.querySelector('.player__song-artist');
  const play = document.querySelector('.player__play');
  const nextSong = document.querySelector('.player__skip-next');
  const prevSong = document.querySelector('.player__skip-previous');
  const progressBar = document.querySelector('.player__progress-bar');


  // progress-bar
  progressBar.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #73eba1 0%, #10bcc9 ${value}%, #fff ${value}%, white 100%)`
  })

})




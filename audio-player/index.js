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
  const cover = document.querySelector('.player__cover-image');
  const songName = document.querySelector('.player__song-name');
  const songArtist = document.querySelector('.player__song-artist');
  const audio = document.querySelector('.player__audio');
  const playPauseBtn = document.querySelector('.player__play');
  const nextSongBtn = document.querySelector('.player__skip-next');
  const prevSongBtn = document.querySelector('.player__skip-previous');
  const progressLine = document.querySelector('.player__progress');
  const progressBar = document.querySelector('.player__progress-bar');
  const curTime = document.querySelector('.player__current-time');
  const endTime = document.querySelector('.player__finish-time')

  let songIndex = 3;

  window.addEventListener('load', () => {
    loadMusic(songIndex);
  })

  // load music
  function loadMusic(numIndex) {
    songName.innerText = allMusic[numIndex - 1].name;
    songArtist.innerText = allMusic[numIndex - 1].artist;
    cover.src = `./assets/jpg/${allMusic[numIndex - 1].img}.jpg`;
    audio.src = `./assets/audio/${allMusic[numIndex - 1].src}.mp3`;
  }

  //play music 

  function playMusic() {
    player.classList.add('pause');
    playPauseBtn.firstElementChild.href.baseVal = './assets/svg/sprite.svg#pause';
    audio.play();
  }

  //pause music 

  function pauseMusic() {
    player.classList.remove('pause');
    playPauseBtn.firstElementChild.href.baseVal = './assets/svg/sprite.svg#play';
    audio.pause();
  }

  // event btn music or play
  playPauseBtn.addEventListener('click', () => {
    const isPauseMusic = player.classList.contains('pause');
    isPauseMusic ? pauseMusic() : playMusic();
  })

  // next song
  
  function nextMusic() {
    songIndex++;
    songIndex > allMusic.length ? songIndex = 1 : songIndex = songIndex;
    loadMusic(songIndex);
    playMusic();
  }

  nextSongBtn.addEventListener('click', () => {
    nextMusic();
  })

  // prev song

  function prevMusic() {
    songIndex--;
    songIndex < 1 ? songIndex = allMusic.length : songIndex = songIndex;
    loadMusic(songIndex);
    playMusic();
  }

  prevSongBtn.addEventListener('click', () => {
    prevMusic();
  })

  // progress-bar
  
  progressLine.addEventListener('click', (elem) => {
    let progressValue = progressLine.clientWidth;
    let clickOffsetX = elem.offsetX;
    let songDuration = audio.duration;

    audio.currentTime = (clickOffsetX /  progressValue) * songDuration;
    playMusic();
  })
  
  //duration and current time music
  audio.addEventListener('timeupdate', (el) => {
    const currentTime = el.target.currentTime; // current time of song
    const duration = el.target.duration; // total duration of song
    let progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`;

    let musicCurrentTime = curTime;
    let musicDuration = endTime;

    audio.addEventListener('loadeddata', () => {
      // update total duration
      let audioDuration = audio.duration;
      let totalMinutes = Math.floor(audioDuration / 60);
      let totalSeconds = Math.floor(audioDuration % 60);
      if(totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
      }
      musicDuration.innerText = `${totalMinutes}:${totalSeconds}`; 
      
    })
    // update current time songs
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    musicCurrentTime.innerText = `${currentMinutes}:${currentSeconds}`;
  })
})




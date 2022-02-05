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
  const repeatBtn = document.querySelector('.player__repeat');
  const likeBtn = document.querySelector('.player__like');
  const progressLine = document.querySelector('.player__progress');
  const progressBar = document.querySelector('.player__progress-bar');
  const curTime = document.querySelector('.player__current-time');
  const endTime = document.querySelector('.player__finish-time')

  let songIndex = 2;

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
    likeBtn.classList.add('play');
    playPauseBtn.innerText = 'pause';
    audio.play();
  }

  //pause music 

  function pauseMusic() {
    player.classList.remove('pause');
    likeBtn.classList.remove('play');
    playPauseBtn.innerText = 'play_arrow';
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

  //repeat, repeat-one and shuffle
  repeatBtn.addEventListener('click', () => {
    let textIcon = repeatBtn.innerText;

    switch(textIcon) {
      case 'repeat':
        repeatBtn.innerText = 'repeat_one';
        break;
      case 'repeat_one':
        repeatBtn.innerText = 'shuffle';
        break;
      case 'shuffle':
        repeatBtn.innerText = 'repeat';
        break;
    }
  })

  //ended song
  audio.addEventListener('ended', () => {
    
    let textIcon = repeatBtn.innerText;

    switch(textIcon) {
      case 'repeat':
        nextMusic();
        break;
      case 'repeat_one':
        audio.currentTime = 0;
        loadMusic(songIndex);
        playMusic();
        break;
      case 'shuffle':
        let randomIndex = Math.floor((Math.random() * allMusic.length) + 1);

        do {
          randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
        } while(songIndex === randomIndex) {
          songIndex = randomIndex;
          loadMusic(songIndex);
          playMusic();
        }
        break;
    }
  })
})  

console.log('Выполненные требования:\n1. Вёрстка +10\n- вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5\n- в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n2. Кнопка Play/Pause +10\n- есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5\n- внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5\n3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n4. При смене аудиотрека меняется изображение - обложка аудиотрека +10\n5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n- высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо\n\nScore: 70/70\n\nЗдравствуйте! Надеюсь, что моя работа Вам понравится. Я постаралась сделать внешне приятный интерфейс плеера, а также добавила:\n- функцию повтора песен\n- функцию повтора одного трека\n- функцию перемешивания треков\n- небольшую анимацию при проигрывании трека.\n\nЕсли у Вас появятся вопросы по поводу моей работы, напишите мне, пожалуйста, в дискорд: Mariya Ivonina#5288\nСпасибо!');

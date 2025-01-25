// Tab Switching
function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach((tab) => tab.classList.remove('active'));
  document.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Music and Video Library
function openMusicLibrary() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'audio/*';
  input.multiple = true;
  input.onchange = (event) => {
    const files = event.target.files;
    const playlistContainer = document.getElementById('playlist-container');
    playlistContainer.innerHTML = ''; // Clear the previous playlist
    Array.from(files).forEach((file, index) => {
      const listItem = document.createElement('div');
      listItem.textContent = file.name;
      listItem.classList.add('playlist-item');
      listItem.onclick = () => playMusic(file, listItem);
      playlistContainer.appendChild(listItem);
    });
  };
  input.click();
}

function openVideoLibrary() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'video/*';
  input.multiple = false;
  input.onchange = (event) => {
    const file = event.target.files[0];
    const videoPlayer = document.getElementById('video-element');
    if (file) {
      const fileURL = URL.createObjectURL(file);
      videoPlayer.src = fileURL;
      videoPlayer.play();
    }
  };
  input.click();
}

// Music Player Controls
let currentAudio = null;

function playMusic(file, listItem) {
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = new Audio(URL.createObjectURL(file));
  currentAudio.play();

  // Highlight the playing song
  document.querySelectorAll('.playlist-item').forEach((item) => item.classList.remove('playing'));
  listItem.classList.add('playing');
}

function previousTrack() {
  alert('Previous track functionality can be implemented here.');
}

function playPauseMusic() {
  if (currentAudio) {
    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
  } else {
    alert('No track is currently loaded.');
  }
}

function nextTrack() {
  alert('Next track functionality can be implemented here.');
}

// Video Player Controls
function playPauseVideo() {
  const videoPlayer = document.getElementById('video-element');
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
}

function seekForward() {
  const videoPlayer = document.getElementById('video-element');
  videoPlayer.currentTime += 10;
}

function seekBackward() {
  const videoPlayer = document.getElementById('video-element');
  videoPlayer.currentTime -= 10;
}

// Equalizer
function setEqualizer(preset) {
  const bassSlider = document.getElementById('bass');
  const midSlider = document.getElementById('mid');
  const trebleSlider = document.getElementById('treble');

  switch (preset) {
    case 'bass':
      bassSlider.value = 10;
      midSlider.value = 0;
      trebleSlider.value = -5;
      break;
    case 'treble':
      bassSlider.value = -5;
      midSlider.value = 0;
      trebleSlider.value = 10;
      break;
    case 'vocal':
      bassSlider.value = 0;
      midSlider.value = 10;
      trebleSlider.value = 0;
      break;
    default:
      bassSlider.value = 0;
      midSlider.value = 0;
      trebleSlider.value = 0;
  }
  alert(`Equalizer set to ${preset}`);
}

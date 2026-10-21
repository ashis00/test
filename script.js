function getQuery() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params.entries());
}

const qs = getQuery();

const entryButton = document.querySelector('.rp-entry__cta');
if (entryButton) {
  entryButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.add('invitation-open');
    document.body.classList.remove('invitation-closed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (qs && qs.to === 'Guest' && qs.demo === 'true') {
  document.body.classList.add('invitation-open');
}

const audioToggle = document.getElementById('audio-toggle');
const musicText = document.querySelector('.rp-music__text');
const musicIcon = document.querySelector('.rp-music__icon');

const audio = new Audio('data/audio/wedding.mp3');
audio.loop = true;
audio.volume = 0.8;
audio.muted = false;

let isPlaying = true;

function setAudioState(nextState) {
  isPlaying = nextState;

  if (isPlaying) {
    audio.play().catch(() => {});
    if (audioToggle) audioToggle.setAttribute('aria-pressed', 'true');
    if (musicText) musicText.textContent = 'Sound Off';
    if (musicIcon) musicIcon.textContent = '♪';
  } else {
    audio.pause();
    if (audioToggle) audioToggle.setAttribute('aria-pressed', 'false');
    if (musicText) musicText.textContent = 'Sound On';
    if (musicIcon) musicIcon.textContent = '🔇';
  }
}

if (audioToggle) {
  audioToggle.addEventListener('click', () => {
    const nextState = !isPlaying;
    setAudioState(nextState);
  });

  setAudioState(true);
}

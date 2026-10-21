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
const musicPlayer = document.getElementById('music-player');

const youtubeVideoId = 'HBvG3pBIjp4';
let musicFrame = null;
let isPlaying = false;

function buildMusicUrl({ autoplay = true, muted = false } = {}) {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    controls: '0',
    loop: '1',
    playlist: youtubeVideoId,
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    mute: muted ? '1' : '0',
    enablejsapi: '1'
  });

  return `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?${params.toString()}`;
}

function ensureMusicPlayer() {
  if (musicFrame || !musicPlayer) return;

  const frame = document.createElement('iframe');
  frame.setAttribute('title', 'Background music');
  frame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
  frame.setAttribute('allowfullscreen', 'false');
  frame.setAttribute('frameborder', '0');
  frame.style.position = 'absolute';
  frame.style.width = '1px';
  frame.style.height = '1px';
  frame.style.border = '0';
  frame.style.opacity = '0';
  frame.style.pointerEvents = 'none';

  musicPlayer.appendChild(frame);
  musicFrame = frame;
}

function setMusicState(nextState) {
  if (!musicPlayer) return;
  ensureMusicPlayer();

  if (!musicFrame) return;

  if (nextState) {
    musicFrame.src = buildMusicUrl({ autoplay: true, muted: false });
  } else {
    musicFrame.src = 'about:blank';
  }
}

function setAudioState(nextState) {
  isPlaying = nextState;

  if (isPlaying) {
    if (audioToggle) audioToggle.setAttribute('aria-pressed', 'true');
    if (musicText) musicText.textContent = 'Sound Off';
    if (musicIcon) musicIcon.textContent = '♪';
  } else {
    if (audioToggle) audioToggle.setAttribute('aria-pressed', 'false');
    if (musicText) musicText.textContent = 'Sound On';
    if (musicIcon) musicIcon.textContent = '🔇';
  }
}

if (audioToggle) {
  audioToggle.addEventListener('click', () => {
    const nextState = !isPlaying;
    setAudioState(nextState);
    setMusicState(nextState);
  });

  setAudioState(false);
  setMusicState(false);
}

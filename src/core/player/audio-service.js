import { PLAYER_MAX_VOLUME, PLAYER_VOLUME_INCREMENT } from 'src/core/constants';
import { playerActions } from './actions';


let _audio;


export function initAudio(emit, audio = new Audio()) {
  audio.addEventListener('ended', () => emit(playerActions.audioEnded()));
  audio.addEventListener('pause', () => emit(playerActions.audioPaused()));
  audio.addEventListener('playing', () => emit(playerActions.audioPlaying()));
  audio.addEventListener('timeupdate', event => emit(playerActions.audioTimeUpdated(getTimes(event))));
  audio.addEventListener('volumechange', () => emit(playerActions.audioVolumeChanged(getVolume())));

  _audio = audio;
  return () => {};
}


export function getTimes(event) {
  const { buffered, currentTime, duration } = event.target;
  const bufferedTime = buffered.length ? buffered.end(0) : 0;

  return {
    bufferedTime,
    currentTime,
    duration,
    percentBuffered: `${(bufferedTime / duration * 100) || 0}%`,
    percentCompleted: `${(currentTime / duration * 100) || 0}%`
  };
}

export function getVolume() {
  return Math.floor(_audio.volume * 100);
}

export function setVolume(volume) {
  _audio.volume = volume / 100;
}


export const audio = {
  decreaseVolume() {
    let volume = getVolume() - PLAYER_VOLUME_INCREMENT;
    if (volume >= 0) setVolume(volume);
  },

  increaseVolume() {
    let volume = getVolume() + PLAYER_VOLUME_INCREMENT;
    if (volume <= PLAYER_MAX_VOLUME) setVolume(volume);
  },

  load(url) {
    if (url) _audio.src = url;
  },

  pause() {
    _audio.pause();
  },

  play() {
    let promise = _audio.play();
    if (promise && promise.catch) promise.catch(() => {});
  },

  seek(time) {
    _audio.currentTime = time;
  }
};

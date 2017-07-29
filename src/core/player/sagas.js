import { eventChannel } from 'redux-saga';
import { call, fork, put, select, take } from 'redux-saga/effects';
import { appActions } from 'src/core/app';
import { PLAYER_INITIAL_VOLUME } from 'src/core/constants';
import { playerActions } from './actions';
import { audio, initAudio, setVolume } from './audio-service';
import { getPlayerTrack, getPlayerTracklistCursor } from './selectors';
import { playerStorage } from './storage';


export function* playNextTrack() {
  const cursor = yield select(getPlayerTracklistCursor);
  if (cursor.nextTrackId) {
    yield put(playerActions.playSelectedTrack(cursor.nextTrackId));
  }
}

export function* playSelectedTrack() {
  const track = yield select(getPlayerTrack);
  yield call(audio.load, track.streamUrl);
  yield call(audio.play);
}

export function* saveVolumeToStorage({volume}) {
  yield call(playerStorage.setVolume, volume);
}

export function* setVolumeFromStorage() {
  let volume = yield call(playerStorage.getVolume);
  if (typeof volume !== 'number') volume = PLAYER_INITIAL_VOLUME;
  yield call(setVolume, volume);
}

export function* subscribeToAudio() {
  const channel = yield call(eventChannel, initAudio);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}


//=====================================
//  WATCHERS
//-------------------------------------

export function* watchAudioEnded() {
  while (true) {
    yield take(playerActions.AUDIO_ENDED);
    yield fork(playNextTrack);
  }
}

export function* watchAudioVolumeChanged() {
  while (true) {
    const { payload } = yield take(playerActions.AUDIO_VOLUME_CHANGED);
    yield fork(saveVolumeToStorage, payload);
  }
}

export function* watchInitApp() {
  while (true) {
    yield take(appActions.INIT_APP);
    yield fork(subscribeToAudio);
    yield fork(setVolumeFromStorage);
  }
}

export function* watchPlaySelectedTrack() {
  while (true) {
    yield take(playerActions.PLAY_SELECTED_TRACK);
    yield fork(playSelectedTrack);
  }
}


//=====================================
//  ROOT
//-------------------------------------

export const playerSagas = [
  fork(watchAudioEnded),
  fork(watchAudioVolumeChanged),
  fork(watchInitApp),
  fork(watchPlaySelectedTrack)
];

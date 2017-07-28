import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';
import { appActions } from 'src/core/app';
import { mediaQuery } from './media-query/media-query';


export function subscribe(payload) {
  return eventChannel(emit => mediaQuery.matches(payload.media, emit));
}

export function* subscribeToMediaQueries(payload) {
  const channel = yield call(subscribe, payload);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}


//=====================================
//  WATCHERS
//-------------------------------------

export function* watchInitApp() {
  while (true) {
    const { payload } = yield take(appActions.INIT_APP);
    yield fork(subscribeToMediaQueries, payload);
  }
}


//=====================================
//  ROOT
//-------------------------------------

export const browserSagas = [
  fork(watchInitApp)
];

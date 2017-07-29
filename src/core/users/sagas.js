import { call, fork, select, takeLatest } from 'redux-saga/effects';
import { fetchUser, fetchUserLikes, fetchUserTracks } from 'src/core/api';
import { getTracklistById, tracklistActions } from 'src/core/tracklists';
import { userActions } from './actions';
import { getUserById } from './selectors';


export function* loadUser({payload}) {
  const { userId } = payload;
  const user = yield select(getUserById, userId);

  if (!user || !user.profile) {
    yield call(fetchUser, userId);
  }
}

export function* loadUserLikes({payload}) {
  const { tracklistId, userId } = payload;
  const tracklist = yield select(getTracklistById, tracklistId);
  if (tracklist && tracklist.isNew) {
    yield call(fetchUserLikes, tracklistId, userId);
  }
}

export function* loadUserTracks({payload}) {
  const { tracklistId, userId } = payload;
  const tracklist = yield select(getTracklistById, tracklistId);
  if (tracklist && tracklist.isNew) {
    yield call(fetchUserTracks, tracklistId, userId);
  }
}


//=====================================
//  WATCHERS
//-------------------------------------

export function* watchLoadUser() {
  yield takeLatest(userActions.LOAD_USER, loadUser);
}

export function* watchLoadUserLikes() {
  yield takeLatest([
    userActions.LOAD_USER_LIKES, tracklistActions.LOAD_FEATURED_TRACKS
  ], loadUserLikes);
}

export function* watchLoadUserTracks() {
  yield takeLatest(userActions.LOAD_USER_TRACKS, loadUserTracks);
}


//=====================================
//  ROOT
//-------------------------------------

export const userSagas = [
  fork(watchLoadUser),
  fork(watchLoadUserLikes),
  fork(watchLoadUserTracks)
];

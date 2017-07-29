import { call, fork, select, take, takeLatest } from 'redux-saga/effects';
import { fetchSearchResults } from 'src/core/api';
import history from 'src/core/history';
import { getTracklistById } from 'src/core/tracklists';
import { searchActions } from './actions';


export function* loadSearchResults({payload}) {
  const { query, tracklistId } = payload;
  const tracklist = yield select(getTracklistById, tracklistId);
  if (tracklist && tracklist.isNew) {
    yield call(fetchSearchResults, tracklistId, query);
  }
}


//=====================================
//  WATCHERS
//-------------------------------------

export function* watchLoadSearchResults() {
  yield takeLatest(searchActions.LOAD_SEARCH_RESULTS, loadSearchResults);
}

export function* watchNavigateToSearch() {
  while (true) {
    const { payload } = yield take(searchActions.NAVIGATE_TO_SEARCH);
    yield history.push(payload);
  }
}


//=====================================
//  ROOT
//-------------------------------------

export const searchSagas = [
  fork(watchLoadSearchResults),
  fork(watchNavigateToSearch)
];

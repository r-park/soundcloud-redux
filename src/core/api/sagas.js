import { call, put } from 'redux-saga/effects';
import { tracklistRequestActions } from 'src/core/tracklists';
import { api } from './api-service';


function* fetchEntities(apiFunction, actions, id, param) {
  try {
    yield put(actions.pending(id));
    const data = yield call(apiFunction, param || id);
    yield put(actions.fulfilled(id, data));
  }
  catch (error) {
    yield put(actions.failed(error));
  }
}


export const fetchNextTracks = fetchEntities.bind(null, api.fetch, tracklistRequestActions);
export const fetchSearchResults = fetchEntities.bind(null, api.fetchSearchResults, tracklistRequestActions);

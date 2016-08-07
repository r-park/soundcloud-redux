import { Map } from 'immutable';
import { SESSION_TRACKLIST_ID } from 'src/core/constants';
import { searchActions } from 'src/core/search';
import { userActions } from 'src/core/users';
import { tracklistActions } from './actions';
import { Tracklist } from './tracklist';
import { tracklistReducer } from './tracklist-reducer';


export const initialState = new Map({
  currentTracklistId: SESSION_TRACKLIST_ID,
  [SESSION_TRACKLIST_ID]: new Tracklist({id: SESSION_TRACKLIST_ID, isNew: false})
});


export function tracklistsReducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case tracklistActions.FETCH_TRACKS_FULFILLED:
    case tracklistActions.FETCH_TRACKS_PENDING:
      return state.set(
        payload.tracklistId,
        tracklistReducer(state.get(payload.tracklistId), action)
      );

    case tracklistActions.LOAD_FEATURED_TRACKS:
    case searchActions.LOAD_SEARCH_RESULTS:
    case userActions.LOAD_USER_LIKES:
    case userActions.LOAD_USER_TRACKS:
      return state.merge({
        currentTracklistId: payload.tracklistId,
        [payload.tracklistId]: tracklistReducer(state.get(payload.tracklistId), action)
      });

    case tracklistActions.MOUNT_TRACKLIST:
      return state.set('currentTracklistId', payload.tracklistId);

    case tracklistActions.UPDATE_PAGINATION:
      return state.set(
        state.get('currentTracklistId'),
        tracklistReducer(state.get(state.get('currentTracklistId')), action)
      );

    default:
      return state;
  }
}

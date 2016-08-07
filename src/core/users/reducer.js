import { Map } from 'immutable';
import { tracklistActions } from 'src/core/tracklists';
import { userActions } from './actions';
import { createUser } from './user';


export const initialState = new Map({
  currentUserId: null
});


export function usersReducer(state = initialState, {payload, type}) {
  switch (type) {
    case tracklistActions.FETCH_TRACKS_FULFILLED:
      return state.withMutations(users => {
        payload.collection.forEach(trackData => {
          if (!users.has(trackData.user.id)) {
            users.set(trackData.user.id, createUser(trackData.user));
          }
        });
      });

    case userActions.FETCH_USER_FULFILLED:
      return state.withMutations(users => {
        const { user } = payload;
        if (!users.has(user.id) || !users.get(user.id).profile) {
          users.set(user.id, createUser(user, true));
        }
      });

    case userActions.LOAD_USER:
      return state.set('currentUserId', payload.userId);

    default:
      return state;
  }
}

import { createSelector } from 'reselect';


export function getUsers(state) {
  return state.users;
}

export function getUserById(state, userId) {
  return getUsers(state).get(userId);
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getCurrentUser = createSelector(
  getUsers,
  users => users.get(users.get('currentUserId'))
);

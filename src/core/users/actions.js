import { tracklistIdForUserLikes, tracklistIdForUserTracks } from './utils';


export const userActions = {
  FETCH_USER_FAILED: 'FETCH_USER_FAILED',
  FETCH_USER_FULFILLED: 'FETCH_USER_FULFILLED',
  FETCH_USER_PENDING: 'FETCH_USER_PENDING',

  LOAD_USER: 'LOAD_USER',
  LOAD_USER_LIKES: 'LOAD_USER_LIKES',
  LOAD_USER_TRACKS: 'LOAD_USER_TRACKS',


  fetchUserFailed: error => ({
    type: userActions.FETCH_USER_FAILED,
    payload: error
  }),

  fetchUserFulfilled: (userId, data) => ({
    type: userActions.FETCH_USER_FULFILLED,
    payload: {
      user: data
    }
  }),

  fetchUserPending: userId => ({
    type: userActions.FETCH_USER_PENDING,
    payload: {
      userId
    }
  }),

  loadUser: userId => ({
    type: userActions.LOAD_USER,
    payload: {
      userId: parseInt(userId, 10)
    }
  }),

  loadUserLikes: userId => ({
    type: userActions.LOAD_USER_LIKES,
    payload: {
      tracklistId: tracklistIdForUserLikes(userId),
      userId: parseInt(userId, 10)
    }
  }),

  loadUserTracks: userId => ({
    type: userActions.LOAD_USER_TRACKS,
    payload: {
      tracklistId: tracklistIdForUserTracks(userId),
      userId: parseInt(userId, 10)
    }
  })
};


export const userRequestActions = {
  failed: userActions.fetchUserFailed,
  fulfilled: userActions.fetchUserFulfilled,
  pending: userActions.fetchUserPending
};

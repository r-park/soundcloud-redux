import { userActions } from '../actions';
import { tracklistIdForUserLikes, tracklistIdForUserTracks } from '../utils';


describe('users', () => {
  describe('actions', () => {
    const userId = 123;


    describe('fetchUserFailed()', () => {
      it('should create an action', () => {
        let error = {};
        let action = userActions.fetchUserFailed(error);

        expect(action).toEqual({
          type: userActions.FETCH_USER_FAILED,
          payload: error
        });
      });
    });


    describe('fetchUserFulfilled()', () => {
      it('should create an action', () => {
        let user = {};
        let action = userActions.fetchUserFulfilled(userId, user);

        expect(action).toEqual({
          type: userActions.FETCH_USER_FULFILLED,
          payload: {
            user
          }
        });
      });
    });


    describe('fetchUserPending()', () => {
      it('should create an action', () => {
        let action = userActions.fetchUserPending(userId);

        expect(action).toEqual({
          type: userActions.FETCH_USER_PENDING,
          payload: {
            userId
          }
        });
      });
    });


    describe('loadUser()', () => {
      it('should create an action', () => {
        let action = userActions.loadUser(userId);

        expect(action).toEqual({
          type: userActions.LOAD_USER,
          payload: {
            userId
          }
        });
      });
    });


    describe('loadUserLikes()', () => {
      it('should create an action', () => {
        let action = userActions.loadUserLikes(userId);
        let tracklistId = tracklistIdForUserLikes(userId);

        expect(action).toEqual({
          type: userActions.LOAD_USER_LIKES,
          payload: {
            tracklistId,
            userId
          }
        });
      });
    });


    describe('loadUserTracks()', () => {
      it('should create an action', () => {
        let action = userActions.loadUserTracks(userId);
        let tracklistId = tracklistIdForUserTracks(userId);

        expect(action).toEqual({
          type: userActions.LOAD_USER_TRACKS,
          payload: {
            tracklistId,
            userId
          }
        });
      });
    });
  });
});

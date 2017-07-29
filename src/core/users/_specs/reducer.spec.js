import { tracklistActions } from 'src/core/tracklists';
import { testUtils } from 'src/core/utils/test-utils';
import { userActions } from '../actions';
import { usersReducer } from '../reducer';


describe('users', () => {
  describe('usersReducer', () => {
    describe('FETCH_TRACKS_FULFILLED action', () => {
      it('should add track.user to store', () => {
        let track = testUtils.createTrack();
        let users = usersReducer(undefined, tracklistActions.fetchTracksFulfilled('tracklist/1', {collection: [track]}));

        expect(users.has(track.user.id)).toBe(true);
      });

      it('should NOT replace user with same id', () => {
        let track = testUtils.createTrack();
        let userId = track.user.id;
        let responseData = {collection: [track]};

        let users = usersReducer(undefined, tracklistActions.fetchTracksFulfilled('tracklist/1', responseData));
        let userA = users.get(userId);

        users = usersReducer(users, tracklistActions.fetchTracksFulfilled('tracklist/1', responseData));
        let userB = users.get(userId);

        expect(userA).toBe(userB);
      });
    });


    describe('FETCH_USER_FULFILLED action', () => {
      it('should add user to state', () => {
        let userData = testUtils.createUser();
        let userId = userData.id;
        let users = usersReducer(undefined, userActions.fetchUserFulfilled(userId, userData));

        expect(users.has(userData.id)).toBe(true);
      });

      it('should replace existing user if existing user is NOT profile', () => {
        let track = testUtils.createTrack();
        let userId = track.user.id;
        let userData = testUtils.createUser(userId);

        let users = usersReducer(undefined, tracklistActions.fetchTracksFulfilled('tracklist/1', {collection: [track]}));
        let userA = users.get(userId);

        users = usersReducer(users, userActions.fetchUserFulfilled(userId, userData));
        let userB = users.get(userId);

        expect(userA.profile).toBe(false);
        expect(userB.profile).toBe(true);
      });

      it('should NOT replace existing user if existing user is profile', () => {
        let userData = testUtils.createUser();
        let userId = userData.id;

        let users = usersReducer(undefined, userActions.fetchUserFulfilled(userId, userData));
        let userA = users.get(userData.id);

        users = usersReducer(users, userActions.fetchUserFulfilled(userId, userData));
        let userB = users.get(userData.id);

        expect(userA).toBe(userB);
      });
    });


    describe('LOAD_USER action', () => {
      it('should set UsersState.currentUserId with payload.userId', () => {
        let users = usersReducer(undefined, userActions.loadUser(123));
        expect(users.get('currentUserId')).toBe(123);
      });
    });
  });
});

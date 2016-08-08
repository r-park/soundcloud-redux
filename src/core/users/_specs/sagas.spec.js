import { call, select } from 'redux-saga/effects';
import { fetchUser, fetchUserLikes, fetchUserTracks } from 'src/core/api';
import { getTracklistById } from 'src/core/tracklists';
import { userActions } from '../actions';
import { loadUser, loadUserLikes, loadUserTracks } from '../sagas';
import { getUserById } from '../selectors';
import { tracklistIdForUserLikes, tracklistIdForUserTracks } from '../utils';


describe('users', () => {
  describe('sagas', () => {
    describe('loadUser()', () => {
      let action;
      let generator;
      let userId;

      let expectedCallApi;
      let expectedSelectUser;

      beforeEach(() => {
        userId = 123;
        action = userActions.loadUser(userId);

        expectedCallApi = call(fetchUser, userId);
        expectedSelectUser = select(getUserById, userId);

        generator = loadUser(action);
      });

      describe('when user profile is in store', () => {
        it('should yield effects', () => {
          let user = {profile: true};
          expect(generator.next().value).toEqual(expectedSelectUser);
          expect(generator.next(user).done).toBe(true);
        });
      });

      describe('when basic user is in store', () => {
        it('should yield effects', () => {
          let user = {profile: false};
          expect(generator.next().value).toEqual(expectedSelectUser);
          expect(generator.next(user).value).toEqual(expectedCallApi);
          expect(generator.next().done).toBe(true);
        });
      });

      describe('when user is not in store', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedSelectUser);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.next().done).toBe(true);
        });
      });
    });


    describe('loadUserLikes()', () => {
      let action;
      let generator;
      let tracklistId;
      let userId;

      let expectedCallApi;
      let expectedSelectTracklist;

      beforeEach(() => {
        userId = 123;
        action = userActions.loadUserLikes(userId);
        tracklistId = tracklistIdForUserLikes(userId);

        expectedCallApi = call(fetchUserLikes, tracklistId, userId);
        expectedSelectTracklist = select(getTracklistById, tracklistId);

        generator = loadUserLikes(action);
      });

      describe('when tracklist is in store', () => {
        it('should yield effects', () => {
          let tracklist = {isNew: false};
          expect(generator.next().value).toEqual(expectedSelectTracklist);
          expect(generator.next(tracklist).done).toBe(true);
        });
      });

      describe('when tracklist is new', () => {
        it('should yield effects', () => {
          let tracklist = {isNew: true};
          expect(generator.next().value).toEqual(expectedSelectTracklist);
          expect(generator.next(tracklist).value).toEqual(expectedCallApi);
          expect(generator.next().done).toBe(true);
        });
      });
    });


    describe('loadUserTracks()', () => {
      let action;
      let generator;
      let tracklistId;
      let userId;

      let expectedCallApi;
      let expectedSelectTracklist;

      beforeEach(() => {
        userId = 123;
        action = userActions.loadUserTracks(userId);
        tracklistId = tracklistIdForUserTracks(userId);

        expectedCallApi = call(fetchUserTracks, tracklistId, userId);
        expectedSelectTracklist = select(getTracklistById, tracklistId);

        generator = loadUserTracks(action);
      });

      describe('when tracklist is in store', () => {
        it('should yield effects', () => {
          let tracklist = {isNew: false};
          expect(generator.next().value).toEqual(expectedSelectTracklist);
          expect(generator.next(tracklist).done).toBe(true);
        });
      });

      describe('when tracklist is new', () => {
        it('should yield effects', () => {
          let tracklist = {isNew: true};
          expect(generator.next().value).toEqual(expectedSelectTracklist);
          expect(generator.next(tracklist).value).toEqual(expectedCallApi);
          expect(generator.next().done).toBe(true);
        });
      });
    });
  });
});

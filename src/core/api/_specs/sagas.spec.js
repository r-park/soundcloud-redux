import { call, put } from 'redux-saga/effects';
import { tracklistRequestActions } from 'src/core/tracklists';
import { userRequestActions } from 'src/core/users';
import { api } from '../api-service';
import {
  fetchNextTracks,
  fetchSearchResults,
  fetchUser,
  fetchUserLikes,
  fetchUserTracks
} from '../sagas';


describe('api', () => {
  describe('sagas', () => {
    let data;
    let error;
    let generator;
    let tracklistId;
    let userId;

    let expectedCallApi;
    let expectedPutFailed;
    let expectedPutFulfilled;
    let expectedPutPending;


    beforeEach(() => {
      data = {};
      error = {};
      tracklistId = 'tracklist/1';
      userId = 123;
    });


    describe('fetchNextTracks()', () => {
      beforeEach(() => {
        expectedCallApi = call(api.fetch, 'https://next');
        expectedPutFailed = put(tracklistRequestActions.failed(error));
        expectedPutFulfilled = put(tracklistRequestActions.fulfilled(tracklistId, data));
        expectedPutPending = put(tracklistRequestActions.pending(tracklistId));

        generator = fetchNextTracks(tracklistId, 'https://next');
      });

      describe('when request is fulfilled', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedPutPending);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.next(data).value).toEqual(expectedPutFulfilled);
          expect(generator.next().done).toBe(true);
        });
      });

      describe('when request fails', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedPutPending);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.throw(error).value).toEqual(expectedPutFailed);
          expect(generator.next().done).toBe(true);
        });
      });
    });


    describe('fetchSearchResults()', () => {
      beforeEach(() => {
        expectedCallApi = call(api.fetchSearchResults, 'query');
        generator = fetchSearchResults(tracklistId, 'query');
      });

      describe('when request is fulfilled', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedPutPending);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.next(data).value).toEqual(expectedPutFulfilled);
          expect(generator.next().done).toBe(true);
        });
      });

      describe('when request fails', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedPutPending);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.throw(error).value).toEqual(expectedPutFailed);
          expect(generator.next().done).toBe(true);
        });
      });
    });


    describe('fetchUser()', () => {
      beforeEach(() => {
        expectedCallApi = call(api.fetchUser, userId);
        expectedPutFailed = put(userRequestActions.failed(error));
        expectedPutFulfilled = put(userRequestActions.fulfilled(userId, data));
        expectedPutPending = put(userRequestActions.pending(userId));

        generator = fetchUser(userId);
      });

      describe('when request is fulfilled', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedPutPending);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.next(data).value).toEqual(expectedPutFulfilled);
          expect(generator.next().done).toBe(true);
        });
      });

      describe('when request fails', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedPutPending);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.throw(error).value).toEqual(expectedPutFailed);
          expect(generator.next().done).toBe(true);
        });
      });
    });


    describe('fetchUserLikes()', () => {
      beforeEach(() => {
        expectedCallApi = call(api.fetchUserLikes, userId);
        expectedPutFailed = put(tracklistRequestActions.failed(error));
        expectedPutFulfilled = put(tracklistRequestActions.fulfilled(tracklistId, data));
        expectedPutPending = put(tracklistRequestActions.pending(tracklistId));

        generator = fetchUserLikes(tracklistId, userId);
      });

      describe('when request is fulfilled', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedPutPending);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.next(data).value).toEqual(expectedPutFulfilled);
          expect(generator.next().done).toBe(true);
        });
      });

      describe('when request fails', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedPutPending);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.throw(error).value).toEqual(expectedPutFailed);
          expect(generator.next().done).toBe(true);
        });
      });
    });


    describe('fetchUserTracks()', () => {
      beforeEach(() => {
        expectedCallApi = call(api.fetchUserTracks, userId);
        expectedPutFailed = put(tracklistRequestActions.failed(error));
        expectedPutFulfilled = put(tracklistRequestActions.fulfilled(tracklistId, data));
        expectedPutPending = put(tracklistRequestActions.pending(tracklistId));

        generator = fetchUserTracks(tracklistId, userId);
      });

      describe('when request is fulfilled', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedPutPending);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.next(data).value).toEqual(expectedPutFulfilled);
          expect(generator.next().done).toBe(true);
        });
      });

      describe('when request fails', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedPutPending);
          expect(generator.next().value).toEqual(expectedCallApi);
          expect(generator.throw(error).value).toEqual(expectedPutFailed);
          expect(generator.next().done).toBe(true);
        });
      });
    });
  });
});

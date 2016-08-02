import { call, put } from 'redux-saga/effects';
import { tracklistRequestActions } from 'src/core/tracklists';
import { api } from '../api-service';
import { fetchNextTracks } from '../sagas';


describe('api', () => {
  describe('sagas', () => {
    let data;
    let error;
    let generator;
    let tracklistId;

    let expectedCallApi;
    let expectedPutFailed;
    let expectedPutFulfilled;
    let expectedPutPending;


    beforeEach(() => {
      data = {};
      error = {};
      tracklistId = 'tracklist/1';
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
  });
});

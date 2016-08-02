import { call, put, select } from 'redux-saga/effects';
import { fetchNextTracks } from 'src/core/api';
import { tracklistActions } from '../actions';
import { loadNextTracks } from '../sagas';
import { getCurrentTracklist } from '../selectors';
import { Tracklist } from '../tracklist';


describe('tracklists', () => {
  describe('sagas', () => {
    describe('loadNextTracks()', () => {
      let action;
      let generator;
      let tracklist;

      let expectedCallApi;
      let expectedPutUpdatePagination;
      let expectedSelectCurrentTracklist;


      beforeEach(() => {
        action = tracklistActions.loadNextTracks();

        tracklist = new Tracklist({
          currentPage: 1,
          hasNextPageInStore: true,
          id: 'tracklist/1',
          nextUrl: 'https://next'
        });

        expectedCallApi = call(fetchNextTracks, tracklist.id, tracklist.nextUrl);
        expectedPutUpdatePagination = put(tracklistActions.updatePagination(tracklist.currentPage + 1));
        expectedSelectCurrentTracklist = select(getCurrentTracklist);

        generator = loadNextTracks(action);
      });


      describe('when tracklist.hasNextPageInStore is true', () => {
        it('should yield effects', () => {
          expect(generator.next().value).toEqual(expectedSelectCurrentTracklist);
          expect(generator.next(tracklist).value).toEqual(expectedPutUpdatePagination);
          expect(generator.next().done).toBe(true);
        });
      });


      describe('when tracklist.hasNextPageInStore is false and tracklist.nextUrl is defined', () => {
        it('should yield effects', () => {
          tracklist = tracklist.set('hasNextPageInStore', false);

          expect(generator.next().value).toEqual(expectedSelectCurrentTracklist);
          expect(generator.next(tracklist).value).toEqual(expectedCallApi);
          expect(generator.next(tracklist).done).toBe(true);
        });
      });
    });
  });
});

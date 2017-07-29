import { call, select, take } from 'redux-saga/effects';
import { fetchSearchResults } from 'src/core/api';
import history from 'src/core/history';
import { getTracklistById } from 'src/core/tracklists';
import { searchActions } from '../actions';
import { loadSearchResults, watchNavigateToSearch } from '../sagas';
import { tracklistIdForSearch } from '../utils';


describe('search', () => {
  describe('sagas', () => {
    describe('loadSearchResults()', () => {
      let action;
      let generator;
      let query;
      let tracklistId;

      let expectedCallApi;
      let expectedSelectTracklist;

      beforeEach(() => {
        query = 'test';
        action = searchActions.loadSearchResults(query);
        tracklistId = tracklistIdForSearch(query);

        expectedCallApi = call(fetchSearchResults, tracklistId, query);
        expectedSelectTracklist = select(getTracklistById, tracklistId);

        generator = loadSearchResults(action);
      });

      describe('when search results are in store', () => {
        it('should yield effects', () => {
          let tracklist = {isNew: false};
          expect(generator.next().value).toEqual(expectedSelectTracklist);
          expect(generator.next(tracklist).done).toBe(true);
        });
      });

      describe('when search query is new', () => {
        it('should yield effects', () => {
          let tracklist = {isNew: true};
          expect(generator.next().value).toEqual(expectedSelectTracklist);
          expect(generator.next(tracklist).value).toEqual(expectedCallApi);
          expect(generator.next().done).toBe(true);
        });
      });
    });


    describe('watchNavigateToSearch()', () => {
      it('should call history.push with action.payload.pathname', () => {
        let query = 'query';
        let action = searchActions.navigateToSearch(query);
        let generator = watchNavigateToSearch();

        spyOn(history, 'push');

        expect(generator.next().value).toEqual(take(searchActions.NAVIGATE_TO_SEARCH));

        generator.next(action);

        expect(history.push).toHaveBeenCalledWith(action.payload);
      });
    });
  });
});

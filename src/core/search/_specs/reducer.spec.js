import { is } from 'immutable';
import { searchActions } from '../actions';
import { searchReducer, SearchState } from '../reducer';


describe('search', () => {
  describe('searchReducer', () => {
    let query;

    beforeEach(() => {
      query = 'query';
    });


    describe('default case', () => {
      it('should return initial state', () => {
        let search = searchReducer(undefined, {type: 'UNDEFINED'});
        expect(is(search, new SearchState())).toBe(true);
      });
    });


    describe('LOAD_SEARCH_RESULTS action', () => {
      it('should update SearchState.currentQuery with payload.query', () => {
        let action = searchActions.loadSearchResults(query);
        let search = searchReducer(undefined, action);
        expect(search.currentQuery).toBe(query);
      });
    });


    describe('TOGGLE_SEARCH_FIELD action', () => {
      it('should toggle SearchState.open', () => {
        let action = searchActions.toggleSearchField();
        let search = searchReducer(undefined, action);

        expect(search.open).toBe(true);

        action = searchActions.toggleSearchField();
        search = searchReducer(search, action);

        expect(search.open).toBe(false);
      });
    });
  });
});

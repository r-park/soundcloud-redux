import { searchActions } from '../actions';


describe('search', () => {
  describe('actions', () => {
    describe('loadSearchResults()', () => {
      it('should create an action', () => {
        let query = 'query';
        let action = searchActions.loadSearchResults(query);

        expect(action).toEqual({
          type: searchActions.LOAD_SEARCH_RESULTS,
          payload: {
            query,
            tracklistId: `search/${query}`
          }
        });
      });
    });


    describe('navigateToSearch()', () => {
      it('should create an action', () => {
        let query = 'query';
        let action = searchActions.navigateToSearch(query);

        expect(action).toEqual({
          type: searchActions.NAVIGATE_TO_SEARCH,
          payload: {
            pathname: `/search?q=${query}`
          }
        });
      });
    });
  });
});

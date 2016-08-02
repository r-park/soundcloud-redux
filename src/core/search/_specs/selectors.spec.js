import { combineReducers, createStore } from 'redux';
import { searchReducer } from '../reducer';
import { getSearch } from '../selectors';


describe('search', () => {
  describe('selectors', () => {
    let store;

    beforeEach(() => {
      store = createStore(
        combineReducers({
          search: searchReducer
        })
      );
    });


    describe('getSearch()', () => {
      it('should return state.search', () => {
        let state = store.getState();
        expect(getSearch(state)).toBe(state.search);
      });
    });
  });
});

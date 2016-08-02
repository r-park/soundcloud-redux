import { Record } from 'immutable';
import { searchActions } from './actions';


export const SearchState = new Record({
  currentQuery: null
});


export function searchReducer(state = new SearchState(), {payload, type}) {
  switch (type) {
    case searchActions.LOAD_SEARCH_RESULTS:
      return state.set('currentQuery', payload.query);

    default:
      return state;
  }
}

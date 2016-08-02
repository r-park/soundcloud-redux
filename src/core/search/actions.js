import { tracklistIdForSearch } from './utils';


export const searchActions = {
  LOAD_SEARCH_RESULTS: 'LOAD_SEARCH_RESULTS',
  NAVIGATE_TO_SEARCH: 'NAVIGATE_TO_SEARCH',


  loadSearchResults: query => ({
    type: searchActions.LOAD_SEARCH_RESULTS,
    payload: {
      query,
      tracklistId: tracklistIdForSearch(query)
    }
  }),

  navigateToSearch: query => ({
    type: searchActions.NAVIGATE_TO_SEARCH,
    payload: {
      pathname: `/search?q=${query}`
    }
  })
};

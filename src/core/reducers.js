import { combineReducers } from 'redux';
import { searchReducer } from './search';
import { tracklistsReducer } from './tracklists';
import { tracksReducer } from './tracks';


export default combineReducers({
  search: searchReducer,
  tracklists: tracklistsReducer,
  tracks: tracksReducer
});

import { combineReducers } from 'redux';
import { playerReducer } from './player';
import { searchReducer } from './search';
import { tracklistsReducer } from './tracklists';
import { tracksReducer } from './tracks';


export default combineReducers({
  player: playerReducer,
  search: searchReducer,
  tracklists: tracklistsReducer,
  tracks: tracksReducer
});

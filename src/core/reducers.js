import { combineReducers } from 'redux';
import { browserReducer } from './browser';
import { playerReducer, playerTimesReducer } from './player';
import { searchReducer } from './search';
import { tracklistsReducer } from './tracklists';
import { tracksReducer } from './tracks';


export default combineReducers({
  browser: browserReducer,
  player: playerReducer,
  playerTimes: playerTimesReducer,
  search: searchReducer,
  tracklists: tracklistsReducer,
  tracks: tracksReducer
});

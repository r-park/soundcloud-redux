import { combineReducers } from 'redux';
import { playerReducer, playerTimesReducer } from './player';
import { searchReducer } from './search';
import { tracklistsReducer } from './tracklists';
import { tracksReducer } from './tracks';


export default combineReducers({
  player: playerReducer,
  playerTimes: playerTimesReducer,
  search: searchReducer,
  tracklists: tracklistsReducer,
  tracks: tracksReducer
});

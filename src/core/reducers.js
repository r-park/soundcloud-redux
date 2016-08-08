import { combineReducers } from 'redux';
import { browserReducer } from './browser';
import { playerReducer, playerTimesReducer } from './player';
import { searchReducer } from './search';
import { tracklistsReducer } from './tracklists';
import { tracksReducer } from './tracks';
import { usersReducer } from './users';


export default combineReducers({
  browser: browserReducer,
  player: playerReducer,
  playerTimes: playerTimesReducer,
  search: searchReducer,
  tracklists: tracklistsReducer,
  tracks: tracksReducer,
  users: usersReducer
});

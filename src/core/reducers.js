import { combineReducers } from 'redux';
import { tracklistsReducer } from './tracklists';
import { tracksReducer } from './tracks';


export default combineReducers({
  tracklists: tracklistsReducer,
  tracks: tracksReducer
});

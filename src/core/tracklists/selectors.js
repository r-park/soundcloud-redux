import { createSelector } from 'reselect';
import { TRACKS_PER_PAGE } from 'src/core/constants';
import { getTracks } from 'src/core/tracks';


export function getTracklists(state) {
  return state.tracklists;
}

export function getTracklistById(state, tracklistId) {
  return getTracklists(state).get(tracklistId);
}

export function getCurrentTracklist(state) {
  let tracklists = getTracklists(state);
  return tracklists.get(tracklists.get('currentTracklistId'));
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getCurrentPage = createSelector(
  getCurrentTracklist,
  tracklist => tracklist.currentPage
);

export const getCurrentTrackIds = createSelector(
  getCurrentTracklist,
  tracklist => tracklist.trackIds
);

export const getTracksForCurrentTracklist = createSelector(
  getCurrentPage,
  getCurrentTrackIds,
  getTracks,
  (currentPage, trackIds, tracks) => {
    return trackIds
      .slice(0, currentPage * TRACKS_PER_PAGE)
      .map(id => tracks.get(id));
  }
);

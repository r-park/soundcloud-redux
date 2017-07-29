import { createSelector } from 'reselect';
import { TRACKS_PER_PAGE } from 'src/core/constants';
import { getTracks } from 'src/core/tracks/selectors';


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

export function getTracklistCursor(selectedTrackId, trackIds) {
  let index = trackIds.indexOf(selectedTrackId);
  let nextTrackId = null;
  let previousTrackId = null;

  if (index !== -1) {
    if (index < trackIds.size - 1) nextTrackId = trackIds.get(index + 1);
    if (index > 0) previousTrackId = trackIds.get(index - 1);
  }

  return {
    nextTrackId,
    previousTrackId,
    selectedTrackId
  };
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

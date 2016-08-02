export const tracklistActions = {
  FETCH_TRACKS_FAILED: 'FETCH_TRACKS_FAILED',
  FETCH_TRACKS_FULFILLED: 'FETCH_TRACKS_FULFILLED',
  FETCH_TRACKS_PENDING: 'FETCH_TRACKS_PENDING',

  LOAD_NEXT_TRACKS: 'LOAD_NEXT_TRACKS',
  MOUNT_TRACKLIST: 'MOUNT_TRACKLIST',
  UPDATE_PAGINATION: 'UPDATE_PAGINATION',


  fetchTracksFailed: error => ({
    type: tracklistActions.FETCH_TRACKS_FAILED,
    payload: error
  }),

  fetchTracksFulfilled: (tracklistId, data) => ({
    type: tracklistActions.FETCH_TRACKS_FULFILLED,
    payload: {
      ...data,
      tracklistId
    }
  }),

  fetchTracksPending: tracklistId => ({
    type: tracklistActions.FETCH_TRACKS_PENDING,
    payload: {
      tracklistId
    }
  }),

  loadNextTracks: () => ({
    type: tracklistActions.LOAD_NEXT_TRACKS
  }),

  mountTracklist: tracklistId => ({
    type: tracklistActions.MOUNT_TRACKLIST,
    payload: {
      tracklistId
    }
  }),

  updatePagination: page => ({
    type: tracklistActions.UPDATE_PAGINATION,
    payload: {
      page
    }
  })
};


export const tracklistRequestActions = {
  failed: tracklistActions.fetchTracksFailed,
  fulfilled: tracklistActions.fetchTracksFulfilled,
  pending: tracklistActions.fetchTracksPending
};

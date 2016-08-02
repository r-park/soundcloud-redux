import { tracklistActions } from '../actions';


describe('tracklists', () => {
  describe('actions', () => {
    describe('fetchTracksFailed()', () => {
      it('should create an action', () => {
        let error = {};
        let action = tracklistActions.fetchTracksFailed(error);

        expect(action).toEqual({
          type: tracklistActions.FETCH_TRACKS_FAILED,
          payload: error
        });
      });
    });


    describe('fetchTracksFulfilled()', () => {
      it('should create an action', () => {
        let tracklistId = 'tracklist/1';
        let action = tracklistActions.fetchTracksFulfilled(tracklistId, {collection: []});

        expect(action).toEqual({
          type: tracklistActions.FETCH_TRACKS_FULFILLED,
          payload: {
            collection: [],
            tracklistId
          }
        });
      });
    });


    describe('fetchTracksPending()', () => {
      it('should create an action', () => {
        let tracklistId = 'tracklist/1';
        let action = tracklistActions.fetchTracksPending(tracklistId);

        expect(action).toEqual({
          type: tracklistActions.FETCH_TRACKS_PENDING,
          payload: {
            tracklistId
          }
        });
      });
    });


    describe('loadNextTracks()', () => {
      it('should create an action', () => {
        let action = tracklistActions.loadNextTracks();

        expect(action).toEqual({
          type: tracklistActions.LOAD_NEXT_TRACKS
        });
      });
    });


    describe('mountTracklist()', () => {
      it('should create an action', () => {
        let tracklistId = 'tracklist/1';
        let action = tracklistActions.mountTracklist(tracklistId);

        expect(action).toEqual({
          type: tracklistActions.MOUNT_TRACKLIST,
          payload: {
            tracklistId
          }
        });
      });
    });


    describe('updatePagination()', () => {
      it('should create an action', () => {
        let page = 1;
        let action = tracklistActions.updatePagination(page);

        expect(action).toEqual({
          type: tracklistActions.UPDATE_PAGINATION,
          payload: {
            page
          }
        });
      });
    });
  });
});

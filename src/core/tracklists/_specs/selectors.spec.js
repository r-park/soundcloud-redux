import { List, Map } from 'immutable';
import { combineReducers, createStore } from 'redux';
import { TRACKS_PER_PAGE } from 'src/core/constants';
import { Track, tracksReducer } from 'src/core/tracks';
import { testUtils } from 'src/core/utils/test-utils';
import { tracklistActions } from '../actions';
import { Tracklist } from '../tracklist';
import { tracklistsReducer } from '../tracklists-reducer';
import {
  getCurrentPage,
  getCurrentTrackIds,
  getCurrentTracklist,
  getTracklistById,
  getTracklistCursor,
  getTracklists,
  getTracksForCurrentTracklist
} from '../selectors';


describe('tracklists', () => {
  describe('selectors', () => {
    let store;

    beforeEach(() => {
      store = createStore(
        combineReducers({
          tracklists: tracklistsReducer,
          tracks: tracksReducer
        }),

        {
          tracklists: new Map({
            currentTracklistId: 'tracklist/1',
            'tracklist/1': new Tracklist({id: 'tracklist/1', currentPage: 1, trackIds: new List([1])}),
            'tracklist/2': new Tracklist({id: 'tracklist/2', currentPage: 1, trackIds: new List([2])})
          }),

          tracks: new Map()
            .set(1, new Track({id: 1}))
            .set(2, new Track({id: 2}))
        }
      );
    });


    afterEach(() => {
      getCurrentPage.resetRecomputations();
      getCurrentTrackIds.resetRecomputations();
      getTracksForCurrentTracklist.resetRecomputations();
    });


    describe('getCurrentPage()', () => {
      it('should return tracklist.currentPage for the currently mounted tracklist', () => {
        let currentPage = getCurrentPage(store.getState());

        expect(currentPage).toBe(1);

        store.dispatch(tracklistActions.fetchTracksFulfilled('tracklist/1', {collection: testUtils.createTracks(TRACKS_PER_PAGE, 2)}));
        currentPage = getCurrentPage(store.getState());

        expect(currentPage).toBe(2);
      });

      it('should recompute when a different tracklist is mounted', () => {
        getCurrentPage(store.getState());
        expect(getCurrentPage.recomputations()).toBe(1);

        store.dispatch(tracklistActions.mountTracklist('tracklist/2'));
        getCurrentPage(store.getState());
        expect(getCurrentPage.recomputations()).toBe(2);

        store.dispatch(tracklistActions.mountTracklist('tracklist/2')); // should not recompute: same tracklist
        getCurrentPage(store.getState());
        expect(getCurrentPage.recomputations()).toBe(2);
      });
    });


    describe('getCurrentTrackIds()', () => {
      it('should return tracklist.trackIds for the currently mounted tracklist', () => {
        let trackIds = getCurrentTrackIds(store.getState());

        expect(trackIds.size).toBe(1);
        expect(trackIds.get(0)).toBe(1);

        store.dispatch(tracklistActions.mountTracklist('tracklist/2'));
        trackIds = getCurrentTrackIds(store.getState());

        expect(trackIds.size).toBe(1);
        expect(trackIds.get(0)).toBe(2);
      });

      it('should recompute when a different tracklist is mounted', () => {
        getCurrentTrackIds(store.getState());
        expect(getCurrentTrackIds.recomputations()).toBe(1);

        store.dispatch(tracklistActions.mountTracklist('tracklist/2'));
        getCurrentTrackIds(store.getState());
        expect(getCurrentTrackIds.recomputations()).toBe(2);

        store.dispatch(tracklistActions.mountTracklist('tracklist/2')); // should not recompute: same tracklist
        getCurrentTrackIds(store.getState());
        expect(getCurrentTrackIds.recomputations()).toBe(2);
      });
    });


    describe('getTracksForCurrentTracklist()', () => {
      it('should return list of tracks for currently mounted tracklist', () => {
        let tracks = getTracksForCurrentTracklist(store.getState());
        expect(tracks.size).toBe(1);
        expect(tracks.get(0).id).toBe(1);
      });

      it('should recompute when tracklist.trackIds changes', () => {
        getTracksForCurrentTracklist(store.getState());
        expect(getTracksForCurrentTracklist.recomputations()).toBe(1);

        store.dispatch(tracklistActions.fetchTracksFulfilled('tracklist/1', {collection: [testUtils.createTrack()]}));
        getTracksForCurrentTracklist(store.getState());
        expect(getTracksForCurrentTracklist.recomputations()).toBe(2);
      });

      it('should recompute when state.tracks changes', () => {
        getTracksForCurrentTracklist(store.getState());
        expect(getTracksForCurrentTracklist.recomputations()).toBe(1);

        store.dispatch(tracklistActions.fetchTracksFulfilled('tracklist/2', {collection: [testUtils.createTrack()]}));
        getTracksForCurrentTracklist(store.getState());
        expect(getTracksForCurrentTracklist.recomputations()).toBe(2);
      });

      it('should recompute when a different tracklist is mounted', () => {
        getTracksForCurrentTracklist(store.getState());
        expect(getTracksForCurrentTracklist.recomputations()).toBe(1);

        store.dispatch(tracklistActions.mountTracklist('tracklist/2'));
        getTracksForCurrentTracklist(store.getState());
        expect(getTracksForCurrentTracklist.recomputations()).toBe(2);

        store.dispatch(tracklistActions.mountTracklist('tracklist/2')); // should not recompute: same tracklist
        getTracksForCurrentTracklist(store.getState());
        expect(getTracksForCurrentTracklist.recomputations()).toBe(2);
      });
    });


    describe('getCurrentTracklist()', () => {
      it('should return the currently mounted tracklist', () => {
        let tracklist = getCurrentTracklist(store.getState());
        expect(tracklist.id).toBe('tracklist/1');
      });
    });


    describe('getTracklistById()', () => {
      it('should return tracklist with provided tracklist id', () => {
        let state = store.getState();
        expect(getTracklistById(state, 'tracklist/1')).toBe(state.tracklists.get('tracklist/1'));
      });
    });


    describe('getTracklistCursor()', () => {
      it('should return cursor derived from provided track id and tracklist.trackIds', () => {
        let trackIds = new List([1, 2, 3]);
        let cursor = getTracklistCursor(1, trackIds); // trackIds: [1] 2 3

        expect(cursor).toEqual({
          previousTrackId: null,
          selectedTrackId: 1,
          nextTrackId: 2
        });

        cursor = getTracklistCursor(2, trackIds); // trackIds: 1 [2] 3

        expect(cursor).toEqual({
          previousTrackId: 1,
          selectedTrackId: 2,
          nextTrackId: 3
        });

        cursor = getTracklistCursor(3, trackIds); // trackIds: 1 2 [3]

        expect(cursor).toEqual({
          previousTrackId: 2,
          selectedTrackId: 3,
          nextTrackId: null
        });
      });
    });


    describe('getTracklists()', () => {
      it('should return state.tracklists', () => {
        let state = store.getState();
        expect(getTracklists(state)).toBe(state.tracklists);
      });
    });
  });
});

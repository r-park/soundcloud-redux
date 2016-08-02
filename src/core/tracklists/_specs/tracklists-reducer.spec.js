import { is, Map } from 'immutable';
import { SESSION_TRACKLIST_ID } from 'src/core/constants';
import { searchActions } from 'src/core/search';
import { tracklistActions } from '../actions';
import { Tracklist } from '../tracklist';
import { tracklistsReducer } from '../tracklists-reducer';


describe('tracklists', () => {
  describe('tracklistsReducer', () => {
    let data;
    let initialState;


    beforeEach(() => {
      data = {collection: [{id: 1}], next_href: 'http://next/2'};

      initialState = new Map({
        currentTracklistId: 'tracklist/1',
        'tracklist/1': new Tracklist({id: 'tracklist/1', currentPage: 1, isPending: false}),
        'tracklist/2': new Tracklist({id: 'tracklist/2'})
      });
    });


    describe('default case', () => {
      it('should return initial state', () => {
        let tracklists = tracklistsReducer(undefined, {type: 'UNDEFINED'});
        expect(tracklists instanceof Map).toBe(true);
        expect(tracklists.get('currentTracklistId')).toBe(SESSION_TRACKLIST_ID);
        expect(
          is(tracklists.get(SESSION_TRACKLIST_ID), new Tracklist({id: SESSION_TRACKLIST_ID, isNew: false}))
        ).toBe(true);
      });
    });


    describe('FETCH_TRACKS_FULFILLED action', () => {
      it('should update tracklist corresponding to payload.tracklistId', () => {
        let tracklist = initialState.get('tracklist/2');
        let tracklists = tracklistsReducer(initialState, tracklistActions.fetchTracksFulfilled('tracklist/2', data));
        expect(tracklists.get('tracklist/2')).not.toBe(tracklist);
      });
    });


    describe('FETCH_TRACKS_PENDING action', () => {
      it('should update tracklist corresponding to payload.tracklistId', () => {
        let tracklist = initialState.get('tracklist/1');
        let tracklists = tracklistsReducer(initialState, tracklistActions.fetchTracksPending('tracklist/1'));
        expect(tracklists.get('tracklist/1')).not.toBe(tracklist);
      });
    });


    describe('LOAD_SEARCH_RESULTS action', () => {
      let action;
      let query;
      let tracklistId;

      beforeEach(() => {
        query = 'query';
        tracklistId = `search/${query}`;

        action = {
          type: searchActions.LOAD_SEARCH_RESULTS,
          payload: {
            tracklistId
          }
        };
      });

      it('should set currentTracklistId with payload.tracklistId', () => {
        let tracklists = tracklistsReducer(initialState, action);
        expect(tracklists.get('currentTracklistId')).toBe(tracklistId);
      });

      it('should add new tracklist if tracklist does not exist', () => {
        let tracklists = tracklistsReducer(initialState, action);
        expect(tracklists.has(tracklistId)).toBe(true);
      });
    });


    describe('MOUNT_TRACKLIST action', () => {
      it('should mount tracklist with payload.tracklistId', () => {
        let tracklists = tracklistsReducer(undefined, tracklistActions.mountTracklist('tracklist/1'));
        expect(tracklists.get('currentTracklistId')).toBe('tracklist/1');
      });
    });


    describe('UPDATE_PAGINATION action', () => {
      it('should update the current tracklist', () => {
        let tracklist = initialState.get('tracklist/1');
        let tracklists = tracklistsReducer(initialState, tracklistActions.updatePagination(2));
        expect(tracklists.get('tracklist/1')).not.toBe(tracklist);
      });
    });
  });
});

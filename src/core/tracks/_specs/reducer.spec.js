import { is, Map } from 'immutable';
import { tracklistActions } from 'src/core/tracklists';
import { testUtils } from 'src/core/utils/test-utils';
import { tracksReducer } from '../reducer';
import { createTrack } from '../track';


describe('tracks', () => {
  describe('tracksReducer', () => {
    describe('default case', () => {
      it('should return initial state', () => {
        let tracksState = tracksReducer(undefined, {type: 'UNDEFINED'});
        expect(is(tracksState, new Map())).toBe(true);
      });
    });


    describe('FETCH_TRACKS_FULFILLED action', () => {
      it('should add tracks to state as Track instances created by track factory', () => {
        let data = {collection: testUtils.createTracks(3)};
        let action = tracklistActions.fetchTracksFulfilled('tracklist/1', data);
        let tracksState = tracksReducer(undefined, action);

        data.collection.forEach(trackData => {
          expect(is(tracksState.get(trackData.id), createTrack(trackData))).toBe(true);
        });
      });
    });
  });
});

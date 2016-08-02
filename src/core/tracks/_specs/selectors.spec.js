import { getTrackById, getTracks } from '../selectors';
import { Track } from '../track';


describe('tracks', () => {
  describe('selectors', () => {
    let state;

    beforeEach(() => {
      state = {
        tracks: new Map()
          .set(1, new Track({id: 1}))
          .set(2, new Track({id: 2}))
      };
    });


    describe('getTrackById()', () => {
      it('should return track with provided track id', () => {
        expect(getTrackById(state, 1)).toBe(state.tracks.get(1));
        expect(getTrackById(state, 2)).toBe(state.tracks.get(2));
      });
    });


    describe('getTracks()', () => {
      it('should return state.tracks', () => {
        expect(getTracks(state)).toBe(state.tracks);
      });
    });
  });
});

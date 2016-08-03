import { List, Map } from 'immutable';
import { PlayerState } from '../player-reducer';
import { PlayerTimesState } from '../player-times-reducer';
import {
  getPlayer,
  getPlayerIsPlaying,
  getPlayerTimes,
  getPlayerTrack,
  getPlayerTrackId,
  getPlayerTracklist,
  getPlayerTracklistCursor,
  getPlayerTracklistId
} from '../selectors';


describe('player', () => {
  describe('selectors', () => {
    let state;
    let track;
    let tracklist;


    beforeEach(() => {
      track = {id: 1};
      tracklist = {
        id: 'tracklist/1',
        trackIds: new List([1, 2, 3])
      };

      state = {
        player: new PlayerState({
          isPlaying: true,
          trackId: 1,
          tracklistId: 'tracklist/1',
          volume: 10
        }),
        playerTimes: new PlayerTimesState(),
        tracklists: new Map({'tracklist/1': tracklist}),
        tracks: new Map().set(1, track)
      };
    });


    describe('getPlayer()', () => {
      it('should return PlayerState', () => {
        expect(getPlayer(state)).toBe(state.player);
      });
    });


    describe('getPlayerIsPlaying()', () => {
      it('should return PlayerState.isPlaying', () => {
        expect(getPlayerIsPlaying(state)).toBe(true);
      });
    });


    describe('getPlayerTimes()', () => {
      it('should return PlayerTimesState', () => {
        expect(getPlayerTimes(state)).toBe(state.playerTimes);
      });
    });


    describe('getPlayerTrack()', () => {
      it('should return track corresponding to PlayerState.trackId', () => {
        expect(getPlayerTrack(state)).toBe(track);
      });
    });


    describe('getPlayerTrackId()', () => {
      it('should return PlayerState.trackId', () => {
        expect(getPlayerTrackId(state)).toBe(1);
      });
    });


    describe('getPlayerTracklist()', () => {
      it('should return tracklist corresponding to PlayerState.tracklistId', () => {
        expect(getPlayerTracklist(state)).toBe(tracklist);
      });
    });


    describe('getPlayerTracklistId()', () => {
      it('should return PlayerState.tracklistId', () => {
        expect(getPlayerTracklistId(state)).toBe('tracklist/1');
      });
    });


    describe('getPlayerTracklistCursor()', () => {
      it('should return cursor derived from player tracklist.trackIds and PlayerState.trackId', () => {
        let cursor = getPlayerTracklistCursor(state); // trackIds: [1] 2 3

        expect(cursor).toEqual({
          previousTrackId: null,
          selectedTrackId: 1,
          nextTrackId: 2
        });

        state.player = state.player.set('trackId', 2);
        cursor = getPlayerTracklistCursor(state); // trackIds: 1 [2] 3

        expect(cursor).toEqual({
          previousTrackId: 1,
          selectedTrackId: 2,
          nextTrackId: 3
        });

        state.player = state.player.set('trackId', 3);
        cursor = getPlayerTracklistCursor(state); // trackIds: 1 2 [3]

        expect(cursor).toEqual({
          previousTrackId: 2,
          selectedTrackId: 3,
          nextTrackId: null
        });
      });
    });
  });
});

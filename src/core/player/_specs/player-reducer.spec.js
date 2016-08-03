import { is } from 'immutable';
import { playerActions } from '../actions';
import { playerReducer, PlayerState } from '../player-reducer';


describe('player', () => {
  describe('playerReducer', () => {
    describe('default case', () => {
      it('should return initial state', () => {
        let player = playerReducer(undefined, {});
        expect(is(player, new PlayerState())).toBe(true);
      });
    });


    describe('AUDIO_PAUSED action', () => {
      it('should update state', () => {
        let action = playerActions.audioPaused();
        let player = playerReducer(new PlayerState({isPlaying: true}), action);

        expect(player.isPlaying).toBe(false);
      });
    });


    describe('AUDIO_PLAYING action', () => {
      it('should update state', () => {
        let action = playerActions.audioPlaying();
        let player = playerReducer(new PlayerState({isPlaying: false}), action);

        expect(player.isPlaying).toBe(true);
      });
    });


    describe('AUDIO_VOLUME_CHANGED action', () => {
      it('should update state', () => {
        let volume = 5;
        let action = playerActions.audioVolumeChanged(volume);
        let player = playerReducer(new PlayerState({volume: 10}), action);

        expect(player.volume).toBe(volume);
      });
    });


    describe('PLAY_SELECTED_TRACK action', () => {
      it('should update state', () => {
        let trackId = 123;
        let tracklistId = 'tracklist/1';
        let action = playerActions.playSelectedTrack(trackId, tracklistId);
        let player = playerReducer(undefined, action);

        expect(player.trackId).toBe(trackId);
        expect(player.tracklistId).toBe(tracklistId);
      });
    });
  });
});

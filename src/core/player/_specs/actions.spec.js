import { playerActions } from '../actions';


describe('player', () => {
  describe('actions', () => {
    describe('audioEnded()', () => {
      it('should create an action', () => {
        let action = playerActions.audioEnded();

        expect(action).toEqual({
          type: playerActions.AUDIO_ENDED
        });
      });
    });


    describe('audioPaused()', () => {
      it('should create an action', () => {
        let action = playerActions.audioPaused();

        expect(action).toEqual({
          type: playerActions.AUDIO_PAUSED
        });
      });
    });


    describe('audioPlaying()', () => {
      it('should create an action', () => {
        let action = playerActions.audioPlaying();

        expect(action).toEqual({
          type: playerActions.AUDIO_PLAYING
        });
      });
    });


    describe('audioTimeUpdated()', () => {
      it('should create an action', () => {
        let times = {buffered: 100, current: 200};
        let action = playerActions.audioTimeUpdated(times);

        expect(action).toEqual({
          type: playerActions.AUDIO_TIME_UPDATED,
          payload: times
        });
      });
    });


    describe('audioVolumeChanged()', () => {
      it('should create an action', () => {
        let volume = 5;
        let action = playerActions.audioVolumeChanged(volume);

        expect(action).toEqual({
          type: playerActions.AUDIO_VOLUME_CHANGED,
          payload: {
            volume
          }
        });
      });
    });


    describe('playSelectedTrack()', () => {
      it('should create an action', () => {
        let trackId = 123;
        let tracklistId = 'tracklist/1';
        let action = playerActions.playSelectedTrack(trackId, tracklistId);

        expect(action).toEqual({
          type: playerActions.PLAY_SELECTED_TRACK,
          payload: {
            trackId,
            tracklistId
          }
        });
      });
    });
  });
});

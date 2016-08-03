import { is } from 'immutable';
import { playerActions } from '../actions';
import { playerTimesReducer, PlayerTimesState } from '../player-times-reducer';


describe('player', () => {
  describe('playerTimesReducer', () => {
    let times;

    beforeEach(() => {
      times = {
        bufferedTime: 75,
        currentTime: 50,
        duration: 100,
        percentBuffered: '75%',
        percentCompleted: '50%'
      };
    });


    describe('default case', () => {
      it('should return initial state', () => {
        let playerTimes = playerTimesReducer(undefined, {});
        expect(is(playerTimes, new PlayerTimesState())).toBe(true);
      });
    });


    describe('AUDIO_ENDED action', () => {
      it('should update state', () => {
        let playerTimes = playerTimesReducer(
          new PlayerTimesState(times),
          playerActions.audioEnded()
        );

        expect(is(playerTimes, new PlayerTimesState())).toBe(true);
      });
    });


    describe('AUDIO_TIME_UPDATED action', () => {
      it('should update state', () => {
        let action = playerActions.audioTimeUpdated(times);
        let playerTimes = playerTimesReducer(undefined, action);

        expect(is(playerTimes, new PlayerTimesState(times))).toBe(true);
      });
    });


    describe('PLAY_SELECTED_TRACK action', () => {
      it('should update state', () => {
        let playerTimes = playerTimesReducer(
          new PlayerTimesState(times),
          playerActions.playSelectedTrack(123, 'tracklist/1')
        );

        expect(is(playerTimes, new PlayerTimesState())).toBe(true);
      });
    });
  });
});

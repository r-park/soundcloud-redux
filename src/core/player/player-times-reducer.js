import { Record } from 'immutable';
import { playerActions } from './actions';


export const PlayerTimesState = new Record({
  bufferedTime: 0,
  currentTime: 0,
  duration: 0,
  percentBuffered: '0%',
  percentCompleted: '0%'
});


export function playerTimesReducer(state = new PlayerTimesState(), {payload, type}) {
  switch (type) {
    case playerActions.AUDIO_ENDED:
    case playerActions.PLAY_SELECTED_TRACK:
      return new PlayerTimesState();

    case playerActions.AUDIO_TIME_UPDATED:
      return state.merge(payload);

    default:
      return state;
  }
}

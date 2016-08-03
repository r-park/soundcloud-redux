import { Record } from 'immutable';
import { PLAYER_INITIAL_VOLUME, SESSION_TRACKLIST_ID } from 'src/core/constants';
import { playerActions } from './actions';


export const PlayerState = new Record({
  isPlaying: false,
  trackId: null,
  tracklistId: SESSION_TRACKLIST_ID,
  volume: PLAYER_INITIAL_VOLUME
});


export function playerReducer(state = new PlayerState(), {payload, type}) {
  switch (type) {
    case playerActions.AUDIO_ENDED:
    case playerActions.AUDIO_PAUSED:
      return state.set('isPlaying', false);

    case playerActions.AUDIO_PLAYING:
      return state.set('isPlaying', true);

    case playerActions.AUDIO_VOLUME_CHANGED:
      return state.set('volume', payload.volume);

    case playerActions.PLAY_SELECTED_TRACK:
      return state.merge({
        trackId: payload.trackId,
        tracklistId: payload.tracklistId || state.get('tracklistId')
      });

    default:
      return state;
  }
}

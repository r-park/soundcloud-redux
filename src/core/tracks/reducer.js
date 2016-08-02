import { Map } from 'immutable';
import { tracklistActions } from 'src/core/tracklists';
import { createTrack } from './track';


export function tracksReducer(state = new Map(), {payload, type}) {
  switch (type) {
    case tracklistActions.FETCH_TRACKS_FULFILLED:
      return state.withMutations(tracks => {
        payload.collection.forEach(trackData => {
          tracks.set(trackData.id, createTrack(trackData));
        });
      });

    default:
      return state;
  }
}

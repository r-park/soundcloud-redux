import { Record } from 'immutable';
import { browserActions } from './actions';


export const BrowserState = new Record({
  media: {}
});


export function browserReducer(state = new BrowserState(), {payload, type}) {
  switch (type) {
    case browserActions.MEDIA_QUERY_CHANGED:
      return state.set('media', payload.results);

    default:
      return state;
  }
}

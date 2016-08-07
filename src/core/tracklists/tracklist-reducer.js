import { List } from 'immutable';
import { TRACKS_PER_PAGE } from 'src/core/constants';
import { searchActions } from 'src/core/search';
import { userActions } from 'src/core/users';
import { tracklistActions } from './actions';
import { Tracklist } from './tracklist';


export function tracklistReducer(state = new Tracklist(), {payload, type}) {
  switch (type) {
    case tracklistActions.FETCH_TRACKS_FULFILLED:
      return state.withMutations(tracklist => {
        tracklist
          .merge({
            isNew: false,
            isPending: false,
            nextUrl: payload.next_href || null,
            trackIds: mergeTrackIds(tracklist.trackIds, payload.collection)
          })
          .merge(updatePagination(tracklist, tracklist.currentPage + 1));
      });

    case tracklistActions.FETCH_TRACKS_PENDING:
      return state.set('isPending', true);

    case tracklistActions.LOAD_FEATURED_TRACKS:
    case searchActions.LOAD_SEARCH_RESULTS:
    case userActions.LOAD_USER_LIKES:
    case userActions.LOAD_USER_TRACKS:
      return state.isNew ?
             state.set('id', payload.tracklistId) :
             state.merge(updatePagination(state, 1));

    case tracklistActions.UPDATE_PAGINATION:
      return state.merge(updatePagination(state, payload.page));

    default:
      return state;
  }
}


function mergeTrackIds(trackIds, collection) {
  let ids = trackIds.toJS();
  let newIds = collection.reduce((list, trackData) => {
    if (ids.indexOf(trackData.id) === -1) list.push(trackData.id);
    return list;
  }, []);

  return newIds.length ? new List(ids.concat(newIds)) : trackIds;
}


function updatePagination(tracklist, page) {
  let pageCount = Math.ceil(tracklist.trackIds.size / TRACKS_PER_PAGE);
  let currentPage = Math.min(page, pageCount);
  let hasNextPageInStore = currentPage < pageCount;
  let hasNextPage = hasNextPageInStore || tracklist.nextUrl !== null;

  return {
    currentPage,
    hasNextPage,
    hasNextPageInStore,
    pageCount
  };
}

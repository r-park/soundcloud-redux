import { is, List } from 'immutable';
import { TRACKS_PER_PAGE } from 'src/core/constants';
import { searchActions } from 'src/core/search';
import { testUtils } from 'src/core/utils/test-utils';
import { tracklistActions } from '../actions';
import { Tracklist } from '../tracklist';
import { tracklistReducer } from '../tracklist-reducer';


describe('tracklists', () => {
  describe('tracklistReducer', () => {
    let expectedTracklist;
    let initialTracklist;
    let tracklistId;


    beforeEach(() => {
      expectedTracklist = new Tracklist({id: tracklistId});
      initialTracklist = new Tracklist({id: tracklistId});
      tracklistId = 'tracklist/1';
    });


    describe('default case', () => {
      it('should return initial state', () => {
        let tracklist = tracklistReducer(undefined, {type: 'UNDEFINED'});
        expect(is(tracklist, new Tracklist())).toBe(true);
      });
    });


    describe('FETCH_TRACKS_FULFILLED action', () => {
      it('should set tracklist.isNew to false', () => {
        initialTracklist = initialTracklist.set('isNew', true);
        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, {collection: []}));
        expect(tracklist.isNew).toBe(false);
      });

      it('should set tracklist.isPending to false', () => {
        initialTracklist = initialTracklist.set('isPending', true);
        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, {collection: []}));
        expect(tracklist.isPending).toBe(false);
      });

      it('should update tracklist.trackIds with unique ids', () => {
        let data1 = {collection: [{id: 1}, {id: 2}]};
        let data2 = {collection: [{id: 2}, {id: 3}]};

        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data1));
        tracklist = tracklistReducer(tracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data2));

        expect(tracklist.trackIds.toJS()).toEqual([1, 2, 3]);
      });

      it('should NOT update tracklist.trackIds if there are no unique ids', () => {
        let data1 = {collection: [{id: 1}, {id: 2}]};
        let data2 = {collection: [{id: 1}, {id: 2}]};

        let tracklist1 = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data1));
        let tracklist2 = tracklistReducer(tracklist1, tracklistActions.fetchTracksFulfilled(tracklistId, data2));

        expect(tracklist1.trackIds.toJS()).toEqual([1, 2]);
        expect(tracklist2.trackIds.toJS()).toEqual([1, 2]);
        expect(tracklist1.trackIds).toBe(tracklist2.trackIds);
      });

      it('should update tracklist when number of tracks received is zero', () => {
        let data = {collection: []};
        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data));

        expectedTracklist = expectedTracklist.merge({
          currentPage: 0,
          hasNextPage: false,
          hasNextPageInStore: false,
          isNew: false,
          isPending: false,
          pageCount: 0,
          trackIds: new List()
        });

        expect(is(tracklist, expectedTracklist)).toBe(true);
      });

      it('should update tracklist when number of tracks received is less than TRACKS_PER_PAGE', () => {
        let trackCount = TRACKS_PER_PAGE - 1;
        let data = {collection: testUtils.createTracks(trackCount)};
        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data));

        expectedTracklist = expectedTracklist.merge({
          currentPage: 1,
          hasNextPage: false,
          hasNextPageInStore: false,
          isNew: false,
          isPending: false,
          pageCount: 1,
          trackIds: new List(testUtils.createIds(trackCount))
        });

        expect(is(tracklist, expectedTracklist)).toBe(true);
      });

      it('should update tracklist when number of tracks received equals TRACKS_PER_PAGE', () => {
        let trackCount = TRACKS_PER_PAGE;
        let data = {collection: testUtils.createTracks(trackCount)};
        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data));

        expectedTracklist = expectedTracklist.merge({
          currentPage: 1,
          hasNextPage: false,
          hasNextPageInStore: false,
          isNew: false,
          isPending: false,
          pageCount: 1,
          trackIds: new List(testUtils.createIds(trackCount))
        });

        expect(is(tracklist, expectedTracklist)).toBe(true);
      });

      it('should update tracklist when number of tracks received is greater than TRACKS_PER_PAGE', () => {
        let pageCount = 2;
        let trackCount = TRACKS_PER_PAGE * pageCount;
        let data = {collection: testUtils.createTracks(trackCount)};
        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data));

        expectedTracklist = expectedTracklist.merge({
          currentPage: 1,
          hasNextPage: true,
          hasNextPageInStore: true,
          isNew: false,
          isPending: false,
          pageCount,
          trackIds: new List(testUtils.createIds(trackCount))
        });

        expect(is(tracklist, expectedTracklist)).toBe(true);
      });

      it('should update tracklist when total of two payloads equals TRACKS_PER_PAGE', () => {
        let trackCount = TRACKS_PER_PAGE;
        let tracks = testUtils.createTracks(trackCount);
        let data1 = {collection: [tracks.shift()]};
        let data2 = {collection: tracks};

        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data1));
        tracklist = tracklistReducer(tracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data2));

        expectedTracklist = expectedTracklist.merge({
          currentPage: 1,
          hasNextPage: false,
          hasNextPageInStore: false,
          isNew: false,
          isPending: false,
          pageCount: 1,
          trackIds: new List(testUtils.createIds(trackCount))
        });

        expect(is(tracklist, expectedTracklist)).toBe(true);
      });

      it('should update tracklist when next page is NOT in store and next_href is provided', () => {
        let data = {collection: testUtils.createTracks(1), next_href: 'https://next/2'};
        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data));

        expectedTracklist = expectedTracklist.merge({
          currentPage: 1,
          hasNextPage: true,
          hasNextPageInStore: false,
          isNew: false,
          isPending: false,
          nextUrl: data.next_href,
          pageCount: 1,
          trackIds: new List([1])
        });

        expect(is(tracklist, expectedTracklist)).toBe(true);
      });

      it('should update tracklist when next page is in store and next_href is NOT provided', () => {
        let pageCount = 2;
        let trackCount = TRACKS_PER_PAGE * pageCount;
        let data = {collection: testUtils.createTracks(trackCount)};
        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data));

        expectedTracklist = expectedTracklist.merge({
          currentPage: 1,
          hasNextPage: true,
          hasNextPageInStore: true,
          isNew: false,
          isPending: false,
          nextUrl: null,
          pageCount,
          trackIds: new List(testUtils.createIds(trackCount))
        });

        expect(is(tracklist, expectedTracklist)).toBe(true);
      });

      it('should update tracklist when next page is NOT in store and next_href is NOT provided', () => {
        let data = {collection: []};
        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksFulfilled(tracklistId, data));

        expectedTracklist = expectedTracklist.merge({
          currentPage: 0,
          hasNextPage: false,
          hasNextPageInStore: false,
          isNew: false,
          isPending: false,
          pageCount: 0,
          trackIds: new List()
        });

        expect(is(tracklist, expectedTracklist)).toBe(true);
      });
    });


    describe('FETCH_TRACKS_PENDING action', () => {
      it('should set tracklist.isPending to true', () => {
        let initialTracklist = new Tracklist({isPending: false});
        let tracklist = tracklistReducer(initialTracklist, tracklistActions.fetchTracksPending(tracklistId));
        expect(tracklist.isPending).toBe(true);
      });
    });


    describe('LOAD_SEARCH_RESULTS action', () => {
      let query;
      let tracklistId;

      beforeEach(() => {
        query = 'query';
        tracklistId = `search/${query}`;
      });

      it('should set tracklist.id if tracklist.isNew is true', () => {
        let initialTracklist = new Tracklist();
        let tracklist = tracklistReducer(initialTracklist, searchActions.loadSearchResults(query));
        expect(tracklist.id).toBe(tracklistId);
      });

      it('should reset pagination if tracklist.isNew is false', () => {
        let pageCount = 2;
        let trackCount = TRACKS_PER_PAGE * pageCount;

        initialTracklist = initialTracklist.merge({
          currentPage: 2,
          hasNextPage: false,
          hasNextPageInStore: false,
          isNew: false,
          isPending: false,
          pageCount,
          trackIds: new List(testUtils.createIds(trackCount))
        });

        expectedTracklist = expectedTracklist.merge({
          currentPage: 1,
          hasNextPage: true,
          hasNextPageInStore: true,
          isNew: false,
          isPending: false,
          pageCount,
          trackIds: new List(testUtils.createIds(trackCount))
        });

        let tracklist = tracklistReducer(initialTracklist, searchActions.loadSearchResults(query));

        expect(is(tracklist, expectedTracklist)).toBe(true);
      });
    });


    describe('UPDATE_PAGINATION action', () => {
      it('should update tracklist pagination props', () => {
        let pageCount = 2;
        let trackCount = TRACKS_PER_PAGE * pageCount;

        initialTracklist = initialTracklist.merge({
          currentPage: 1,
          hasNextPage: true,
          hasNextPageInStore: true,
          isNew: false,
          isPending: false,
          pageCount,
          trackIds: new List(testUtils.createIds(trackCount))
        });

        expectedTracklist = expectedTracklist.merge({
          currentPage: 2,
          hasNextPage: false,
          hasNextPageInStore: false,
          isNew: false,
          isPending: false,
          pageCount,
          trackIds: new List(testUtils.createIds(trackCount))
        });

        let tracklist = tracklistReducer(initialTracklist, tracklistActions.updatePagination(2));
        expect(is(tracklist, expectedTracklist)).toBe(true);
      });
    });
  });
});

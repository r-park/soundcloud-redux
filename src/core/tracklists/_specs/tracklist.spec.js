import { is, List, Record } from 'immutable';
import { Tracklist } from '../tracklist';


describe('tracklists', () => {
  describe('Tracklist', () => {
    let tracklist;

    beforeEach(() => {
      tracklist = new Tracklist();
    });

    it('should be an instance of Immutable.Record', () => {
      expect(tracklist instanceof Record).toBe(true);
    });

    it('should contain default properties', () => {
      expect(tracklist.currentPage).toBe(0);
      expect(tracklist.hasNextPage).toBe(false);
      expect(tracklist.hasNextPageInStore).toBe(false);
      expect(tracklist.id).toBe(null);
      expect(tracklist.isNew).toBe(true);
      expect(tracklist.isPending).toBe(false);
      expect(tracklist.nextUrl).toBe(null);
      expect(tracklist.pageCount).toBe(0);
      expect(is(tracklist.trackIds, new List())).toBe(true);
    });
  });
});

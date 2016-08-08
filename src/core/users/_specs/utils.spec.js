import { tracklistIdForUserLikes, tracklistIdForUserTracks } from '../utils';


describe('users', () => {
  describe('utils', () => {
    const userId = 123;


    describe('tracklistIdForUserLikes()', () => {
      it('should return generated tracklist id using provided user id', () => {
        const expectedTracklistId = `users/${userId}/likes`;
        expect(tracklistIdForUserLikes(userId)).toBe(expectedTracklistId);
      });
    });


    describe('tracklistIdForUserTracks()', () => {
      it('should return generated tracklist id using provided user id', () => {
        const expectedTracklistId = `users/${userId}/tracks`;
        expect(tracklistIdForUserTracks(userId)).toBe(expectedTracklistId);
      });
    });
  });
});

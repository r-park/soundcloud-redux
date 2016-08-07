import { browserActions } from '../actions';


describe('browser', () => {
  describe('actions', () => {
    describe('mediaQueryChanged()', () => {
      it('should create an action', () => {
        let results = {
          medium: false,
          large: false,
          landscape: false
        };

        let action = browserActions.mediaQueryChanged(results);

        expect(action).toEqual({
          type: browserActions.MEDIA_QUERY_CHANGED,
          payload: {
            results
          }
        });
      });
    });
  });
});

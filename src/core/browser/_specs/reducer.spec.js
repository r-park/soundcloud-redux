import { is } from 'immutable';
import { browserActions } from '../actions';
import { browserReducer, BrowserState } from '../reducer';


describe('browser', () => {
  describe('browserReducer', () => {
    let mediaQueryResults;

    beforeEach(() => {
      mediaQueryResults = {
        small: false,
        medium: true,
        large: false
      };
    });


    describe('default case', () => {
      it('should return initial state', () => {
        let browser = browserReducer(undefined, {});
        expect(is(browser, new BrowserState())).toBe(true);
      });
    });


    describe('MEDIA_QUERY_CHANGED action', () => {
      it('should update state', () => {
        let browser = browserReducer(
          undefined,
          browserActions.mediaQueryChanged(mediaQueryResults)
        );

        expect(is(browser, new BrowserState({media: mediaQueryResults}))).toBe(true);
      });
    });
  });
});

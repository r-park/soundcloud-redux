import { BrowserState } from '../reducer';
import { getBrowserMedia } from '../selectors';


describe('browser', () => {
  describe('selectors', () => {
    let state;

    beforeEach(() => {
      state = {
        browser: new BrowserState()
      };
    });

    describe('getBrowserMedia()', () => {
      it('should return BrowserState', () => {
        expect(getBrowserMedia(state)).toBe(state.browser.media);
      });
    });
  });
});

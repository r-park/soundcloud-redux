import { browserActions } from '../actions';
import { em, getMedia, mediaQuery } from '../media-query/media-query';
import { getMediaQueryRules, MediaQueryListStub } from './helpers';


describe('browser', () => {
  describe('mediaQuery', () => {
    let mediaQueryLists;


    beforeEach(() => {
      mediaQueryLists = [];

      spyOn(window, 'matchMedia').and.callFake(media => {
        let mql = new MediaQueryListStub(media);
        mediaQueryLists.push(mql);
        return mql;
      });
    });


    it('should immediately emit initial results on subscribe', () => {
      let expectedAction = browserActions.mediaQueryChanged({
        medium: false,
        large: false,
        landscape: false
      });

      mediaQuery.matches(getMediaQueryRules(), results => {
        expect(results).toEqual(expectedAction);
      });
    });

    it('should debounce emitted results', done => {
      let count = 0;
      let finalResults = null;

      let expectedAction = browserActions.mediaQueryChanged({
        medium: false,
        large: true,
        landscape: false
      });

      mediaQuery.matches(getMediaQueryRules(), results => {
        count++;
        finalResults = results;
      });

      setTimeout(() => {
        mediaQueryLists[1].matches = true;
        mediaQueryLists.forEach(mql => mql.dispatch());
      }, 100);

      setTimeout(() => {
        expect(count).toBe(2); // 1 for initial results, plus 1 for manual dispatch
        expect(finalResults).toEqual(expectedAction);
        done();
      }, 200);
    });

    it('should unsubscribe', done => {
      let count = 0;

      let unsubscribe = mediaQuery.matches(getMediaQueryRules(), () => {
        count++; // count === 1 for initial results
      });

      setTimeout(() => {
        mediaQueryLists.forEach(mql => mql.dispatch()); // count === 2
      }, 10);

      setTimeout(() => {
        unsubscribe();
        mediaQueryLists.forEach(mql => mql.dispatch()); // count === 3
      }, 20);

      setTimeout(() => {
        expect(count).toBe(2);
        done();
      }, 30);
    });


    describe('em()', () => {
      it('should throw TypeError if provided value is not a number', () => {
        expect(() => em()).toThrowError(TypeError);
        expect(() => em(null)).toThrowError(TypeError);
        expect(() => em('1')).toThrowError(TypeError);
        expect(() => em({})).toThrowError(TypeError);
        expect(() => em([])).toThrowError(TypeError);
      });

      it('should convert provided number to string em value', () => {
        let expectedEmValue = `${100 / 16}em`;
        expect(em(100)).toBe(expectedEmValue);
      });

      it('should return zero if provided number is zero', () => {
        let expectedEmValue = 0;
        expect(em(0)).toBe(expectedEmValue);
      });
    });


    describe('getMedia()', () => {
      const id = 'large';

      it('should create media query string with provided `type`', () => {
        let media = getMedia({id, type: 'print'});
        expect(media).toBe('print');
      });

      it('should create media query string with default `type`', () => {
        let media = getMedia({id});
        expect(media).toBe('screen');
      });

      it('should create media query string with provided `maxWidth`', () => {
        let media = getMedia({id, maxWidth: 320});
        expect(media).toBe('screen and (max-width: 20em)');
      });

      it('should create media query string with provided `minWidth`', () => {
        let media = getMedia({id, minWidth: 320});
        expect(media).toBe('screen and (min-width: 20em)');
      });

      it('should create media query string with provided `orientation`', () => {
        let media = getMedia({id, orientation: 'portrait'});
        expect(media).toBe('screen and (orientation: portrait)');

        media = getMedia({id, orientation: 'landscape'});
        expect(media).toBe('screen and (orientation: landscape)');
      });

      it('should create media query string when multiple features are provided', () => {
        let expectedValue = 'all and (min-width: 20em) and (max-width: 40em) and (orientation: portrait)';

        let media = getMedia({
          id,
          maxWidth: 640,
          minWidth: 320,
          orientation: 'portrait',
          type: 'all'
        });

        expect(media).toBe(expectedValue);
      });
    });
  });
});

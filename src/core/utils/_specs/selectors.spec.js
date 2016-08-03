import { createShallowEqualSelector } from '../selectors';


describe('utils', () => {
  describe('createShallowEqualSelector', () => {
    let selector;

    beforeEach(() => {
      let getTest = state => {
        return state.test;
      };

      selector = createShallowEqualSelector(
        getTest,
        test => test
      );
    });

    afterEach(() => {
      selector.resetRecomputations();
    });


    it('should NOT recompute when objects are identical (strict equality)', () => {
      let test = {foo: 'bar'};

      selector({test});

      expect(selector.recomputations()).toBe(1);

      selector({test});

      expect(selector.recomputations()).toBe(1);
    });

    it('should NOT recompute when object properties are equal', () => {
      selector({
        test: {foo: 'bar'}
      });

      expect(selector.recomputations()).toBe(1);

      selector({
        test: {foo: 'bar'}
      });

      expect(selector.recomputations()).toBe(1);
    });

    it('should recompute when object properties are NOT equal', () => {
      selector({
        test: {foo: 'bar'}
      });

      expect(selector.recomputations()).toBe(1);

      selector({
        test: {foo: 'baz'}
      });

      expect(selector.recomputations()).toBe(2);
    });

    it('should recompute when object property counts are different', () => {
      selector({
        test: {foo: 'bar'}
      });

      expect(selector.recomputations()).toBe(1);

      selector({
        test: {foo: 'bar', fiz: 'baz'}
      });

      expect(selector.recomputations()).toBe(2);
    });
  });
});

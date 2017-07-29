import sinon from 'sinon';
import { testUtils } from '../test-utils';
import { localStorageAdapter } from '../local-storage';


describe('utils', () => {
  beforeAll(() => {
    testUtils.mockLocalStorage();
  });

  describe('localStorageAdapter', () => {
    let storageKey;
    let value;

    beforeEach(() => {
      storageKey = 'soundcloud-redux:test';
      value = {"foo": "bar", "baz": 123}; // eslint-disable-line quotes
    });

    afterEach(() => {
      localStorage.removeItem(storageKey);
    });

    it('should set serialized object into localStorage', () => {
      sinon.spy(localStorage, 'setItem');
      localStorageAdapter.setItem(storageKey, value);

      expect(localStorage.setItem.calledWith(storageKey, JSON.stringify(value))).toBe(true);
    });

    it('should get serialized object from localStorage', () => {
      localStorage.setItem(storageKey, JSON.stringify(value));
      expect(localStorageAdapter.getItem(storageKey)).toEqual(value);
    });

    it('should return null if serialized object is not found in localStorage', () => {
      expect(localStorageAdapter.getItem(storageKey)).toEqual(null);
    });

    it('should remove key and corresponding value from localStorage', () => {
      localStorage.setItem(storageKey, JSON.stringify(value));
      localStorageAdapter.removeItem(storageKey);
      expect(localStorage.getItem(storageKey)).toBe(null);
    });
  });
});

import sinon from 'sinon';
import { testUtils } from 'src/core/utils/test-utils';
import { PLAYER_STORAGE_KEY } from 'src/core/constants';
import { playerStorage } from '../storage';


describe('player', () => {
  beforeAll(() => {
    testUtils.mockLocalStorage();
  });

  describe('playerStorage', () => {
    let prefs;

    beforeAll(() => {
      localStorage.removeItem(PLAYER_STORAGE_KEY);
    });

    beforeEach(() => {
      prefs = {volume: 50};
    });

    afterEach(() => {
      localStorage.removeItem(PLAYER_STORAGE_KEY);
    });


    it('should get serialized prefs from localStorage', () => {
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(prefs));
      expect(playerStorage.getPrefs()).toEqual(prefs);
    });

    it('should return an empty object if prefs are not found in localStorage', () => {
      expect(playerStorage.getPrefs()).toEqual({});
    });

    it('should put serialized prefs into localStorage', () => {
      sinon.spy(localStorage, 'setItem');
      playerStorage.setPrefs(prefs);

      expect(localStorage.setItem.calledWith(
        PLAYER_STORAGE_KEY,
        JSON.stringify(prefs)
      )).toBe(true);
    });

    it('should get volume from localStorage', () => {
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(prefs));
      expect(playerStorage.getVolume()).toBe(prefs.volume);
    });

    it('should put volume into localStorage', () => {
      playerStorage.setVolume(75);
      expect(JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)).volume).toBe(75);
    });

    it('should remove key and corresponding value from localStorage', () => {
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(prefs));
      playerStorage.clear();
      expect(localStorage.getItem(PLAYER_STORAGE_KEY)).toBe(null);
    });
  });
});

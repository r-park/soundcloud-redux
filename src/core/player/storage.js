import { PLAYER_STORAGE_KEY } from 'src/core/constants';
import { localStorageAdapter } from 'src/core/utils';


export const playerStorage = {
  clear() {
    localStorageAdapter.removeItem(PLAYER_STORAGE_KEY);
  },

  getPrefs() {
    return localStorageAdapter.getItem(PLAYER_STORAGE_KEY) || {};
  },

  setPrefs(prefs) {
    localStorageAdapter.setItem(PLAYER_STORAGE_KEY, prefs);
  },

  getVolume() {
    return playerStorage.getPrefs().volume;
  },

  setVolume(value) {
    let prefs = playerStorage.getPrefs();
    prefs.volume = value;
    playerStorage.setPrefs(prefs);
  }
};

import { eventChannel } from 'redux-saga';
import { call, fork, put, select, take } from 'redux-saga/effects';
import { appActions } from 'src/core/app';
import { PLAYER_INITIAL_VOLUME } from 'src/core/constants';
import { playerActions } from '../actions';
import { audio, initAudio, setVolume } from '../audio-service';
import {
  playNextTrack,
  playSelectedTrack,
  saveVolumeToStorage,
  setVolumeFromStorage,
  subscribeToAudio,
  watchAudioEnded,
  watchAudioVolumeChanged,
  watchInitApp,
  watchPlaySelectedTrack
} from '../sagas';
import { getPlayerTrack, getPlayerTracklistCursor } from '../selectors';
import { playerStorage } from '../storage';


describe('player', () => {
  describe('sagas', () => {
    describe('playNextTrack()', () => {
      let cursor;
      let expectedSelectPlayerTracklistCursor;
      let expectedPutPlaySelectedTrack;

      beforeEach(() => {
        cursor = {nextTrackId: 1, previousTrackId: null, selectedTrackId: null};
        expectedPutPlaySelectedTrack = put(playerActions.playSelectedTrack(cursor.nextTrackId));
        expectedSelectPlayerTracklistCursor = select(getPlayerTracklistCursor);
      });

      describe('when player tracklist has next track', () => {
        it('should yield effects', () => {
          let generator = playNextTrack();

          expect(generator.next().value).toEqual(expectedSelectPlayerTracklistCursor);
          expect(generator.next(cursor).value).toEqual(expectedPutPlaySelectedTrack);
          expect(generator.next().done).toBe(true);
        });
      });

      describe('when player tracklist does NOT have next track', () => {
        it('should yield effects', () => {
          let generator = playNextTrack();

          cursor.nextTrackId = null;

          expect(generator.next().value).toEqual(expectedSelectPlayerTracklistCursor);
          expect(generator.next(cursor).done).toBe(true);
        });
      });
    });


    describe('playSelectedTrack()', () => {
      it('should load and play track', () => {
        let track = {streamUrl: 'http://stream'};

        let expectedSelectPlayerTrack = select(getPlayerTrack);
        let expectedCallAudioLoad = call(audio.load, track.streamUrl);
        let expectedCallAudioPlay = call(audio.play);

        let generator = playSelectedTrack();

        expect(generator.next().value).toEqual(expectedSelectPlayerTrack);
        expect(generator.next(track).value).toEqual(expectedCallAudioLoad);
        expect(generator.next().value).toEqual(expectedCallAudioPlay);
        expect(generator.next().done).toBe(true);
      });
    });


    describe('saveVolumeToStorage()', () => {
      it('should call playerStorage.setVolume()', () => {
        let payload = {volume: 10};
        let generator = saveVolumeToStorage(payload);

        expect(generator.next().value).toEqual(
          call(playerStorage.setVolume, payload.volume)
        );
      });
    });


    describe('setVolumeFromStorage()', () => {
      describe('when volume is found in localStorage', () => {
        const generator = setVolumeFromStorage();

        it('should call playerStorage.getVolume()', () => {
          expect(generator.next().value).toEqual(
            call(playerStorage.getVolume)
          );
        });

        it('should call audioService.setVolume() with provided volume', () => {
          let volume = 200;
          expect(generator.next(volume).value).toEqual(
            call(setVolume, volume)
          );
        });
      });

      describe('when volume is NOT found in localStorage', () => {
        const generator = setVolumeFromStorage();

        it('should call playerStorage.getVolume()', () => {
          expect(generator.next().value).toEqual(
            call(playerStorage.getVolume)
          );
        });

        it('should call audioService.setVolume() with PLAYER_INITIAL_VOLUME', () => {
          expect(generator.next(null).value).toEqual(
            call(setVolume, PLAYER_INITIAL_VOLUME)
          );
        });
      });
    });


    describe('subscribeToAudio()', () => {
      const generator = subscribeToAudio();

      it('should call subscribe()', () => {
        expect(generator.next().value).toEqual(
          call(eventChannel, initAudio)
        );
      });

      it('should take eventChannel', () => {
        let channel = eventChannel(() => () => {});

        expect(generator.next(channel).value).toEqual(
          take(channel)
        );
      });

      it('should put action emitted by eventChannel', () => {
        let action = {type: 'ACTION'};

        expect(generator.next(action).value).toEqual(
          put(action)
        );
      });
    });


    describe('watchAudioEnded()', () => {
      const generator = watchAudioEnded();

      it('should take AUDIO_ENDED action', () => {
        expect(generator.next().value).toEqual(
          take(playerActions.AUDIO_ENDED)
        );
      });

      it('should fork playNextTrack()', () => {
        expect(generator.next().value).toEqual(
          fork(playNextTrack)
        );
      });
    });


    describe('watchAudioVolumeChanged()', () => {
      const generator = watchAudioVolumeChanged();

      it('should take AUDIO_VOLUME_CHANGED action', () => {
        expect(generator.next().value).toEqual(
          take(playerActions.AUDIO_VOLUME_CHANGED)
        );
      });

      it('should fork saveVolumeToStorage()', () => {
        let action = {payload: {volume: 10}};

        expect(generator.next(action).value).toEqual(
          fork(saveVolumeToStorage, action.payload)
        );
      });
    });


    describe('watchInitApp()', () => {
      const generator = watchInitApp();

      it('should take INIT_APP action', () => {
        expect(generator.next().value).toEqual(
          take(appActions.INIT_APP)
        );
      });

      it('should fork subscribeToAudio()', () => {
        expect(generator.next().value).toEqual(
          fork(subscribeToAudio)
        );
      });

      it('should fork setVolumeFromStorage()', () => {
        expect(generator.next().value).toEqual(
          fork(setVolumeFromStorage)
        );
      });
    });


    describe('watchPlaySelectedTrack()', () => {
      const generator = watchPlaySelectedTrack();

      it('should take PLAY_SELECTED_TRACK action', () => {
        expect(generator.next().value).toEqual(
          take(playerActions.PLAY_SELECTED_TRACK)
        );
      });

      it('should fork playSelectedTrack()', () => {
        expect(generator.next().value).toEqual(
          fork(playSelectedTrack)
        );
      });
    });
  });
});

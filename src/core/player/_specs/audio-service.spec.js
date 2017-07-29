import { testUtils } from 'src/core/utils/test-utils';
import { playerActions } from '../actions';
import { audio as audioService, initAudio } from '../audio-service';


describe('player', () => {
  describe('audio service', () => {
    let audio;
    let emitter;


    beforeEach(() => {
      audio = new Audio();
      emitter = jasmine.createSpy('emitter');

      initAudio(emitter, audio);
    });


    describe('audio events', () => {
      it('`ended` event should emit AUDIO_ENDED action', () => {
        let event = new Event('ended');
        audio.dispatchEvent(event);

        expect(emitter).toHaveBeenCalledWith(
          playerActions.audioEnded()
        );
      });

      it('`pause` event should emit AUDIO_PAUSED action', () => {
        let event = new Event('pause');
        audio.dispatchEvent(event);

        expect(emitter).toHaveBeenCalledWith(
          playerActions.audioPaused()
        );
      });

      it('`playing` event should emit AUDIO_PLAYING action', () => {
        let event = new Event('playing');
        audio.dispatchEvent(event);

        expect(emitter).toHaveBeenCalledWith(
          playerActions.audioPlaying()
        );
      });

      it('`volumechange` event should emit AUDIO_VOLUME_CHANGED action', () => {
        let event = new Event('volumechange');
        audio.volume = 0.5;
        audio.dispatchEvent(event);

        expect(emitter).toHaveBeenCalledWith(
          playerActions.audioVolumeChanged(50)
        );
      });
    });


    describe('decreaseVolume()', () => {
      it('should decrement volume by PLAYER_VOLUME_INCREMENT', () => {
        let volumes = testUtils.getVolumes();
        volumes.reverse().shift();

        audio.volume = 1;

        volumes.forEach(volume => {
          audioService.decreaseVolume();
          expect(audio.volume).toBe(volume.actual);
        });
      });

      it('should NOT decrement volume below zero', () => {
        audio.volume = 0;
        expect(() => audioService.decreaseVolume()).not.toThrow();
      });
    });


    describe('increaseVolume()', () => {
      it('should increment volume by PLAYER_VOLUME_INCREMENT', () => {
        let volumes = testUtils.getVolumes();
        volumes.shift();

        audio.volume = 0;

        volumes.forEach(volume => {
          audioService.increaseVolume();
          expect(audio.volume).toBe(volume.actual);
        });
      });

      it('should NOT increment volume beyond 1', () => {
        audio.volume = 1;
        expect(() => audioService.increaseVolume()).not.toThrow();
      });
    });


    describe('load()', () => {
      it('should set audio.src if track has stream url', () => {
        let streamUrl = 'https://stream';
        audioService.load(streamUrl);
        expect(audio.src).toMatch(streamUrl);
      });

      it('should NOT set audio.src if track does not have stream url', () => {
        audioService.load();
        expect(audio.src).toBe('');
      });
    });


    describe('pause()', () => {
      it('should call audio.pause()', () => {
        spyOn(audio, 'pause');
        audioService.pause();
        expect(audio.pause).toHaveBeenCalledTimes(1);
      });
    });


    describe('play()', () => {
      it('should call audio.play()', () => {
        spyOn(audio, 'play');
        audioService.play();
        expect(audio.play).toHaveBeenCalledTimes(1);
      });
    });


    describe('seek()', () => {
      it('should set audio.currentTime', () => {
        audioService.seek(100);
        expect(audio.currentTime).toBe(100);
      });
    });
  });
});

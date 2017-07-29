import React from 'react';
import { shallow } from 'enzyme';
import { Track } from 'src/core/tracks';
import { Player } from './player';


describe('views', () => {
  describe('Player', () => {
    let props;
    let track;

    beforeEach(() => {
      track = new Track({
        duration: 400,
        title: 'Track Title'
      });

      props = {
        decreaseVolume: () => {},
        increaseVolume: () => {},
        isPlaying: false,
        nextTrack: () => {},
        pause: () => {},
        play: () => {},
        previousTrack: () => {},
        track,
        volume: 10
      };
    });


    function getWrapper() {
      return shallow(
        <Player {...props} />
      );
    }


    it('should display track title', () => {
      expect(getWrapper().find('.player-controls__title').text()).toBe(track.title);
    });

    it('should have a AudioCurrentTime', () => {
      let audioCurrentTime = getWrapper().find('.player-controls__time Connect(FormattedTime)');
      expect(audioCurrentTime.length).toBe(1);
    });

    it('should have a AudioTimeline', () => {
      let audioTimeline = getWrapper().find('.player-timeline Connect(AudioTimeline)');
      expect(audioTimeline.length).toBe(1);
    });

    it('should have a FormattedTime for track duration', () => {
      let formattedTime = getWrapper().find('.player-controls__time FormattedTime');
      expect(formattedTime.length).toBe(1);
      expect(formattedTime.prop('value')).toBe(track.duration);
      expect(formattedTime.prop('unit')).toBe('ms');
    });

    it('should have a FormattedVolume for player volume', () => {
      let formattedVolume = getWrapper().find('.player-controls__volume FormattedVolume');
      expect(formattedVolume.length).toBe(1);
      expect(formattedVolume.prop('value')).toBe(props.volume);
    });

    it('should have a `decrease volume` button', () => {
      let buttons = getWrapper().find('.player-controls__volume IconButton');
      expect(buttons.at(0).prop('onClick')).toBe(props.decreaseVolume);
    });

    it('should have a `increase volume` button', () => {
      let buttons = getWrapper().find('.player-controls__volume IconButton');
      expect(buttons.at(1).prop('onClick')).toBe(props.increaseVolume);
    });

    it('should have a `pause` button when player is playing', () => {
      props.isPlaying = true;
      let buttons = getWrapper().find('.player-controls div IconButton');
      expect(buttons.at(1).prop('onClick')).toBe(props.pause);
    });

    it('should have a `play` button when player is NOT playing', () => {
      props.isPlaying = false;
      let buttons = getWrapper().find('.player-controls div IconButton');
      expect(buttons.at(1).prop('onClick')).toBe(props.play);
    });

    it('should have a `skip-next` button', () => {
      props.isPlaying = true;
      let buttons = getWrapper().find('.player-controls div IconButton');
      expect(buttons.at(2).prop('onClick')).toBe(props.nextTrack);
    });

    it('should have a `skip-previous` button', () => {
      props.isPlaying = false;
      let buttons = getWrapper().find('.player-controls div IconButton');
      expect(buttons.at(0).prop('onClick')).toBe(props.previousTrack);
    });
  });
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Track } from 'src/core/tracks';
import TrackCard from './track-card';


describe('views', () => {
  describe('TrackCard', () => {
    let props;
    let track;

    beforeEach(() => {
      track = new Track({
        artworkUrl: 'https://i1.sndcdn.com/artwork-large.jpg',
        duration: 400,
        likesCount: 100,
        playbackCount: 200,
        title: 'Track Title',
        userId: 123,
        username: 'Track Username',
        waveformUrl: 'https://w1.sndcdn.com/9876_m.png'
      });

      props = {
        isCompact: false,
        isPlaying: false,
        isSelected: true,
        pause: () => {},
        play: () => {},
        track
      };
    });


    function getWrapper() {
      return shallow(
        <TrackCard {...props} />
      );
    }


    it('should NOT update unless shouldComponentUpdate() returns true', () => {
      spyOn(TrackCard.prototype, 'render').and.callThrough();

      let wrapper = getWrapper();
      expect(TrackCard.prototype.render).toHaveBeenCalledTimes(1);

      wrapper.setProps(props);
      expect(TrackCard.prototype.render).toHaveBeenCalledTimes(1);

      props.track = track.set('likesCount', track.likesCount + 1);
      wrapper.setProps(props);
      expect(TrackCard.prototype.render).toHaveBeenCalledTimes(2);

      props.isPlaying = true;
      wrapper.setProps(props);
      expect(TrackCard.prototype.render).toHaveBeenCalledTimes(3);

      props.isSelected = false;
      wrapper.setProps(props);
      expect(TrackCard.prototype.render).toHaveBeenCalledTimes(4);

      wrapper.setProps(props);
      expect(TrackCard.prototype.render).toHaveBeenCalledTimes(4);
    });

    it('should display username linking to user-tracks route', () => {
      let link = getWrapper().find('Link');
      expect(link.length).toBe(1);
      expect(link.prop('to')).toBe(`/users/${track.userId}/tracks`);
    });

    it('should display track title', () => {
      expect(getWrapper().find('.track-card__title').text()).toBe(track.title);
    });

    it('should have a `pause` button if track is playing', () => {
      props.isPlaying = true;
      let button = getWrapper().find('IconButton');
      expect(button.prop('onClick')).toBe(props.pause);
    });

    it('should have a `play` button if track is NOT playing', () => {
      props.isPlaying = false;
      let button = getWrapper().find('IconButton');
      expect(button.prop('onClick')).toBe(props.play);
    });

    it('should display FormattedTime for track duration', () => {
      let formattedTime = getWrapper().find('FormattedTime');
      expect(formattedTime.length).toBe(1);
      expect(formattedTime.prop('value')).toBe(track.duration);
      expect(formattedTime.prop('unit')).toBe('ms');
    });
  });
});

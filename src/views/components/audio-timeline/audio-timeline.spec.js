import React from 'react';
import { shallow } from 'enzyme';
import { PlayerTimesState } from 'src/core/player';
import { AudioTimeline } from './audio-timeline';


describe('views', () => {
  describe('AudioTimeline', () => {
    let seek;
    let times;

    beforeEach(() => {
      seek = jasmine.createSpy('seek');

      times = new PlayerTimesState({
        bufferedTime: 200,
        duration: 400,
        percentBuffered: '50%',
        percentCompleted: '25%'
      });
    });


    function getWrapper() {
      return shallow(
        <AudioTimeline
          seek={seek}
          times={times}
        />
      );
    }


    it('should have class `audio-timeline`', () => {
      expect(getWrapper().hasClass('audio-timeline')).toBe(true);
    });

    it('should contain bar for buffered time with width equal to `percentBuffered`', () => {
      let wrapper = getWrapper();
      let bar = wrapper.find('.bar--buffered');

      expect(bar.length).toBe(1);
      expect(bar.prop('style').width).toBe(times.percentBuffered);
    });

    it('should add class `bar--animated` to buffered bar when `bufferedTime` > 0', () => {
      let wrapper = getWrapper();
      let bar = wrapper.find('.bar--buffered');

      expect(bar.hasClass('bar--animated')).toBe(true);

      times = times.set('bufferedTime', 0);
      wrapper = getWrapper();
      bar = wrapper.find('.bar--buffered');

      expect(wrapper.hasClass('bar--animated')).not.toBe(true);
    });

    it('should contain bar for completed time with width equal to `percentCompleted`', () => {
      let wrapper = getWrapper();
      let bar = wrapper.find('.bar--completed');

      expect(bar.length).toBe(1);
      expect(bar.prop('style').width).toBe(times.percentCompleted);
    });

    it('should invoke seek handler when clicked', () => {
      let getBoundingClientRectLeft = 100;
      let offsetWidth = 200;
      let pageX = 200;

      let event = {
        currentTarget: {
          getBoundingClientRect: () => ({left: getBoundingClientRectLeft}),
          offsetWidth
        },
        pageX
      };

      let expectedSeekValue = (pageX - getBoundingClientRectLeft) / offsetWidth * times.duration;

      getWrapper().simulate('click', event);

      expect(seek).toHaveBeenCalledTimes(1);
      expect(seek).toHaveBeenCalledWith(expectedSeekValue);
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { createTrack } from 'src/core/tracks';
import { testUtils } from 'src/core/utils/test-utils';
import { Tracklist } from './tracklist';


describe('views', () => {
  describe('Tracklist', () => {
    let props;

    beforeEach(() => {
      props = {
        displayLoadingIndicator: false,
        isMediaLarge: false,
        isPlaying: false,
        loadNextTracks: () => {},
        pause: () => {},
        pauseInfiniteScroll: false,
        play: () => {},
        selectTrack: () => {},
        selectedTrackId: 1,
        tracklistId: 'tracklist/1',
        tracks: new List(
          testUtils.createTracks(2).map(createTrack)
        )
      };
    });

    it('should render TrackCard for each item in props.tracks', () => {
      let wrapper = shallow(<Tracklist {...props} />);
      let trackCards = wrapper.find('TrackCard');

      expect(trackCards.length).toBe(2);
    });

    it('should display LoadingIndicator if props.displayLoadingIndicator is true', () => {
      let wrapper = shallow(<Tracklist {...props} />);

      expect(wrapper.find('LoadingIndicator').length).toBe(0);

      props.displayLoadingIndicator = true;
      wrapper.setProps(props);

      expect(wrapper.find('LoadingIndicator').length).toBe(1);
    });
  });
});

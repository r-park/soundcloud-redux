import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { createTrack } from 'src/core/tracks';
import { testUtils } from 'src/core/utils/test';
import { Tracklist } from './index';


describe('views', () => {
  describe('Tracklist', () => {
    let props;

    beforeEach(() => {
      props = {
        hasNextPage: false,
        isPending: false,
        isPlaying: false,
        loadNextTracks: () => {},
        pause: () => {},
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
  });
});

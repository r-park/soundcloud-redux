import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from './home-page';


describe('views', () => {
  describe('HomePage', () => {
    let props;

    beforeEach(() => {
      props = {
        loadFeaturedTracks: jasmine.createSpy('loadFeaturedTracks')
      };
    });

    it('should have a ContentHeader', () => {
      let wrapper = shallow(<HomePage {...props} />);
      let contentHeader = wrapper.find('ContentHeader');

      expect(contentHeader.length).toBe(1);
      expect(contentHeader.prop('section')).toBe('Spotlight');
      expect(contentHeader.prop('title')).toBe('Featured Tracks');
    });

    it('should have a Tracklist', () => {
      let wrapper = shallow(<HomePage {...props} />);
      let tracklist = wrapper.find('Connect(Tracklist)');

      expect(tracklist.length).toBe(1);
      expect(tracklist.prop('compactLayout')).toBe(true);
    });

    it('should call props.loadFeaturedTracks() on componentWillMount', () => {
      shallow(<HomePage {...props} />);

      expect(props.loadFeaturedTracks).toHaveBeenCalledTimes(1);
    });
  });
});

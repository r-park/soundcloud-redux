import React from 'react';
import { shallow } from 'enzyme';
import { SearchPage } from './search-page';


describe('views', () => {
  describe('SearchPage', () => {
    let props;

    beforeEach(() => {
      props = {
        loadSearchResults: jasmine.createSpy('loadSearchResults'),
        query: 'test'
      };
    });

    it('should have a ContentHeader', () => {
      let wrapper = shallow(<SearchPage {...props} />);
      let contentHeader = wrapper.find('ContentHeader');

      expect(contentHeader.length).toBe(1);
      expect(contentHeader.prop('section')).toBe('Search Results');
      expect(contentHeader.prop('title')).toBe(props.query);
    });

    it('should have a Tracklist', () => {
      let wrapper = shallow(<SearchPage {...props} />);
      let tracklist = wrapper.find('Connect(Tracklist)');

      expect(tracklist.length).toBe(1);
    });

    it('should call props.loadSearchResults() on componentWillMount', () => {
      shallow(<SearchPage {...props} />);

      expect(props.loadSearchResults).toHaveBeenCalledTimes(1);
      expect(props.loadSearchResults).toHaveBeenCalledWith(props.query);
    });

    it('should call props.loadSearchResults() when props.query changes', () => {
      let wrapper = shallow(<SearchPage {...props} />);

      expect(props.loadSearchResults).toHaveBeenCalledTimes(1);

      wrapper.setProps(props);

      expect(props.loadSearchResults).toHaveBeenCalledTimes(1);

      props.query = 'foo';
      wrapper.setProps(props);

      expect(props.loadSearchResults).toHaveBeenCalledTimes(2);
    });
  });
});

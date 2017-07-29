import React from 'react';
import { mount } from 'enzyme';
import SearchBar from './search-bar';


describe('views', () => {
  describe('SearchBar', () => {
    let props;

    beforeEach(() => {
      props = {
        handleSearch: jasmine.createSpy('handleSearch'),
        search: {open: false}
      };
    });


    function getWrapper() {
      return mount(
        <SearchBar {...props} />
      );
    }


    it('should have a search bar', () => {
      expect(getWrapper().find('.search-bar').length).toBe(1);
    });

    it('should add class `search-bar--open` to search bar on open', () => {
      let wrapper = getWrapper();
      let searchBar = wrapper.find('.search-bar');

      expect(searchBar.prop('className')).toBe('search-bar');

      wrapper.setProps({search: {open: true}});

      expect(searchBar.prop('className')).toBe('search-bar search-bar--open');
    });

    it('should have a search form', () => {
      let form = getWrapper().find('form');
      expect(form.length).toBe(1);
      expect(form.hasClass('search-form')).toBe(true);
    });

    it('should clear search input field on open', () => {
      let wrapper = getWrapper();

      let input = wrapper.find('input');
      input.get(0).value = 'foo';

      expect(input.get(0).value).toBe('foo');

      wrapper.setProps({search: {open: false}}); // control

      expect(input.get(0).value).toBe('foo');

      wrapper.setProps({search: {open: true}});

      expect(input.get(0).value).toBe('');
    });

    it('should focus search input field on open', () => {
      let wrapper = getWrapper();
      let input = wrapper.find('input');

      spyOn(input.get(0), 'focus');

      wrapper.setProps({search: {open: false}}); // control
      wrapper.find('.search-bar').get(0).dispatchEvent(new Event('transitionend'));

      expect(input.get(0).focus).not.toHaveBeenCalled();

      wrapper.setProps({search: {open: true}});
      wrapper.find('.search-bar').get(0).dispatchEvent(new Event('transitionend'));

      expect(input.get(0).focus).toHaveBeenCalledTimes(1);
    });

    it('should invoke search handler with trimmed input value', () => {
      let wrapper = getWrapper();

      let input = wrapper.find('input');
      input.get(0).value = '  foo  ';

      expect(input.get(0).value).toBe('  foo  ');

      wrapper.find('form').simulate('submit');

      expect(props.handleSearch).toHaveBeenCalledTimes(1);
      expect(props.handleSearch).toHaveBeenCalledWith('foo');
    });
  });
});

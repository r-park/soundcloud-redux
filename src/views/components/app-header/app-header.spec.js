import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from './app-header';


describe('views', () => {
  describe('AppHeader', () => {
    let handleSearch;
    let search;
    let toggleSearch;

    beforeEach(() => {
      handleSearch = () => {};
      search = {open: false};
      toggleSearch = () => {};
    });


    function getWrapper() {
      return shallow(
        <AppHeader
          handleSearch={handleSearch}
          search={search}
          toggleSearch={toggleSearch}
        />
      );
    }


    it('should have a title linking to `/` route', () => {
      let link = getWrapper().find('.header__title Link');
      expect(link.length).toBe(1);
      expect(link.prop('to')).toBe('/');
      //expect(link.shallow().text()).toBe('SoundCloud • React Redux');
    });

    it('should have a search button', () => {
      let buttons = getWrapper().find('IconButton');
      expect(buttons.at(0).prop('onClick')).toBe(toggleSearch);
    });

    it('should have a link to the github repo', () => {
      let link = getWrapper().find('.link--github');
      expect(link.length).toBe(1);
      expect(link.prop('href')).toBe('https://github.com/r-park/soundcloud-redux');
    });

    it('should have a search bar', () => {
      let searchBar = getWrapper().find('SearchBar');
      expect(searchBar.length).toBe(1);
      expect(searchBar.prop('handleSearch')).toBe(handleSearch);
      expect(searchBar.prop('search')).toBe(search);
    });
  });
});

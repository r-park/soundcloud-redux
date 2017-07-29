import React from 'react';
import { shallow } from 'enzyme';
import { App } from './app';


describe('views', () => {
  describe('App', () => {
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
        <App
          handleSearch={handleSearch}
          search={search}
          toggleSearch={toggleSearch}
        />
      );
    }


    it('should have a `AppHeader` component', () => {
      const wrapper = getWrapper();
      const appHeader = wrapper.find('AppHeader');

      expect(appHeader.length).toBe(1);
      expect(appHeader.prop('handleSearch')).toBe(handleSearch);
      expect(appHeader.prop('search')).toBe(search);
      expect(appHeader.prop('toggleSearch')).toBe(toggleSearch);
    });

    it('should have a `main` element', () => {
      const wrapper = getWrapper();
      const main = wrapper.find('main');
      expect(main.length).toBe(1);
    });

    it('should have a `Player` component', () => {
      const wrapper = getWrapper();
      const player = wrapper.find('Connect(Player)');
      expect(player.length).toBe(1);
    });
  });
});

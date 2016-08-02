import React from 'react';
import { shallow } from 'enzyme';
import { App } from './index';


describe('views', () => {
  describe('App', () => {
    it('should have a `main` element', () => {
      const wrapper = shallow(<App handleSearch={() => {}} />);
      const main = wrapper.find('main');
      expect(main.length).toBe(1);
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './index';


describe('views', () => {
  describe('HomePage', () => {
    it('should display a title', () => {
      const wrapper = shallow(<HomePage />);
      const title = wrapper.find('h1');

      expect(title.length).toBe(1);
      expect(title.text()).toBe('Home');
    });
  });
});

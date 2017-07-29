import React from 'react';
import { shallow } from 'enzyme';
import LoadinIndicator from './loading-indicator';


describe('views', () => {
  describe('LoadinIndicator', () => {
    it('should display provided section and title', () => {
      const wrapper = shallow(<LoadinIndicator />);
      const indicator = wrapper.find('.loading-indicator');
      const circles = indicator.find('.circle');

      expect(indicator.length).toBe(1);
      expect(circles.length).toBe(3);
      expect(indicator.childAt(0).hasClass('circle--1')).toBe(true);
      expect(indicator.childAt(1).hasClass('circle--2')).toBe(true);
      expect(indicator.childAt(2).hasClass('circle--3')).toBe(true);
    });
  });
});

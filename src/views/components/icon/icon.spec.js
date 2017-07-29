import React from 'react';
import { render, shallow } from 'enzyme';
import Icon from './icon';


describe('views', () => {
  describe('Icon', () => {
    it('should render an icon', () => {
      let wrapper = shallow(<Icon name="play" />);
      let svg = wrapper.find('svg');

      expect(svg.length).toBe(1);
      expect(svg.hasClass('icon')).toBe(true);
      expect(svg.contains(<use xlinkHref="#icon-play" />)).toBe(true);
    });

    it('should add css classes', () => {
      const wrapper = render(<Icon className="foo bar" name="play" />);
      let svg = wrapper.find('svg');

      expect(svg.hasClass('icon icon--play foo bar')).toBe(true);
    });
  });
});

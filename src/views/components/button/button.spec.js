import React from 'react';
import { render, shallow } from 'enzyme';
import Button from './button';


describe('views', () => {
  describe('Button', () => {
    it('should contain provided text node', () => {
      const wrapper = shallow(<Button>Foo</Button>);
      const button = wrapper.find('button');

      expect(button.length).toBe(1);
      expect(button.text()).toBe('Foo');
    });

    it('should contain provided child element', () => {
      const wrapper = shallow(<Button><span>Foo</span></Button>);
      const button = wrapper.find('button');

      expect(button.length).toBe(1);
      expect(button.contains(<span>Foo</span>)).toBe(true);
    });

    it('should have default className', () => {
      const wrapper = shallow(<Button />);
      const button = wrapper.find('button');

      expect(button.hasClass('btn')).toBe(true);
    });

    it('should have provided classNames', () => {
      const wrapper = shallow(<Button className="foo bar" />);
      const button = wrapper.find('button');

      expect(button.hasClass('btn foo bar')).toBe(true);
    });

    it('should have provided aria-label', () => {
      const wrapper = shallow(<Button label="foo bar" />);
      const button = wrapper.find('button');

      expect(button.prop('aria-label')).toBe('foo bar');
    });

    it('should have type=button by default', () => {
      const wrapper = render(<Button />);
      const button = wrapper.find('button');

      expect(button.attr('type')).toBe('button');
    });

    it('should have type equal to provided type', () => {
      const wrapper = render(<Button type="submit" />);
      const button = wrapper.find('button');

      expect(button.attr('type')).toBe('submit');
    });

    it('should invoke provided click handler', () => {
      const handleClick = jasmine.createSpy('handleClick');
      const wrapper = shallow(<Button onClick={handleClick} />);

      wrapper.simulate('click');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});

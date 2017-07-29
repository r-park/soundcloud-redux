import React from 'react';
import { shallow } from 'enzyme';
import IconButton from './icon-button';


describe('views', () => {
  describe('IconButton', () => {
    let props;

    beforeEach(() => {
      props = {
        icon: 'play',
        label: 'Play track'
      };
    });

    it('should have a Button component', () => {
      let wrapper = shallow(<IconButton {...props} />);
      let button = wrapper.find('Button');

      expect(button.length).toBe(1);
      expect(button.prop('className')).toBe('btn--icon btn--play');
      expect(button.prop('label')).toBe(props.label);
      expect(button.prop('type')).toBe('button');
    });

    it('should add provided className to Button component', () => {
      props.className = 'foo bar';

      let wrapper = shallow(<IconButton {...props} />);
      let button = wrapper.find('Button');

      expect(button.prop('className')).toBe('btn--icon btn--play foo bar');
    });

    it('should add provided onClick handler to Button component', () => {
      props.onClick = () => {};

      let wrapper = shallow(<IconButton {...props} />);
      let button = wrapper.find('Button');

      expect(button.prop('onClick')).toBe(props.onClick);
    });

    it('should add provided `type` to Button component', () => {
      props.type = 'submit';

      let wrapper = shallow(<IconButton {...props} />);
      let button = wrapper.find('Button');

      expect(button.prop('type')).toBe(props.type);
    });

    it('should have a Icon component', () => {
      let wrapper = shallow(<IconButton {...props} />);
      let icon = wrapper.find('Icon');

      expect(icon.length).toBe(1);
      expect(icon.prop('name')).toBe(props.icon);
    });
  });
});

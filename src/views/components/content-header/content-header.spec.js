import React from 'react';
import { render } from 'enzyme';
import ContentHeader from './content-header';


describe('views', () => {
  describe('ContentHeader', () => {
    it('should display provided section and title', () => {
      const wrapper = render(<ContentHeader section="Section" title="Title" />);

      expect(wrapper.find('.content-header__section').text()).toBe('Section /');
      expect(wrapper.find('.content-header__title').text()).toBe('Title');
    });
  });
});

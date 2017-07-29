import React from 'react';
import { render } from 'enzyme';
import FormattedInteger from './formatted-integer';


describe('views', () => {
  describe('FormattedInteger', () => {
    it('should insert comma to separate groups of thousands', () => {
      expect(render(<FormattedInteger value={1000} />).text()).toBe('1,000');
      expect(render(<FormattedInteger value={10000} />).text()).toBe('10,000');
      expect(render(<FormattedInteger value={100000} />).text()).toBe('100,000');
      expect(render(<FormattedInteger value={1000000} />).text()).toBe('1,000,000');
    });

    it('should return unmodified integer if provided integer is less than 1000', () => {
      expect(render(<FormattedInteger value={0} />).text()).toBe('0');
      expect(render(<FormattedInteger value={1} />).text()).toBe('1');
      expect(render(<FormattedInteger value={10} />).text()).toBe('10');
      expect(render(<FormattedInteger value={100} />).text()).toBe('100');
    });
  });
});

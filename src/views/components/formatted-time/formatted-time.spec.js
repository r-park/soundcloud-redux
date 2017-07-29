import React from 'react';
import { render } from 'enzyme';
import FormattedTime from './formatted-time';


describe('views', () => {
  describe('FormattedTime', () => {
    it('should format hours from seconds', () => {
      expect(render(<FormattedTime value={3600} />).text()).toBe('1:00:00');
    });

    it('should format hours from milliseconds', () => {
      expect(render(<FormattedTime value={3600000} unit="ms" />).text()).toBe('1:00:00');
    });

    it('should format minutes from seconds', () => {
      expect(render(<FormattedTime value={600} />).text()).toBe('10:00');
    });

    it('should format minutes from milliseconds', () => {
      expect(render(<FormattedTime value={600000} unit="ms" />).text()).toBe('10:00');
    });

    it('should zero-pad single-digit minute', () => {
      expect(render(<FormattedTime value={60} />).text()).toBe('01:00');
    });

    it('should format seconds from seconds', () => {
      expect(render(<FormattedTime value={10} />).text()).toBe('00:10');
    });

    it('should format seconds from milliseconds', () => {
      expect(render(<FormattedTime value={10000} unit="ms" />).text()).toBe('00:10');
    });

    it('should format 0', () => {
      expect(render(<FormattedTime value={0} />).text()).toBe('00:00');
    });

    it('should zero-pad single-digit second', () => {
      expect(render(<FormattedTime value={1} />).text()).toBe('00:01');
    });

    it('should format invalid value', () => {
      expect(render(<FormattedTime value={null} />).text()).toBe('00:00');
      expect(render(<FormattedTime value={undefined} />).text()).toBe('00:00');
    });
  });
});

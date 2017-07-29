import React from 'react';
import { render } from 'enzyme';
import { testUtils } from 'src/core/utils/test-utils';
import FormattedVolume from './formatted-volume';


describe('views', () => {
  describe('FormattedVolume', () => {
    it('should format volume values', () => {
      testUtils.getVolumes().forEach(({input, display}) => {
        let result = render(<FormattedVolume value={input} />).text();
        expect(result).toBe(display);
      });
    });
  });
});

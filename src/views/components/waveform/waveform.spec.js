import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import request from 'superagent';
import Waveform from './waveform';


describe('views', () => {
  describe('Waveform', () => {
    let props;

    beforeEach(() => {
      props = {
        onReady: jest.fn(),
        url: 'http://waveform'
      };
    });


    it('should have default className', () => {
      let wrapper = shallow(<Waveform {...props} />);
      expect(wrapper.prop('className')).toBe('waveform');
    });

    it('should fetch waveform data', () => {
      sinon.spy(request, 'get');

      mount(<Waveform {...props} />);

      expect(request.get.callCount).toBe(1);
      expect(request.get.calledWith(props.url)).toBe(true);
    });
  });
});

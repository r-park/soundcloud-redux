import React from 'react';
import { mount, shallow } from 'enzyme';
import request from 'superagent';
import { waveformData } from './test-data';
import Waveform from './index';


describe('views', () => {
  describe('Waveform', () => {
    let props;
    let response;
    let server;

    beforeEach(() => {
      props = {
        onReady: jasmine.createSpy('onReady'),
        url: 'http://waveform'
      };

      response = [200, {'Content-type': 'application/json'}, JSON.stringify(waveformData)];

      server = sinon.fakeServer.create();
      server.respondWith('get', props.url, response);
    });

    afterEach(() => {
      server.restore();
    });


    it('should have default className', () => {
      let wrapper = shallow(<Waveform {...props} />);
      expect(wrapper.prop('className')).toBe('waveform');
    });

    it('should fetch waveform data', () => {
      spyOn(request, 'get').and.callThrough();

      mount(<Waveform {...props} />);

      server.respond();

      expect(request.get).toHaveBeenCalledTimes(1);
      expect(request.get).toHaveBeenCalledWith(props.url);
    });
  });
});

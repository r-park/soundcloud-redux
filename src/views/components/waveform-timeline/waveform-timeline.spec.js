import React from 'react';
import { shallow } from 'enzyme';
import WaveformTimeline from './waveform-timeline';


describe('views', () => {
  describe('WaveformTimeline', () => {
    let props;

    beforeEach(() => {
      props = {
        displayProgress: false,
        url: 'http://waveform'
      };
    });

    it('should have default className', () => {
      let wrapper = shallow(<WaveformTimeline {...props} />);
      expect(wrapper.prop('className')).toBe('waveform-timeline');
    });

    it('should have `ready` className if state.isReady is true', () => {
      let wrapper = shallow(<WaveformTimeline {...props} />);

      expect(wrapper.prop('className')).toBe('waveform-timeline');

      wrapper.setState({isReady: true});

      expect(wrapper.prop('className')).toBe('waveform-timeline waveform-timeline--ready');
    });

    it('should have AudioTimeline component if props.displayProgress is true', () => {
      props.displayProgress = true;

      let wrapper = shallow(<WaveformTimeline {...props} />);
      let audioTimeline = wrapper.find('Connect(AudioTimeline)');

      expect(audioTimeline.length).toBe(1);
    });

    it('should NOT have AudioTimeline component if props.displayProgress is false', () => {
      props.displayProgress = false;

      let wrapper = shallow(<WaveformTimeline {...props} />);
      let audioTimeline = wrapper.find('Connect(AudioTimeline)');

      expect(audioTimeline.length).toBe(0);
    });

    it('should have a Waveform component', () => {
      let wrapper = shallow(<WaveformTimeline {...props} />);
      let waveform = wrapper.find('Waveform');

      expect(waveform.length).toBe(1);
      expect(waveform.prop('url')).toBe(props.url);
    });
  });
});

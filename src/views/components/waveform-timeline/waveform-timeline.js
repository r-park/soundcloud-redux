import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import AudioTimeline from '../audio-timeline';
import Waveform from '../waveform';

import './waveform-timeline.css';


class WaveformTimeline extends React.Component {
  static propTypes = {
    displayProgress: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired
  };

  constructor() {
    super(...arguments);
    this.state = {isReady: false};
    this.ready = this.ready.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.setState({isReady: false});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.url !== this.props.url ||
           nextProps.displayProgress !== this.props.displayProgress ||
           nextState.isReady !== this.state.isReady;
  }

  ready() {
    this.setState({isReady: true});
  }

  render() {
    const { displayProgress, url } = this.props;
    const cssClasses = classNames('waveform-timeline', {'waveform-timeline--ready': this.state.isReady});

    return (
      <div className={cssClasses}>
        {displayProgress ? <AudioTimeline /> : null}
        <Waveform onReady={this.ready} url={url} />
      </div>
    );
  }
}

export default WaveformTimeline;

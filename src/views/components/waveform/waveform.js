import React from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';

import './waveform.css';


class Waveform extends React.Component {
  static propTypes = {
    onReady: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.loadData();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.url !== this.props.url;
  }

  componentWillUpdate() {
    this.removeCanvas();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.request) this.request.abort();

    this.request = request
      .get(this.props.url)
      .end((error, response) => {
        if (!error) this.renderCanvas(response.body);
      });
  }

  removeCanvas() {
    let canvas = this.containerEl.firstChild;
    if (canvas) this.containerEl.removeChild(canvas);
  }

  renderCanvas(data) {
    let canvas = document.createElement('canvas');
    canvas.height = data.height / 2; // 70px;
    canvas.width = data.width / 2;   // 900px

    let context = canvas.getContext('2d');
    context.fillStyle = '#1d1e1f';

    let samples = data.samples,
        l = samples.length,
        i = 0,
        x = 0,
        v;

    for (; i < l; i += 2, x++) {
      v = samples[i] / 4;
      context.fillRect(x, 0, 1, 35 - v);
      context.fillRect(x, 35 + v, 1, 70);
    }

    this.containerEl.appendChild(canvas);
    this.props.onReady();
  }

  render() {
    return <div className="waveform" ref={e => this.containerEl = e} />;
  }
}

export default Waveform;

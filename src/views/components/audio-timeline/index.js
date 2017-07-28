import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import classNames from 'classnames';
import { audio, getPlayerTimes, PlayerTimesState } from 'src/core/player';


export class AudioTimeline extends React.Component {
  static propTypes = {
    seek: React.PropTypes.func.isRequired,
    times: React.PropTypes.instanceOf(PlayerTimesState).isRequired
  };

  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { currentTarget, pageX } = event;
    const { seek, times } = this.props;

    seek(
      (pageX - currentTarget.getBoundingClientRect().left) / currentTarget.offsetWidth * times.duration
    );
  }

  render() {
    let { bufferedTime, percentBuffered, percentCompleted } = this.props.times;

    return (
      <div className="audio-timeline" onClick={this.handleClick}>
        <div className={classNames('bar bar--buffered', {'bar--animated': bufferedTime > 0})} style={{width: percentBuffered}} />
        <div className="bar bar--completed" style={{width: percentCompleted}} />
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getPlayerTimes,
  times => ({
    seek: audio.seek,
    times
  })
);

export default connect(mapStateToProps)(AudioTimeline);

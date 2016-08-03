import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { audio, getPlayerTimes, PlayerTimesState } from 'src/core/player';


export class AudioTimeline extends React.Component {
  static propTypes = {
    seek: React.PropTypes.func.isRequired,
    times: React.PropTypes.instanceOf(PlayerTimesState).isRequired
  };

  constructor() {
    super(...arguments);
    this.handleClick = ::this.handleClick;
  }

  handleClick(event) {
    const { currentTarget, pageX } = event;
    const { seek, times } = this.props;

    seek(
      (pageX - currentTarget.getBoundingClientRect().left) / currentTarget.offsetWidth * times.duration
    );
  }

  render() {
    let { percentBuffered, percentCompleted } = this.props.times;

    return (
      <div onClick={this.handleClick}>
        <div style={{width: percentBuffered, height: '5px', background: '#aaffaa'}} />
        <div style={{width: percentCompleted, height: '5px', background: '#66bb66'}} />
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

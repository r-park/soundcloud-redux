import React from 'react';
import { Track } from 'src/core/tracks';

import FormattedInteger from '../formatted-integer';
import FormattedTime from '../formatted-time';
import Icon from '../icon';
import IconButton from '../icon-button';
import WaveformTimeline from '../waveform-timeline';


export class TrackCard extends React.Component {
  static propTypes = {
    isPlaying: React.PropTypes.bool.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    track: React.PropTypes.instanceOf(Track).isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.track !== this.props.track ||
      nextProps.isPlaying !== this.props.isPlaying ||
      nextProps.isSelected !== this.props.isSelected;
  }

  render() {
    const { isPlaying, isSelected, pause, play, track } = this.props;

    return (
      <article className="track-card">
        <div className="track-card__image">
          <img src={track.artworkUrl} />
        </div>

        <div className="track-card__main">
          <div className="track-card__username">{track.username}</div>
          <h1 className="track-card__title">{track.title}</h1>

          <WaveformTimeline
            displayProgress={isSelected}
            url={track.waveformUrl}
          />

          <div className="track-card__actions">
            <div className="cell">
              <IconButton
                icon={isPlaying ? 'pause' : 'play'}
                label={isPlaying ? 'Pause' : 'Play'}
                onClick={isPlaying ? pause : play}
              />
              <FormattedTime value={track.duration} unit={'ms'} />
            </div>

            <div className="cell">
              <Icon className="icon--small" name="headset" />
              <FormattedInteger value={track.playbackCount} />
            </div>

            <div className="cell">
              <Icon className="icon--small" name="favorite-border" />
              <FormattedInteger value={track.likesCount} />
            </div>

            <div className="cell">
              <a href={track.userPermalinkUrl} target="_blank" rel="noopener noreferrer">
                <Icon className="icon--small" name="launch" />
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default TrackCard;

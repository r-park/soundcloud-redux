import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Track } from 'src/core/tracks';

import AudioTimeline from '../audio-timeline';
import FormattedInteger from '../formatted-integer';
import FormattedTime from '../formatted-time';
import Icon from '../icon';
import IconButton from '../icon-button';
import WaveformTimeline from '../waveform-timeline';

import './track-card.css';


export class TrackCard extends React.Component {
  static propTypes = {
    isCompact: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    track: PropTypes.instanceOf(Track).isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.track !== this.props.track ||
           nextProps.isPlaying !== this.props.isPlaying ||
           nextProps.isSelected !== this.props.isSelected ||
           nextProps.isCompact !== this.props.isCompact;
  }

  renderLikesCount() {
    return (
      <div className="cell">
        <Icon className="icon--small" name="favorite-border" />
        <FormattedInteger value={this.props.track.likesCount} />
      </div>
    );
  }

  renderPlaybackCount() {
    return (
      <div className="cell">
        <Icon className="icon--small" name="headset" />
        <FormattedInteger value={this.props.track.playbackCount} />
      </div>
    );
  }

  renderTimeline() {
    return (
      <div className="track-card__timeline">
        {this.props.isSelected ? <AudioTimeline /> : null}
      </div>
    );
  }

  render() {
    const { isCompact, isPlaying, isSelected, pause, play, track } = this.props;

    const className = classNames('track-card', {
      'track-card--compact': isCompact,
      'track-card--full': !isCompact
    });

    return (
      <article className={className}>
        <div className="track-card__image">
          <img src={track.artworkUrl} alt="" />
        </div>

        <div className="track-card__main">
          {isCompact ? this.renderTimeline() : null}

          <div className="track-card__username">
            <Link to={`/users/${track.userId}/tracks`}>{track.username}</Link>
          </div>

          <h1 className="track-card__title">{track.title}</h1>

          {isCompact ? null : <WaveformTimeline displayProgress={isSelected} url={track.waveformUrl} />}

          <div className="track-card__actions">
            <div className="cell">
              <IconButton
                icon={isPlaying ? 'pause' : 'play'}
                label={isPlaying ? 'Pause' : 'Play'}
                onClick={isPlaying ? pause : play}
              />
              <FormattedTime value={track.duration} unit={'ms'} />
            </div>

            {isCompact ? null : this.renderPlaybackCount()}
            {isCompact ? null : this.renderLikesCount()}

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

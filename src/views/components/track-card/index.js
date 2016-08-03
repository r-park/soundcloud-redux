import React from 'react';
import { Track } from 'src/core/tracks';
import AudioTimeline from '../audio-timeline';


function TrackCard({isPlaying, isSelected, pause, play, track}) {
  return (
    <article style={{borderTop: '1px solid #ddd'}}>
      <div>{track.title}</div>
      {isSelected ? <AudioTimeline /> : null}
      <div>{'isPlaying: ' + isPlaying}</div>
      <div>{'isSelected: ' + isSelected}</div>
      <button onClick={pause} type="button">Pause</button>
      <button onClick={play} type="button">Play</button>
    </article>
  );
}

TrackCard.propTypes = {
  isPlaying: React.PropTypes.bool.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  pause: React.PropTypes.func.isRequired,
  play: React.PropTypes.func.isRequired,
  track: React.PropTypes.instanceOf(Track).isRequired
};

export default TrackCard;

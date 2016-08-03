import React from 'react';
import { connect } from 'react-redux';
import { audio, playerActions, getPlayer, getPlayerTrack, getPlayerTracklistCursor } from 'src/core/player';
import { Track } from 'src/core/tracks';
import { createShallowEqualSelector } from 'src/core/utils';


export function Player({
  decreaseVolume,
  increaseVolume,
  nextTrack,
  pause,
  play,
  previousTrack,
  track,
  volume
}) {
  if (!track) return null;

  return (
    <div>
      <div>
        <button onClick={previousTrack} type="button">Prev</button>
        <button onClick={play} type="button">Play</button>
        <button onClick={pause} type="button">Pause</button>
        <button onClick={nextTrack} type="button">Next</button>
      </div>

      <br /><br />

      <div>
        <button onClick={decreaseVolume} type="button">–</button>
        {volume}
        <button onClick={increaseVolume} type="button">+</button>
      </div>

      <div>{track.title}</div>
    </div>
  );
}

Player.propTypes = {
  decreaseVolume: React.PropTypes.func.isRequired,
  increaseVolume: React.PropTypes.func.isRequired,
  nextTrack: React.PropTypes.func,
  pause: React.PropTypes.func.isRequired,
  play: React.PropTypes.func.isRequired,
  previousTrack: React.PropTypes.func,
  track: React.PropTypes.instanceOf(Track),
  volume: React.PropTypes.number.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createShallowEqualSelector(
  getPlayer,
  getPlayerTrack,
  getPlayerTracklistCursor,
  (player, track, cursor) => ({
    decreaseVolume: audio.decreaseVolume,
    increaseVolume: audio.increaseVolume,
    isPlaying: player.isPlaying,
    nextTrackId: cursor.nextTrackId,
    pause: audio.pause,
    play: audio.play,
    previousTrackId: cursor.previousTrackId,
    track,
    tracklistId: player.tracklistId,
    volume: player.volume
  })
);

const mapDispatchToProps = {
  select: playerActions.playSelectedTrack
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { nextTrackId, previousTrackId, tracklistId } = stateProps;
  return Object.assign({}, ownProps, stateProps, {
    nextTrack: nextTrackId ? dispatchProps.select.bind(null, nextTrackId, tracklistId) : null,
    previousTrack: previousTrackId ? dispatchProps.select.bind(null, previousTrackId, tracklistId) : null
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Player);

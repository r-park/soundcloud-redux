import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import { infiniteScroll } from 'src/core/browser';
import { audio, getPlayerIsPlaying, getPlayerTrackId, playerActions } from 'src/core/player';
import { getCurrentTracklist, getTracksForCurrentTracklist, tracklistActions } from 'src/core/tracklists';

import LoadingIndicator from '../loading-indicator';
import TrackCard from '../track-card';


export class Tracklist extends React.Component {
  static propTypes = {
    displayLoadingIndicator: React.PropTypes.bool.isRequired,
    isPlaying: React.PropTypes.bool.isRequired,
    loadNextTracks: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired,
    pauseInfiniteScroll: React.PropTypes.bool.isRequired,
    play: React.PropTypes.func.isRequired,
    selectTrack: React.PropTypes.func.isRequired,
    selectedTrackId: React.PropTypes.number,
    tracklistId: React.PropTypes.string.isRequired,
    tracks: React.PropTypes.instanceOf(List).isRequired
  };

  componentDidMount() {
    infiniteScroll.start(
      this.props.loadNextTracks,
      this.props.pauseInfiniteScroll
    );
  }

  componentWillUpdate(nextProps) {
    if (nextProps.pauseInfiniteScroll !== this.props.pauseInfiniteScroll) {
      if (nextProps.pauseInfiniteScroll) {
        infiniteScroll.pause();
      }
      else {
        infiniteScroll.resume();
      }
    }
  }

  componentWillUnmount() {
    infiniteScroll.end();
  }

  render() {
    const { isPlaying, pause, play, selectedTrackId, selectTrack, tracklistId, tracks } = this.props;

    const trackCards = tracks.map((track, index) => {
      let isSelected = track.id === selectedTrackId;
      return (
        <div className="g-col" key={index}>
          <TrackCard
            isPlaying={isSelected && isPlaying}
            isSelected={isSelected}
            pause={pause}
            play={isSelected ? play : selectTrack.bind(null, track.id, tracklistId)}
            track={track}
          />
        </div>
      );
    });

    return (
      <div className="g-row tracklist">
        {trackCards}

        <div className="g-col">
          {(this.props.displayLoadingIndicator) ? <LoadingIndicator /> : null}
        </div>
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getPlayerIsPlaying,
  getPlayerTrackId,
  getCurrentTracklist,
  getTracksForCurrentTracklist,
  (isPlaying, playerTrackId, tracklist, tracks) => ({
    displayLoadingIndicator: tracklist.isPending || tracklist.hasNextPage,
    isPlaying,
    pause: audio.pause,
    pauseInfiniteScroll: tracklist.isPending || !tracklist.hasNextPage,
    play: audio.play,
    selectedTrackId: playerTrackId,
    tracklistId: tracklist.id,
    tracks
  })
);

const mapDispatchToProps = {
  loadNextTracks: tracklistActions.loadNextTracks,
  selectTrack: playerActions.playSelectedTrack
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracklist);

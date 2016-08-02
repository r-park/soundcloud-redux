import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import { getCurrentTracklist, getTracksForCurrentTracklist, tracklistActions } from 'src/core/tracklists';
import TrackCard from '../track-card';


export class Tracklist extends React.Component {
  static propTypes = {
    hasNextPage: React.PropTypes.bool.isRequired,
    isPending: React.PropTypes.bool.isRequired,
    loadNextTracks: React.PropTypes.func.isRequired,
    tracks: React.PropTypes.instanceOf(List).isRequired
  };

  renderPaginationButton() {
    return (
      <button onClick={this.props.loadNextTracks} type="button">Next</button>
    );
  }

  renderTrackCards() {
    return this.props.tracks.map((track, index) => {
      return <TrackCard key={index} track={track} />;
    });
  }

  render() {
    return (
      <div>
        <div>{this.renderTrackCards()}</div>
        <div>{this.props.isPending ? <h1>LOADING TRACKS</h1> : null}</div>
        {this.props.hasNextPage ? this.renderPaginationButton() : null}
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getCurrentTracklist,
  getTracksForCurrentTracklist,
  (tracklist, tracks) => ({
    hasNextPage: tracklist.hasNextPage,
    isPending: tracklist.isPending,
    tracks
  })
);

const mapDispatchToProps = {
  loadNextTracks: tracklistActions.loadNextTracks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracklist);

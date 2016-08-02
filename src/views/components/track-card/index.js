import React from 'react';
import { Track } from 'src/core/tracks';


function TrackCard({track}) {
  return <div>{track.title}</div>;
}

TrackCard.propTypes = {
  track: React.PropTypes.instanceOf(Track).isRequired
};

export default TrackCard;

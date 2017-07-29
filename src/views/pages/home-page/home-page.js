import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tracklistActions } from 'src/core/tracklists';

import ContentHeader from '../../components/content-header';
import Tracklist from '../../components/tracklist';


export class HomePage extends React.Component {
  static propTypes = {
    loadFeaturedTracks: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadFeaturedTracks();
  }

  render() {
    return (
      <section>
        <ContentHeader
          section="Spotlight"
          title="Featured Tracks"
        />

        <Tracklist compactLayout={true} />
      </section>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  loadFeaturedTracks: tracklistActions.loadFeaturedTracks
};

export default connect(
  null,
  mapDispatchToProps
)(HomePage);

import React from 'react';
import { connect } from 'react-redux';
import { searchActions } from 'src/core/search';

import ContentHeader from '../../components/content-header';
import Tracklist from '../../components/tracklist';


export class SearchPage extends React.Component {
  static propTypes = {
    loadSearchResults: React.PropTypes.func.isRequired,
    query: React.PropTypes.string.isRequired
  };

  componentWillMount() {
    this.props.loadSearchResults(this.props.query);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.props.loadSearchResults(nextProps.query);
    }
  }

  render() {
    return (
      <section>
        <ContentHeader
          section="Search Results"
          title={this.props.query}
        />

        <Tracklist />
      </section>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = (state, props) => ({
  query: props.location.query.q
});

const mapDispatchToProps = {
  loadSearchResults: searchActions.loadSearchResults
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchActions } from 'src/core/search';

import ContentHeader from '../../components/content-header';
import Tracklist from '../../components/tracklist';

import './search-page.css';


export class SearchPage extends React.Component {
  static propTypes = {
    loadSearchResults: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
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

const mapStateToProps = (state, props) => {
  return {
    query: new URLSearchParams(props.location.search).get('q')
  };
};

const mapDispatchToProps = {
  loadSearchResults: searchActions.loadSearchResults
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);

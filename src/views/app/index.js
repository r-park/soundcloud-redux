import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getSearch, searchActions } from 'src/core/search';

import AppHeader from '../components/app-header';
import Player from '../components/player';


export function App({children, handleSearch, search, toggleSearch}) {
  return (
    <div>
      <AppHeader
        handleSearch={handleSearch}
        search={search}
        toggleSearch={toggleSearch}
      />

      <main className="main">
        {children}
      </main>

      <Player />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element,
  handleSearch: React.PropTypes.func.isRequired,
  search: React.PropTypes.object.isRequired,
  toggleSearch: React.PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getSearch,
  search => ({
    search: search.toJS()
  })
);

const mapDispatchToProps = {
  handleSearch: searchActions.navigateToSearch,
  toggleSearch: searchActions.toggleSearchField
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

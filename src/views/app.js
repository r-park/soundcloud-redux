import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';
import { getSearch, searchActions } from 'src/core/search/index';

import AppHeader from './components/app-header';
import Player from './components/player';

import HomePage from './pages/home-page';
import SearchPage from './pages/search-page';
import UserPage from './pages/user-page';


export function App({handleSearch, search, toggleSearch}) {
  return (
    <div>
      <AppHeader
        handleSearch={handleSearch}
        search={search}
        toggleSearch={toggleSearch}
      />

      <main className="main">
        <Route exact path="/" component={HomePage}/>
        <Route path="/search" component={SearchPage}/>
        <Route path="/users/:id/:resource" component={UserPage}/>
      </main>

      <Player />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element,
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  toggleSearch: PropTypes.func.isRequired
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

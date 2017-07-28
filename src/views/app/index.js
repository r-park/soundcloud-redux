import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { createSelector } from 'reselect';
import { getSearch, searchActions } from 'src/core/search';

import AppHeader from '../components/app-header';
import Player from '../components/player';

import HomePage from '../pages/home';
import SearchPage from '../pages/search';
import UserPage from '../pages/user';


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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

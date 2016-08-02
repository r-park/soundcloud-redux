import React from 'react';
import { connect } from 'react-redux';
import { searchActions } from 'src/core/search';
import SearchForm from '../components/search-form';


export function App({children, handleSearch}) {
  return (
    <main>
      <SearchForm handleSearch={handleSearch} />
      {children}
    </main>
  );
}

App.propTypes = {
  children: React.PropTypes.element,
  handleSearch: React.PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  handleSearch: searchActions.navigateToSearch
};

export default connect(
  null,
  mapDispatchToProps
)(App);

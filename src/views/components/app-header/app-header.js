import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '../icon';
import IconButton from '../icon-button';
import SearchBar from '../search-bar';

import './app-header.css';


function AppHeader({handleSearch, search, toggleSearch}) {
  return (
    <header className="header">
      <div className="g-row g-cont">
        <div className="g-col">
          <h1 className="header__title">
            <Link to="/">SoundCloud • React Redux</Link>
          </h1>
          <ul className="header__actions">
            <li>
              <IconButton
                icon="search-alt"
                label="Search"
                onClick={toggleSearch}
              />
            </li>
            <li>
              <IconButton
                icon="soundcloud"
                label="SoundCloud"
              />
            </li>
            <li>
              <a className="link link--github" href="https://github.com/r-park/soundcloud-redux">
                <Icon name="github" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="g-row g-cont">
        <div className="g-col">
          <SearchBar
            handleSearch={handleSearch}
            search={search}
          />
        </div>
      </div>
    </header>
  );
}

AppHeader.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  toggleSearch: PropTypes.func.isRequired
};

export default AppHeader;

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { User } from 'src/core/users';

import FormattedInteger from '../formatted-integer';
import './user-card.css';


function UserCard({user}) {
  return (
    <article className="user-card">
      <div className="g-row g-cont">
        <div className="g-col">
          <h1 className="user-card__title">{user.username}</h1>
        </div>
      </div>

      <div className="g-row g-cont user-stats">
        <div className="g-col xs-1/2 sm-1/4">
          <NavLink className="user-stats__label" to={`/users/${user.id}/tracks`}>Tracks</NavLink>
          <div className="user-stats__value"><FormattedInteger value={user.trackCount} /></div>
        </div>

        <div className="g-col xs-1/2 sm-1/4">
          <NavLink className="user-stats__label" to={`/users/${user.id}/likes`}>Likes</NavLink>
          <div className="user-stats__value"><FormattedInteger value={user.likesCount} /></div>
        </div>

        <div className="g-col xs-hide sm-1/4">
          <div className="user-stats__label">Followers</div>
          <div className="user-stats__value"><FormattedInteger value={user.followersCount} /></div>
        </div>

        <div className="g-col xs-hide sm-1/4">
          <div className="user-stats__label">Following</div>
          <div className="user-stats__value"><FormattedInteger value={user.followingsCount} /></div>
        </div>
      </div>
    </article>
  );
}

UserCard.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default UserCard;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getCurrentUser, User, userActions } from 'src/core/users';

import Tracklist from '../../components/tracklist';
import UserCard from '../../components/user-card';


export class UserPage extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    loadUserLikes: PropTypes.func.isRequired,
    loadUserTracks: PropTypes.func.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      resource: PropTypes.string.isRequired
    }),
    user: PropTypes.instanceOf(User)
  };

  componentWillMount() {
    this.loadUser();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.match.params.resource !== this.props.match.params.resource) {
      this.loadUser(nextProps.match.params);
    }
  }

  loadUser(params) {
    params = params || this.props.match.params;

    this.props.loadUser(params.id);

    if (params.resource === 'likes') {
      this.props.loadUserLikes(params.id);
    }
    else {
      this.props.loadUserTracks(params.id);
    }
  }

  render() {
    const { user } = this.props;

    if (!user) return null;

    return (
      <section>
        <UserCard user={user} />
        <Tracklist />
      </section>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getCurrentUser,
  user => ({user})
);

const mapDispatchToProps = {
  loadUser: userActions.loadUser,
  loadUserLikes: userActions.loadUserLikes,
  loadUserTracks: userActions.loadUserTracks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);

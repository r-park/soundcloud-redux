import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getPlayerTimes } from 'src/core/player';
import FormattedTime from '../formatted-time';


const mapStateToProps = createSelector(
  getPlayerTimes,
  times => ({
    value: times.currentTime
  })
);

export default connect(
  mapStateToProps
)(FormattedTime);

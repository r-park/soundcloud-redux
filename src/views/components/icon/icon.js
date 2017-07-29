import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './icon.css';


function Icon({className, name}) {
  return (
    <svg className={classNames('icon', `icon--${name}`, className)}>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Icon;

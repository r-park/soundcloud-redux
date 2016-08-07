import React from 'react';
import classNames from 'classnames';


function Icon({className, name}) {
  return (
    <svg className={classNames('icon', `icon--${name}`, className)}>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
}

Icon.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string.isRequired
};

export default Icon;

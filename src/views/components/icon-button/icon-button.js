import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from '../button';
import Icon from '../icon';

import './icon-button.css';


function IconButton({className, icon, label, onClick, type = 'button'}) {
  return (
    <Button
      className={classNames('btn--icon', `btn--${icon}`, className)}
      label={label}
      onClick={onClick}
      type={type}>
      <Icon name={icon} />
    </Button>
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

export default IconButton;

import React from 'react';
import classNames from 'classnames';

import Button from '../button';
import Icon from '../icon';


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
  className: React.PropTypes.string,
  icon: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  type: React.PropTypes.oneOf(['button', 'reset', 'submit'])
};

export default IconButton;

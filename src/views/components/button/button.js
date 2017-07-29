import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './button.css';


function Button({children, className, label, onClick, type = 'button'}) {
  return (
    <button
      aria-label={label}
      className={classNames('btn', className)}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

export default Button;

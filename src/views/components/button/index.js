import React from 'react';
import classNames from 'classnames';


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
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
  type: React.PropTypes.oneOf(['button', 'reset', 'submit'])
};

export default Button;

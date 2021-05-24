import React from 'react';
import PropTypes from 'prop-types';
import { classes } from 'typestyle';
import styles from './styles';

const Button = ({
  id,
  className,
  buttonType,
  size,
  clickHandler,
  children,
  role,
  tabIndex,
  onKeyPress,
  ariaLabel
}) => {
  const type = buttonType || 'primary';
  return (
    <a
      id={id}
      className={classes(styles[type], className)}
      onClick={clickHandler}
      role={role}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      onKeyPress={onKeyPress}
    >
      {children}
    </a>
  );
};

Button.propTypes = {
  id:           PropTypes.string,
  buttonType:   PropTypes.string,
  size:         PropTypes.string,
  className:    PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  ariaLabel:    PropTypes.string,
  role:         PropTypes.string,
  tabIndex:     PropTypes.string,
  onKeyPress:   PropTypes.func
};

Button.defaultProps = {
  role:       'button',
  tabIndex:   '0',
  onKeyPress: null
};

export { Button };

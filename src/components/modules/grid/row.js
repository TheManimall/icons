import PropTypes from 'prop-types';
import { classes } from 'typestyle';
import React from 'react';
import { row } from './styles';

const Row = ({
  left,
  right,
  top,
  bottom,
  className,
  small,
  specificity,
  children,
  center
}) => (
  <div
    className={classes(
      row({
        left,
        right,
        top,
        bottom,
        small,
        specificity,
        justifyContent: center ? 'center' : 'space-between'
      }),
      className
    )}
  >
    {children}
  </div>
);

Row.propTypes = {
  top:         PropTypes.string,
  bottom:      PropTypes.string,
  left:        PropTypes.string,
  right:       PropTypes.string,
  small:       PropTypes.bool,
  specificity: PropTypes.string,
  className:   PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  center:      PropTypes.bool,
  children:    PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Row.defaultProps = {
  top:         '0',
  bottom:      '0',
  left:        '0',
  right:       '0',
  small:       false,
  className:   '',
  specificity: '',
  children:    [],
  center:      false
};

export default Row;

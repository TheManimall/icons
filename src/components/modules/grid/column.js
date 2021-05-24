import PropTypes from 'prop-types';
import React from 'react';
import { classes } from 'typestyle';
import { column } from './styles';

const Column = ({
  flex,
  left,
  right,
  top,
  bottom,
  specificity,
  className,
  collapseStyles,
  children
}) => (
  <div
    className={classes(
      column({
        flex,
        left,
        right,
        top,
        bottom,
        collapseStyles,
        specificity
      }),
      className
    )}
  >
    {children}
  </div>
);

Column.propTypes = {
  flex:           PropTypes.string,
  top:            PropTypes.string,
  bottom:         PropTypes.string,
  left:           PropTypes.string,
  right:          PropTypes.string,
  className:      PropTypes.string,
  collapseStyles: PropTypes.object,
  specificity:    PropTypes.string,
  children:       PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Column.defaultProps = {
  flex:           '1',
  top:            '0',
  bottom:         '0',
  left:           '0',
  right:          '0',
  className:      '',
  specificity:    '',
  collapseStyles: {},
  children:       []
};
export default Column;

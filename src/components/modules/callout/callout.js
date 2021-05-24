import React from 'react';
import PropTypes from 'prop-types';
import { classes } from 'typestyle';
import styles from './styles';

const Callout = ({ direction, responsiveDirection, children }) => (
  <div
    className={classes(
      styles.callout,
      styles.direction(direction, responsiveDirection)
    )}
  >
    {children}
  </div>
);

Callout.propTypes = {
  direction:           PropTypes.string,
  responsiveDirection: PropTypes.string,
  children:            PropTypes.node
};
export default Callout;

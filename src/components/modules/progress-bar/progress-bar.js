import React from 'react';
import PropTypes from 'prop-types';
import { classes } from 'typestyle';

import styles from './styles';

const ProgressBar = ({ progress }) => (
  <div
    className={styles.container}
    aria-valuemax="100"
    aria-valuemin="0"
    role="progressbar"
    tabIndex="0"
  >
    <div className={classes(styles.bar, styles.percent(progress))} />
  </div>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired
};

export default ProgressBar;

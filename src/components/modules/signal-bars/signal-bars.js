import React from 'react';
import PropTypes from 'prop-types';
import { classes } from 'typestyle';
import { times } from 'lodash';

import styles from './styles';

const SignalBars = props => {
  const { barsContainerClassName, barsClassName, emptySignalColor, maxBars, numberOfBars, signalColor } = props;

  return (
    <div tabIndex="1" aria-label={`Signal strength is ${numberOfBars} out of ${maxBars} bars`} id="bars" className={classes(styles.barsContainer, barsContainerClassName)}>
      {times(maxBars, i => {
        const index = i + 1;
        const backgroundColor = index > numberOfBars ? emptySignalColor : signalColor;
        return (
          <div
            className={classes(styles.bar, barsClassName)}
            style={{ backgroundColor, height: index * 5, left: index * 7 }}
          />
        );
      })}
    </div>
  );
};

SignalBars.propTypes = {
  barsContainerClassName: PropTypes.string,
  barsClassName:          PropTypes.string,
  emptySignalColor:       PropTypes.string,
  maxBars:                PropTypes.number,
  numberOfBars:           PropTypes.number,
  signalColor:            PropTypes.string
};

SignalBars.defaultProps = {
  barsContainerClassName: '',
  barsClassName:          styles.defaultBar,
  emptySignalColor:       'transparent',
  maxBars:                5,
  numberOfBars:           5,
  signalColor:            '#0E9246'
};
export default SignalBars;

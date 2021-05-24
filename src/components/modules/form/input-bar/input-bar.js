import React from 'react';
import PropTypes from 'prop-types';
import { classes } from 'typestyle';
import inputBarStyles, { activeBar } from './styles';

const showBar = props => {
  if (props.error || props.active) return activeBar;
  return null;
};
const InputBar = props => {
  if (!props.show) return null;

  return <div className={classes(inputBarStyles(props), showBar(props))} />;
};

InputBar.propTypes = {
  active: PropTypes.bool,
  error:  PropTypes.bool
};

InputBar.defaultProps = {
  show:  true,
  error: false
};
export default InputBar;

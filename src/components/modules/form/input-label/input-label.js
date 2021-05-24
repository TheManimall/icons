import React from 'react';
import PropTypes from 'prop-types';
import labelStyles, { activeLabel } from './styles';
import { style, classes } from 'typestyle';

const InputLabel = props => (
  <label
    className={classes(
      style(props.styles.default),
      style(activeLabel(props.active))
    )}
    onClick={props.clickHandler}
    htmlFor={props.htmlFor}
    tabIndex={props.tabIndex}
  >
    {props.children}
  </label>
);

InputLabel.propTypes = {
  styles:       PropTypes.object,
  active:       PropTypes.bool,
  children:     PropTypes.node,
  htmlFor:      PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
  tabIndex:     PropTypes.number
};

InputLabel.defaultProps = {
  styles:       labelStyles,
  active:       false,
  clickHandler: () => {},
  tabIndex:     -1
};

export default InputLabel;

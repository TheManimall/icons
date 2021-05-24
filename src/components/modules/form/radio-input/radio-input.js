import React from 'react';
import PropTypes from 'prop-types';
import { buildStyles } from '../../utils';

const RadioInput = ({
  id,
  name,
  checked,
  value,
  label,
  onChange,
  onBlur,
  styles
}) => (
  <div>
    <input
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      type="radio"
      className={buildStyles(styles)}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

RadioInput.propTypes = {
  id:       PropTypes.string,
  name:     PropTypes.string,
  checked:  PropTypes.bool,
  value:    PropTypes.string,
  label:    PropTypes.string,
  onChange: PropTypes.func,
  styles:   PropTypes.object,
  onBlur:   PropTypes.func
};

RadioInput.defaultProps = {
  styles: {}
};
export default RadioInput;

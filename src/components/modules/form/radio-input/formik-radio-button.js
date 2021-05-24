import React from 'react';
import PropTypes from 'prop-types';
import { buildStyles } from '../../utils';
import { getValue, safeValue } from '../utils';

const FormikRadioButton = ({
  id,
  name,
  checked,
  values,
  label,
  handleChange,
  handleBlur,
  styles,
  value,
  specificity,
  disabled
}) => {
  if (checked === undefined && value === undefined) {
    console.error(`FormikRadioButton name=${name} - Props value and checked can not be undefined at the same time`);
  }
  return (
    <div>
      <input
        id={id}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={safeValue(value)}
        aria-labelledby={id}
        checked={checked === undefined ? getValue(values, name).toString() === safeValue(value).toString() : checked}
        type="radio"
        className={buildStyles({
          styles: { verticalAlign: 'top', marginTop: '0.4rem !important', ...styles },
          specificity
        })}
        disabled={disabled}
      />
      <label id={`radio-for-${id}`} htmlFor={id} style={{ width: '80%' }}>
        {label}
      </label>
    </div>
  );
};

FormikRadioButton.propTypes = {
  id:           PropTypes.string,
  name:         PropTypes.string,
  checked:      PropTypes.bool,
  value:        PropTypes.string,
  label:        PropTypes.oneOfType([PropTypes.string,  PropTypes.element]),
  handleChange: PropTypes.func.isRequired,
  styles:       PropTypes.object,
  handleBlur:   PropTypes.func.isRequired,
  values:       PropTypes.object.isRequired,
  specificity:  PropTypes.string,
  disabled:     PropTypes.bool
};

FormikRadioButton.defaultProps = {
  styles:      {},
  specificity: '',
  disabled:    false
};
export default FormikRadioButton;

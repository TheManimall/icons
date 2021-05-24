import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { style } from 'typestyle';
import { buildStyles, displayErrorText } from '../../utils';
import { checkboxFieldError } from '../../utils/styles';
import { baseStyles } from './styles';
import { getValue, safeValue } from '../utils';

const getCheckedStatus = ({ values, name, value, checked }) =>
  checked === undefined
    ? getValue(values, name).toString() === safeValue(value).toString()
    : checked;

const FormikCheckboxInput = ({
  checked,
  children,
  disabled,
  errors,
  handleBlur,
  handleChange,
  id,
  label,
  labelClass,
  name,
  specificity,
  styles,
  tabIndex,
  touched,
  value,
  values
}) => {
  const errorStyles = get(touched, name) && get(errors, name) ? checkboxFieldError : null;

  if (checked === undefined && value === undefined) {
    console.error(`FormikCheckboxInput name=${name} - Props value and checked can not be undefined at the same time`);
  }

  return (
    <div>
      <div className={style({ display: 'flex' })}
        role="checkbox"
        aria-checked={getCheckedStatus({ values, name, value, checked })}>
        <input
          type="checkbox"
          value={safeValue(value)}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          id={id}
          checked={getCheckedStatus({ values, name, value, checked })}
          disabled={disabled}
          aria-label={label}
          className={buildStyles({
            specificity,
            styles: { ...styles, ...errorStyles }
          })}
        />
        {children || (
          <label
            htmlFor={id}
            className={labelClass}
            tabIndex={tabIndex}>
            <span />
            {label}
          </label>
        )}
      </div>
      {displayErrorText(touched, errors, name)}
    </div>
  );
};

FormikCheckboxInput.propTypes = {
  checked:      PropTypes.bool,
  children:     PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  disabled:     PropTypes.bool,
  errors:       PropTypes.object.isRequired,
  handleBlur:   PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  id:           PropTypes.string,
  label:        PropTypes.string,
  labelClass:   PropTypes.string,
  name:         PropTypes.string.isRequired,
  required:     PropTypes.bool,
  styles:       PropTypes.object,
  specificity:  PropTypes.string,
  tabIndex:     PropTypes.number,
  touched:      PropTypes.object.isRequired,
  value:        PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  values:       PropTypes.object.isRequired
};

FormikCheckboxInput.defaultProps = {
  disabled:    false,
  id:          '',
  label:       '',
  labelClass:  '',
  styles:      baseStyles,
  specificity: '',
  tabIndex:    0
};

export default FormikCheckboxInput;

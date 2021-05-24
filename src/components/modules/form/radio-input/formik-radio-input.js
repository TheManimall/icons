// FormikRadioInput
// There is one exception of this component from others, all other components show errors in the components theirself
// But for this component, the error message should be displayed in the parent component
// because radio inputs are usually grouped and display together
// it does not make sense to display error message under each raido button

import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { buildStyles } from '../../utils';

const FormikRadioInput = ({
  id,
  name,
  checked,
  values,
  label,
  handleChange,
  handleBlur,
  styles
}) => (
  <div>
    <input
      id={id}
      name={name}
      checked={checked}
      onChange={handleChange}
      onBlur={handleBlur}
      value={get(values, name)}
      type="radio"
      className={buildStyles({ styles })}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

FormikRadioInput.propTypes = {
  id:           PropTypes.string,
  name:         PropTypes.string,
  checked:      PropTypes.bool,
  value:        PropTypes.string,
  label:        PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  handleChange: PropTypes.func.isRequired,
  styles:       PropTypes.object,
  handleBlur:   PropTypes.func.isRequired,
  values:       PropTypes.object.isRequired
};

FormikRadioInput.defaultProps = {
  styles: {}
};

export default FormikRadioInput;

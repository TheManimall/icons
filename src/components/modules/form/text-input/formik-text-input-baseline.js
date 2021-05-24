/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style } from 'typestyle';
import { get } from 'lodash';
import { displayErrorText, displayFieldWithErrors } from '../../utils';
import colors from '../../colors';

class FormikTextInputBaseline extends Component {
  state = {
    focused: false
  };

  handleFocus = _e => this.setState({ focused: true });

  handleBlur = e => this.setState({ focused: false }, this.props.handleBlur(e));

  render() {
    const {
      id,
      label,
      maxlength,
      readOnly,
      specificity,
      name,
      values,
      handleChange,
      errors,
      touched,
      tabIndex,
      required,
      labelAnimation
    } = this.props;

    const value = get(values, name, '');
    const active = this.state.focused || !!value;
    const highlightBorder = this.state.focused;
    const errorStyles = displayFieldWithErrors(touched, errors, name);

    return (
      <div className={`${id}-wrapper`}>
        <input
          id={id}
          type="text"
          onChange={handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          maxLength={maxlength}
          value={value}
          name={name}
          readOnly={readOnly}
          role="textbox"
          aria-label={label}
          aria-required={required}
        />
        {displayErrorText(touched, errors, name)}
      </div>
    );
  }
}

FormikTextInputBaseline.propTypes = {
  id:             PropTypes.string,
  label:          PropTypes.string,
  values:         PropTypes.object.isRequired,
  maxlength:      PropTypes.string,
  name:           PropTypes.string.isRequired,
  readOnly:       PropTypes.bool,
  specificity:    PropTypes.string,
  handleChange:   PropTypes.func.isRequired,
  handleBlur:     PropTypes.func.isRequired,
  errors:         PropTypes.object.isRequired,
  touched:        PropTypes.object.isRequired,
  required:       PropTypes.bool,
  tabIndex:       PropTypes.number,
  labelAnimation: PropTypes.bool
};

FormikTextInputBaseline.defaultProps = {
  id:             '',
  label:          '',
  name:           '',
  mask:           {},
  values:         {},
  placeholder:    '',
  maxlength:      '300',
  readOnly:       false,
  specificity:    null,
  onBlur:         () => {},
  handleChange:   () => {},
  handleBlur:     () => {},
  required:       false,
  tabIndex:       0,
  labelAnimation: false
};

export default FormikTextInputBaseline;

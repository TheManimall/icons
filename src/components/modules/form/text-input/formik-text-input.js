/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style } from 'typestyle';
import { get } from 'lodash';
import InputLabel from '../input-label';
import InputBar from '../input-bar';
import inputStyles, { wrapperStyles } from './styles';
import { buildStyles, displayErrorText, displayFieldWithErrors } from '../../utils';
import colors from '../../colors';

class FormikTextInput extends Component {
  state = {
    focused: false
  };

  handleFocus = _e => this.setState({ focused: true });

  handleBlur = e => this.setState({ focused: false }, this.props.handleBlur(e));

  render() {
    const {
      defaultStyles,
      errors,
      handleChange,
      id,
      label,
      placeholder,
      labelAnimation,
      maxlength,
      name,
      readOnly,
      required,
      specificity,
      styles,
      tabIndex,
      touched,
      values
    } = this.props;

    const value = get(values, name, '');
    const active = this.state.focused || !!value;
    const highlightBorder = this.state.focused;
    const errorStyles = displayFieldWithErrors(touched, errors, name);

    return (
      <div>
        <div className={style(wrapperStyles)}>
          <InputBar active={highlightBorder} position="top" show={defaultStyles} />
          <input
            id={id}
            type="text"
            onChange={handleChange}
            className={buildStyles({
              defaultStyles,
              specificity,
              styles:         !defaultStyles ? { ...styles, ...errorStyles } : { ...inputStyles, ...styles, ...errorStyles },
              readOnlyStyles: readOnly ? colors.input.readOnly : ''
            })}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            maxLength={maxlength}
            value={value}
            placeholder={placeholder}
            name={name}
            readOnly={readOnly}
            role="textbox"
            aria-label={label}
            aria-required={required}
          />
          <InputBar active={highlightBorder} position="bottom" show={defaultStyles} />
          <InputLabel active={!labelAnimation || active} clickHandler={this.handleFocus} htmlFor={id}>
            {label}
          </InputLabel>
        </div>
        {displayErrorText(touched, errors, name)}
      </div>
    );
  }
}

FormikTextInput.propTypes = {
  defaultStyles:  PropTypes.bool,
  errors:         PropTypes.object.isRequired,
  handleBlur:     PropTypes.func.isRequired,
  handleChange:   PropTypes.func.isRequired,
  id:             PropTypes.string,
  label:          PropTypes.string,
  placeholder:    PropTypes.string,
  labelAnimation: PropTypes.bool,
  maxlength:      PropTypes.string,
  name:           PropTypes.string.isRequired,
  readOnly:       PropTypes.bool,
  required:       PropTypes.bool,
  specificity:    PropTypes.string,
  styles:         PropTypes.object,
  tabIndex:       PropTypes.number,
  touched:        PropTypes.object.isRequired,
  values:         PropTypes.object.isRequired
};

FormikTextInput.defaultProps = {
  defaultStyles:  true,
  handleBlur:     () => {},
  handleChange:   () => {},
  id:             '',
  label:          '',
  labelAnimation: false,
  mask:           {},
  maxlength:      '300',
  name:           '',
  onBlur:         () => {},
  placeholder:    '',
  readOnly:       false,
  required:       false,
  specificity:    null,
  styles:         inputStyles,
  tabIndex:       0,
  values:         {}
};

export default FormikTextInput;

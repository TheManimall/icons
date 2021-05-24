import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style } from 'typestyle';
import InputLabel from '../input-label';
import {
  buildStyles,
  displayErrorText,
  displayFieldWithErrors
} from '../../utils';
import InputBar from '../input-bar';
import inputStyles, { wrapperStyles } from './styles';
import { getValue } from '../utils';

const inputShown = (show, showOnFocus, focused) =>
  show || (showOnFocus && focused);

class FormikPasswordInput extends Component {
  state = {
    focused: false
  };

  handleFocus = () => this.setState({ focused: true });

  handleBlur = e => {
    this.setState({ focused: false });
    this.props.handleBlur(e);
  };

  render() {
    const {
      name,
      id,
      maxlength,
      inputBar,
      required,
      show,
      disabled,
      error,
      specificity,
      styles,
      handleChange,
      values,
      errors,
      touched,
      showOnFocus,
      labelAnimation,
      placeholder
    } = this.props;

    const { focused } = this.state;

    const value = getValue(values, name);
    const active = focused || !!value;
    const highlightBorder = this.state.focused;
    const errorStyles = displayFieldWithErrors(touched, errors, name);

    return (
      <div>
        <div className={style(wrapperStyles)}>
          <InputBar
            active={highlightBorder}
            position="top"
            show={inputBar}
            error={error}
          />
          <input
            id={id}
            type={inputShown(show, showOnFocus, focused) ? 'text' : 'password'}
            name={name}
            onChange={handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            maxLength={maxlength}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            className={buildStyles({
              specificity,
              styles: { ...inputStyles, ...styles, ...errorStyles }
            })}
          />
          <InputBar
            active={highlightBorder}
            position="bottom"
            show={inputBar}
            error={error}
          />
          <InputLabel
            active={!labelAnimation || active}
            clickHandler={this.handleFocus}
            htmlFor={id}
          >
            {this.props.label}
          </InputLabel>
        </div>
        {displayErrorText(touched, errors, name)}
      </div>
    );
  }
}

FormikPasswordInput.propTypes = {
  id:             PropTypes.string,
  label:          PropTypes.string,
  values:         PropTypes.object.isRequired,
  defaultValue:   PropTypes.string,
  disabled:       PropTypes.bool,
  name:           PropTypes.string,
  placeholder:    PropTypes.string,
  styles:         PropTypes.object,
  maxlength:      PropTypes.string,
  handleBlur:     PropTypes.func.isRequired,
  handleChange:   PropTypes.func.isRequired,
  show:           PropTypes.bool,
  inputBar:       PropTypes.bool,
  required:       PropTypes.bool,
  error:          PropTypes.bool,
  specificity:    PropTypes.string,
  errors:         PropTypes.object.isRequired,
  touched:        PropTypes.object.isRequired,
  showOnFocus:    PropTypes.bool,
  labelAnimation: PropTypes.bool
};

FormikPasswordInput.defaultProps = {
  error:          false,
  styles:         inputStyles,
  name:           '',
  mask:           {},
  show:           false,
  placeholder:    '',
  maxlength:      '300',
  inputBar:       true,
  required:       false,
  disabled:       false,
  specificity:    null,
  showOnFocus:    false,
  labelAnimation: false
};
export default FormikPasswordInput;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import InputLabel from '../input-label';
import { buildStyles, displayErrorText, displayFieldWithErrors } from '../../utils';
import InputBar from '../input-bar';
import inputStyles, { wrapperStyles } from './styles';
import { style } from 'typestyle';
import { getValue, safeValue } from '../utils';

class FormikDateInput extends Component {
  state = {
    focused:  false,
    mask:     this.props.mask,
    maskChar: this.props.maskChar
  };

  handleFocus = () => this.setState({ focused: true });

  handleBlur = e => {
    this.setState({ focused: false });
    this.props.handleBlur(e);
  };

  mountRef = ref => (this.input = ref);

  render() {
    const {
      id,
      name,
      specificity,
      styles,
      required,
      values,
      label,
      handleChange,
      touched,
      errors,
      value: _value,
      labelAnimation
    } = this.props;
    const { focused, mask, maskChar } = this.state;

    const emptyMask = '__/__/____';

    const value = _value != null ? safeValue(_value) : getValue(values, name);

    const active = focused || (!!value && value !== emptyMask);
    const errorStyles = displayFieldWithErrors(touched, errors, name);

    return (
      <div className={style(wrapperStyles)}>
        <InputBar active={active} position="top" />
        <InputMask
          id={id}
          onChange={handleChange}
          className={buildStyles({
            specificity,
            styles: { ...inputStyles, ...styles, ...errorStyles }
          })}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={value}
          mask={mask}
          maskChar={maskChar}
          name={name}
          aria-required={required}
          aria-label={label}
        />
        <InputBar active={active} position="bottom" />
        <InputLabel active={!labelAnimation || active} clickHandler={this.focusFromLabel} htmlFor={id}>
          {this.props.label}
        </InputLabel>
        {displayErrorText(touched, errors, name)}
      </div>
    );
  }
}

FormikDateInput.propTypes = {
  id:             PropTypes.string,
  label:          PropTypes.string,
  values:         PropTypes.object.isRequired,
  value:          PropTypes.string,
  styles:         PropTypes.object,
  handleChange:   PropTypes.func.isRequired,
  handleBlur:     PropTypes.func.isRequired,
  mask:           PropTypes.string,
  maskChar:       PropTypes.string,
  name:           PropTypes.string.isRequired,
  specificity:    PropTypes.string,
  required:       PropTypes.bool,
  labelAnimation: PropTypes.bool
};

FormikDateInput.defaultProps = {
  styles:         inputStyles,
  name:           '',
  mask:           '99/99/9999',
  maskChar:       '_',
  placeholder:    '',
  id:             '',
  label:          '',
  specificity:    '',
  required:       false,
  value:          null,
  labelAnimation: false
};

export default FormikDateInput;

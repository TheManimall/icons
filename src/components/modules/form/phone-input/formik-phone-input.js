import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import InputLabel from '../input-label';
import { buildStyles, displayErrorText, displayFieldWithErrors } from '../../utils';
import InputBar from '../input-bar';
import inputStyles, { wrapperStyles } from './styles';
import { style } from 'typestyle';
import { getValue } from '../utils';

class PhoneInput extends Component {
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
      defaultStyles,
      errors,
      handleChange,
      id,
      labelAnimation,
      name,
      specificity,
      styles,
      touched,
      values
    } = this.props;

    const { focused, mask, maskChar } = this.state;
    const emptyMask = mask.replace(/\d*/g, maskChar);

    const value = getValue(values, name);
    const active = focused || (!!value && value !== emptyMask);
    const highlightBorder = focused;

    const errorStyles = displayFieldWithErrors(touched, errors, name);

    return (
      <div>
        <div className={style(wrapperStyles)}>
          <InputBar active={highlightBorder} position="top" show={defaultStyles} />
          <InputMask
            id={id}
            type="tel"
            onChange={handleChange}
            className={buildStyles({
              defaultStyles,
              specificity,
              styles: { ...inputStyles, ...styles, ...errorStyles }
            })}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            value={value}
            mask={mask}
            maskChar={maskChar}
            name={name}
          />
          <InputBar active={highlightBorder} position="bottom" show={defaultStyles} />
          <InputLabel active={!labelAnimation || active} clickHandler={this.focusFromLabel} htmlFor={id}>
            {this.props.label}
          </InputLabel>
        </div>
        {displayErrorText(touched, errors, name)}
      </div>
    );
  }
}

PhoneInput.propTypes = {
  defaultStyles:  PropTypes.bool,
  errors:         PropTypes.object.isRequired,
  handleBlur:     PropTypes.func.isRequired,
  handleChange:   PropTypes.func.isRequired,
  id:             PropTypes.string,
  label:          PropTypes.string,
  labelAnimation: PropTypes.bool,
  mask:           PropTypes.string,
  maskChar:       PropTypes.string,
  name:           PropTypes.string.isRequired,
  specificity:    PropTypes.string,
  styles:         PropTypes.object,
  touched:        PropTypes.object.isRequired,
  values:         PropTypes.object.isRequired
};

PhoneInput.defaultProps = {
  defaultStyles:  true,
  id:             '',
  label:          '',
  labelAnimation: false,
  mask:           '(999) 999-9999',
  maskChar:       '_',
  name:           '',
  placeholder:    '',
  specificity:    '',
  styles:         inputStyles
};

export default PhoneInput;

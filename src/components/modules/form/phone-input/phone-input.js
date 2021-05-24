import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import InputLabel from '../input-label';
import { buildStyles, stringPresent } from '../../utils';
import InputBar from '../input-bar';
import inputStyles, { wrapperStyles } from './styles';
import { style } from 'typestyle';

class PhoneInput extends Component {
  state = {
    active:    stringPresent(this.props.value),
    value:     this.props.value || '',
    mask:      this.props.mask,
    maskChar:  this.props.maskChar,
    autoFocus: false
  };

  setActive = value => this.setState({ active: value });

  handleFocus = () => this.setActive(true);

  handleChange = e =>
    this.setState(
      { value: e.target.value },
      this.props.onChange(e.target.value)
    );

  focusFromLabel = () => {
    if (!this.state.active) {
      this.setActive(true);
    }
  };

  handleBlur = e => {
    const { value, mask, maskChar } = this.state;
    const emptyMask = mask.replace(/\d*/g, maskChar);

    if (value === emptyMask) {
      return this.setState(
        {
          value:  '',
          active: false
        },
        this.props.onChange('')
      );
    }
    this.setActive(stringPresent(this.state.value));
    this.props.onBlur(e);
  };

  mountRef = ref => (this.input = ref);

  render() {
    const { id, name, specificity, styles } = this.props;
    const { active, value, mask, maskChar } = this.state;

    return (
      <div className={style(wrapperStyles)}>
        <InputBar active={active} position="top" />
        <InputMask
          id={id}
          type="tel"
          autoFocus={this.state.autoFocus}
          onChange={this.handleChange}
          className={buildStyles({
            specificity,
            styles: { ...inputStyles, ...styles }
          })}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={value}
          mask={mask}
          maskChar={maskChar}
          name={name}
        />
        <InputBar active={active} position="bottom" />
        <InputLabel
          active={active}
          clickHandler={this.focusFromLabel}
          htmlFor={id}
        >
          {this.props.label}
        </InputLabel>
      </div>
    );
  }
}

PhoneInput.propTypes = {
  id:       PropTypes.string,
  label:    PropTypes.string,
  value:    PropTypes.string,
  styles:   PropTypes.object,
  onChange: PropTypes.func,
  onBlur:   PropTypes.func,
  mask:     PropTypes.string,
  maskChar: PropTypes.string,
  name:     PropTypes.string
};

PhoneInput.defaultProps = {
  styles:      inputStyles,
  name:        '',
  mask:        '(999) 999-9999',
  maskChar:    '_',
  value:       '',
  placeholder: '',
  onChange:    () => {},
  onBlur:      () => {},
  onKeyDown:   () => {}
};

export default PhoneInput;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style } from 'typestyle';
import InputLabel from '../input-label';
import { buildStyles, stringPresent } from '../../utils';
import InputBar from '../input-bar';
import inputStyles, { wrapperStyles } from './styles';

class PasswordInput extends Component {
  state = {
    active:    stringPresent(this.props.value),
    value:     this.props.value || '',
    autoFocus: false
  };

  handleChange = e => {
    this.props.onChange(e);
  };

  handleFocus = () => this.setState({ active: true });

  focusFromLabel = () => {
    if (!this.state.active) {
      this.setState({ active: true }, this.input.focus());
    }
  };

  handleBlur = e => {
    this.setState({ active: stringPresent(this.input.value) });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
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
      styles
    } = this.props;

    const { active } = this.state;

    return (
      <div className={style(wrapperStyles)}>
        <InputBar
          active={active}
          position="top"
          show={inputBar}
          error={error}
        />
        <input
          id={id}
          ref={input => {
            this.input = input;
          }}
          type={show ? 'text' : 'password'}
          name={name}
          autoFocus={this.state.autoFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          maxLength={maxlength}
          required={required}
          disabled={disabled}
          defaultValue={this.props.defaultValue}
          className={buildStyles(this.props)}
        />
        <InputBar
          active={active}
          position="bottom"
          show={inputBar}
          error={error}
        />
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

PasswordInput.propTypes = {
  id:           PropTypes.string,
  label:        PropTypes.string,
  value:        PropTypes.string,
  defaultValue: PropTypes.string,
  disabled:     PropTypes.bool,
  name:         PropTypes.string,
  styles:       PropTypes.object,
  maxlength:    PropTypes.string,
  onBlur:       PropTypes.func,
  onChange:     PropTypes.func,
  show:         PropTypes.bool,
  inputBar:     PropTypes.bool,
  required:     PropTypes.bool,
  error:        PropTypes.bool,
  specificity:  PropTypes.string
};

PasswordInput.defaultProps = {
  error:       false,
  styles:      inputStyles,
  name:        '',
  mask:        {},
  show:        false,
  value:       '',
  placeholder: '',
  maxlength:   '300',
  inputBar:    true,
  required:    false,
  disabled:    false,
  onChange:    () => {},
  onBlur:      () => {},
  onKeyDown:   () => {},
  specificity: null
};
export default PasswordInput;

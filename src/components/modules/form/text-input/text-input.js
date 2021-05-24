import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '../input-label';
import { buildStyles, stringPresent } from '../../utils';
import InputBar from '../input-bar';
import inputStyles, { wrapperStyles } from './styles';
import { style } from 'typestyle';

class TextInput extends Component {
  state = {
    active:    stringPresent(this.props.value),
    value:     this.props.value || '',
    autoFocus: false
  };

  handleChange = e =>
    this.setState(
      { value: e.target.value },
      this.props.onChange(e.target.value)
    );

  handleFocus = () => this.setState({ active: true });

  focusFromLabel = () => {
    if (!this.state.active) {
      this.setState({ active: true }, this.input.focus());
    }
  };

  handleBlur = () => this.setState({ active: stringPresent(this.state.value) });

  render() {
    const { id, inputBar, showLabel, error, maxlength } = this.props;
    const { active, value } = this.state;

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
          aria-describedby={id}
          { ...this.props.required && {"aria-required" : "true"} }
          ref={input => {
            this.input = input;
          }}
          type="text"
          autoFocus={this.state.autoFocus}
          onChange={this.handleChange}
          className={buildStyles(this.props)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          maxLength={maxlength}
          value={value}
        />
        <InputBar
          active={active}
          position="bottom"
          show={inputBar}
          error={error}
        />
        {showLabel ? (
          <InputLabel
            active={active}
            clickHandler={this.focusFromLabel}
            htmlFor={id}
          >
            {this.props.label}
          </InputLabel>
        ) : null}
      </div>
    );
  }
}

TextInput.propTypes = {
  id:        PropTypes.string,
  label:     PropTypes.string,
  value:     PropTypes.string,
  styles:    PropTypes.object,
  maxlength: PropTypes.string,
  inputBar:  PropTypes.bool,
  showLabel: PropTypes.bool,
  error:     PropTypes.bool,
  onChange:  PropTypes.func
};

TextInput.defaultProps = {
  styles:      inputStyles,
  name:        '',
  mask:        {},
  value:       '',
  placeholder: '',
  maxlength:   '300',
  inputBar:    true,
  showLabel:   true,
  error:       false,
  onChange:    () => {},
  onBlur:      () => {},
  onKeyDown:   () => {}
};
export default TextInput;

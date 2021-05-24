import React, { Component } from 'react';
import PropTypes from 'prop-types';
import textAreaStyles, { wrapperStyles } from './styles';
import InputBar from '../input-bar';
import { buildStyles, inputId, stringPresent } from '../../utils';
import { style } from 'typestyle';

class TextareaInput extends Component {
  state = {
    active:    false,
    value:     this.props.value || '',
    autoFocus: false
  };

  handleChange = e => {
    this.setState(
      {
        value: e.target.value
      },
      this.props.onChange(e.target.value)
    );
  };

  handleBlur = () => {
    this.setState(
      { active: stringPresent(this.state.value) },
      this.props.onBlur(this.state.value)
    );
  };

  render() {
    const { active, value } = this.state;
    const { name, id, placeholder, maxlength, required } = this.props;

    return (
      <div className={style(wrapperStyles)}>
        <InputBar active={active} position="top" />
        <textarea
          type="text"
          name={name}
          id={id}
          className={buildStyles(this.props)}
          aria-label={this.props.label}
          placeholder={placeholder}
          value={value}
          maxLength={maxlength}
          required={required ? 'required' : undefined}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <InputBar active={active} position="bottom" />
      </div>
    );
  }
}

TextareaInput.propTypes = {
  name:        PropTypes.string,
  id:          PropTypes.string,
  value:       PropTypes.string,
  placeholder: PropTypes.string,
  maxlength:   PropTypes.string,
  required:    PropTypes.bool,
  onChange:    PropTypes.func,
  onBlur:      PropTypes.func
};

TextareaInput.defaultProps = {
  styles:      textAreaStyles,
  name:        '',
  id:          inputId('textarea'),
  value:       '',
  placeholder: '',
  maxlength:   '550',
  onChange:    () => {},
  onBlur:      () => {}
};

export default TextareaInput;

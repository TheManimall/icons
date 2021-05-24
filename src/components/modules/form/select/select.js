import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InputLabel from '../input-label';
import styles from './styles';
import { buildStyles, inputId, stringPresent } from '../../utils';
import InputBar from '../input-bar';

import { style } from 'typestyle';

class Select extends Component {
  state = {
    active: stringPresent(this.props.value),
    value:  this.props.value || ''
  };

  focusFromLabel = () => {
    if (!this.state.active) {
      this.setState({ active: true }, this.input.focus());
    }
  };

  handleChange = e => {
    this.setState(
      {
        value:  e.target.value,
        active: e.target.value.length !== 0
      },
      this.props.onChange(e.target.value)
    );
  };

  handleFocus = () => this.setState({ active: true });

  handleBlur = () => {
    this.setState(
      { active: stringPresent(this.state.value) },
      this.props.onBlur(this.state.value)
    );
  };

  renderOptions = () => {
    const { options } = this.props;
    return options.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.text}
      </option>
    ));
  };

  render() {
    const { id, name, label, inputBar, showLabel, required } = this.props;
    const { active, value } = this.state;

    return (
      <div className={style({ position: 'relative' })}>
        <InputBar active={active} position="top" show={inputBar} />

        <select
          id={id}
          name={name}
          ref={input => {
            this.input = input;
          }}
          onChange={this.handleChange}
          className={buildStyles(this.props)}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          value={value}
          required={required}
        >
          {this.renderOptions()}
        </select>
        <InputBar active={active} position="bottom" show={inputBar} />
        {showLabel ? (
          <InputLabel
            active={active}
            htmlFor={id}
            clickHandler={this.focusFromLabel}
            showLabel={showLabel}
          >
            {label}
          </InputLabel>
        ) : null}
      </div>
    );
  }
}

Select.propTypes = {
  name:        PropTypes.string,
  value:       PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label:       PropTypes.string,
  specificity: PropTypes.string,
  id:          PropTypes.string,
  options:     PropTypes.array,
  onChange:    PropTypes.func,
  onBlur:      PropTypes.func,
  styles:      PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  inputBar:    PropTypes.bool,
  showLabel:   PropTypes.bool,
  required:    PropTypes.bool
};

Select.defaultProps = {
  name:      '',
  id:        inputId('select'),
  label:     null,
  value:     '',
  options:   [],
  onChange:  () => {},
  onBlur:    () => {},
  styles:    styles,
  inputBar:  true,
  showLabel: true,
  required:  false
};
export default Select;

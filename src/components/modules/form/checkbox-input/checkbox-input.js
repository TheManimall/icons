import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { buildStyles } from '../../utils';
import { safeValue } from '../utils';

class CheckboxInput extends Component {
  state = {
    value: this.props.value
  };

  handleChange = e => {
    this.setState({ value: e.target.value }, this.props.onChange(e));
  };

  handleBlur = e => {
    this.setState({ value: e.target.value });
    this.props.onBlur(e);
  };

  render() {
    const { value } = this.state;
    const { label, id, name, labelClass, children, specificity, styles } = this.props;

    return (
      <div>
        <input
          type="checkbox"
          value={safeValue(value)}
          name={name}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          id={id}
          className={buildStyles({
            specificity,
            styles: styles || ''
          })}
        />
        {children || (
          <label htmlFor={id} className={labelClass}>
            {label}
          </label>
        )}
      </div>
    );
  }
}

CheckboxInput.propTypes = {
  value:       PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name:        PropTypes.string,
  onChange:    PropTypes.func,
  onBlur:      PropTypes.func,
  id:          PropTypes.string,
  label:       PropTypes.string,
  labelClass:  PropTypes.string,
  styles:      PropTypes.object,
  specificity: PropTypes.string
};

CheckboxInput.defaultProps = {
  value:       '',
  name:        '',
  onChange:    () => {},
  onBlur:      () => {},
  id:          '',
  label:       '',
  labelClass:  '',
  styles:      {},
  specificity: ''
};

export default CheckboxInput;

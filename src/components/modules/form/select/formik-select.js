import PropTypes from 'prop-types';
import { style } from 'typestyle';
import React, { Component } from 'react';
import InputLabel from '../input-label';
import selectStyles from './styles';
import { buildStyles, inputId, displayErrorText, displayFieldWithErrors } from '../../utils';
import InputBar from '../input-bar';
import colors from '../../colors';
import { getValue } from '../utils';

class FormikSelect extends Component {
  state = {
    focused: false
  };

  handleFocus = () => this.setState({ focused: true });

  handleBlur = e => {
    this.setState({ focused: false });
    this.props.handleBlur(e);
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
    const {
      defaultStyles,
      disabled,
      errors,
      handleChange,
      id,
      inputBar,
      label,
      name,
      specificity,
      styles,
      touched,
      values,
      ariaLabel
    } = this.props;

    console.log('ariaLabel', ariaLabel);

    const value = getValue(values, name);
    const highlightBorder = this.state.focused;
    const errorStyles = displayFieldWithErrors(touched, errors, name);

    return (
      <div>
        <div
          className={style({
            display:  'flex',
            flex:     '1',
            position: 'relative'
          })}
        >
          <InputBar active={highlightBorder} position="top" show={inputBar} />

          <select
            id={id}
            name={name}
            onChange={handleChange}
            className={buildStyles({
              defaultStyles,
              specificity,
              styles: {
                ...selectStyles,
                ...styles,
                ...errorStyles,
                '-webkit-appearance': 'none'
              },
              readOnlyStyles: disabled ? colors.input.readOnly : {}
            })}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            value={value}
            disabled={disabled}
            aria-label={ariaLabel}
          >
            {this.renderOptions()}
          </select>

          <InputBar active={highlightBorder} position="bottom" show={inputBar} />
          <InputLabel active htmlFor={id}>
            {label}
          </InputLabel>
        </div>
        <div>{displayErrorText(touched, errors, name)}</div>
      </div>
    );
  }
}

// FormikSelect.propTypes = {
//   defaultStyles: PropTypes.bool,
//   disabled:      PropTypes.bool,
//   errors:        PropTypes.object.isRequired,
//   handleBlur:    PropTypes.func.isRequired,
//   handleChange:  PropTypes.func.isRequired,
//   id:            PropTypes.string,
//   inputBar:      PropTypes.bool,
//   label:         PropTypes.string,
//   name:          PropTypes.string.isRequired,
//   options:       PropTypes.array,
//   specificity:   PropTypes.string,
//   styles:        PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
//   touched:       PropTypes.object.isRequired,
//   values:        PropTypes.object.isRequired,
//   ariaLabel:     PropTypes.string
// };

FormikSelect.defaultProps = {
  defaultStyles: true,
  disabled:      false,
  id:            inputId('select'),
  inputBar:      true,
  label:         null,
  options:       [],
  required:      false,
  specificity:   '',
  styles:        selectStyles
};

export default FormikSelect;

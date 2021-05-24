import React, { Component } from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import InputLabel from "../input-label";
import {
  buildStyles,
  displayErrorText,
  displayFieldWithErrors
} from "../../utils";
import InputBar from "../input-bar";
import inputStyles, { wrapperStyles } from "./styles";
import { style } from "typestyle";
import { getValue } from "../utils";

class FormikPostalInput extends Component {
  state = {
    focused: false,
    mask: this.props.mask,
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
      label,
      values,
      handleChange,
      touched,
      errors,
      labelAnimation
    } = this.props;
    const { focused, mask, maskChar } = this.state;
    const emptyMask = "_____";

    const value = getValue(values, name);
    const active = focused || (!!value && value !== emptyMask);
    const highlightBorder = focused;

    const errorStyles = displayFieldWithErrors(touched, errors, name);

    return (
      <div>
        <div className={style(wrapperStyles)}>
          <InputBar active={highlightBorder} position="top" />
          <InputMask
            id={id}
            type="tel"
            className={buildStyles({
              specificity,
              styles: { ...inputStyles, ...styles, ...errorStyles }
            })}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={handleChange}
            value={value}
            mask={mask}
            maskChar={maskChar}
            name={name}
            aria-required={required}
            aria-label={label}
          />
          <InputBar active={highlightBorder} position="bottom" />
          <InputLabel
            active={!labelAnimation || active}
            clickHandler={this.focusFromLabel}
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

FormikPostalInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.object.isRequired,
  styles: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  mask: PropTypes.string,
  maskChar: PropTypes.string,
  name: PropTypes.string.isRequired,
  specificity: PropTypes.string,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  labelAnimation: PropTypes.bool,
  required: PropTypes.bool
};

FormikPostalInput.defaultProps = {
  styles: inputStyles,
  name: "",
  mask: "99999",
  maskChar: "_",
  id: "",
  label: "",
  specificity: "",
  labelAnimation: false,
  required: false
};

export default FormikPostalInput;

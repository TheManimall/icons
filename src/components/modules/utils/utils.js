import React from 'react';
import { classes, style } from 'typestyle';
import { get } from 'lodash';
import { fieldWithErrors, errorText } from './styles';

export const border = (size, type, color) => `${size} ${type} ${color}`;

export const spacing = (fn, values) => {
  if (!Array.isArray(values)) {
    return fn(values);
  }
  return values.map(v => fn(v)).join(' ');
};

export const withParentClass = (parentClass, childStyles) => {
  const generatedClass = style({
    $nest: {
      [`&.${parentClass}`]: childStyles
    }
  });

  return classes(generatedClass, parentClass);
};

export const buildStyles = ({
  defaultStyles = true,
  specificity,
  styles,
  readOnlyStyles
}) => {
  if (!defaultStyles) return;

  return specificity
    ? withParentClass(specificity, { ...styles, ...readOnlyStyles })
    : style({ ...styles, ...readOnlyStyles });
};

export const inputId = name => {
  const last4OfTime = new Date()
    .getTime()
    .toString()
    .substr(-4);
  if (name) {
    return `${name}_${last4OfTime}`;
  }
  return last4OfTime;
};

export const displayFieldWithErrors = (touched, errors, fieldName) =>
  get(touched, fieldName) && get(errors, fieldName) ? fieldWithErrors : null;

export const displayErrorText = (touched, errors, fieldName) =>
  get(touched, fieldName) && get(errors, fieldName) ? (
    <div className={`${errorText} in-form-errors`}>{get(errors, fieldName)}</div>
  ) : null;

export const stringPresent = value => (value || '').length !== 0;

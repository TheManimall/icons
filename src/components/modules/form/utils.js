// The purpose of having this function is
// * Replace null or undefined value by an empty string.
// value != null is same as value !== null && value !== undefined
//
// It is a little big annoying that we have to do the value safty check
// because React complains null input value, but it is intended. Look at this
// https://github.com/facebook/react/issues/6996#issuecomment-224570549
import { get } from 'lodash';

export const safeValue = value => (value != null ? value : '');

export const getValue = (values, name) => {
  const value = values && get(values, name);
  return safeValue(value);
};

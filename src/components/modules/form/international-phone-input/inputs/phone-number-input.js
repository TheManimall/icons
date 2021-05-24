import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const PhoneNumberInput = ({ phoneNumber, onPhoneNumberChange, mask, parser, config = {} }) => (
  <input
    className={config.class}
    disabled={config.disabled}
    id="international-phone-number"
    type="text"
    value={mask(`${phoneNumber.areaCode}${phoneNumber.phoneNumber}`)}
    onChange={event => {
      onPhoneNumberChange(parser(mask(event.target.value)));
    }}
  />
);

PhoneNumberInput.propTypes = {
  phoneNumber: PropTypes.shape({
    areaCode:    PropTypes.string,
    phoneNumber: PropTypes.string
  }),
  onPhoneNumberChange: PropTypes.func,
  mask:                PropTypes.func,
  parser:              PropTypes.func,
  config:              PropTypes.shape({
    disabled: PropTypes.bool
  })
};


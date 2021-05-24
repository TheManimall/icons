import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { PhoneNumberInput, DialingCodeSelect } from '.';
import masks from '../masks/masks';
import parsers from '../parsers/parsers';
import { get } from 'lodash';

export const InternationalPhoneInput = ({
  phoneNumber,
  onPhoneNumberChange,
  dialingCode,
  onDialingCodeChange,
  applicableCountries,
  errors,
  config }) => {
  const mask = masks[dialingCode];
  const parser = parsers[dialingCode];
  const genConfig = get(config, 'general', {});
  const dialingCodeLabel = get(genConfig, 'labels.dialingCode', '');
  const phoneNumberLabel = get(genConfig, 'labels.phoneNumber', '');


  // Re-mask and parse phone number when the dialing code is updated
  // TODO make it more explicit what's going on here
  const onDialingCodeChangeWrapper = value => {
    onDialingCodeChange(value);
    onPhoneNumberChange(parsers[value](masks[value](`${phoneNumber.areaCode}${phoneNumber.phoneNumber}`)));
  };

  return (
    <Fragment>
      <label>
        { dialingCodeLabel }
        <DialingCodeSelect
          dialingCode={dialingCode}
          onDialingCodeChange={onDialingCodeChangeWrapper}
          applicableCountries={applicableCountries}
          config={get(config, 'dial_code_select', {})}
        />
      </label>
      <label>
        { phoneNumberLabel }
        <PhoneNumberInput
          phoneNumber={phoneNumber}
          onPhoneNumberChange={onPhoneNumberChange}
          mask={mask}
          parser={parser}
          config={get(config, 'phone_number_input', {})}
        />
      </label>
    </Fragment>
  );
};

InternationalPhoneInput.propTypes = {
  phoneNumber: PropTypes.shape({
    areaCode:    PropTypes.string,
    phoneNumber: PropTypes.string
  }),
  onPhoneNumberChange: PropTypes.func,
  dialingCode:         PropTypes.string,
  onDialingCodeChange: PropTypes.func,
  applicableCountries: PropTypes.array,
  errors:              PropTypes.object,
  config:              PropTypes.shape({
    general: PropTypes.shape({
      labels: PropTypes.shape({
        dialingCode: PropTypes.string,
        phoneNumber: PropTypes.string
      })
    }),
    dial_code_select: PropTypes.shape({
      disabled: PropTypes.bool
    }),
    phone_number_input: PropTypes.shape({
      disabled: PropTypes.bool
    })
  })
};

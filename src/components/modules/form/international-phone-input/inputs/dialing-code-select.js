import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const DialingCodeSelect = ({ dialingCode, onDialingCodeChange, applicableCountries, config = {} }) => (
  <select
    disabled={config.disabled}
    id="dialing-code-select"
    onChange={event => { onDialingCodeChange(event.target.value); }}
    value={dialingCode}
  >
    {applicableCountries.map(country => (
      <option key={country.countryCode} value={country.dialingCode}>
        {`${country.countryName} (+${country.dialingCode})`}
      </option>
    ))}
  </select>
);

DialingCodeSelect.propTypes = {
  dialingCode:         PropTypes.string,
  onDialingCodeChange: PropTypes.func,
  applicableCountries: PropTypes.array,
  config:              PropTypes.shape({
    disabled: PropTypes.bool
  })
};


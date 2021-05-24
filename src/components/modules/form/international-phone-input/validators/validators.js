export const validators = {
  1: (value, lengthValidation, formatValidation) => (
    value.areaCode.length != 3 || value.phoneNumber.length != 7
      ? lengthValidation
      : !`${value.areaCode}${value.phoneNumber}`.match(/^[2-9]{1}[0-9]{2}[2-9]{1}[0-9]{6}$/)
        ? formatValidation
        : null
  ),
  45: (value, lengthValidation) => (
    value.phoneNumber.length != 8 || !`${value.phoneNumber}`.match(/^[0-9]*$/)
      ? lengthValidation
      : null
  )
};

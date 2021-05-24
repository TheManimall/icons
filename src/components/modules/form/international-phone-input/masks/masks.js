const masks = {
  1: value => {
    if (!value) return value;

    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  },
  45: value => {
    if (!value) return value;

    const currentValue = value.replace(/[^\d]/g, '');

    // Replace every other char with itself and a space after, (?!$) prevents a space from being added at the end of the str
    return currentValue.replace(/(\d{2})(?!$)/g, '$1 ').slice(0, 11);
  }
};

export default masks;

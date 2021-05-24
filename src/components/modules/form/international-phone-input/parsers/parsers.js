const parsers = {
  1: value => {
    if (!value) return { areaCode: "", phoneNumber: ""};

    const strippedVal = value.replace(/[^0-9]/g, '');

    return { areaCode: strippedVal.slice(0, 3), phoneNumber: strippedVal.slice(3) };
  },
  45: value => {
    if (!value) return { areaCode: "", phoneNumber: ""};

    const strippedVal = value.replace(/[^0-9]/g, '');

    return { areaCode: "", phoneNumber: strippedVal };
  }
};

export default parsers;

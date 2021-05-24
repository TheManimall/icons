const colorsMap = {
  blue:         '#43ADE8',
  black:        '#0a0a0a',
  green:        '#60b440',
  grey:         '#999999',
  greyLightest: '#FBFBFB',
  greyDarker:   '#BCBCBC',
  greyLight:    '#C2C2C2',
  darkBlue:     '#005A97',
  purple:       '#5b2f91',
  red:          '#D0021B',
  teal:         '#00BCE7',
  yellow:       '#fbc93a',
  white:        '#FFFFFF',
  lightGray:    '#747474'
};

const colors = {
  button: {
    primary: {
      background: colorsMap.purple,
      color:      colorsMap.white
    },
    secondary: {
      background: colorsMap.blue,
      color:      colorsMap.white
    }
  },
  input: {
    primary: {
      border:       colorsMap.greyDarker,
      borderActive: colorsMap.teal,
      background:   colorsMap.greyLightest,
      placeholder:  colorsMap.grey,
      error:        {
        border: colorsMap.yellow
      }
    },
    readOnly: {
      color:             colorsMap.black,
      backgroundColor:   colorsMap.greyLight,
      $nest: {
        '&:disabled': {
          content:         '\'\'',
          transform:       'scale3d(1,1,1)',
          backgroundColor: colorsMap.greyLight,
        },
        '&[readonly]': {
          content:         '\'\'',
          backgroundColor: colorsMap.greyLight,
        },
      }
    }
  },
  select: {
    disabled: {
      color:           colorsMap.lightGray,
      backgroundColor: colorsMap.greyLight
    }
  },
  textarea: {
    disabled: {
      color:           colorsMap.lightGray,
      backgroundColor: colorsMap.greyLight,
    }
  },
  tiles: {
    green:    colorsMap.green,
    darkBlue: colorsMap.darkBlue,
    purple:   colorsMap.purple,
    white:    colorsMap.white
  },
  notifications: {
    success: colorsMap.green,
    notice:  colorsMap.blue,
    error:   colorsMap.red
  }
};

export { colors };

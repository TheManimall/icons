import { important, rem } from 'csx';
import colors from '../colors';

const fontFamily = '"effra", sans-serif';

export const fontWeight = {
  light:   300,
  regular: 400,
  medium:  500,
  bold:    700
};

const typography = {
  h1: {
    fontFamily:    fontFamily,
    fontWeight:    'normal',
    fontStyle:     'normal',
    color:         'inherit',
    textRendering: 'optimizeLegibility',
    margin:        0,
    marginBottom:  rem(0.5),
    padding:       0,
    lineHeight:    1.4
  },
  p: {
    fontWeight:    fontWeight.light,
    fontSize:      'inherit',
    lineHeight:    1.6,
    margin:        0,
    marginBottom:  rem(1),
    padding:       0,
    textRendering: 'optimizeLegibility'
  },
  fieldCopy1: {
    fontWeight:    fontWeight.light,
    textTransform: 'uppercase',
    color:         colors.black
  },
  fieldCopy2: {
    fontWeight: important(fontWeight.regular),
    fontSize:   important(rem(1)),
    lineHeight: important(rem(1.3)),
    color:      colors.black
  }
};
export default typography;

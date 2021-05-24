import { border } from '../../utils';
import colors from '../../colors';
import { color, px, percent } from 'csx';

const baseInput = {
  borderLeft:  'none',
  borderRight: 'none',
  outline:     'none',
  boxShadow:   'none'
};
const textAreaStyles = {
  marginBottom: 0,
  height:       px(125),
  width:        percent(100),
  paddingLeft:  px(32),
  borderTop:    border(
    px(1),
    'solid',
    color(colors.input.primary.border).toString()
  ),
  borderBottom: border(
    px(1),
    'solid',
    color(colors.input.primary.border).toString()
  ),
  backgroundColor: color(colors.input.primary.background).toString(),
  resize:          'vertical',
  ...baseInput,
  $nest:           {
    '&&::placeholder': {
      color: color(colors.input.primary.placeholder).toString
    },
    '&:focus': {
      backgroundColor: color(colors.input.primary.background).toString(),
      ...baseInput
    },
    '&:disabled': {
      content:   '\'\'',
      transform: 'scale3d(1,1,1)',
      backgroundColor: colors.input.readOnly.backgroundColor,
    },
    '&[readonly]': {
      content: '\'\'',
      backgroundColor: colors.input.readOnly.backgroundColor
    }
  },
};

const wrapperStyles = {
  position: 'relative'
};

export default textAreaStyles;
export { wrapperStyles };

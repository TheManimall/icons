import { border } from '../../utils';
import colors from '../../colors';
import { color, px, percent } from 'csx';

const baseInput = {
  borderLeft:  'none',
  borderRight: 'none',
  outline:     'none',
  boxShadow:   'none'
};

const inputStyles = {
  marginBottom: 0,
  height:       px(50),
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
  ...baseInput,
  $nest:           {
    '&[type=text]:focus': {
      borderTop:    'none',
      borderBottom: 'none',
      ...baseInput
    },
    '&[type=password]:focus': {
      ...baseInput,
      borderTop:    'none',
      borderBottom: 'none'
    },
    '&:disabled': {
      content:   '\'\'',
      transform: 'scale3d(1,1,1)',
      color: '#d80f0f',
      backgroundColor:   color(colors.input.readOnly.backgroundColor).toString(),
    },
    '&[readonly]': {
      content: '\'\'',
      color: '#d80f0f',
      backgroundColor:   color(colors.input.readOnly.backgroundColor).toString(),
    }
  }
};

const wrapperStyles = {
  position: 'relative'
};

export default inputStyles;
export { wrapperStyles };

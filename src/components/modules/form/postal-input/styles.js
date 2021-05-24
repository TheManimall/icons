import { border } from '../../utils';
import colors from '../../colors';
import { color, px, percent, rem } from 'csx';

const baseInput = {
  borderLeft:  'none',
  borderRight: 'none',
  outline:     'none',
  boxShadow:   'none'
};

const inputStyles = {
  marginBottom:    0,
  height:          px(50),
  width:           percent(100),
  paddingLeft:     px(32),
  borderTop:       border(px(1), 'solid', color(colors.input.primary.border).toString()),
  borderBottom:    border(px(1), 'solid', color(colors.input.primary.border).toString()),
  backgroundColor: color(colors.input.primary.background).toString(),
  ...baseInput,
  $nest:           {
    '&[type=tel]:focus': {
      ...baseInput
    }
  },
  fontSize:   rem(1),
  fontWeight: 400
};

const wrapperStyles = {
  position: 'relative'
};

export default inputStyles;
export { wrapperStyles };

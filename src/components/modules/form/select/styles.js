import { style } from 'typestyle';
import { spacing, border } from '../../utils';
import { color, px, percent } from 'csx';
import colors from '../../colors';

const selectStyles = {
  marginBottom: 0,
  height:       px(50),
  border:       'none',
  width:        percent(100),
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
  padding:            spacing(px, [0, 0, 0, 32]),
  outline:            '0',
  backgroundPosition: 'right 1rem center',
  backgroundColor:    color(colors.input.primary.background).toString(),
  $nest:              {
    '::-moz-focus-inner': 'none',
    '&:focus':            {
      border:          'none',
      'box-shadow':    'none',
      backgroundColor: color(colors.input.primary.background).toString()
    }
  }
};

export default selectStyles;

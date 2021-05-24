import { style } from 'typestyle';
import { color, px, percent } from 'csx';
import colors from '../../colors';
import { border } from '../../utils';

const errorBorder = border(px(1), 'solid', color(colors.input.primary.error.border).toString());
const standardBorder = border(px(1), 'solid', color(colors.input.primary.borderActive).toString());

const baseStyles = ({ position }) => ({
  position:   'absolute',
  left:       0,
  width:      percent(100),
  [position]: 0
});

const before = error => ({
  position:        'absolute',
  content:         '\'\'',
  left:            '0',
  height:          px(1),
  width:           percent(100),
  borderTop:       error ? errorBorder : standardBorder,
  transform:       'scale3d(0,1,1)',
  transformOrigin: 'center',
  transition:      'all .2s ease'
});

const after = {
  content:         '\'\'',
  top:             '0',
  left:            '0',
  height:          percent(100),
  width:           percent(100),
  transformOrigin: 'center',
  position:        'absolute'
};

const baseNest = ({ position, error }) => {

  return {
    $nest: {
      '&:before': { [position]: 0, ...before(error) },
      '&:after':  after
    }
  };
};

const activeBar = style({
  $nest: {
    '&&:before': {
      content:   '\'\'',
      transform: 'scale3d(1,1,1)'
    },
    '&:after': {
      content: '\'\''
    }
  }
});

const inputBarStyles = ({ position, error }) => style(baseStyles({ position }), baseNest({ position, error }));

export default inputBarStyles;
export { activeBar };

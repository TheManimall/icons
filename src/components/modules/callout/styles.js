import { style, media } from 'typestyle';
import { px, percent, deg, rotate } from 'csx';
import { border } from '../utils';

const common = {
  background:   '#fff',
  border:       border(px(1), 'dashed', '#5b2f91'),
  borderRadius: px(4)
};

const baseStyles = {
  ...common,
  padding:  px(10),
  position: 'relative',
  $nest:    {
    '&::before': {
      ...common,
      content:   '\'\'',
      display:   'block',
      position:  'absolute',
      width:     px(14),
      height:    px(14),
      transform: rotate(deg(45))
    }
  }
};

const pointer = {
  left: {
    $nest: {
      '&&::before': {
        left:             px(-8),
        top:              percent(20),
        borderRightColor: 'transparent',
        borderTopColor:   'transparent'
      }
    }
  },
  down: {
    $nest: {
      '&&::before': {
        left:            percent(20),
        bottom:          px(-8),
        borderLeftColor: 'transparent',
        borderTopColor:  'transparent'
      }
    }
  }
};

const styles = {
  callout:   style(baseStyles),
  direction: (direction, responsive) => {
    const arrow = pointer[direction] || pointer.left;
    const responsiveArrow = pointer[responsive] || arrow;

    return style(
      media({ maxWidth: 639 }, { ...responsiveArrow }),
      media({ minWidth: 640 }, { ...arrow })
    );
  }
};

export default styles;

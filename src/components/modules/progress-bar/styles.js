import { style } from 'typestyle';
import { percent, rem, color } from 'csx';

import colors from '../colors';

const styles = {
  container: style({
    display:         'flex',
    height:          rem(0.5),
    width:           percent(100),
    backgroundColor: color(colors.progressBar.primary.background).toString()
  }),
  bar: style({
    backgroundColor: color(colors.progressBar.primary.bar).toString()
  }),
  percent: width =>
    style({
      width: percent(width)
    })
};

export default styles;

import { style } from 'typestyle';
import { px } from 'csx';

const styles = {
  bar: style({
    position: 'absolute',
    bottom:   '0',
    width:    px(5),
    zIndex:   10
  }),
  barsContainer: style({
    margin: '50px auto 0 auto',
    width:  px(62),
    height: px(30)
  }),
  defaultBar: style({
    border: '1px solid #ffffff'
  })
};

export default styles;

import { style } from 'typestyle';
import { px, color } from 'csx';
import colors from '../colors';

const baseStyles = {
  maxWidth: px(360),
  height:   px(400),
  padding:  px(20),
  overflow: 'hidden'
};

const tileStyles = style(baseStyles);

const tileColor = value => {
  const tileColor = colors.tiles[value]
    ? colors.tiles[value]
    : colors.tiles.white;
  return style({ backgroundColor: color(tileColor).toString() });
};

export { tileStyles, tileColor };

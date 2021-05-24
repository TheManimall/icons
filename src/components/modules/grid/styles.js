import { media } from 'typestyle';
import { px, rem } from 'csx';
import { buildStyles } from '../utils';
import { MEDIA_QUERY_BREAKING_POINT } from '../constants';

const margin = ({ top = 0, left = 0, right = 0, bottom = 0 }) => ({
  marginTop:    rem(top),
  marginRight:  rem(right),
  marginBottom: rem(bottom),
  marginLeft:   rem(left)
});

const smallScreen = small => {
  if (!small) return null;
  return media({ maxWidth: px(MEDIA_QUERY_BREAKING_POINT) }, { flexDirection: 'column' });
};

const row = ({ left, right, top, bottom, small, specificity, justifyContent }) =>
  buildStyles({
    specificity,
    styles: {
      display:       'flex',
      flexDirection: 'row',
      justifyContent,
      ...smallScreen(small),
      ...margin({ top, left, bottom, right })
    }
  });

const column = ({ flex, left, right, top, bottom, collapseStyles, specificity }) =>
  buildStyles({
    specificity,
    styles: {
      display:       'flex',
      flexDirection: 'column',
      flex,
      ...margin({ top, left, bottom, right }),
      ...media({ maxWidth: px(MEDIA_QUERY_BREAKING_POINT) }, collapseStyles)
    }
  });

export { row, column };

import { px, important } from 'csx';
import { media } from 'typestyle';
import { MEDIA_QUERY_BREAKING_POINT } from '../../constants';

const labelStyles = {
  default: {
    position:      'absolute',
    left:          px(22),
    paddingLeft:   px(10),
    paddingRight:  px(10),
    textTransform: 'uppercase',
    transition:    '0.2s ease all',
    ...media({ maxWidth: px(MEDIA_QUERY_BREAKING_POINT) }, { fontSize: important('small') })
  },
  active: {
    top:             px(-13),
    backgroundColor: '#FFF'
  },
  inactive: {
    top:             px(13),
    backgroundColor: 'transpa'
  }
};

const activeLabel = active => (active ? labelStyles.active : labelStyles.inactive);

export default labelStyles;

export { activeLabel };

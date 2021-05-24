import { style } from 'typestyle';
import { px, em, color, important, percent } from 'csx';
import { spacing, border } from '../utils';
import colors from '../colors';
import appSizing from '../sizing';
import { fontWeight } from '../typography';

const baseButton = {
  display:        'flex',
  justifyContent: 'center',
  lineHeight:     important(em(0.75)),
  textTransform:  'uppercase',
  textShadow:     'none',
  width:          percent(100),
  padding:        spacing(px, [appSizing.padding / 1.25, appSizing.padding * 2])
};

const primaryStyle = {
  backgroundColor: color(colors.button.primary.background).toString(),
  border:          border(
    px(2),
    'solid',
    color(colors.button.primary.background).toString()
  ),
  color: color(colors.button.primary.color).toString(),
  $nest: {
    '&:hover, &:focus': {
      color:   color(colors.button.primary.color).toString(),
      opacity: 0.85
    },
    div: {
      color:      color(colors.button.secondary.color).toString(),
      fontWeight: important(fontWeight.regular)
    }
  }
};

const secondaryStyle = {
  backgroundColor: color(colors.button.secondary.background).toString(),
  border:          border(
    2,
    'solid',
    color(colors.button.secondary.background).toString()
  ),
  color: color(colors.button.secondary.color).toString(),
  $nest: {
    '&:hover, &:focus': {
      backgroundColor: color(colors.button.secondary.background)
        .darken(0.1)
        .toString(),
      border: border(
        2,
        'solid',
        color(colors.button.secondary.background)
          .darken(0.1)
          .toString()
      ),
      color: color(colors.button.secondary.color).toString()
    },
    div: {
      color:      color(colors.button.secondary.color).toString(),
      fontWeight: important(fontWeight.regular),
      whiteSpace: 'nowrap'
    }
  }
};

const styles = {
  primary:   style(baseButton, primaryStyle),
  secondary: style(baseButton, secondaryStyle)
};

const buttonStyles = weight => {
  const fontWeights = weight ? weight : 'regular';
  return {
    primary: {
      fontWeight: fontWeight[fontWeights],
      ...baseButton,
      ...primaryStyle
    },
    secondary: {
      fontWeight: fontWeight[fontWeights],
      ...baseButton,
      ...secondaryStyle
    }
  };
};

export { buttonStyles };
export default styles;
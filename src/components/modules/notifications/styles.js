import { style } from 'typestyle';
import { color, important, percent, px } from 'csx';

const presets = {
  slideDown: {
    start: {
      opacity:   [1e-6],
      scale:     [0],
      translate: [0],
      marginTop: [-20]
    },
    active: {
      opacity:   [1],
      scale:     [5],
      translate: [200],
      marginTop: [50]
    },
    enter: {
      opacity:   [1],
      scale:     [1],
      translate: [0],
      marginTop: [0]
    },
    leave: {
      opacity:   [0],
      scale:     [0.5],
      translate: [0],
      marginTop: [-20]
    },
    animation: item => ({
      opacity:   item.opacity,
      transform: `translate(0px, ${item.translate}px)`,
      marginTop: `${item.marginTop}%`
    })
  },
  fadeIn: {
    start: {
      opacity: [1e-6]
    },
    enter: {
      opacity: [1]
    },
    update: {
      opacity: [1]
    },
    leave: {
      opacity: [0]
    },
    animation: state => {
      return { opacity: state.opacity };
    }
  }
};

export default class NotificationStyles {
  constructor(options) {
    const { colors, typography } = options;

    return {
      notificationParent: style({
        float:      'left',
        position:   'relative',
        width:      percent(100),
        transition: 'all 0.2s ease',
        zIndex:     50
      }),
      notification: style({
        'align-items':     'center',
        display:           'flex',
        'justify-content': 'left',
        float:             'left',
        width:             percent(100)
      }),
      success: style({
        background: color(colors.success).toString()
      }),
      notice: style({
        background: color(colors.notice).toString()
      }),
      error: style({
        background: color(colors.error).toString()
      }),
      message: style({
        ...typography.fieldCopy2,
        flex:        1,
        float:       'left',
        marginTop:   important(px(15)),
        paddingLeft: important(px(35)),
        color:       '#FFF',
        maxWidth:    percent(75)
      }),
      closeWrapper: style({
        float:       'right',
        marginRight: important(px(45)),
        padding:     important(px(5)),
        $nest:       {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      })
    };
  }
}

const notificationStyle = (messageType, styles) =>
  styles[messageType] || styles.notice;

const animate = animation => {
  if (!presets[animation]) {
    return presets.fadeIn;
  }

  return presets[animation];
};

export { notificationStyle, animate };

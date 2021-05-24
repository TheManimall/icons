import { classes, style } from 'typestyle';
import { px, percent } from 'csx';


export const fieldWithErrors = {
  borderTop:    '1px solid #FF0000',
  borderBottom: '1px solid #FF0000',
  marginBottom: 0,
  height:       px(50),
  width:        percent(100),
  paddingLeft:  px(32)
};

export const errorText = style({
  color: '#FF0000'
});

export const checkboxFieldError = {
  outline: '1px solid #FF0000'
};

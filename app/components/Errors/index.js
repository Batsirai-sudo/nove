import {showMessage, hideMessage} from 'react-native-flash-message';
import {FONTS} from '@utils';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

export default Errors = (errors) => {
  const options = isObject(errors) && !isArray(isArray) ? errors : {};
  const {textStyle, titleStyle} = options;
  const red = '#DA291C';
  const green = '#2BBD69';
  const yellow = '#FDC309';
  const blue = '#0B69FF';

  let duration,
    message,
    description,
    type,
    position,
    icon,
    autoHide,
    onPress,
    floating;
  typeof errors.message === 'undefined'
    ? (message = 'Error occurred')
    : (message = errors.message);
  typeof errors.description === 'undefined'
    ? (description = 'Unknown error occurred')
    : (description = errors.description);
  typeof errors.position === 'undefined'
    ? (position = 'top')
    : (position = errors.position);
  typeof errors.icon === 'undefined' ? (icon = 'danger') : null;
  typeof errors.autoHide === 'undefined'
    ? (autoHide = false)
    : (autoHide = errors.autoHide);
  typeof errors.floating === 'undefined'
    ? (floating = false)
    : (floating = errors.floating);
  typeof errors.onPress === 'undefined'
    ? (onPress = () => {})
    : (onPress = errors.onPress);

  errors.type === 'success' ? (icon = 'success') : null;

  type =
    errors.type === 'success'
      ? 'success'
      : errors.type === 'info'
      ? 'info'
      : 'danger';

  const backgroundColor =
    type === 'danger'
      ? red
      : type === 'warning'
      ? yellow
      : type === 'success'
      ? green
      : blue;
  showMessage({
    backgroundColor,
    message,
    description,
    type,
    floating,
    position,
    icon,
    autoHide,
    onPress,
    textStyle: [
      {
        fontSize: 14,
        fontFamily: FONTS.Regular,
        lineHeight: 24,
      },
      textStyle && textStyle,
    ],
    titleStyle: [
      {
        fontSize: 16,
        fontFamily: FONTS.Regular,
        lineHeight: 40,
      },
      titleStyle && titleStyle,
    ],
  });
};

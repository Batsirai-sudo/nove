import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import {Colors} from '@utils';

function FloatButton(props) {
  const {children, bottom, onPress, bgcolor,top} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          bottom,
          top,
          backgroundColor: bgcolor
            ? bgcolor
            : Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
        },
      ]}>
      <View>{children}</View>
    </TouchableOpacity>
  );
}

FloatButton.propTypes = {
  bottom: PropTypes.bool,
  onPress: PropTypes.func,
};
FloatButton.defaultProps = {
  bottom: 200,
  onPress: () => {},
};

export default FloatButton;

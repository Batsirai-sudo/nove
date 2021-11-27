import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {View, Text as TextRN, ViewPropTypes} from 'react-native';
import Text from '../Text';
import Icon from '../Icon';
import nodeType from '@helpers/nodeType';
import renderNode from '@helpers/nodeType';
import styles from './styles';

function Badge(props) {
  const {colors} = useTheme();
  const {
    value,
    size,
    type,
    icon,
    viewIconStyle,
    containerStyle,
    textStyle,
    bg,
  } = props;
  return (
    <View
      style={[
        styles.container,
        {
          height: size,
          minWidth: size,
          borderRadius: size / 2,
          backgroundColor:
            bg === 'deliveries'
              ? '#EDA2A5'
              : bg === 'stock'
              ? '#61C7Cb'
              : colors[type] || colors.primary,
        },
        containerStyle,
      ]}>
      {icon ? (
        <View style={[styles.icon, viewIconStyle]}>
          {renderNode(Icon, icon, {
            name: 'star',
            size: 12,
            color: 'white',
          })}
        </View>
      ) : null}
      <Text style={[styles.text, textStyle]}>{value}</Text>
    </View>
  );
}

Badge.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.number,
  type: PropTypes.oneOf(['primary', 'error', 'warning', 'success', 'waiting']),
  containerStyle: ViewPropTypes.style,
  textStyle: TextRN.propTypes.style,
  icon: nodeType,
  viewIconStyle: ViewPropTypes.style,
};

Badge.defaultProps = {
  value: '',
  size: 20,
  type: 'primary',
  containerStyle: {},
  textStyle: {},
  viewIconStyle: {},
};

export default Badge;

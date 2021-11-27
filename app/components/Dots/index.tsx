import React, {memo} from 'react';
import { dimensions} from '@utils'
import {Animated, StyleSheet, View, ViewStyle} from 'react-native';
import styles from './styles';

const { width_screen } = dimensions

interface Props {
  scrollX: Animated.Value;
  style?: ViewStyle;
}

const Dots = memo(({scrollX, ...props}: Props) => {
  const opacity1 = scrollX.interpolate({
    inputRange: [0, width_screen, width_screen * 2],
    outputRange: [1, 0.4, 0.4],
    extrapolate: 'clamp',
  });
  const opacity2 = scrollX.interpolate({
    inputRange: [0, width_screen, width_screen * 2],
    outputRange: [0.4, 1, 0.4],
    extrapolate: 'clamp',
  });
  const opacity3 = scrollX.interpolate({
    inputRange: [0, width_screen, width_screen * 2],
    outputRange: [0.4, 0.4, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={[styles.container, props.style]}>
      <Animated.View style={[styles.dot, {opacity: opacity1}]} />
      <Animated.View style={[styles.dotCenter, {opacity: opacity2}]} />
      <Animated.View style={[styles.dot, {opacity: opacity3}]} />
    </View>
  );
});

export default Dots;



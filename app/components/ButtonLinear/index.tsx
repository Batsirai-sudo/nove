import React, {memo} from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../Text';
import styles from './styles';

interface Props {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const ButtonLinear = memo((props: Props) => {
  return (
    <TouchableOpacity
      style={[props.style, {overflow: 'hidden'}]}
      onPress={props.onPress}
      activeOpacity={0.75}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.linear}
        colors={['#ED3269', '#F05F3E']}>
        <Text style={styles.txtCode}>{props.title || ''}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
});

export default ButtonLinear;

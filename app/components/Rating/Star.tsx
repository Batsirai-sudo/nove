import React, {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BigStar, BigEmptyStar} from '@svg-components';

export enum size {
  small,
  medium,
  big,
}
interface RateProps {
  active: boolean;
  onPress: (index: number) => void;
  index: number;
}

const Star = memo((props: RateProps) => {
  const {onPress} = props;
  const onPressRate = useCallback(() => {
    onPress(props.index);
  }, [onPress]);
  return (
    <TouchableOpacity
      onPress={onPressRate}
      style={styles.star}
      activeOpacity={0.8}>
      {props.active ? <BigStar /> : <BigEmptyStar />}
    </TouchableOpacity>
  );
});

export default Star;

const styles = StyleSheet.create({
  rateContainer: {
    flexDirection: 'row',
  },
  star: {
    marginLeft: 16,
  },
});

import React, {memo, useCallback, useState} from 'react';
import Star from './Star';
import {StyleSheet, View} from 'react-native';

interface RatingProps {
  rate?: number;
  rating?: any;
}

const Rating = memo((props: RatingProps) => {
  const [rate, setRate] = useState(props.rate ? props.rate : 0);
  const onRate = useCallback(
    (index: number) => {
      setRate(index);
      props.rating(index);
    },
    [setRate],
  );
  return (
    <View style={styles.container}>
      <Star onPress={onRate} active={rate >= 1} index={1} />
      <Star onPress={onRate} active={rate >= 2} index={2} />
      <Star onPress={onRate} active={rate >= 3} index={3} />
      <Star onPress={onRate} active={rate >= 4} index={4} />
      <Star onPress={onRate} active={rate >= 5} index={5} />
    </View>
  );
});

export default Rating;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

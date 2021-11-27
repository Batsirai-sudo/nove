import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {HalfStarRate, EmptyStar, StarRate} from '@svg-components';

interface StarIconProps {
  fillFull: boolean;
  fillHalf: boolean;
}
const StarIcon = memo((props: StarIconProps) => {
  return (
    <View style={styles.star}>
      {props.fillFull ? (
        <StarRate />
      ) : props.fillHalf ? (
        <HalfStarRate />
      ) : (
        <EmptyStar />
      )}
    </View>
  );
});

export default StarIcon;

const styles = StyleSheet.create({
  star: {marginLeft: 3},
});

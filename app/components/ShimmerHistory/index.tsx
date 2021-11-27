import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {View, ViewPropTypes, Animated} from 'react-native';
const HEIGHT = 100;

function ShimmerHistory() {
  const [opacity] = React.useState(new Animated.Value(0.3));
  const {colors} = useTheme();

  React.useEffect(() => {
    function animateOpacity() {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }).start(animateOpacity);
      });
    }
    animateOpacity();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <View style={styles.icon(colors.border)} />
      <View style={styles.right(colors.border)}>
        <View style={[styles.line(colors.border), styles.time]} />
        <View style={[styles.line(colors.border), styles.name]} />
        {/* <View style={[styles.line(colors.border), styles.nameAdd]} />
        <View style={[styles.line(colors.border), styles.status]} /> */}
      </View>
    </Animated.View>
  );
}

const styles = {
  container: {
    height: HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  icon: (color) => ({
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: color,
  }),
  right: (borderColor) => ({
    height: '100%',
    flex: 1,
    marginLeft: 20,
    paddingVertical: 20,
    borderColor,
    top: 5,
  }),
  line: (color) => ({
    backgroundColor: color,
    borderRadius: 2,
  }),
  time: {
    height: 18,
    marginBottom: 14,
  },
  name: {
    height: 19,
    marginBottom: 2,
  },
  nameAdd: {
    height: 19,
    width: 120,
    marginBottom: 11,
  },
  status: {
    height: 18,
    width: 100,
  },
};

ShimmerHistory.propTypes = {
  style: ViewPropTypes.style,
};

export const height = HEIGHT;
export default ShimmerHistory;

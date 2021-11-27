import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {View, ViewPropTypes, Animated} from 'react-native';
const HEIGHT = 120;

function ShimmerItemProduct() {
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
      <View style={[styles.image(colors.border)]} />
      <View style={styles.right(colors.border)}>
        <View style={[styles.line(colors.border), styles.name]} />
        <View style={styles.viewPrice}>
          <View style={[styles.line(colors.border), styles.price]} />
          <View style={[styles.line(colors.border), styles.status]} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = {
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: (color) => ({
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: color,
  }),
  right: (borderColor) => ({
    height: '100%',
    flex: 1,
    marginLeft: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor,
  }),
  line: (color) => ({
    backgroundColor: color,
    borderRadius: 2,
  }),
  name: {
    height: 19,
    marginTop: 5,
    // width: '80%',
  },
  viewPrice: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    height: 24,
    width: 100,
  },
  status: {
    height: 18,
    width: 40,
  },
};

ShimmerItemProduct.propTypes = {
  style: ViewPropTypes.style,
};

export const shimmerUserHeight = HEIGHT;
export default ShimmerItemProduct;

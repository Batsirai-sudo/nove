import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import Text from '../Text';

function Price(props) {
  const {colors} = useTheme();
  const {priceFormat, containerStyle} = props;
  const {buyingPrice, salePrice} = priceFormat;

  if (!buyingPrice && !salePrice) {
    return (
      <View style={containerStyle}>
        <Text>Update...</Text>
      </View>
    );
  }
  if (salePrice) {
    return (
      <View style={[styles.viewSale, containerStyle]}>
        {/* <View style={{flexDirection: 'row'}}>
          <Text style={[styles.priceSale, {color: colors.error}]}>
            R {salePrice}
          </Text>
          <View
            style={{
              backgroundColor: '#b1fcb1',
              borderRadius: 5,
              height: 20,
              alignItems: 'center',
              width: 40,
            }}>
            <Text style={{fontSize: 12}}>sale</Text>
          </View>
        </View> */}
        <View style={{flexDirection: 'row'}}>
          <Text semibold style={styles.regularSale}>
            R {salePrice}
          </Text>
          {/* <View
            style={{
              backgroundColor: '#fcfabc',
              borderRadius: 7,
              height: 20,
              alignItems: 'center',
              width: 60,
            }}>
            <Text style={{fontSize: 12}}>buying</Text>
          </View>
        
         */}
        </View>
      </View>
    );
  }
  return (
    <View style={containerStyle}>
      <Text>{buyingPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewSale: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceSale: {
    marginRight: 12,
  },
  regularSale: {
    fontSize: 15,
    // textDecorationLine: 'line-through',
  },
  // lp:{
  //   justifyContent: '',
  // }
});

Price.propTypes = {
  priceFormat: PropTypes.object,
  containerStyle: ViewPropTypes.style,
};

Price.defaultProps = {
  priceFormat: {},
  containerStyle: {},
};

export default Price;

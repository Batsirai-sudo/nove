import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity, View, ViewPropTypes} from 'react-native';
import Text from '../Text';
import Image from '../Image';
import ActivityIndicator from '../ActivityIndicator';
import Price from './Price';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {Images, currencyFormatter} from '@config';
import {SvgCart, SvgJoin} from '@svg-components';
import {dimensions} from '@utils';
const {height_screen, width_screen} = dimensions;
export function priceFormatData(item, currency = 'USD') {
  let buyingPrice =
    parseFloat(item.buyingPrice) > 0 ? parseFloat(item.buyingPrice) : 0;
  let salePrice =
    parseFloat(item.salePrice) > 0 ? parseFloat(item.salePrice) : null;

  let priceFormat = {
    // buyingPrice: `$${buyingPrice.toFixed(2)}`,
    buyingPrice: currencyFormatter(buyingPrice, currency),
    salePrice: salePrice !== null ? currencyFormatter(salePrice, currency) : '',
  };

  // if (item.type === 'variable' || item.type === 'grouped') {
  //   let price = parseFloat(item.price) > 0 ? parseFloat(item.price) : 0;
  //   priceFormat = {
  //     buyingPrice: currencyFormatter(price, currency),
  //     salePrice: '',
  //   };
  // }
  return priceFormat;
}

function ItemProduct(props) {
  const {colors} = useTheme();
  // const {t} = useTranslation();
  const currency = '0';
  //   const {currency} = React.useContext(AuthContext);
  const {item, containerStyle, goEditProduct, onDelete} = props;
  if (!item) {
    return null;
  }
  const {productName, productURI, brand, mass, InCase} = item;

  const textType = 'ppppp';
  // type === 'external'
  //   ? t('product:text_external_sub')
  //   : type === 'grouped'
  //   ? t('product:text_group_sub')
  //   : type === 'variable'
  //   ? t('product:text_variable_sub')
  //   : t('product:text_simple_sub');
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      // activeOpacity={1}
      onLongPress={onDelete}
      onPress={goEditProduct}>
      {/* <SvgCart style={styles.svg} /> */}

      {/* <Image
        source={productURI ? {uri: productURI} : Images.default_image}
        style={styles.image}
        containerStyle={styles.containerImage}
        PlaceholderContent={<ActivityIndicator size="small" />}
      /> */}
      {/* <Text style={{fontSize: 11}}>{brand}</Text> */}
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20,
          width: width_screen - 80,
          alignItems: 'center',
        }}>
        <View style={{}}>
          <Text bold style={styles.name} numberOfLines={2}>
            {productName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width_screen - 80,

              alignItems: 'center',
            }}>
            <View style={{}}>
              <Text style={[styles.name, {color: '#7F8FA6'}]}>{mass} </Text>
              <Text style={[styles.name, {color: '#7F8FA6'}]}>
                {InCase} /case
              </Text>
            </View>
            <Price
              containerStyle={{}}
              priceFormat={priceFormatData(item, currency)}
            />
          </View>
        </View>
        <View style={[styles.right, {borderColor: colors.border}]}></View>
        <View style={{height: 100, position: 'absolute', right: 5}} />
        <View
          style={{
            width: width_screen - 80,
            height: 1,
            backgroundColor: '#BDBDBD',
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

ItemProduct.propTypes = {
  item: PropTypes.object.isRequired,
  containerStyle: ViewPropTypes.style,
  // goEditProduct: PropTypes.func.isRequired,
};

ItemProduct.defaultProps = {
  containerStyle: {},
};

export default ItemProduct;

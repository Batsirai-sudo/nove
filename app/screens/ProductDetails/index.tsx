import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ROUTES} from '@config';
import {TextComponent as Text, Image} from '@components';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ClientContext} from '@context';
import {Images, currencyFormatter} from '@config';

const ProductDetails = () => {
  const {scannedProduct} = useContext(ClientContext);
  const [data, setData] = useState();
  const {goBack} = useNavigation();

  const getData = async () => {
    await scannedProduct.forEach((result) => {
      setData(result.data());
      console.log('scannedProduct', result.data());
    });
  };
  useEffect(() => {
    scannedProduct.forEach((result) => {
      setData(result.data());
      console.log('scannedProduct', result.data());
    });
    // setProducts(firestoreData);
    // setRefreshing(false);

    // res.docs.forEach((doc) => {
    //   console.log(doc.data());
    // });
  }, []);

  return data ? (
    <View
      style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <TouchableOpacity
        onPress={() => {
          goBack();
        }}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          elevation: 1,
          position: 'absolute',
          top: 60,
          left: 20,
          backgroundColor: '#ff',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text bold>X</Text>
      </TouchableOpacity>
      <Image
        source={
          data.productURI || data.productURI !== 'empty'
            ? {uri: data.productURI}
            : Images.default_image
        }
        style={styles.image}
        containerStyle={styles.containerImage}
        PlaceholderContent={<ActivityIndicator size="small" />}
      />
      <Text style={[styles.txt, {marginTop: -50, marginBottom: 10}]}>
        {data.productName}
      </Text>
      <Text>{data.brand}</Text>

      <View style={styles.flex}>
        <Text>Bar code: </Text>
        <Text bold> {data.barcode}</Text>
      </View>
      <View style={styles.flex}>
        <Text>Buying Price: </Text>
        <Text bold> {data.buyingPrice}</Text>
      </View>
      <View style={styles.flex}>
        <Text>Category: </Text>
        <Text bold> {data.category[0].name}</Text>
      </View>

      <View
        style={{
          width: '60%',
          height: 1,
          backgroundColor: 'grey',
          marginVertical: 15,
        }}
      />
      <Text medium style={{fontSize: 50}}>
        R {data.salePrice}.00
      </Text>
    </View>
  ) : null;
};

export default ProductDetails;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    // marginRight: 1,
  },
  containerImage: {
    borderRadius: 10,
    top: -100,
  },
  txt: {
    fontSize: 30,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
});
//   "visible", "category":
//   [{"id": 7, "name": "Zeology"}],
//   "productName": "Ingram's Camphor ",
//   "productURI": "empty", "regularPrice":
//    "56", "salePrice": "20", "user":
//    {"fullName":
// "Silia Jim", "id": "HQUK6sXMZ9hqDOHmJywjyHIbbKb2"}}

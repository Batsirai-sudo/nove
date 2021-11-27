import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Animated,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import {CommonContext} from '@context';
import {keyExtractor} from '@helpers';
import {currencyFormatter} from '@config';
import {ROUTES} from '@config';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {ShimmerLoading} from '@components';
const HEIGHT = 70;

const index = () => {
  const {getProducts, shopId_Data, getEditProduct} = useContext(CommonContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {navigate} = useNavigation();

  useEffect(() => {
    fetch();

    // DeviceEventEmitter.addListener('dashboardEmitter', (e) => {
    //   this.setState({ count: e.count })
    // })
  }, []);

  const fetch = () => {
    setLoading(true);

    getProducts(null, shopId_Data.shopId.id, shopId_Data.item.name).then(
      (response) => {
        const firestoreData = [];
        response.forEach((result) => {
          firestoreData.push({
            ...result.data(),
            key: result.id,
          });
        });
        setProducts(firestoreData);
        setLoading(false);
      },
    );
  };

  const handleLoad = () => {
    fetch();
  };

  const handleGoFormProduct = (item) => {
    getEditProduct({
      ...item,
      currentShopID: shopId_Data.shopId.id,
    });
    DeviceEventEmitter.addListener('event.testEvent', () => handleLoad());
    navigate(ROUTES.EditProduct);
  };

  const renderItem = (rowData) => {
    var rowData = rowData.item;
    return (
      <TouchableOpacity onPress={() => handleGoFormProduct(rowData)}>
        <DataTable.Row>
          <DataTable.Cell>{rowData.productName}</DataTable.Cell>
          <DataTable.Cell numeric>{rowData.mass}</DataTable.Cell>
          <DataTable.Cell numeric>
            {currencyFormatter(rowData.salePrice)}
          </DataTable.Cell>
        </DataTable.Row>
      </TouchableOpacity>
    );
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Item</DataTable.Title>
        <DataTable.Title numeric>mass</DataTable.Title>
        <DataTable.Title numeric>Sale Price</DataTable.Title>
      </DataTable.Header>
      {loading ? (
        <ShimmerLoading
          style={{paddingHorizontal: 5, left: -8}}
          Component={ShimmerItemOrder}
          height={HEIGHT}
        />
      ) : (
        <FlatList
          // contentContainerStyle={styles.lowerListContent}
          data={products}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          // enableEmptySections
          ListFooterComponent={() => <View style={{height: 400}} />}
        />
      )}

      {/* <DataTable.Row>
      <DataTable.Cell>Frozen yogurt</DataTable.Cell>
      <DataTable.Cell numeric>159</DataTable.Cell>
      <DataTable.Cell numeric>6.0</DataTable.Cell>
    </DataTable.Row> */}

      {/* <DataTable.Pagination
      page={1}
      numberOfPages={3}
      onPageChange={(page) => {
        console.log(page);
      }}
      label="1-2 of 6"
    /> */}
    </DataTable>
  );
};

export default index;

function ShimmerItemOrder() {
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
      <View style={styles.right(colors.border)}>
        <View style={[styles.line(colors.border), styles.product]} />
      </View>
    </Animated.View>
  );
}

const styles = {
  container: {
    height: HEIGHT,
    flexDirection: 'row',
  },
  icon: {
    paddingVertical: 15,
  },
  right: (borderColor) => ({
    height: '100%',
    flex: 1,
    marginLeft: 25,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor,
  }),
  line: (color) => ({
    backgroundColor: color,
    borderRadius: 2,
  }),
  viewNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  orderId: {
    height: 22,
    width: 60,
  },
  status: {
    height: 18,
    width: 80,
  },
  time: {
    height: 18,
  },
  product: {
    height: 24,
    marginTop: 5,
  },
};

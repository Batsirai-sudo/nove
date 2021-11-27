import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';
import {
  FilterProduct2,
  TextComponent,
  SearchBar,
  HotKeys,
  ActivityIndicator,
  ShimmerItemProduct,
  shimmerHeight,
  ItemProduct,
  Header,
  ShimmerLoading,
} from '@components';
import {CommonContext} from '@context';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ROUTES} from '@config';
import _ from 'lodash';
import {useSelector} from 'react-redux';

const data = ['oscar', 'new york fashion show', 'night party', 'lux bar party'];

const Products = () => {
  const {
    getEditProduct,
    getProducts,
    getCategories,
    getMyCurrentShop,
  } = useContext(CommonContext);
  const [value, setValue] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [visibleModal, setVisbleModal] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const {navigate} = useNavigation();
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);
  const {colors} = useTheme();
  useEffect(() => {
    getMyCurrentShop(user.myShops[0]);
    setTimeout(() => {
      fetchProducts();
    }, 1000);
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    const query = {
      type: 'a',
      search: 'b',
      // page,
      // per_page: 5,
      // status: 'any',
    };

    getProducts().then((response) => {
      setLoading(false);
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
        });
      });
      setProducts(firestoreData);
      setRefreshing(false);
    });

    getCategories().then((response) => {
      setLoading(false);
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
          status: result.data().name,
        });
      });

      let sorted = _.sortBy(firestoreData, (a) => a.name);
      setCategories(sorted);
      console.log(sorted);
      console.log(sorted.length);
    });
  };

  const handleLoadMore = () => {
    if (loadingMore) {
      setPage(page + 1);
      setLoadingMore(true);
      fetchProducts();
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchProducts();
  };

  const handleFilter = (key, value) => {
    let a = '';
    let b = '';
    if (key === 'search') {
      setSearch(value);
      setType('');
      b = value;
    }
    if (key === 'type') {
      setType(value);
      setSearch('');
      a = value;
    }
    setVisbleModal(false);
    handleLoad(a, b);
  };

  const handleLoad = () => {
    setLoading(true);
    setLoadingMore(false);
    setRefreshing(false);
    setPage(1);
    setProducts([]);
    fetchProducts();
  };

  const renderFooter = () => {
    if (!loadingMore) {
      return (
        <View style={styles.footerEmpty}>
          <TextComponent style={{top: 20, color: 'red'}}>
            No more products to load.
          </TextComponent>
        </View>
      );
    }

    return (
      <View style={styles.footerLoading}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  };

  const handleGoFormProduct = (item) => {
    getEditProduct({...item});
    DeviceEventEmitter.addListener('event.testEvent', () => handleLoad());

    navigate(ROUTES.EditProduct);

    //   , {
    //   goBack: handleLoad,
    // });
    // if (item.type === 'simple') {
    //   navigation.navigate('FormProductScreen', {
    //     data: item,
    //     goBack: this.handleLoad,
    //   });
    // } else {
    //   showMessage({
    //     message: 'Warning',
    //     description: `You only edit simple products. \nPlease edit other products on the website`,
    //     type: 'warning',
    //   });
    // }
  };

  const ProductsList = () => {
    return (
      <View style={{}}>
        {loading ? (
          <ShimmerLoading
            style={styles.item}
            Component={ShimmerItemProduct}
            height={shimmerHeight}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={true}
            removeClippedSubviews={true}
            keyExtractor={(item, index) => index.toString()}
            data={products}
            renderItem={({item}) => (
              <ItemProduct
                item={item}
                containerStyle={[
                  styles.item,
                  {backgroundColor: colors.background},
                ]}
                goEditProduct={() => handleGoFormProduct(item)}
              />
            )}
            ListFooterComponent={renderFooter}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}

        <FilterProduct2
          visitModal={visibleModal}
          setModalVisible={(val) => setVisbleModal(false)}
          filters={categories}
          valueSelect={type}
          clickFilter={(value) => handleFilter('type', value)}
        />
      </View>
    );
  };

  return (
    <View>
      <Header
        leftComponent={
          <TextComponent style={{color: '#fff'}}>All Products</TextComponent>
        }>
        <TouchableOpacity
          style={styles.click}
          onPress={() => {
            setVisbleModal(true);
          }}>
          <MaterialIcons
            name="tune"
            style={styles.tune}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </Header>

      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        hidden={false}
        backgroundColor={'transparent'}
      />
      <View>
        <View>
          <SearchBar
            placeHolder={'Search Product...'}
            onChangeText={(value) => handleFilter('search', value)}
            onClear={setValue}
            onFocus={() => {
              setValue(true);
            }}
          />
        </View>
        <View style={styles.listContainer}>
          {!value ? <HotKeys data={data} /> : <ProductsList />}
        </View>
      </View>
    </View>
  );
};

export default Products;

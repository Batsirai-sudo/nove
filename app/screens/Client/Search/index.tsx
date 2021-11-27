import React, {useContext, useState, useEffect} from 'react';
import {View, TouchableOpacity, StatusBar, FlatList} from 'react-native';
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
import {ClientContext} from '@context';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ROUTES} from '@config';
import _ from 'lodash';

const widthOpen = 68;
const filters = [
  {
    name: 'product:text_products',
    status: '',
  },
  {
    name: 'product:text_simple',
    status: 'simple',
  },
  {
    name: 'product:text_variable',
    status: 'variable',
  },
  {
    name: 'product:text_group',
    status: 'grouped',
  },
  {
    name: 'product:text_external',
    status: 'external',
  },
];
const data = ['oscar', 'new york fashion show', 'night party', 'lux bar party'];

const Search = () => {
  const {getEditProduct, getProducts, getCategories} = useContext(
    ClientContext,
  );
  const [value, setValue] = useState(true);

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
    fetchProducts(type, search);
  }, []);

  const fetchProducts = (a, b) => {
    setLoading(true);
    const query = {
      type: a,
      search: b,
      // page,
      // per_page: 5,
      // status: 'any',
    };

    getProducts(query).then((response) => {
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
      fetchProducts(type, search);
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchProducts(type, search);
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

  const handleLoad = (a, b) => {
    setLoading(true);
    setLoadingMore(false);
    setRefreshing(false);
    setPage(1);
    setProducts([]);
    fetchProducts(a, b);
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
    navigate(ROUTES.EditProduct, {goBack: handleLoad});
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

export default Search;

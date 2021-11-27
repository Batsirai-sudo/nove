import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  DeviceEventEmitter,
  Text,
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
  Dialog,
  ShimmerLoading,
  Errors,
} from '@components';
import {CommonContext} from '@context';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ROUTES} from '@config';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {keyExtractor} from '@helpers';
import LinearGradient from 'react-native-linear-gradient';

const data = ['oscar', 'new york fashion show', 'night party', 'lux bar party'];

const Search = () => {
  const {
    getEditProduct,
    getProducts,
    getCategories,
    deleteProduct,
    // getMyCurrentShop,
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
  const [content, setContent] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentDeleteData, setCurrentDeleteData] = useState({});
  const [productsLength, setproductsLength] = useState('');

  const [products, setProducts] = useState([]);
  const [fullProducts, setFullProducts] = useState([]);
  const {colors} = useTheme();
  useEffect(() => {
    // getMyCurrentShop(user.myShops[0]);
    setTimeout(() => {
      fetchProducts();
    }, 1000);
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    // const query = {
    //   type: 'a',
    //   search: 'b',
    //   // page,
    //   // per_page: 5,
    //   // status: 'any',
    // };

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
      setFullProducts(firestoreData);
      setproductsLength(firestoreData.length);
      setRefreshing(false);
    });

    // getCategories().then((response) => {
    //   setLoading(false);
    //   const firestoreData = [];
    //   response.forEach((result) => {
    //     firestoreData.push({
    //       ...result.data(),
    //       key: result.id,
    //       status: result.data().name,
    //     });
    //   });

    //   let sorted = _.sortBy(firestoreData, (a) => a.name);
    //   setCategories(sorted);
    //   console.log(sorted);
    //   console.log(sorted.length);
    // });
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

  const containsQuery = ({productName, mass}, query) => {
    if (productName.toLowerCase().includes(query)) {
      return true;
    }

    return false;
  };

  const handleFilter = (key, value) => {
    let a = '';
    let b = '';
    if (key === 'search') {
      setSearch(value);
      setType('');
      const formattedQuery = value.toLowerCase();
      const data = _.filter(fullProducts, (x) => {
        return containsQuery(x, formattedQuery);
      });
      setProducts(data);

      b = value;
    }
    if (key === 'type') {
      setType(value);
      setSearch('');
      a = value;
    }
    setVisbleModal(false);
    // handleLoad();
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
  const deletProduct = () => {
    deleteProduct(currentDeleteData.key)
      .then(() => {
        products.splice(currentDeleteData.index, 1);
        setProducts([...products]);
        Errors({
          message: 'Delete Successfull',
          description: `${currentDeleteData.productName} ${currentDeleteData.mass} has been deleted successfully`,
          position: 'bottom',
          autoHide: true,
          type: 'success',
        });
      })
      .catch((error) =>
        Errors({
          message: 'Something went wrong',
          description: `${currentDeleteData.productName} ${currentDeleteData.mass}  could not be deleted`,
        }),
      );
  };
  const ProductsList = () => {
    return (
      <View style={{}}>
        <Dialog
          title="Delete Warning"
          titleTextStyles={{color: 'red'}}
          content={content}
          firstButtontext="Delete"
          firstButtonTextStyles={{color: 'red'}}
          firstButtonOnPress={() => {
            setDialogVisible(false);
            deletProduct();
          }}
          secondButtontext="Cancel"
          secondButtonOnPress={() => setDialogVisible(false)}
          onSwipefunc={() => setDialogVisible(false)}
          onTouchOutside={() => setDialogVisible(false)}
          modalVisible={dialogVisible}
          height={170}
        />
        {loading ? (
          <ShimmerLoading
            style={styles.item}
            Component={ShimmerItemProduct}
            height={shimmerHeight}
          />
        ) : (
          <>
            <FlatList
              showsVerticalScrollIndicator={true}
              removeClippedSubviews={true}
              keyExtractor={keyExtractor}
              data={products}
              renderItem={({item, index}) => (
                <ItemProduct
                  item={item}
                  onDelete={() => {
                    setContent(
                      `Are you sure you, you want to delete ${item.productName} (${item.mass})`,
                    );
                    setCurrentDeleteData({...item, index});
                    setDialogVisible(true);
                  }}
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

            <LinearGradient
              style={{
                height: 30,
                width: 80,
                position: 'absolute',
                borderRadius: 50,
                top: 10,
                right: 20,
                elevation: 10,
                zIndex: 100,

                justifyContent: 'center',
                alignItems: 'center',
              }}
              colors={['#F05F3E', '#ED3269']}
              start={{x: 1, y: 0}}
              end={{x: 1, y: 1}}>
              <View style={{flexDirection: 'row'}}>
                <TextComponent semibold whiteColor style={{marginRight: 5}}>
                  {productsLength}
                </TextComponent>
              </View>
            </LinearGradient>
          </>
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

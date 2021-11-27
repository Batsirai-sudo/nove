import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  StatusBar,
  ScrollView,
  FlatList,
  I18nManager,
  Alert,
} from 'react-native';
import {
  Icon,
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
import {AdminContext} from '@context';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ROUTES} from '@config';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSelector} from 'react-redux';

const widthOpen = 68;

const data = ['oscar', 'new york fashion show', 'night party', 'lux bar party'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const listViewData = Array(100)
  .fill('')
  .map((_, i) => ({key: `${i}`, text: `item #${i}`}));

const Search = ({route, navigation}) => {
  const {getEditProduct, getProducts, getMyshops} = useContext(AdminContext);
  const [value, setValue] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [trackShowShop, setTrackShowShop] = useState('');
  const [currentShopID, setCurrentShopID] = useState(user.myShops[0]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedShop, setSelectedShop] = useState({});
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [shops, setShops] = useState([]);
  const [visitModal, setVisitModal] = useState(false);
  const {navigate} = useNavigation();
  const modalizeRef = useRef<Modalize>(null);

  const [products, setProducts] = useState([]);
  const {colors} = useTheme();
  useEffect(() => {
    fetchProducts();
    fetchshops();
  }, []);

  const fetchshops = () => {
    getMyshops().then((response) => {
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          key: result.id,
          name: result.data().name,
          isSelected: result.id === currentShopID ? true : false,
        });
      });
      setShops(firestoreData);
    });
  };

  const fetchProducts = () => {
    setLoading(true);
    const query = {
      type,
      search,
      page,
      per_page: 5,
      status: 'any',
    };

    getProducts(query, currentShopID).then((response) => {
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
  };

  const handleLoadMore = () => {
    if (loadingMore) {
      setPage(page + 1);
      setLoadingMore(true);
      fetchProducts();
      // this.setState(
      //   (prevState) => ({
      //     page: prevState.page + 1,
      //     loadingMore: true,
      //   }),
      //   this.fetchProducts,
      // );
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchProducts();
  };
  const handleFilter = (key, value) => {
    if (key === 'search') {
      setSearch(value);
    }
    if (key === 'type') {
      setType(value);
    }
    handleLoad();
  };
  const handleLoad = () => {
    // setLoading(true);
    // setLoadingMore(false);
    // setRefreshing(false);
    // setPage(1);
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
    getEditProduct({...item, currentShopID});
    navigate(ROUTES.EditProduct, {
      goBack: handleLoad,
    });
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
            // leftOpenValue={widthOpen}
            // rightOpenValue={-widthOpen}
            // renderHiddenItem={({item}) => {
            //   return (
            //     <View style={styles.viewHiddenItem}>
            //       <TouchableOpacity
            //         style={[styles.touchDelete, {backgroundColor: '#fa867e'}]}
            //         // onPress={() => this.clickDelete(item.id)}
            //       >
            //         <Icon name="delete-outline" color="white" />
            //       </TouchableOpacity>
            //     </View>
            //   );
            // }}
            // disableLeftSwipe={I18nManager.isRTL}
            // disableRightSwipe={!I18nManager.isRTL}
            // onEndReached={handleLoadMore}
            // onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
        {/* <View style={styles.viewIconAdd}>
  <Avatar
    icon={{
      name: 'plus',
      type: 'material-community',
      size: 16,
      color: white,
    }}
    size={40}
    rounded
    containerStyle={[
      styles.iconAdd,
      {backgroundColor: colors.primary, shadowColor: colors.primary},
    ]}
    onPress={() =>
      navigation.navigate('FormProductScreen', {
        goBack: this.handleLoad,
      })
    }
    activeOpacity={0.9}
  />
</View>
<FilterProduct
  visitModal={visitModal}
  setModalVisible={this.setModalVisible}
  filters={filters}
  valueSelect={type}
  clickFilter={(value) => this.handleFilter('type', value)}
/> */}
      </View>
    );
  };
  const onOpen = () => {
    setTrackShowShop('');
    modalizeRef.current?.open();
  };
  return (
    <View>
      <Header
        leftComponent={
          <TextComponent style={{color: '#fff'}}>
            {/* {shops.filter((x) => x.isSelected)[0].name} Products */}
          </TextComponent>
        }>
        <TouchableOpacity style={styles.click} onPress={onOpen}>
          <MaterialIcons
            name="tune"
            style={{left: 15}}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </Header>
      <View>
        <View>
          <SearchBar
            placeHolder={'Search News...'}
            onChangeText={(value) => handleFilter('search', value)}
            onClear={setValue}
            onFocus={() => {
              setValue(true);
            }}
          />
        </View>
        {/* <HotKeys data={data} /> */}
        <View style={styles.listContainer}>
          {!value ? <HotKeys data={data} /> : <ProductsList />}
        </View>

        <Portal>
          <Modalize ref={modalizeRef}>
            <ScrollView
              contentContainerStyle={{
                marginTop: 100,
              }}>
              <TextComponent
                semibold
                style={{textAlign: 'center', marginBottom: 20}}>
                {trackShowShop.name}
              </TextComponent>
              {trackShowShop
                ? months.map((x, index) => (
                    <TouchableOpacity
                      // onPress={() => {
                      //   setTrackShowShop(x)
                      //   setSelectedShop(x)}}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 15,
                        // backgroundColor: 'red',
                      }}>
                      <View
                        key={index}
                        style={{
                          alignItems: 'center',
                          marginVertical: 15,
                          marginHorizontal: 15,
                        }}>
                        <TextComponent
                          key={index}
                          style={{
                            color: '#556084',
                            // fontWeight: '600',
                            fontSize: 15,
                          }}>
                          {x}
                        </TextComponent>
                      </View>
                    </TouchableOpacity>
                  ))
                : shops.map((x, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setTrackShowShop(x);
                        setSelectedShop(x);
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 15,
                        // backgroundColor: 'red',
                      }}>
                      {x.isSelected ? (
                        <View
                          style={{
                            height: 1,
                            width: '25%',
                            backgroundColor: 'grey',
                          }}
                        />
                      ) : null}

                      <View
                        key={index}
                        style={{
                          alignItems: 'center',
                          marginVertical: 15,
                          marginHorizontal: 15,
                        }}>
                        <TextComponent
                          key={index}
                          style={{
                            color: '#556084',
                            // fontWeight: '600',
                            fontSize: 15,
                          }}>
                          {x.name}
                        </TextComponent>
                      </View>
                      {x.isSelected ? (
                        <View
                          style={{
                            height: 1,
                            width: '25%',
                            backgroundColor: 'grey',
                          }}
                        />
                      ) : null}
                    </TouchableOpacity>
                  ))}
            </ScrollView>
          </Modalize>
        </Portal>
      </View>
    </View>
  );
};

export default Search;

// class Product extends React.Component {
//   static contextType = AuthContext;

//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//       page: 1,
//       loading: true,
//       loadingMore: false,
//       refreshing: false,
//       type: '',
//       search: '',
//       visitModal: false,
//     };
//   }

//   componentDidMount() {
//     this.fetchProducts();
//   }

//   fetchProducts = async () => {
//     try {
//       const {page, type, search} = this.state;
//       const query = {
//         type,
//         search,
//         page,
//         per_page: 5,
//         status: 'any',
//       };
//       const userToken = this?.context?.userToken ?? '';
//       const data = await services.getProducts(query, userToken);
//       if (data.length <= 5 && data.length > 0) {
//         this.setState((prevState) => ({
//           products:
//             page === 1 ? Array.from(data) : [...prevState.products, ...data],
//           loading: false,
//           loadingMore: data.length === 5,
//           refreshing: false,
//         }));
//       } else {
//         this.setState({
//           loadingMore: false,
//           loading: false,
//           refreshing: false,
//         });
//       }
//     } catch (e) {
//       showMessage({
//         message: 'Get data',
//         description: e.message,
//         type: 'danger',
//       });
//       this.setState({
//         loading: false,
//         loadingMore: false,
//         refreshing: false,
//       });
//     }
//   };
//   renderFooter = () => {
//     if (!this.state.loadingMore) {
//       return <View style={styles.footerEmpty} />;
//     }

//     return (
//       <View style={styles.footerLoading}>
//         <ActivityIndicator animating size="small" />
//       </View>
//     );
//   };

//   handleRefresh = () => {
//     this.setState(
//       {
//         page: 1,
//         refreshing: true,
//       },
//       () => {
//         this.fetchProducts();
//       },
//     );
//   };

//   handleLoadMore = () => {
//     const {loadingMore} = this.state;

//     if (loadingMore) {
//       this.setState(
//         (prevState) => ({
//           page: prevState.page + 1,
//           loadingMore: true,
//         }),
//         this.fetchProducts,
//       );
//     }
//   };

//   handleLoad = () => {
//     this.setState(
//       {
//         products: [],
//         page: 1,
//         loading: true,
//         loadingMore: false,
//         refreshing: false,
//       },
//       () => {
//         this.fetchProducts();
//       },
//     );
//   };
//   setModalVisible = (value) => {
//     this.setState({
//       visitModal: value,
//     });
//   };
//   handleFilter = (key, value) => {
//     this.setState({[key]: value, visitModal: false}, this.handleLoad);
//   };

//   clickDelete = async (productId) => {
//     Alert.alert(
//       'Delete product',
//       'Are you sure ?',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => {},
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: () => this.handleDeleteProduct(productId),
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   handleDeleteProduct = async (productId) => {
//     try {
//       const userToken = this?.context?.userToken ?? '';
//       await services.deleteProduct(productId, userToken);
//       showMessage({
//         message: 'Delete',
//         description: 'Delete product success',
//         type: 'success',
//       });
//       this.handleLoad();
//     } catch (e) {
//       showMessage({
//         message: 'Delete',
//         description: e.message,
//         type: 'danger',
//       });
//     }
//   };

//   handleGoFormProduct = (item) => {
//     const {navigation} = this.props;
//     if (item.type === 'simple') {
//       navigation.navigate('FormProductScreen', {
//         data: item,
//         goBack: this.handleLoad,
//       });
//     } else {
//       showMessage({
//         message: 'Warning',
//         description: `You only edit simple products. \nPlease edit other products on the website`,
//         type: 'warning',
//       });
//     }
//   };

//   render() {
//     const {t, theme, navigation} = this.props;
//     const {
//       products,
//       type,
//       search,
//       visitModal,
//       loading,
//       refreshing,
//     } = this.state;
//     const {colors} = theme;

//     const filters = [
//       {
//         name: t('product:text_products'),
//         status: '',
//       },
//       {
//         name: t('product:text_simple'),
//         status: 'simple',
//       },
//       {
//         name: t('product:text_variable'),
//         status: 'variable',
//       },
//       {
//         name: t('product:text_group'),
//         status: 'grouped',
//       },
//       {
//         name: t('product:text_external'),
//         status: 'external',
//       },
//     ];

//     return (
//       <View style={styles.container}>
//         <Header
//           leftComponent={
//             <Text h2 medium>
//               {t('product:text_products')}
//             </Text>
//           }
//           rightComponent={
//             <Icon
//               name="tune"
//               size={20}
//               onPress={() => this.setModalVisible(true)}
//             />
//           }
//           centerContainerStyle={styles.headerCenter}
//           containerStyle={styles.header}
//         />
//         <View style={styles.viewSearch}>
//           <Search
//             placeholder={t('product:text_search')}
//             value={search}
//             onChangeText={(value) => this.handleFilter('search', value)}
//           />
//         </View>
//         {loading ? (
//           <ShimmerLoading
//             style={styles.item}
//             Component={ShimmerItemProduct}
//             height={height}
//           />
//         ) : (
//           <SwipeListView
//             useFlatList
//             showsVerticalScrollIndicator={false}
//             removeClippedSubviews={false}
//             keyExtractor={(item, index) => index.toString()}
//             data={products}
//             renderItem={({item}) => (
//               <ItemProduct
//                 item={item}
//                 containerStyle={[
//                   styles.item,
//                   {backgroundColor: colors.background},
//                 ]}
//                 goEditProduct={() => this.handleGoFormProduct(item)}
//               />
//             )}
//             leftOpenValue={widthOpen}
//             rightOpenValue={-widthOpen}
//             renderHiddenItem={({item}) => {
//               return (
//                 <View style={styles.viewHiddenItem}>
//                   <TouchableOpacity
//                     style={[
//                       styles.touchDelete,
//                       {backgroundColor: colors.secondaryCard},
//                     ]}
//                     onPress={() => this.clickDelete(item.id)}>
//                     <Icon name="delete-outline" color={darkOrange} />
//                   </TouchableOpacity>
//                 </View>
//               );
//             }}
//             disableLeftSwipe={I18nManager.isRTL}
//             disableRightSwipe={!I18nManager.isRTL}
//             onEndReached={this.handleLoadMore}
//             onEndReachedThreshold={0.5}
//             ListFooterComponent={this.renderFooter}
//             refreshing={refreshing}
//             onRefresh={this.handleRefresh}
//           />
//         )}
//         <View style={styles.viewIconAdd}>
//           <Avatar
//             icon={{
//               name: 'plus',
//               type: 'material-community',
//               size: 16,
//               color: white,
//             }}
//             size={40}
//             rounded
//             containerStyle={[
//               styles.iconAdd,
//               {backgroundColor: colors.primary, shadowColor: colors.primary},
//             ]}
//             onPress={() =>
//               navigation.navigate('FormProductScreen', {
//                 goBack: this.handleLoad,
//               })
//             }
//             activeOpacity={0.9}
//           />
//         </View>
//         <FilterProduct
//           visitModal={visitModal}
//           setModalVisible={this.setModalVisible}
//           filters={filters}
//           valueSelect={type}
//           clickFilter={(value) => this.handleFilter('type', value)}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({

// });

// export default function ProductScreen(props) {
//   const {t} = useTranslation();
//   const theme = useTheme();
//   return <Product {...props} theme={theme} t={t} />;
// }

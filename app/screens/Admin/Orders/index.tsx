import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
  IconRadio,
  Errors,
  Loader,
  TextComponent,
  SearchBar,
  HotKeys,
  ActivityIndicator,
  ShimmerItemOrder,
  shimmerItemOrderHeight,
  ItemOrder,
  FilterOrder,
  ShimmerLoading,
  ClientsOrdersItem
} from '@components';
import styles from './styles';
import {dimensions} from '@utils';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ROUTES} from '@config';
import {AdminContext} from '@context';
import _ from 'lodash';
import {currencyFormatter} from '@config';

const {width_screen, height_screen} = dimensions;
const Orders = (props) => {
  const [value, setValue] = useState(true);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [data, setData] = useState([]);
  const {colors} = useTheme();
  const {navigate} = useNavigation();
  const {getClientsOrders, getCurrentFromHomeOrders} = useContext(AdminContext);
  const [fullData, setFullData] = useState([]);
  const [query, setQuery] = useState('');

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     orders: [],
  //     page: 1,
  //     search: '',
  //     loading: true,
  //     loadingMore: false,
  //     refreshing: false,
  //     visitModal: false,
  //     type: 'any',
  //   };
  // }
  // componentDidMount() {
  //   this.fetchOrders();
  // }
  // fetchOrders = async () => {
  //   try {
  //     const {page, search, type} = this.state;
  //     const query = {
  //       page,
  //       per_page: 5,
  //       search,
  //       status: type,
  //     };
  //     const userToken = this?.context?.userToken ?? '';
  //     const data = await services.getOrders(query, userToken);

  //     if (data.length <= 5 && data.length > 0) {
  //       this.setState((prevState) => ({
  //         orders:
  //           page === 1 ? Array.from(data) : [...prevState.orders, ...data],
  //         loading: false,
  //         loadingMore: data.length === 5,
  //         refreshing: false,
  //       }));
  //     } else {
  //       this.setState({
  //         loadingMore: false,
  //         loading: false,
  //         refreshing: false,
  //       });
  //     }
  //   } catch (e) {
  //     showMessage({
  //       message: 'Get data',
  //       description: e.message,
  //       type: 'danger',
  //     });
  //     this.setState({
  //       loading: false,
  //       loadingMore: false,
  //       refreshing: false,
  //     });
  //   }
  // };
  // renderFooter = () => {
  //   if (!this.state.loadingMore) {
  //     return <View style={styles.footerEmpty} />;
  //   }

  //   return (
  //     <View style={styles.footerLoading}>
  //       <ActivityIndicator animating size="small" />
  //     </View>
  //   );
  // };
  // handleRefresh = () => {
  //   this.setState(
  //     {
  //       page: 1,
  //       refreshing: true,
  //     },
  //     () => {
  //       this.fetchOrders();
  //     },
  //   );
  // };
  // handleLoadMore = () => {
  //   const {loadingMore} = this.state;

  //   if (loadingMore) {
  //     this.setState(
  //       (prevState) => ({
  //         page: prevState.page + 1,
  //         loadingMore: true,
  //       }),
  //       this.fetchOrders,
  //     );
  //   }
  // };
  // handleLoad = () => {
  //   this.setState(
  //     {
  //       orders: [],
  //       page: 1,
  //       loading: true,
  //       loadingMore: false,
  //       refreshing: false,
  //     },
  //     () => {
  //       this.fetchOrders();
  //     },
  //   );
  // };
  // setModalVisible = (value) => {
  //   this.setState({
  //     visitModal: value,
  //   });
  // };
  // handleFilter = (key, value) => {
  //   this.setState({[key]: value, visitModal: false}, this.handleLoad);
  // };

  const containsQuery = ({orderNumber}, query) => {
    // const {first, last} = name;
    if (orderNumber.toLowerCase().includes(query)) {
      return true;
    }
    // if (name.includes(query) || last.includes(query) || email.includes(query)) {
    //   return true;
    // }

    return false;
  };

  const handleSearch = (value) => {
    const formattedQuery = value.toLowerCase();
    const data = _.filter(fullData, (x) => {
      return containsQuery(x, formattedQuery);
    });
    setQuery(value);
    setData(data);
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => (
        <TextComponent
          style={{
            fontSize: 16,
            color: 'white',
          }}>
          {props.route.params.type.charAt(0).toUpperCase() +
            props.route.params.type.slice(1)}{' '}
          Orders
        </TextComponent>
      ),
    });
    // setLoading(false);
    // fetchOrders();
    fetch();
  }, []);

  const fetch = () => {
    getClientsOrders().then((response) => {
      const firestoreData = [];
       let count = 1
      response.forEach((result) => {
        // if (result.data().productsData) {
          firestoreData.push({
            ...result.data(),
            key: result.id,
            count:count++
          });
        // }
      });
      setData(firestoreData);
      calculateTotals(firestoreData);

      setLoading(false);
    });
  };

  const calculateTotals = (x) => {
    const val = x.map((x) => x.totalAmount).reduce((a, b) => a + b);
    setTotalAmount(val);
  };

  // const fetchOrders = () => {
  //   const listViewData = Array(100)
  //     .fill('')
  //     .map((_, i) => ({
  //       number: `00000${i}`,
  //       line_items: [{name: `Henken`, quantity: i}],
  //       status: 'accepted',
  //       name: 'Matthew Mlambo',
  //     }));

  //   if (listViewData.length > 90) {
  //     setOrders(listViewData);
  //     setLoading(false);
  //   }
  // };

  const RenderOders = () => {
    return (
      <>
        {loading ? (
          <ShimmerLoading
            style={styles.item}
            Component={ShimmerItemOrder}
            height={shimmerItemOrderHeight}
          />
        ) : (
          <View>
            <View style={styles.floatingContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigate(ROUTES.BatchOrderDetails);
                }}
                style={styles.floatingTag}>
                <TextComponent bold style={{color: 'white'}}>
                  Batch Order
                </TextComponent>

                <TextComponent style={{color: 'white'}}>#1203654</TextComponent>
                <TextComponent bold style={{color: 'white'}}>
                  Week Number
                </TextComponent>
                <TextComponent style={{color: 'white'}}>1</TextComponent>
              </TouchableOpacity>
              <View style={styles.triangle} />
            </View>

            <View style={styles.amountFloating}>
              <View style={styles.amountTag}>
                <TextComponent bold style={{color: 'red'}}>
                  Total Amount
                </TextComponent>

                <TextComponent style={{color: 'red'}}>
                  {currencyFormatter(totalAmount)}
                </TextComponent>
              </View>
              <View style={styles.triangle2} />
            </View>

            <View style={{height: height_screen}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={(item, index) => index.toString()}
                data={data}
                renderItem={({item}) => (
                  // <Text>{item.text}</Text>
                  <ClientsOrdersItem
                    item={item}
                    containerStyle={styles.item}
                    getCurrentFromHomeOrders={getCurrentFromHomeOrders}
                    // goBack={this.handleLoad}
                  />
                )}
                // onEndReached={this.handleLoadMore}
                // onEndReachedThreshold={0.5}
                ListFooterComponent={() => <View style={{height: 200}}></View>}
                // refreshing={refreshing}
                // onRefresh={this.handleRefresh}
              />
            </View>
          </View>
        )}
      </>
    );
  };

  const filters = [
    {
      name: 'Order #1',
      status: 'any',
    },
    {
      name: 'Order #2',
      status: 'completed',
    },
    {
      name: 'Order #3',
      status: 'pending',
    },
    {
      name: 'Order #4',
      status: 'processing',
    },
    {
      name: 'Order #5',
      status: 'on-hold',
    },
  ];
  const HotKeysdata = [
    'oscar',
    'new york fashion show',
    'night party',
    'lux bar party',
  ];

  return (
    <View>
      <View>
        <View>
          <SearchBar
            placeHolder={'Search invoices...'}
            value={query}
            onChangeText={(value) => {
              handleSearch(value);
            }}
            onClear={(value) => {
              handleSearch(value);
            }}
            onFocus={() => {
              setValue(true);
            }}
          />
        </View>

        {!value ? <HotKeys data={HotKeysdata} /> : <RenderOders />}

        {/* <FilterOrder
          visitModal={visitModal}
          setModalVisible={this.setModalVisible}
          filters={filters}
          valueSelect={type}
          clickFilter={(value) => this.handleFilter('type', value)}
        /> */}
      </View>
    </View>
  );
};

export default Orders;

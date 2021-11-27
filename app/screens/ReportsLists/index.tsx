import React, {useContext, useState, useEffect, useRef} from 'react';
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
} from '@components';
import styles from './styles';
import {dimensions} from '@utils';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ROUTES} from '@config';
import {CommonContext} from '@context';
import _ from 'lodash';
import {currencyFormatter} from '@config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {getMonths} from '@constants';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const {width_screen, height_screen} = dimensions;
const Index = ({route}) => {
  const [value, setValue] = useState(true);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [setMonths, setSetMonths] = useState(() =>
    getMonths().map((x) => {
      if (x === moment().format('MMMM')) {
        return {name: x, isSelected: true};
      }
      return {name: x, isSelected: false};
    }),
  );

  const {
    getShopStockOrders,
    getShopDeliveries,
    getMySelectedOrders,
  } = React.useContext(CommonContext);
  const {colors} = useTheme();
  const {navigate, setOptions} = useNavigation();
  // const {getMyOrders} = useContext(AdminContext);
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const modalizeRef = useRef<Modalize>(null);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const renderView = checkType(route.params.type).render;

  useEffect(() => {
    selectFxn(currentMonth);
  }, []);

  const selectFxn = (x) => {
    setLoading(true);
    const res = checkType(route.params.type).value;
    res === 'deliveries'
      ? fetchDeliveries(x)
      : res === 'shopstock'
      ? fetchShopStock(x)
      : '';
  };

  const fetchDeliveries = (x) => {
    setLoading(true);
    getShopDeliveries(x).then((response) => {
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
        });
      });
      setData(firestoreData);
      console.log(response);
      setFullData(firestoreData);
      setLoading(false);
    });
  };
  const fetchShopStock = (x) => {
    setLoading(true);
    getShopStockOrders(x).then((response) => {
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
        });
      });
      setData(firestoreData);
      setFullData(firestoreData);
      setLoading(false);
    });
  };

  const containsQuery = ({orderNumber, metadata, invoice, fullName}, query) => {
    const {adimFullName} = metadata;

    if (route.params.type === 'deliveries') {
      if (
        invoice.toLowerCase().includes(query) ||
        fullName.toLowerCase().includes(query)
      ) {
        return true;
      }
    } else {
      if (
        orderNumber.toLowerCase().includes(query)
        // ||  adimFullName.toLowerCase().includes(query)
      ) {
        return true;
      }
    }
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

  // const RenderOders = () => {
  //   return (
  //     <>
  //       {loading ? (
  //         <ShimmerLoading
  //           style={styles.item}
  //           Component={ShimmerItemOrder}
  //           height={shimmerItemOrderHeight}
  //         />
  //       ) : (
  //         <View>
  //           <View style={{height: height_screen}}>
  //             <FlatList
  //               showsVerticalScrollIndicator={false}
  //               contentContainerStyle={{}}
  //               keyExtractor={(item, index) => index.toString()}
  //               data={data}
  //               renderItem={({item}) => (
  //                 // <Text>{item.text}</Text>
  //                 <ItemOrder
  //                   item={item}
  //                   containerStyle={styles.item}
  //                   getMySelectedOrders={getMySelectedOrders}
  //                   // goBack={this.handleLoad}
  //                 />
  //               )}
  //               // onEndReached={this.handleLoadMore}
  //               // onEndReachedThreshold={0.5}
  //               ListFooterComponent={() => <View style={{height: 200}}></View>}
  //               // refreshing={refreshing}
  //               // onRefresh={this.handleRefresh}
  //             />
  //           </View>
  //         </View>
  //       )}
  //     </>
  //   );
  // };

  const changeMonth = (i) => {
    const z = getMonths().map((x, index) => {
      if (index === i) {
        return {name: x, isSelected: true};
      }
      return {name: x, isSelected: false};
    });
    const r = z.filter((x) => {
      if (x.isSelected) {
        return x.name;
      }
    })[0].name;
    setCurrentMonth(r);
    setSetMonths([...z]);

    modalizeRef.current?.close();
    selectFxn(r);
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
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <SearchBar
            placeHolder={'Search ...'}
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
            style={{width: '80%'}}
          />
          <TouchableOpacity
            style={{
              width: 60,
              right: -5,
              alignItems: 'center',
              position: 'absolute',
              top: 15,
              // backgroundColor: 'red',
            }}
            onPress={onOpen}>
            <MaterialCommunityIcons
              name="tune-vertical"
              style={{left: -10}}
              size={25}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {!value ? (
          <HotKeys data={HotKeysdata} />
        ) : loading ? (
          <ShimmerLoading
            style={styles.item}
            Component={ShimmerItemOrder}
            height={shimmerItemOrderHeight}
          />
        ) : (
          renderView(data)
        )}
        <Portal>
          <Modalize ref={modalizeRef}>
            <ScrollView contentContainerStyle={{marginTop: 30}}>
              {setMonths.map((x, index) =>
                !x.isSelected ? (
                  <TouchableOpacity
                    onPress={() => changeMonth(index)}
                    key={index}
                    style={{alignItems: 'center', marginVertical: 15}}>
                    <TextComponent key={index} style={{color: '#556084'}}>
                      {x.name}
                    </TextComponent>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={index}
                    onPress={() => changeMonth(index)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginHorizontal: 15,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#556084',
                        height: 1,
                        width: '30%',
                      }}
                    />
                    <View
                      key={index}
                      style={{alignItems: 'center', marginVertical: 15}}>
                      <TextComponent
                        key={index}
                        style={{
                          color: '#556084',
                          fontWeight: '600',
                          fontSize: 15,
                        }}>
                        {x.name}
                      </TextComponent>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#556084',
                        height: 1,
                        width: '30%',
                      }}
                    />
                  </TouchableOpacity>
                ),
              )}
            </ScrollView>
          </Modalize>
        </Portal>
        <TouchableOpacity
          style={{
            position: 'absolute',
            borderRadius: 50,
            bottom: 150,
            right: 30,
            elevation: 10,
            zIndex: 100,

            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onOpen}>
          <LinearGradient
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            colors={['#F05F3E', '#ED3269']}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}>
            <MaterialCommunityIcons
              name="tune-vertical"
              size={24}
              color="white"
            />
          </LinearGradient>
        </TouchableOpacity>

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

export default Index;

const checkType = (value) => {
  return value === 'deliveries'
    ? {render: DeliveredStock, value}
    : value === 'shopstock'
    ? {render: ShopStock, value}
    : '';
};

const ShopStock = (data) => {
  return (
    <View>
      <View style={{height: height_screen}}>
        {data.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({item}) => (
              // <Text>{item.text}</Text>
              <ItemOrder
                item={item}
                stockOrder={true}
                containerStyle={styles.item}
                // getMySelectedOrders={getMySelectedOrders}
                // goBack={this.handleLoad}
              />
            )}
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={0.5}
            ListFooterComponent={() => <View style={{height: 200}}></View>}
            // refreshing={refreshing}
            // onRefresh={this.handleRefresh}
          />
        ) : null}
      </View>
    </View>
  );
};
const DeliveredStock = (data) => {
  return (
    <View>
      <View style={{height: height_screen}}>
        {data.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({item}) => (
              // <Text>{item.text}</Text>
              <ItemOrder
                item={item}
                deliveries={true}
                containerStyle={styles.item}
                // getMySelectedOrders={getMySelectedOrders}
                // goBack={this.handleLoad}
              />
            )}
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={0.5}
            ListFooterComponent={() => <View style={{height: 200}}></View>}
            // refreshing={refreshing}
            // onRefresh={this.handleRefresh}
          />
        ) : null}
      </View>
    </View>
  );
};

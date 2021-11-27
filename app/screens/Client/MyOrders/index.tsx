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
import {ClientContext} from '@context';
import _ from 'lodash';
import {currencyFormatter} from '@config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {getMonths} from '@constants';
import moment from 'moment';

const {width_screen, height_screen} = dimensions;
const Orders = (props) => {
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

  const {getMyOrders, getMySelectedOrders} = React.useContext(ClientContext);
  const {colors} = useTheme();
  const {navigate, setOptions} = useNavigation();
  // const {getMyOrders} = useContext(AdminContext);
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const modalizeRef = useRef<Modalize>(null);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));

  useEffect(() => {
    fetch(currentMonth);
  }, []);

  const fetch = (x) => {
    setLoading(true);
    getMyOrders(x).then((response) => {
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

  // const containsQuery = ({orderNumber}, query) => {
  //   // const {first, last} = name;
  //   if (orderNumber.toLowerCase().includes(query)) {
  //     return true;
  //   }
  //   // if (name.includes(query) || last.includes(query) || email.includes(query)) {
  //   //   return true;
  //   // }

  //   return false;
  // };

  // const handleSearch = (value) => {
  //   const formattedQuery = value.toLowerCase();
  //   const data = _.filter(fullData, (x) => {
  //     return containsQuery(x, formattedQuery);
  //   });
  //   setQuery(value);
  //   setData(data);
  // };

  const containsQuery = ({orderNumber, metadata}, query) => {
    const {adimFullName} = metadata;
    if (
      orderNumber.toLowerCase().includes(query) ||
      adimFullName.toLowerCase().includes(query)
    ) {
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
            <View style={{height: height_screen}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={(item, index) => index.toString()}
                data={data}
                renderItem={({item}) => (
                  // <Text>{item.text}</Text>
                  <ItemOrder
                    item={item}
                    containerStyle={styles.item}
                    getMySelectedOrders={getMySelectedOrders}
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
    fetch(r);
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
            placeHolder={'Search invoice...'}
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

        {!value ? <HotKeys data={HotKeysdata} /> : <RenderOders />}
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

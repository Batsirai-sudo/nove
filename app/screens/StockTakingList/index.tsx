import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {
  TextComponent,
  SearchBar,
  HotKeys,
  ShimmerItemOrder,
  shimmerItemOrderHeight,
  ItemOrder,
  ShimmerLoading,
} from '@components';
import styles from './styles';
import {dimensions} from '@utils';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ROUTES} from '@config';
import {CommonContext} from '@context';
import _ from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {getMonths} from '@constants';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const {height_screen} = dimensions;
const Index = ({route}) => {
  const [value, setValue] = useState(true);
  const [loading, setLoading] = useState(true);
  const [setMonths, setSetMonths] = useState(() =>
    getMonths().map((x) => {
      if (x === moment().format('MMMM')) {
        return {name: x, isSelected: true};
      }
      return {name: x, isSelected: false};
    }),
  );

  const {getStockTakings, getMySelectedOrders} = React.useContext(
    CommonContext,
  );
  const {colors} = useTheme();
  const {navigate, setOptions} = useNavigation();
  // const {getMyOrders} = useContext(AdminContext);
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const modalizeRef = useRef<Modalize>(null);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));

  useEffect(() => {
    fetchStockTakings(currentMonth);
  }, []);

  const fetchStockTakings = (x) => {
    setLoading(true);
    getStockTakings(x).then((response) => {
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

  const containsQuery = ({orderNumber, invoice, fullName}, query) => {
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
    fetchStockTakings(r);
  };

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
    <View style={{height: height_screen}}>
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
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({item}) => (
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
      </View>
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
    </View>
  );
};

export default Index;

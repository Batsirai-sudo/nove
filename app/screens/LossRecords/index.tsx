import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  TextComponent,
  SearchBar,
  Datatable,
  Header,
  StoreManagerCard as Card,
  ItemOrder,
  ShimmerItemOrder,
  shimmerItemOrderHeight,
  ShimmerLoading,
} from '@components';
import {keyExtractor} from '@helpers';
import {CommonContext} from '@context';
import moment from 'moment';
import {currencyFormatter, ROUTES, splitting} from '@config';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

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
const LossRecords = () => {
  const {colors} = useTheme();
  const {getLossesHistory, getLossesExpensesDetails} = useContext(
    CommonContext,
  );
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const {navigate, goBack} = useNavigation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const modalizeRef = useRef<Modalize>(null);
  const [fullData, setFullData] = useState([]);
  const [query, setQuery] = useState('');
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [setMonths, setSetMonths] = useState(() =>
    months.map((x) => {
      if (x === moment().format('MMMM')) {
        return {name: x, isSelected: true};
      }
      return {name: x, isSelected: false};
    }),
  );
  const containsQuery = ({invoiceNumber, fullName}, query) => {
    // const {first, last} = name;
    if (
      invoiceNumber.toLowerCase().includes(query) ||
      fullName.toLowerCase().includes(query)
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
  const fetch = (b) => {
    setLoading(true);

    getLossesHistory(b).then((response) => {
      setLoading(false);
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
          type: 'losses',
        });
      });
      setData(firestoreData);
      setFullData(firestoreData);
      console.log(firestoreData);
      // getTotals(firestoreData);
      setVisible(true);
    });
  };
  useEffect(() => {
    fetch(currentMonth);
  }, []);

  const changeMonth = (i) => {
    const z = months.map((x, index) => {
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

  // useEffect(() => {
  //   getLossesHistory().then((response) => {
  //     // setLoading(false);
  //     const firestoreData = [];
  //     response.forEach((result) => {
  //       firestoreData.push({
  //         ...result.data(),
  //         key: result.id,
  //       });
  //     });
  //     setData(firestoreData);
  //     getTotals(firestoreData);
  //   });
  // }, []);

  const getTotals = (c) => {
    const y = c.map((x) => x.amount);
    const total = y.reduce((a, b) => a + b);
    setTotalAmount(total);
  };

  const renderItem = ({item}) => (
    <View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Card
          onPress={() => {
            item.type = 'losses';
            getLossesExpensesDetails(item);
            navigate(ROUTES.ExpenseDetails);
          }}
          cornerRadius={5}
          elevation={1}
          style={{height: 170, width: '100%', marginTop: 5, padding: 15}}>
          <View
            style={{
              borderBottomWidth: 0.5,
              height: 30,
              borderBottomColor: '#556084',
            }}>
            <TextComponent style={{color: '#556084'}}>
              {item.productName} ({item.mass})
            </TextComponent>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              // borderBottomWidth: 0.5,splitting
              height: 50,
              // borderBottomColor: '#556084',
              width: '100%',
            }}>
            <Ionicons name="ios-document-text" size={40} color="#39965b" />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <View style={{left: 10}}>
                <TextComponent
                  style={{color: '#000', fontSize: 17, fontWeight: '600'}}>
                  # {item.invoiceNumber}
                </TextComponent>
                <TextComponent style={{color: '#556084', fontSize: 11}}>
                  Invoice Number
                </TextComponent>
              </View>
              <View style={{left: 10, width: '30%'}}>
                <TextComponent
                  style={{color: '#000', fontSize: 17, fontWeight: '600'}}>
                  {item.quantity}
                </TextComponent>
                <TextComponent style={{color: '#556084', fontSize: 11}}>
                  Quantity
                </TextComponent>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 50,
              // borderBottomColor: '#556084',
            }}>
            <View style={{left: 0, width: '30%', flexDirection: 'row'}}>
              <TextComponent
                style={{color: '#556084', fontSize: 11, fontWeight: '600'}}
                numberOfLines={2}
                medium>
                Description :{'  '}
              </TextComponent>
              <TextComponent
                style={{color: '#556084', fontSize: 11}}
                numberOfLines={2}>
                {splitting(item.description)}
              </TextComponent>
            </View>

            <View style={{left: 10}}>
              <TextComponent
                style={{color: '#556084', fontSize: 17, fontWeight: '600'}}>
                {currencyFormatter(item.amount)}
              </TextComponent>
            </View>
          </View>

          <View></View>
        </Card>
      </View>
      <TextComponent style={{textAlign: 'center', color: '#ccc', fontSize: 12}}>
        {moment(item.createdAt.toDate()).format('Do ddd, MMMM YYYYY HH:mm a')}
      </TextComponent>
    </View>
  );
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <View style={{backgroundColor: colors.thirdBackground, height: '100%'}}>
      <Header
        // title={currencyFormatter(totalAmount)}
        leftComponent={
          <TouchableOpacity
            style={{
              left: -20,
              height: 50,
              width: 50,
              alignItems: 'center',
              top: -5,
            }}
            onPress={() => {
              goBack();
            }}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        }>
        <TextComponent
          style={{
            color: 'white',
          }}>
          Loss Reports
        </TextComponent>
      </Header>

      {/* <Card
        cornerRadius={25}
        style={{alignSelf: 'center', height: 50, width: '90%', marginTop: 10}}> */}
      <View>
        <SearchBar
          placeHolder={'Search invoices & name...'}
          editable={true}
          value={query}
          onChangeText={(value) => {
            handleSearch(value);
          }}
          onFocus={() => {}}
          style={{width: '80%'}}
        />
      </View>

      {loading ? (
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
              losses={true}
              // adminShop={true}
              containerStyle={styles.item}
              getLossesExpensesDetails={getLossesExpensesDetails}
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

      <TouchableOpacity
        style={{
          position: 'absolute',
          borderRadius: 50,
          bottom: 60,
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

export default LossRecords;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  item: {
    marginHorizontal: 25,
  },
  text: {alignItems: 'center'},
  avatar: {
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 40,
    height: 40,
    width: 40,
    backgroundColor: '#37C2D0',
    marginRight: 20,
  },
  rowContainer: {marginHorizontal: 20},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  card: {
    width: '90%',
    padding: 10,
    height: 100,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: '100%',
  },
  flex: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  trans: {
    backgroundColor: 'white',

    elevation: 1,
  },
  smallBar: {
    backgroundColor: '#556084',
    height: 2,
    alignSelf: 'center',
  },
  monthTxt: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row1: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});

// {visible ? (
//   data.length > 0 ? (
//     <FlatList
//       data={data}
//       renderItem={renderItem}
//       keyExtractor={keyExtractor}
//       contentContainerStyle={{}}
//       ListFooterComponent={() => <View style={{height: 100}}></View>}
//     />
//   ) : (
//     <View style={{position: 'absolute', top: '40%', left: '32%'}}>
//       <TextComponent medium style={{fontSize: 20}}>
//         No losses yet
//       </TextComponent>
//     </View>
//   )
// ) : (
//   [1, 1, 1, 1].map((x) => (
//     <ShimmerPlaceHolder
//       visible={visible}
//       shimmerStyle={{
//         // flexDirection: 'row',
//         // justifyContent: 'space-between',
//         alignSelf: 'center',
//         marginVertical: 15,
//         // marginLeft: 20,
//         // marginBottom: 15,
//         width: '95%',
//         height: 150,
//       }}
//     />
//   ))
// )}

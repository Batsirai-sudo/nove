import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import {TextComponent as Text} from '@components';
import {CommonContext} from '@context';
import {currencyFormatter} from '@config';
import moment from 'moment';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getMonths} from '@constants';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {keyExtractor} from '@helpers';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Profits2 = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();
  const [availableProfit, setAvailableProfit] = useState('');
  const [data, setData] = useState([]);
  const {
    getProfitCalculationHistoryData,
    getProfitCalculationHistory,
  } = useContext(CommonContext);
  const modalizeRef = useRef<Modalize>(null);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [visible, setVisible] = useState(false);
  const [setMonths, setSetMonths] = useState(() =>
    getMonths().map((x) => {
      if (x === moment().format('MMMM')) {
        return {name: x, isSelected: true};
      }
      return {name: x, isSelected: false};
    }),
  );
  useEffect(() => {
    fetch(currentMonth);
  }, []);
  const fetch = (x) => {
    setVisible(false);

    getProfitCalculationHistory(x).then((response) => {
      const firestoreData = [];
      response.forEach((result) => {
        if (result.data().recent === '') {
          return false;
        }
        firestoreData.push({
          ...result.data(),
          key: result.id,
        });
      });
      setData(firestoreData);

      setVisible(true);
    });
  };

  const onHistory = (item) => {
    getProfitCalculationHistoryData(item);
    navigate(ROUTES.ProfitsDetails);
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
  return (
    <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
      <View>
        <Text style={{left: 100, marginTop: 10}}>
          Profit Calculation Reports
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 15,
            marginLeft: 20,
            marginBottom: 15,
          }}>
          <View>
            {visible ? (
              <Text ultraLight style={{fontSize: 12}}>
                {currentMonth} {moment().format('YYYY')}
              </Text>
            ) : (
              <ShimmerPlaceHolder
                visible={visible}
                shimmerStyle={{
                  // flexDirection: 'row',
                  // justifyContent: 'space-between',
                  alignSelf: 'center',
                  marginVertical: 15,
                  // marginLeft: 20,
                  // marginBottom: 15,
                  width: '95%',
                  height: 20,
                }}
              />
            )}
            {/* <Text ultraLight style={{fontSize: 12}}>
              07:00
            </Text> */}
          </View>
          <View
            style={{
              elevation: 5,
              borderRadius: 10,
              height: 20,
              width: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text bold style={{fontSize: 12}}>
              1
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#556084',
              height: 2,
              width: '60%',
            }}
          />
        </View>
      </View>

      {visible ? (
        <View style={{height: '100%'}}>
          {data.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => onHistory(item)}
                  style={styles.trans}>
                  {/* <View style={{marginHorizontal: 20}}>
              <View style={{flexDirection: 'row'}}>
                <Text medium>Invoice Number : </Text>
                <Text> #7890</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text medium>Week : </Text>
                <Text> 7890</Text>
              </View>
            </View> */}

                  <View
                    key={item.key}
                    style={{
                      width: '90%',
                      marginHorizontal: 20,
                      height: 10,
                      // backgroundColor: 'blue',
                    }}>
                    {/* <Text medium>Calculation Of Week 3 profits</Text>
              <Text medium>for Stock Delivery Recorded</Text> */}
                  </View>
                  <TouchableOpacity style={styles.row1}>
                    {/* <View style={styles.smallBar} /> */}
                    {/* <View style={styles.monthTxt}> */}
                    <Text
                      key={item.key}
                      style={{color: '#556084', fontSize: 12, left: 20}}>
                      Created : {'        '}
                      <Text semibold>
                        {moment(item.createdAt.toDate()).fromNow()}
                      </Text>
                      {/* {moment(new Date()).format('ddd Do MMM YYYY, hh:mm a')} */}
                    </Text>

                    {/* </View> */}
                    {/* <View style={styles.smallBar} /> */}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.row1}>
                    {/* <View style={styles.smallBar} /> */}
                    {/* <View style={styles.monthTxt}> */}
                    <Text
                      key={item.key}
                      style={{
                        color: '#556084',
                        fontSize: 12,
                        left: 20,
                        marginTop: 5,
                      }}>
                      Updated : {'        '}
                      <Text semibold style={{color: 'red', left: 5}}>
                        {moment(item?.updatedAt?.toDate()).fromNow()}
                      </Text>
                      {/* {moment(new Date()).format('ddd Do MMM YYYY, hh:mm a')} */}
                    </Text>

                    {/* </View> */}
                    {/* <View style={styles.smallBar} /> */}
                  </TouchableOpacity>

                  <View style={styles.rowContainer}>
                    {item.dailyDeliveries ? (
                      <>
                        <View style={styles.row}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {/* <View style={styles.avatar}>
                    <Text whiteColor>BA</Text>
                  </View> */}
                            <View style={styles.text}>
                              <Text style={{color: '#556084'}}>
                                Daily Deliveries{' '}
                              </Text>
                              {/* <Text> Buying Amount</Text> */}
                            </View>
                          </View>
                          <Text medium>
                            {currencyFormatter(
                              item.dailyDeliveries
                                .map((x) => x.totalBuyingAmount)
                                .reduce((a, b) => a + b),
                            )}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '100%',
                            backgroundColor: '#556084',
                            height: 1,
                          }}
                        />
                      </>
                    ) : null}
                    {item.weeklyDeliveries ? (
                      <>
                        <View style={styles.row}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View style={styles.text}>
                              <Text style={{color: '#556084'}}>
                                Weekly Deliveries{' '}
                              </Text>
                            </View>
                          </View>
                          <Text medium>
                            {currencyFormatter(
                              item.weeklyDeliveries
                                .map((x) => x.totalBuyingAmount)
                                .reduce((a, b) => a + b),
                            )}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '100%',
                            backgroundColor: '#556084',
                            height: 1,
                          }}
                        />
                      </>
                    ) : null}

                    <View style={[styles.row, {marginBottom: 5}]}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.text}>
                          <Text style={{color: '#556084'}}>
                            Expenses & Losses
                          </Text>
                        </View>
                      </View>
                      <Text medium style={{color: 'red'}}>
                        - {currencyFormatter(item.losses + item.expenses)}
                      </Text>
                    </View>

                    <View style={[styles.row, {marginBottom: 20}]}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.text}>
                          <Text style={{color: '#556084'}}></Text>
                        </View>
                      </View>
                      <View>
                        <Text bold style={{fontSize: 16, color: '#556084'}}>
                          {currencyFormatter(item.overalProfit)}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#556084',
                            textAlign: 'center',
                          }}>
                          overal profit
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ListFooterComponent={() => <View style={{height: 200}} />}
            />
          ) : (
            <View style={{position: 'absolute', top: '26%', left: '32%'}}>
              <Text medium style={{fontSize: 20}}>
                No reports yet
              </Text>
            </View>
          )}
        </View>
      ) : (
        [1, 2, 3].map((x) => (
          <ShimmerPlaceHolder
            key={x}
            visible={visible}
            shimmerStyle={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              alignSelf: 'center',
              marginVertical: 15,
              // marginLeft: 20,
              // marginBottom: 15,
              width: '95%',
              height: 170,
            }}
          />
        ))
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          borderRadius: 50,
          bottom: 100,
          right: 30,
          elevation: 10,
          zIndex: 100,

          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          // alert(90);
          modalizeRef.current?.open();
        }}>
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
      <Portal>
        <Modalize ref={modalizeRef}>
          <ScrollView contentContainerStyle={{marginTop: 30}}>
            {setMonths.map((x, index) =>
              !x.isSelected ? (
                <TouchableOpacity
                  onPress={() => changeMonth(index)}
                  key={index}
                  style={{alignItems: 'center', marginVertical: 15}}>
                  <Text key={index} style={{color: '#556084'}}>
                    {x.name}
                  </Text>
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
                    <Text
                      key={index}
                      style={{
                        color: '#556084',
                        fontWeight: '600',
                        fontSize: 15,
                      }}>
                      {x.name}
                    </Text>
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
  );
};

export default Profits2;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
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
    // backgroundColor: 'pink',
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

    // marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: '100%',
  },
  flex: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  trans: {
    // height: 80,
    backgroundColor: 'white',
    marginBottom: 30,
    elevation: 5,
  },
  smallBar: {
    width: '5%',
    // backgroundColor: '#556084',
    height: 2,
    alignSelf: 'center',
  },
  monthTxt: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row1: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

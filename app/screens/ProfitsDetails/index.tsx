import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Card} from 'react-native-shadow-cards';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TextComponent as Text, Dot} from '@components';
import {currencyFormatter} from '@config';
import moment from 'moment';
import {CommonContext} from '@context';
import {keyExtractor} from '@helpers';
const index = () => {
  const {profitCalculationHistoryData} = useContext(CommonContext);
  const [data, setData] = useState(
    profitCalculationHistoryData.weeklyDeliveries &&
      profitCalculationHistoryData.dailyDeliveries
      ? profitCalculationHistoryData.weeklyDeliveries
          .concat(profitCalculationHistoryData.dailyDeliveries)
          .reverse()
      : profitCalculationHistoryData.weeklyDeliveries
      ? profitCalculationHistoryData.weeklyDeliveries.reverse()
      : profitCalculationHistoryData.dailyDeliveries.reverse(),
  );
  const {colors} = useTheme();

  useEffect(() => {
    let count = 1;
    const v = data.map((x) => {
      x.count = count++;
      return x;
    });
    setData(v);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
      <View>
        <View style={{flexDirection: 'row', left: 20, marginTop: 10}}>
          <Dot
            color={colors.border}
            size={8}
            borderWidth={0}
            style={{top: 7}}
          />
          <Text style={{marginLeft: 10}}>
            Week Number {'    '}
            <Text bold style={{left: 20, marginTop: 10}}>
              # {profitCalculationHistoryData.week}
            </Text>
          </Text>
        </View>
        <View style={{flexDirection: 'row', left: 20, marginTop: 10}}>
          <Dot
            color={colors.border}
            size={8}
            borderWidth={0}
            style={{top: 7}}
          />
          <Text style={{marginLeft: 10}}>Period ~</Text>
        </View>

        <View style={{position: 'absolute', top: 40, right: 10}}>
          <Text semibold style={{fontSize: 20, letterSpacing: 3}}>
            {currencyFormatter(profitCalculationHistoryData.overalProfit)}
          </Text>
          <Text style={{textAlign: 'center', fontSize: 10, color: 'green'}}>
            Week Overal Profit
          </Text>
        </View>

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
            <View>
              <Text semibold style={{fontSize: 11, color: '#556084', left: 10}}>
                <Text bold style={{fontSize: 11, color: 'red'}}>
                  from {'     '}
                </Text>
                {moment(profitCalculationHistoryData.fromDate.toDate()).format(
                  'ddd Do MMM YYYY',
                )}{' '}
                {'  '}
              </Text>

              <Text
                semibold
                style={{
                  fontSize: 11,
                  color: '#556084',
                  marginTop: 10,
                  left: 10,
                }}>
                <Text bold style={{fontSize: 11, color: 'red'}}>
                  to {'     '}
                </Text>
                {moment(profitCalculationHistoryData.toDate.toDate()).format(
                  'ddd Do MMM YYYY',
                )}{' '}
                {'  '}
              </Text>
            </View>

            <View style={{flexDirection: 'row', left: 0, marginTop: 10}}>
              <Dot
                color={colors.border}
                size={8}
                borderWidth={0}
                style={{top: 7}}
              />
              <Text style={{marginLeft: 10}}>
                Records : {'   '}
                <Text semibold>{profitCalculationHistoryData?.records}</Text>
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#556084',
              height: 1,
              width: '50%',
            }}
          />
        </View>
      </View>

      <View style={styles.trans}>
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
        {/* {data.map((item, index) => ( */}
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={({item, index}) => (
            <View style={styles.rowContainer}>
              <Text semibold style={{color: 'red', left: 5, fontSize: 12}}>
                <Text bold>
                  {item.count}) {'   '}
                </Text>
                {moment(item?.createdAt?.toDate()).fromNow()}
                {/* {moment(item.createdAt.toDate()).format(
                  'ddd Do MMM YYYY, hh:mm a',
                )} */}
              </Text>
              <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <View style={styles.avatar}>
                    <Text whiteColor>BA</Text>
                  </View> */}
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>
                      {item.deliveryType === 'daily'
                        ? 'Daily Deliveries'
                        : 'Weekly Deliveries'}
                    </Text>
                    {/* <Text> Buying Amount</Text> */}
                  </View>
                </View>
                <Text medium>{currencyFormatter(item.totalBuyingAmount)}</Text>
              </View>
              <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <View style={styles.avatar}>
                    <Text whiteColor>BA</Text>
                  </View> */}
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Order Number </Text>
                    {/* <Text> Buying Amount</Text> */}
                  </View>
                </View>
                <Text medium style={{left: -150, color: '#556084'}}>
                  # {item.deliveryNumber}
                </Text>
              </View>
              <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <View style={styles.avatar}>
                    <Text whiteColor>BA</Text>
                  </View> */}
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Total Items </Text>
                    {/* <Text> Buying Amount</Text> */}
                  </View>
                </View>
                <Text medium style={{left: -150, color: '#556084'}}>
                  {item.totalItems}
                </Text>
              </View>

              {/* <View style={[styles.row, {marginBottom: 20}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Weekly Deliveries</Text>
                  </View>
                </View>
                <Text medium>
                  {currencyFormatter(recentProfitCalcu.totalBuyingAmount)}
                </Text>
              </View> */}

              <View
                style={{
                  width: '100%',
                  backgroundColor: '#556084',
                  height: 1,
                }}
              />

              <View style={[styles.row, {marginBottom: 20}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.text}>
                    <Text bold style={{color: '#556084', left: 60}}>
                      Generated Profit
                    </Text>
                  </View>
                </View>
                <Text medium style={{color: '#556084', fontWeight: '600'}}>
                  {currencyFormatter(item.profit)}
                </Text>
              </View>
            </View>
          )}
          ListHeaderComponent={() => (
            <View>
              <View
                style={{
                  width: '90%',
                  marginVertical: 5,
                  marginHorizontal: 20,
                  height: 10,
                  // backgroundColor: 'blue',
                }}>
                {/* <Text medium>Calculation Of Week 3 profits</Text>
              <Text medium>for Stock Delivery Recorded</Text> */}
              </View>
              <TouchableOpacity style={styles.row1}>
                <View style={styles.smallBar} />
                <View style={styles.monthTxt}>
                  <Text style={{color: '#556084'}}> Summary Details</Text>
                </View>
                <View style={styles.smallBar} />
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() => (
            <View
              style={{
                marginHorizontal: 20,
                // backgroundColor: 'blue',
                marginBottom: 200,
              }}>
              <View style={[styles.row, {marginBottom: 5}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Expenses</Text>
                  </View>
                </View>
                <Text medium style={{color: 'red'}}>
                  - {profitCalculationHistoryData.expenses}
                </Text>
              </View>

              <View style={[styles.row, {marginBottom: 40}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Losses</Text>
                  </View>
                </View>
                <Text medium style={{color: 'red'}}>
                  - {profitCalculationHistoryData.losses}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default index;

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
    marginVertical: 8,
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
    marginBottom: 2,
  },
  smallBar: {
    width: '30%',
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
  },
});

// <View style={{marginTop: 20}}>
// <Text ultraLight style={{fontSize: 11}}>
//   {moment(new Date()).format('ddd Do MMM YYYY, hh:mm a')} {'  '}
// </Text>
// <View style={styles.row}>
//   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//     <View style={styles.text}>
//       <Text style={{color: '#556084'}}> </Text>
//     </View>
//   </View>
//   <Text medium>{currencyFormatter(221)}</Text>
// </View>
// <View style={styles.row}>
//   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//     {/* <View style={styles.avatar}>
//     <Text whiteColor>BA</Text>
//   </View> */}
//     <View style={styles.text}>
//       <Text style={{color: '#556084'}}>Order Number </Text>
//       {/* <Text> Buying Amount</Text> */}
//     </View>
//   </View>
//   <Text medium style={{left: -150, color: '#556084'}}>
//     # gft525
//   </Text>
// </View>
// <View style={styles.row}>
//   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//     {/* <View style={styles.avatar}>
//     <Text whiteColor>BA</Text>
//   </View> */}
//     <View style={styles.text}>
//       <Text style={{color: '#556084'}}>Total Items </Text>
//       {/* <Text> Buying Amount</Text> */}
//     </View>
//   </View>
//   <Text medium style={{left: -150, color: '#556084'}}>
//     525
//   </Text>
// </View>

// <View
//   style={{
//     width: '100%',
//     backgroundColor: '#556084',
//     height: 0.5,
//   }}
// />

// <View style={[styles.row, {marginBottom: 20}]}>
//   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//     <View style={styles.text}>
//       <Text bold style={{color: '#556084', left: 60}}>
//         Generated Profit
//       </Text>
//     </View>
//   </View>
//   <Text medium style={{color: '#556084', fontWeight: '600'}}>
//     {currencyFormatter(11)}
//   </Text>
// </View>
// </View>

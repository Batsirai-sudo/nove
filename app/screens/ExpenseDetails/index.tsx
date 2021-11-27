import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Card} from 'react-native-shadow-cards';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TextComponent as Text} from '@components';
import {currencyFormatter, splitting} from '@config';
import moment from 'moment';
import {CommonContext} from '@context';
import {useSelector} from 'react-redux';

const index = () => {
  const {lossesExpensesDetailsData, getUserForExpensesLosses} = useContext(
    CommonContext,
  );
  const [data, setData] = useState({});
  const {colors} = useTheme();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    lossesExpensesDetailsData.userID === user.uid
      ? setData(user)
      : getUserForExpensesLosses(lossesExpensesDetailsData.userID).then(
          (response) => {
            setData(response.data());
          },
        );
  }, []);

  const renderLosses = () => (
    <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
      <View>
        <Text bold style={{color: '#556084', left: 20, marginVertical: 20}}>
          Invoice Number{' '}
          <Text> #{lossesExpensesDetailsData.invoiceNumber}</Text>
        </Text>

        {/* <Text style={{left: 20, marginVertical: 20}}>Week Number </Text> */}
      </View>
      <ScrollView>
        {[1].map((item, index) => (
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

            <View style={styles.rowContainer}>
              <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Time : </Text>
                    {/* <Text> Buying Amount</Text> */}
                  </View>
                </View>
                <Text style={{left: -130, color: '#556084'}}>
                  {moment(lossesExpensesDetailsData.createdAt.toDate()).format(
                    'hh:mm a',
                  )}
                </Text>
              </View>
              <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Date : </Text>
                    {/* <Text> Buying Amount</Text> */}
                  </View>
                </View>
                <Text style={{left: -130, color: '#556084'}}>
                  {moment(lossesExpensesDetailsData.createdAt.toDate()).format(
                    'ddd Do MMM YYYY',
                  )}
                </Text>
              </View>

              <View>
                <View style={{}}>
                  <View>
                    <Text
                      medium
                      style={{
                        color: '#556084',
                        textDecorationLine: 'underline',
                      }}>
                      Product Details
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.row, {marginTop: 15}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Item</Text>
                    {/* <Text> Buying Amount</Text> */}
                  </View>
                </View>
                <Text semibold style={{color: '#556084'}}>
                  {lossesExpensesDetailsData.productName}
                </Text>
              </View>
              <View style={[styles.row, {top: -5}]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Quantity</Text>
                    {/* <Text> Buying Amount</Text> */}
                  </View>
                </View>
                <Text semibold style={{color: '#556084'}}>
                  {lossesExpensesDetailsData.quantity}
                </Text>
              </View>
              <View
                style={[
                  {
                    marginVertical: 6,
                  },
                  {top: -10},
                ]}>
                <View>
                  {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                  <View>
                    <Text
                      style={{
                        color: '#556084',
                        marginBottom: 10,
                        textDecorationLine: 'underline',
                      }}>
                      Image
                    </Text>
                    {/* <Text> Buying Amount</Text> */}
                  </View>
                  <View
                    style={{
                      width: 300,
                      height: 300,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#556084',
                    }}>
                    <Image
                      style={{
                        width: 295,
                        height: 295,
                        borderRadius: 10,
                      }}
                      source={{uri: lossesExpensesDetailsData.image}}
                    />
                  </View>
                </View>
              </View>

              <View style={{marginTop: 20}}>
                <View>
                  <View style={{}}>
                    <View>
                      <Text
                        medium
                        style={{
                          color: '#556084',
                          textDecorationLine: 'underline',
                        }}>
                        Description
                      </Text>
                    </View>
                  </View>
                  <Text style={{color: '#556084', marginVertical: 15}}>
                    {splitting(lossesExpensesDetailsData.description)}
                  </Text>
                </View>

                <View>
                  <View style={{}}>
                    <View>
                      <Text
                        medium
                        style={{
                          color: '#556084',
                          textDecorationLine: 'underline',
                        }}>
                        User Details
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.row, {marginTop: 15}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                    <View style={styles.text}>
                      <Text style={{color: '#556084'}}>First Name</Text>
                      {/* <Text> Buying Amount</Text> */}
                    </View>
                  </View>
                  <Text semibold style={{color: '#556084'}}>
                    {data.givenName}
                  </Text>
                </View>
                <View style={[styles.row, {top: -5}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                    <View style={styles.text}>
                      <Text style={{color: '#556084'}}>Last Name</Text>
                      {/* <Text> Buying Amount</Text> */}
                    </View>
                  </View>
                  <Text semibold style={{color: '#556084'}}>
                    {data.familyName}
                  </Text>
                </View>
                <View style={[styles.row, {top: -10}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                    <View style={styles.text}>
                      <Text style={{color: '#556084'}}>Contact Number</Text>
                      {/* <Text> Buying Amount</Text> */}
                    </View>
                  </View>
                  <Text semibold style={{color: '#556084'}}>
                    {data.mobileNumber}
                  </Text>
                </View>

                <TouchableOpacity style={styles.row1}>
                  <View
                    style={[styles.smallBar, {height: 1.7, width: '50%'}]}
                  />
                  <View
                    style={[styles.smallBar, {height: 1.7, width: '50%'}]}
                  />
                </TouchableOpacity>

                <View style={[styles.row, {marginVertical: 20}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.text}>
                      <Text
                        // letterSpacing={5}
                        bold
                        style={{color: '#556084', left: 60}}>
                        Amount
                      </Text>
                    </View>
                  </View>
                  <Text medium style={{color: '#556084'}}>
                    {currencyFormatter(lossesExpensesDetailsData.amount)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        <View style={{height: 200}} />
      </ScrollView>
    </View>
  );
  const renderExpenses = () => (
    <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
      <View>
        <Text bold style={{color: '#556084', left: 20, marginVertical: 20}}>
          Invoice Number{' '}
          <Text> #{lossesExpensesDetailsData.invoiceNumber}</Text>
        </Text>

        {/* <Text style={{left: 20, marginVertical: 20}}>Week Number </Text> */}
      </View>
      <ScrollView>
        {[1].map((item, index) => (
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
            <Text bold style={{color: '#556084', left: 20, marginVertical: 20}}>
              {lossesExpensesDetailsData.title}
            </Text>
            <View style={styles.rowContainer}>
              <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Time : </Text>
                    {/* <Text> Buying Amount</Text> */}
                  </View>
                </View>
                <Text style={{left: -130, color: '#556084'}}>
                  {moment(lossesExpensesDetailsData.createdAt.toDate()).format(
                    'hh:mm a',
                  )}
                </Text>
              </View>
              <View style={styles.row}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                  <View style={styles.text}>
                    <Text style={{color: '#556084'}}>Date : </Text>
                    {/* <Text> Buying Amount</Text> */}
                  </View>
                </View>
                <Text style={{left: -130, color: '#556084'}}>
                  {moment(lossesExpensesDetailsData.createdAt.toDate()).format(
                    'ddd Do MMM YYYY',
                  )}
                </Text>
              </View>

              <View style={{marginTop: 20}}>
                <View>
                  <View style={{}}>
                    <View>
                      <Text
                        medium
                        style={{
                          color: '#556084',
                          textDecorationLine: 'underline',
                        }}>
                        Description
                      </Text>
                    </View>
                  </View>
                  <Text style={{color: '#556084', marginVertical: 15}}>
                    {splitting(lossesExpensesDetailsData.description)}
                  </Text>
                </View>

                <View>
                  <View style={{}}>
                    <View>
                      <Text
                        medium
                        style={{
                          color: '#556084',
                          textDecorationLine: 'underline',
                        }}>
                        User Details
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.row, {marginTop: 15}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                    <View style={styles.text}>
                      <Text style={{color: '#556084'}}>First Name</Text>
                      {/* <Text> Buying Amount</Text> */}
                    </View>
                  </View>
                  <Text semibold style={{color: '#556084'}}>
                    {data.givenName}
                  </Text>
                </View>
                <View style={[styles.row, {top: -5}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                    <View style={styles.text}>
                      <Text style={{color: '#556084'}}>Last Name</Text>
                      {/* <Text> Buying Amount</Text> */}
                    </View>
                  </View>
                  <Text semibold style={{color: '#556084'}}>
                    {data.familyName}
                  </Text>
                </View>
                <View style={[styles.row, {top: -10}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <View style={styles.avatar}>
                  <Text whiteColor>BA</Text>
                </View> */}
                    <View style={styles.text}>
                      <Text style={{color: '#556084'}}>Contact Number</Text>
                      {/* <Text> Buying Amount</Text> */}
                    </View>
                  </View>
                  <Text semibold style={{color: '#556084'}}>
                    {data.mobileNumber}
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#556084',
                    height: 0.5,
                  }}
                />

                <View style={[styles.row, {marginVertical: 20}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.text}>
                      <Text
                        // letterSpacing={5}
                        bold
                        style={{color: '#556084', left: 60}}>
                        Amount
                      </Text>
                    </View>
                  </View>
                  <Text medium style={{color: '#556084', letterSpacing: 3}}>
                    {currencyFormatter(lossesExpensesDetailsData.amount)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return lossesExpensesDetailsData.type === 'losses'
    ? renderLosses()
    : renderExpenses();
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
    marginVertical: 6,
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

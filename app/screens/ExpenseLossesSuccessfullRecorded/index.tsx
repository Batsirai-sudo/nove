import React, {useRef} from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {TextComponent as Text, Header} from '@components';
import LottieView from 'lottie-react-native';
import {Images, ROUTES, currencyFormatter} from '@config';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CommonContext} from '@context';
import moment from 'moment';

const ExpenseLossesSuccessfullRecorded = () => {
  const animation = useRef();

  const {expensesLossesDetails} = React.useContext(CommonContext);
  const {navigate} = useNavigation();

  return (
    <>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigate(ROUTES.Home);
            }}>
            <AntDesign name="home" color="white" size={30} />
          </TouchableOpacity>
        }
      />

      {expensesLossesDetails.type === 'debt' ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '80%',
          }}>
          <Text
            style={[
              {
                fontSize: 14,

                color: '#353B48',
                textAlign: 'center',
              },
              styles.textLocation,
              {fontSize: 20},
            ]}>
            Dept was Recorded Successfully
          </Text>

          <LottieView
            ref={animation}
            source={Images.success1}
            autoPlay
            loop
            style={{height: 100, width: 100, alignSelf: 'center'}}
          />
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '80%',
          }}>
          <Text
            style={[
              {
                fontSize: 14,

                color: '#353B48',
                textAlign: 'center',
              },
              styles.textLocation,
              {fontSize: 20},
            ]}>
            {expensesLossesDetails.type} Recorded Successfully
          </Text>

          <LottieView
            ref={animation}
            source={Images.success1}
            autoPlay
            loop
            style={{height: 100, width: 100, alignSelf: 'center'}}
          />
          <Text
            style={[
              styles.textInfo,
              styles.textLocation,
              {top: 50, marginHorizontal: 30},
            ]}>
            You can go to history to check out your record on history and
            expenses
          </Text>

          <View
            style={{
              top: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Text medium style={[styles.textInfo, styles.textLocation]}>
              Description
            </Text>
            <View style={{width: '60%'}}>
              <Text style={[styles.textInfo, styles.textLocation]}>
                {expensesLossesDetails.description.split(/[<div>,</div>]+/)}
              </Text>
            </View>
          </View>

          <View
            style={{
              top: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Text medium style={[styles.textInfo, styles.textLocation]}>
              Amount
            </Text>
            <View style={{width: '60%'}}>
              <Text style={[styles.textInfo, styles.textLocation]}>
                {currencyFormatter(expensesLossesDetails.amount)}
              </Text>
            </View>
          </View>

          <View
            style={{
              top: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Text medium style={[styles.textInfo, styles.textLocation]}>
              Invoice Number
            </Text>
            <View style={{width: '60%'}}>
              <Text style={[styles.textInfo, styles.textLocation]}>
                {expensesLossesDetails.invoiceNumber}
              </Text>
            </View>
          </View>
          <View
            style={{
              top: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Text medium style={[styles.textInfo, styles.textLocation]}>
              Date
            </Text>
            <View style={{width: '60%'}}>
              <Text style={[styles.textInfo, styles.textLocation]}>
                {moment(expensesLossesDetails.createdAt).format(
                  'Do MMM YYYY , HH:mm',
                )}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default ExpenseLossesSuccessfullRecorded;

const styles = StyleSheet.create({
  textInfo: {
    fontSize: 14,
    lineHeight: 17,
    color: '#353B48',
    textAlign: 'center',
  },
  textLocation: {
    color: '#7F8FA6',
    marginTop: 8,
  },
});

import React, {memo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../Text';
import LottieView from 'lottie-react-native';
import {currencyFormatter} from '@config';

const BillTop = memo((props) => {
  const animation = useRef();

  return (
    <View style={styles.bill}>
      <Text medium style={styles.textName}>
        Transaction Successful
      </Text>
      <LottieView
        ref={animation}
        source={require('./two.json')}
        autoPlay
        loop
        style={{height: 70, width: 70, alignSelf: 'center'}}
      />

      <View>
        <View>
          {props.orderType === 'Deliveries' ? (
            <Text style={[styles.textInfo, styles.textLocation]}>
              Your deliveries were successfully recorded into the system &
              profit was calculated check reports for more information.
            </Text>
          ) : (
            <Text style={[styles.textInfo, styles.textLocation]}>
              Your Order was very successful & was received you will be notified
              when its ready
            </Text>
          )}
        </View>
      </View>

      <View style={[styles.flexRow, styles.totalPriceView]}>
        <Text style={styles.textTotal}>Total amount</Text>
        <Text medium style={styles.textPrice}>
          {currencyFormatter(props.amount)}
        </Text>
      </View>
    </View>
  );
});

export default BillTop;

const styles = StyleSheet.create({
  textName: {
    fontSize: 18,
    color: '#353B48',
    textAlign: 'center',
  },

  flexRow: {
    flexDirection: 'row',
    top: -25,
  },
  textInfo: {
    fontSize: 13,
    lineHeight: 17,
    color: '#353B48',
    textAlign: 'center',
  },
  textLocation: {
    color: '#7F8FA6',
    marginTop: 8,
  },
  totalPriceView: {
    marginTop: 60,
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTotal: {
    fontSize: 16,
    color: '#353B48',
  },
  textPrice: {
    fontSize: 18,
    color: '#ED3269',
  },
  bill: {
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  billContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

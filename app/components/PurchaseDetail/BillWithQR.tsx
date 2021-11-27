import React, {memo, useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SvgBackground} from '@svg-components';
import BillTop from './BillTop';
import Text from '../Text';
import LottieView from 'lottie-react-native';

const BillWithQR = memo((props) => {
  const animation = useRef();

  return (
    <View style={styles.billContainer}>
      <SvgBackground>
        <BillTop {...props} amount={props.amount} />
        <View style={styles.qrCodeView}>
          <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
            <Text bold style={styles.textInfo}>
              {props.orderType}
            </Text>
            <Text style={styles.textInfo}># {props.orderNumber}</Text>
          </View>
          <LottieView
            ref={animation}
            source={require('./three.json')}
            autoPlay
            loop
            style={{height: 150, width: 150, top: 20}}
          />
        </View>
      </SvgBackground>
    </View>
  );
});

export default BillWithQR;

const styles = StyleSheet.create({
  billContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textInfo: {
    fontSize: 14,
    lineHeight: 17,
    color: '#353B48',
    textAlign: 'center',
  },
  qrImage: {
    width: 144,
    height: 144,
  },
  qrCodeView: {
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  textHelp: {
    fontSize: 14,
    color: '#353B48',
    lineHeight: 24,
  },
  flexRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

import React, {memo, useEffect, useRef, useState} from 'react';
import {StyleSheet, BackHandler, View} from 'react-native';
import {PurchaseDetail} from '@components';
import {
  SaveButton,
  Icon,
  Input,
  Search,
  IconRadio,
  Errors,
  Loader,
  CustomProgressBar,
  TextComponent,
  InputRichText,
  Select,
  CreateOrderComponent,
  //   InputMobile,
} from '@components';
import {ROUTES} from '@config';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const SuccessOrder = ({route}) => {
  const {navigate} = useNavigation();
  const param = route.params.orderData;
  useEffect(() => {
    console.log(param);
    const backFunc = () => {
      alert('back');
    };

    BackHandler.addEventListener('hardwareBackPress', backFunc);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backFunc);
    };
    // return backHandler.remove();
  }, []);
  return (
    <PurchaseDetail
      amount={param.amount}
      orderType={
        param.orderType === 'Stock' ? 'Stock Order Number' : 'Order Number'
      }
      orderNumber={param.orderNumber}
    />
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({});

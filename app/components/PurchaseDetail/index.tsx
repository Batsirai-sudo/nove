import React, {memo, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Header';
import BillWithQR from './BillWithQR';
import {useNavigation} from '@react-navigation/native';
import {dimensions} from '@utils';
import Text from '../Text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ROUTES} from '@config';

const PurchaseDetail = memo((props) => {
  const ref = useRef();
  const {navigate} = useNavigation();

  return (
    <LinearGradient
      colors={['#ED3269', '#F05F3E']}
      style={{height: dimensions.height_screen + 60}}>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigate(ROUTES.BottomTabStack);
            }}>
            <AntDesign name="home" color="white" size={30} />
          </TouchableOpacity>
        }
        // title={'Purchase Detail'}
      >
        {/* <TouchableOpacity
          style={{top: 10}}
          onPress={() => {
            navigate(ROUTES.TabProfile);
          }}>
          <Text medium style={{color: '#fff', fontSize: 15}}>
            Orders
          </Text>
        </TouchableOpacity> */}
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BillWithQR {...props} />
      </ScrollView>
    </LinearGradient>
  );
});

export default PurchaseDetail;

const styles = StyleSheet.create({
  orderDetail: {
    // flex: 1,
  },
});

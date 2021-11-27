import React, {useRef} from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {Images, ROUTES} from '@config';
import {TextComponent as Text} from '@components';
import {useNavigation, useRoute} from '@react-navigation/native';

const ShopCreatingSuccessfull = () => {
  const animation = useRef();
  const {navigate} = useNavigation();
  const {type} = useRoute().params;

  return (
    <View
      style={{alignItems: 'center', justifyContent: 'center', height: '80%'}}>
      <StatusBar barStyle="light-content" />
      <Text
        medium
        style={[
          {fontSize: 14, color: '#353B48', textAlign: 'center'},
          styles.textLocation,
          {fontSize: 30},
        ]}>
        Store Created
      </Text>
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
        Successfully
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
        Your Store was successfully created you can go and check it out, its now
        ready for your management.
      </Text>
      <View style={{alignSelf: 'center', marginTop: 100}}>
        <TouchableOpacity
          onPress={() => {
            navigate(ROUTES.BottomTabStack);
          }}>
          <LottieView
            ref={animation}
            source={Images.shop}
            autoPlay
            loop
            style={{height: 100, width: 100, alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <Text
          style={[
            {
              //   fontSize: 14,

              color: '#353B48',
              textAlign: 'center',
            },
            styles.textLocation,
            {fontSize: 20},
          ]}>
          {type.myStorename} Shop
        </Text>
        <Text
          style={[
            {
              //   fontSize: 14,

              color: '#353B48',
              textAlign: 'center',
            },
            styles.textLocation,
            {fontSize: 20},
          ]}>
          <Text bold>CATEGORY</Text> {type.name}
        </Text>
      </View>
    </View>
  );
};

export default ShopCreatingSuccessfull;

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

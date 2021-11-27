import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, StatusBar, View, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {TextComponent} from '@components';
import {Images} from '@config';
import {useNavigation} from '@react-navigation/native';

const Updates = () => {
  const animation = useRef();
  const {goBack} = useNavigation();

  const [updates, setUpdates] = useState(true);
  useEffect(() => {
    setUpdates(true);
    animation.current.play();
    // animation.current.pause();
    setTimeout(() => {
      setUpdates(false);
    }, 10000);
  }, []);
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      <LottieView
        style={{
          height: 200,
          width: 200,
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 50,
        }}
        ref={animation}
        source={Images.checkupdates2}
        autoPlay
        loop
      />
      {updates ? (
        <View style={{marginTop: 100, alignItems: 'center'}}>
          <TextComponent style={{fontSize: 15}}>
            Checking For Updates...
          </TextComponent>
          <LottieView
            style={{
              height: 50,
              width: 50,
              alignSelf: 'center',
              top: 5,
            }}
            source={Images.checkupdates3}
            autoPlay
            loop
          />
        </View>
      ) : (
        <View style={{marginTop: 100, alignItems: 'center'}}>
          <TextComponent style={{fontSize: 15}}>Latest Version</TextComponent>
          <TextComponent style={{fontWeight: '300'}}>
            instore 1.0.0
          </TextComponent>
        </View>
      )}
      <TouchableOpacity
        style={{
          height: 30,
          width: 30,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'absolute',
          top: 40,
          left: 15,
          backgroundColor: '#ddd',
          borderWidth: 1,
        }}
        onPress={() => {
          goBack();
        }}>
        <TextComponent bold>X</TextComponent>
      </TouchableOpacity>
    </View>
  );
};

export default Updates;

const styles = StyleSheet.create({});

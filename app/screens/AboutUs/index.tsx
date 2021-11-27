import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {TextComponent as Text} from '@components';
import {useNavigation} from '@react-navigation/native';

const AboutUs = () => {
  const {goBack} = useNavigation();
  return (
    <View style={{marginHorizontal: 20}}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            bold
            style={{
              marginVertical: 50,
              textAlign: 'center',
              fontSize: 20,
              letterSpacing: 4,
              textDecorationLine: 'underline',
            }}>
            instore
          </Text>
          <Text
            bold
            style={{
              textAlign: 'center',
              // fontSize: 20,
              letterSpacing: 3,
              // textDecorationLine: 'underline',
            }}>
            Store & Inventory
          </Text>
          <Text
            bold
            style={{
              textAlign: 'center',
              marginBottom: 20,
              letterSpacing: 5,
              // textDecorationLine: 'underline',
            }}>
            Management App
          </Text>
        </View>
        <Text>
          Welcome to instore, your number one source for all things in
          managementof stores.
        </Text>
        <Text>
          We're dedicated to giving you the very best of services, with a focus
          on Easy profit calculation, Real Time Stock Taking, Easy Orders
          management.
        </Text>
        <Text style={{marginTop: 30}}>
          Founded in 2021 by Matthew Mlambo, instore has come a long way from
          its beginnings in Johannesburg Tembisa. When Matthew Mlambo first
          started out, easy store management driven passion for,
        </Text>
        <Text style={{marginTop: 30}}>
          store management drove them to emback in journey to research and come
          up with idea for managing stores so that, the Store Manage can offer
          you best services.
        </Text>
        <Text style={{marginTop: 30}}>
          We now serve customers all over Tembisa , and are thrilled that we're
          able to turn our passion into your own benefit.
        </Text>
        <Text style={{marginTop: 30}}>
          We hope you enjoy our products as much as [we enjoy offering them to
          you. If you have any questions or comments, please don't hesitate to
          contact us .
        </Text>
        <View style={{marginVertical: 20}}>
          <Text medium>Sincerely,</Text>
          <Text bold style={{left: 40, top: 10}}>
            {' '}
            Matthew Mlambo
          </Text>
        </View>
        <View style={{height: 200}} />
      </ScrollView>
      <TouchableOpacity
        style={{
          height: 30,
          width: 30,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'space-around',
          position: 'absolute',
          top: 40,
          left: -10,
          backgroundColor: '#ddd',
          borderWidth: 1,
        }}
        onPress={() => {
          goBack();
        }}>
        <Text bold>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});

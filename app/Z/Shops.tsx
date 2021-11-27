import React, {memo, useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '@config';
import Shops from '@admin/Shops';
import ProfileTopTab from './ProfileTopTab';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FONTS} from '@utils';
import {SvgSetting, SvgNotification} from '@svg-components';
import {headerBackground} from '@components';
import styles from '../navigation/Admin/styles';

const Stack = createStackNavigator();
const ShopScreen = memo(() => {
  const navigation = useNavigation();
  const onNotification = useCallback(() => {
    navigation.navigate(ROUTES.Notification);
  }, [navigation]);
  const onSettings = useCallback(() => {
    navigation.navigate(ROUTES.Settings);
  }, [navigation]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen
        name={ROUTES.Shops}
        component={Shops}
        options={{
          title: 'My' + ' ' + ROUTES.Shops,
          headerRight: () => (
            <View style={styles.headeRight}>
              <View style={styles.btnNotification}>
                <TouchableOpacity onPress={onNotification}>
                  <SvgNotification />
                </TouchableOpacity>
                <View style={styles.notification}>
                  <Text style={styles.txtNotification}>5</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.btnSetting} onPress={onSettings}>
                <SvgSetting />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
});

export default ShopScreen;

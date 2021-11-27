import React, {memo, useCallback, useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '@config';
// import {headerBackground} from 'nav/Main';
import ProfileTopTab from './ProfileTopTab';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import {FONTS} from '@utils';
import {SvgSetting, SvgNotification} from '@svg-components';
import {headerBackground} from '@components';
import Settings from '@admin/Settings';

const Stack = createStackNavigator();
const ProfileScreen = memo(({route}) => {
  const navigation = useNavigation();
  const onNotification = useCallback(() => {
    navigation.navigate(ROUTES.Notification);
  }, [navigation]);
  const onSettings = useCallback(() => {
    navigation.navigate(ROUTES.Settings);
  }, [navigation]);

  // useLayoutEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route);
  //   // navigation.setOptions({tabBarVisible: false});

  //   if (routeName === ROUTES.Profile) {
  //     navigation.setOptions({tabBarVisible: true});
  //   } else {
  //     navigation.setOptions({tabBarVisible: false});
  //   }
  // }, [navigation, route]);

  return (
    <Stack.Navigator
      mode="modal"
      headerMode="float"
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen
        name={ROUTES.ProfileTopTab}
        component={ProfileTopTab}
        options={{
          title: ROUTES.ProfileTopTab,
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

      <Stack.Screen name={ROUTES.Settings} component={Settings} />
    </Stack.Navigator>
  );
});

export default ProfileScreen;

const styles = StyleSheet.create({
  headeRight: {
    flexDirection: 'row',
    right: 12,
  },
  btnNotification: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSetting: {
    flex: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    position: 'absolute',
    right: 2,
    top: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNotification: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: '#ED3269',
  },
});

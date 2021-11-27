import React, {memo, useCallback} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '@config';
import Search from '@admin/Search';
import EditProduct from '@admin/EditProduct';
import Shops from '@admin/Shops';
import Home from '@admin/Home';
import Profile from '@admin/Profile';

import {useNavigation} from '@react-navigation/native';
import {headerBackground} from '@components';

const SearchStack = createStackNavigator();
const ShopsStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

export const SearchScreen = () => {
  //   const navigation = useNavigation();
  //   const onNotification = useCallback(() => {
  //     navigation.navigate(ROUTES.Notification);
  //   }, [navigation]);
  //   const onSettings = useCallback(() => {
  //     navigation.navigate(ROUTES.Settings);
  //   }, [navigation]);
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: '#FFF',
      }}>
      <SearchStack.Screen
        name={ROUTES.Search}
        component={Search}
        options={{
          title: ROUTES.Search,
        }}
      />
      {/* <SearchStack.Screen
        name={ROUTES.EditProduct}
        component={EditProduct}
        options={{
          title: ROUTES.EditProduct,
        }}
      /> */}
    </SearchStack.Navigator>
  );
};
export const ShopsScreen = () => {
  return (
    <ShopsStack.Navigator
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: '#FFF',
      }}>
      <ShopsStack.Screen
        name={ROUTES.Shops}
        component={Shops}
        options={{
          title: 'My' + ' ' + ROUTES.Shops,
        }}
      />
    </ShopsStack.Navigator>
  );
};
export const HomeScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: '#FFF',
      }}>
      <HomeStack.Screen
        name={ROUTES.Home}
        component={Home}
        options={{
          headerBackground: headerBackground,
          headerTintColor: '#FFF',
        }}
      />
    </HomeStack.Navigator>
  );
};
export const ProfileScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: '#FFF',
      }}>
      <ProfileStack.Screen
        name={ROUTES.Profile}
        component={Profile}
        options={{
          title: '',
        }}
      />
    </ProfileStack.Navigator>
  );
};

// /// google
// 1) googleCredential - "providerId": "google.com",
// 2) userObj.
//        user.email
//        user.familyName
//        user.givenName
//        user.name
//        user.photo

// //facebook

// 1)facebookCredential - "providerId": "facebook.com",

// 2)response.additionalUserInfo.
//               profile.first_name
//               profile.last_name
//               profile.name
//               user.email
//               user.photoURL

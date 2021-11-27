import React, {memo} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Loading from '@screens/Loading';
import Login from '@screens/Login';
import CompleteRegistration from '@screens/CompleteRegistration';
import SuccessRegistration from '@screens/SuccessRegistration';
import NotFound from '@screens/NotFound';
import AdditionalInfor from '@screens/AdditionalInfor';
import StoreSetup from '@screens/StoreSetup';
import PolicySetup from '@screens/PolicySetup';
import ChooseAccount from '@screens/ChooseAccount';
import ChooseOptionForAccount from '@screens/ChooseOptionForAccount';
import ForthScreen from '@screens/ForthScreen';
import ForgetPassword from '@screens/ForgetPassword';
import RegisterAccount from '@screens/RegisterAccount';
import Tour from '@screens/Tour';
import ClientStack from './Client';
import AdminStack from './Admin';
import {ROUTES} from '@config';
import {TextComponent} from '@components';
import {TransitionPresets} from '@react-navigation/stack';
import {headerBackground} from '@components';

const AuthStackScreen = createStackNavigator();

const AuthStack = memo((props) => {
  return (
    <AuthStackScreen.Navigator
      initialRouteName={ROUTES.Loading}
      screenOptions={{
        headerBackground: headerBackground,
        headerTintColor: '#FFF',
        gestureEnabled: true,
        ...TransitionPresets.RevealFromBottomAndroid,
      }}>
      <AuthStackScreen.Screen
        name={ROUTES.Loading}
        component={Loading}
        options={{headerShown: false}}
      />

      <AuthStackScreen.Screen
        name={ROUTES.RegisterAccount}
        component={RegisterAccount}
        options={{
          headerShown: false,
        }}
      />
      <AuthStackScreen.Screen
        name={ROUTES.ChooseAccount}
        component={ChooseAccount}
        options={{
          headerShown: false,
        }}
      />
      <AuthStackScreen.Screen
        name={ROUTES.ChooseOptionForAccount}
        component={ChooseOptionForAccount}
        options={{
          headerShown: false,
        }}
      />
      <AuthStackScreen.Screen
        name={ROUTES.SuccessRegistration}
        component={SuccessRegistration}
        options={{headerShown: false}}
      />
      <AuthStackScreen.Screen
        name={ROUTES.AdminStack}
        component={AdminStack}
        options={{headerShown: false}}
      />
      <AuthStackScreen.Screen
        name={ROUTES.NotFound}
        component={NotFound}
        // options={{headerShown: false}}
      />
      <AuthStackScreen.Screen
        name={ROUTES.ClientStack}
        component={ClientStack}
        options={{headerShown: false}}
      />
      <AuthStackScreen.Screen
        name={ROUTES.Login}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <AuthStackScreen.Screen
        name={ROUTES.CompleteRegistration}
        component={CompleteRegistration}
        options={{
          headerBackTitleVisible: false,
          title: 'Complete Registration',
        }}
      />
      <AuthStackScreen.Screen
        name={ROUTES.Tour}
        component={Tour}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />

      <AuthStackScreen.Screen
        name={ROUTES.AdditionalInfor}
        component={AdditionalInfor}
        options={{headerShown: false}}
      />
      <AuthStackScreen.Screen
        name={ROUTES.StoreSetup}
        component={StoreSetup}
        options={{headerShown: false}}
      />
      <AuthStackScreen.Screen
        name={ROUTES.PolicySetup}
        component={PolicySetup}
        options={{
          headerShown: false,
        }}
      />
      <AuthStackScreen.Screen
        name={ROUTES.ForgetPassword}
        component={ForgetPassword}
        options={{
          headerShown: false,
        }}
      />
      <AuthStackScreen.Screen
        name={ROUTES.ForthScreen}
        component={ForthScreen}
      />
    </AuthStackScreen.Navigator>
  );
});

export default AuthStack;

// {isSignedIn ? (
//   isAdmin_Client ? (
//     <AuthStackScreen.Screen
//       name={ROUTES.AdminStack}
//       component={AdminStack}
//     />
//   ) : (
//     <AuthStackScreen.Screen
//       name={ROUTES.ClientStack}
//       component={AdminStack}
//     />
//   )
// ) : (
//   <>
//     <AuthStackScreen.Screen
//       name={ROUTES.Walkthrough}
//       component={Walkthrough}
//       options={{gestureEnabled: false, headerShown: false}}
//     />
//     <AuthStackScreen.Screen
//       name={ROUTES.CompleteRegistration}
//       component={CompleteRegistration}
//       options={{
//         headerBackTitleVisible: false,
//         title: 'Complete Registration',
//       }}
//     />
//   </>
// )}

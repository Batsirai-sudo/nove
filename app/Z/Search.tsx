import React, {memo, useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '@config';
import Search from '@admin/Search';
import EditProduct from '@admin/EditProduct';
import {useNavigation} from '@react-navigation/native';
import {headerBackground} from '@components';

const Stack = createStackNavigator();
const SearchScreen = memo(() => {
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
        name={ROUTES.Search}
        component={Search}
        options={{
          title: ROUTES.Search,
        }}
      />
      <Stack.Screen
        name={ROUTES.EditProduct}
        component={EditProduct}
        options={{
          title: ROUTES.EditProduct,
        }}
      />
    </Stack.Navigator>
  );
});

export default SearchScreen;

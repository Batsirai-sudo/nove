import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import {AdminContext, CommonContext} from '@context';
import {TextComponent as Text} from '@components';
import {UIActivityIndicator} from 'react-native-indicators';

const index = ({route}) => {
  const {navigate} = useNavigation();
  const {getMyshops} = useContext(AdminContext);
  const {getMyCurrentShop} = useContext(CommonContext);
  const [shops, setShops] = useState([]);
  const [screen] = useState(checkScreen(route?.params?.type));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getMyshops().then((response) => {
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          id: result.id,
        });
      });
      setShops(firestoreData);
      setLoading(false);
    });
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <UIActivityIndicator
          style={{
            alignSelf: 'center',
            position: 'absolute',
            right: '45%',
            top: '50%',
            elevation: 10,
            zIndex: 100,
          }}
          size={40}
          color="#556084"
        />
      ) : (
        shops.map((x, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              getMyCurrentShop(x);
              navigate(screen);
            }}
            style={styles.touch}>
            <Text>{x.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touch: {
    height: '5%',
    borderBottomWidth: 0.5,
    // backgroundColor: 'red',
    width: '80%',
    alignItems: 'center',
    marginBottom: 30,
  },
});

const checkScreen = (value) => {
  return value === 'expenses'
    ? ROUTES.Expenses
    : value === 'categories_brands'
    ? ROUTES.CategoryBrandsScreen
    : value === 'POS'
    ? ROUTES.POSScreenTab
    : '';
};

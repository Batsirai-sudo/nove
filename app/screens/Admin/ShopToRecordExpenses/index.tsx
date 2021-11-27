import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import {AdminContext} from '@context';

const index = ({route}) => {
  const {navigate} = useNavigation();
  const {getMyshops, getCurrentShopEdit} = useContext(AdminContext);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const c = {type: ''};
    getMyshops(c).then((response) => {
      // setLoading(false);
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          id: result.id,
          //   storeType: result.data().storeType,
          //   profit: result.data().statistics.profits,
          //   name: result.data().name,
        });
      });
      setShops(firestoreData);
    });
  }, []);
  return (
    <View style={styles.container}>
      {shops.map((x) => (
        <TouchableOpacity
          onPress={() => {
            getCurrentShopEdit(shops);
            navigate(ROUTES.Expenses, {type: route.params.type});
          }}
          style={styles.touch}>
          <Text>{x.name}</Text>
        </TouchableOpacity>
      ))}
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
  },
});

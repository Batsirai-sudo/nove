import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, StatusBar, Image, FlatList} from 'react-native';
import {dimensions, FONTS, Colors} from '@utils';
import {TextComponent as Text} from '@components';
import styles from './styles';
import {Images} from '@config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import {AdminContext} from '@context';

const {width_screen, height_screen} = dimensions;
const Tarven = ({route}) => {
  const {navigate} = useNavigation();
  const navigation = useNavigation();
  const [shops, setShops] = useState([]);
  const {getCurrentShoplistSelected, myshopDataArray} = useContext(
    AdminContext,
  );

  useEffect(() => {
    console.log(route.params.type);
    const x = myshopDataArray
      .filter((r) => r.storeType.name === route.params.type)
      .map((v) => {
        // if (v.storeType.name === route.params.type) {
        return {
          id: v.key,
          title: v.name,
          notification: '',
          itemImg: Images.ic_address,
        };
        // }
      });

    // console.log(x.length);
    setShops(x);
  }, []);

  const renderItem = (rowData) => {
    var rowData = rowData.item;
    return (
      <TouchableOpacity
        style={styles.rowMain}
        onPress={() => {
          getCurrentShoplistSelected(rowData);
          navigate(ROUTES.StoreManager);
        }}>
        <View style={styles.imageContainer}>
          <FontAwesome5 size={30} color="#37C2D0" name="store" />
          {rowData.notification ? (
            <View style={styles.notificationCircle}>
              <Text style={styles.notification}>3</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.itemText}>{rowData.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        hidden={false}
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.content}
          data={shops}
          renderItem={renderItem.bind(this)}
          // enableEmptySections
          numColumns={2}
          scrollEnabled={false}
          // pageSize={4}
        />
      </View>
    </View>
  );
};

export default Tarven;

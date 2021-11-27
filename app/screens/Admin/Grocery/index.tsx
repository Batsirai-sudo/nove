import React, {useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import {dimensions, FONTS, Colors} from '@utils';
import {TextComponent} from '@components';
import styles from './styles';
import {Images} from '@config';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';

const {width_screen, height_screen} = dimensions;
const Grocery = () => {
  const {navigate} = useNavigation();

  const dataObjects = [
    {
      id: 1,
      title: 'Store Manager',
      itemImg: Images.ic_details,
      route: ROUTES.StoreManager,
    },
    {
      id: 2,
      title: 'Orders',
      itemImg: Images.ic_order,
      route: ROUTES.Orders,
    },
    {
      id: 3,
      title: 'Expenses',
      itemImg: Images.ic_order,
      route: ROUTES.Expenses,
    },
    {
      id: 4,
      title: 'Users List',
      notification: '3',
      itemImg: Images.ic_address,
      route: ROUTES.UsersList,
    },
    {
      id: 5,
      title: 'WholeSale List',
      itemImg: Images.ic_address,
      route: ROUTES.WholesaleList,
    },
    {
      id: 6,
      title: 'Expenses',
      itemImg: Images.ic_order,
      route: ROUTES.Expenses,
    },
  ];

  const renderItem = (rowData) => {
    var rowData = rowData.item;
    return (
      <TouchableOpacity
        style={styles.rowMain}
        onPress={() => {
          navigate(rowData.route);
        }}>
        <View style={styles.imageContainer}>
          {/* <Feather size={50} color="gold" name="codepen" /> */}
          <Image source={rowData.itemImg} style={styles.itemImgStyle} />
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
        {/* <View style={styles.topView}>
          <View style={styles.bar}></View>
          <View style={styles.middleView}>
            <TextComponent regular style={styles.topText}>
              Tarven
            </TextComponent>
          </View>

          <View style={styles.bar}></View>
        </View> */}

        <View>
          <FlatList
            contentContainerStyle={styles.content}
            data={dataObjects}
            renderItem={renderItem.bind(this)}
            enableEmptySections
            scrollEnabled={false}
            pageSize={4}
          />
        </View>
      </View>
    </View>
  );
};
export default Grocery;

import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  Animated,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import faker from 'faker';
import {Images} from '@config';
import styles from './styles';
import {TextComponent, ShopBlock} from '@components';
import {SearchBar} from '@components';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {keyExtractor} from '@helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// faker.seed(10);
// const DATA = [...Array(30).keys()].map((_, i) => {
//   return {
//     key: faker.random.uuid(),
//     image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
//       'women',
//       'men',
//     ])}/${faker.random.number(60)}.jpg`,
//     name: faker.name.findName(),
//     jobTitle: faker.name.jobTitle(),
//     email: faker.internet.email(),
//   };
// });

const SPACING = 10;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const data = [
  {
    source: require('./cinema.png'),
    title: '#cinema',
    des: '3.4K+ events',
    shoptype: 'Tarven',
    icon: <FontAwesome name="beer" size={30} color="black" />,
  },
  {
    source: require('./festival.png'),
    title: '#festival',
    des: '800+ events',
    shoptype: 'Grocery',
    icon: <FontAwesome name="shopping-cart" size={30} color="black" />,
  },
  {
    source: require('./food.png'),
    title: 'New York',
    des: 'USA',
    shoptype: 'Hardware',
    icon: (
      <MaterialCommunityIcons name="account-hard-hat" size={30} color="black" />
    ),
  },
  // {
  //   source: require('./japan.png'),
  //   title: 'Japan',
  //   des: 'Tokyo',
  //   shoptype: 'Tarven',
  //   icon: <FontAwesome name="beer" size={30} color="black" />,
  // },
  // {
  //   source: require('./music.png'),
  //   title: '#music',
  //   des: '2K+ events',
  //   shoptype: 'Grocery',
  //   icon: <FontAwesome name="shopping-cart" size={30} color="black" />,
  // },
  // {
  //   source: require('./japan.png'),
  //   title: 'Japan',
  //   des: 'Tokyo',
  //   shoptype: 'Tarven',
  //   icon: <FontAwesome name="beer" size={30} color="black" />,
  // },
  // {
  //   source: require('./music.png'),
  //   title: '#music',
  //   des: '2K+ events',
  //   shoptype: 'Grocery',
  //   icon: <FontAwesome name="shopping-cart" size={30} color="black" />,
  // },
];
const Shops = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [value, setValue] = React.useState('');
  const renderItem = React.useCallback(({item}) => {
    const {source, title, des, shoptype, icon} = item;
    return (
      <ShopBlock
        source={source}
        title={title}
        icon={icon}
        des={des}
        shoptype={shoptype}
        onPress={() => {
          alert('click');
        }}
      />
    );
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff', height}}>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        hidden={false}
        backgroundColor={'transparent'}
      />

      <View style={{flex: 1}}>
        <View
          style={{
            height: 50,
            position: 'absolute',
            backgroundColor: '#fff',
            width: 160,
            borderRadius: 25,
            elevation: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            top: 20,
            flexDirection: 'row',
          }}>
          <FontAwesome5 name="store" size={24} color="black" />
          <TextComponent style={{left: 5}}>My Shop List</TextComponent>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            top: 70,
          }}
          showsVerticalScrollIndicator={false}
          style={{paddingTop: 24}}
          ListFooterComponent={() => <View style={{height: 200}}></View>}
        />
      </View>
    </View>
  );
};

export default Shops;

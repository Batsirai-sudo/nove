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
import {TextComponent} from '@components';
import {SearchBar} from '@components';
import Fontisto from 'react-native-vector-icons/Fontisto';

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

const WholesaleList = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [value, setValue] = React.useState('');

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        hidden={false}
        backgroundColor={'transparent'}
      />

      <Image
        source={Images.background}
        blurRadius={50}
        style={[StyleSheet.absoluteFillObject, {height, width}]}
      />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={[styles.container, {transform: [{scale}], opacity}]}>
              {/* background=ED3269 */}
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=${item.name}&color=000&bold=true&background=EECEDD`,
                }}
                style={styles.imageAvatar}
              />
              <View>
                <TextComponent bold>Makro</TextComponent>
                <TextComponent regular>Tel : 0771254408</TextComponent>
                <TextComponent thin>Email : much.batsy@gmail.com</TextComponent>
                {/* <TextComponent bold>{item.name}</TextComponent>
                <TextComponent regular>{item.jobTitle}</TextComponent>
                <TextComponent thin>{item.email}</TextComponent> */}
              </View>
            </Animated.View>
          );
        }}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => {
          return (
            <SearchBar
              placeHolder={'Search News...'}
              onChangeText={() => {}}
              onClear={setValue}
            />
          );
        }}
        ListFooterComponent={() => <View style={{height: 100}} />}
      />
    </View>
  );
};

export default WholesaleList;

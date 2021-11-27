import React, {memo, useCallback, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import Text from '../Text';
import {dimensions, FONTS, Colors} from '@utils';

interface Props {
  source: any;
  title: string;
  des: string;
}

const ShopBlock = memo((props: Props) => {
  const [choose, setChoose] = useState<boolean>();
  const {source, title, des, shoptype, icon, onPress} = props;
  const onChosse = useCallback(() => {
    setChoose(!choose);
  }, [choose]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.75}
      onPress={onPress}>
      <View style={styles.img}>
        <View
          style={{
            height: 35,
            width: 52,
            backgroundColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
            position: 'absolute',
            right: 0,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>#</Text>
        </View>
        <Text style={{left: 10, top: 20, fontWeight: '600', fontSize: 20}}>
          {shoptype}
        </Text>
        <Text style={{left: 70, top: 20, fontWeight: '600', fontSize: 20}}>
          Shop
        </Text>
        <View style={{top: 30, left: 10}}>{icon}</View>
      </View>
      <View
        style={{
          position: 'absolute',
          height: 50,
          width: 130,
          backgroundColor: 'rgba(250,201,178,0.75)',
          bottom: 40,
          right: -10,
          zIndex: 100,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 25,
        }}>
        <Text style={{fontWeight: '600'}}>Mlambo Shop</Text>
      </View>
      <Text
        medium
        style={[styles.title, {color: choose ? '#ED3269' : '#353B48'}]}>
        {title}
      </Text>
      <Text style={styles.des}>3 Users</Text>
      {/* {choose && (
        <LinearGradient
          style={styles.block}
          colors={['#ED3269', '#F05F3E']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
        />
      )}
      {choose && <View style={styles.containerCheck}></View>} */}
    </TouchableOpacity>
  );
});

export default ShopBlock;

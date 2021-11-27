import React, {memo, useCallback, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SvgCheck} from '@svg-components';
import styles from './styles';
import Icon5 from 'react-native-vector-icons/Fontisto';

interface Props {
  id: string;
  source: any;
  title: string;
  des: any;
  isCheck: string;
  onPress: (id: string, type: string) => void;
}

const ShopItem = memo((props: Props) => {
  const [choose, setChoose] = useState(false);
  const {id, source, title, des, isCheck, onPress} = props;
  const onChosse = useCallback(() => {
    onPress && onPress(id, title);
  }, [id, onPress]);
  useEffect(() => {
    if (id === isCheck) {
      setChoose(true);
    } else {
      setChoose(false);
    }
  }, [id, isCheck]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.75}
      onPress={onChosse}>
      <Image source={source} style={styles.img} />
      <Text style={[styles.title, {color: choose ? '#ED3269' : '#353B48'}]}>
        {title}
      </Text>
      <Icon5 style={{marginLeft: 10}} size={20} color="grey" name={des} />
      {/* <Text style={styles.des}>{des}</Text> */}
      {choose && (
        <LinearGradient
          style={styles.block}
          colors={['#ED3269', '#F05F3E']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
        />
      )}
      {choose && (
        <View style={styles.containerCheck}>
          <SvgCheck />
        </View>
      )}
    </TouchableOpacity>
  );
});

export default ShopItem;

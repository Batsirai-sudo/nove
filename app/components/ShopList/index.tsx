import React, {memo, useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import ShopItem from '../ShopItem';
import {keyExtractor} from '@utils';
import ButtonLinear from '../ButtonLinear';

import styles from './styles';

const data = [
  {
    id: '0',
    title: 'Tarven Shop',
    des: 'shopping-store',
  },
  {
    id: '1',

    title: 'Grocery Shop',
    des: 'shopping-store',
  },
];
const ShopList = memo((props) => {
  const [isCheck, setCheck] = useState('');
  const {Continue, SelectedShop} = props;

  const onPress = useCallback((id: string, type: string) => {
    setCheck(id);
    SelectedShop(type);
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      const {source, title, des, id} = item;
      return (
        <ShopItem
          id={id}
          source={source}
          title={title}
          des={des}
          isCheck={isCheck}
          onPress={onPress}
        />
      );
    },
    [isCheck, onPress],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
      />
      {isCheck ? (
        <ButtonLinear
          title={'CONTINUE'}
          onPress={Continue}
          style={styles.btnNext}
        />
      ) : null}
    </View>
  );
});

export default ShopList;

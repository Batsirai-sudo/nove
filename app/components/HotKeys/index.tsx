import React, {memo, useCallback} from 'react';
import {TouchableOpacity, FlatList} from 'react-native';
import {keyExtractor} from '@helpers';
import styles from './styles';
import Text from '../Text';

const HotKeys = memo((props) => {
  const renderItem = useCallback(({item, index}) => {
    return (
      <TouchableOpacity style={styles.btnNews}>
        <Text style={styles.txtNews}>{item}</Text>
      </TouchableOpacity>
    );
  }, []);
  const headerList = useCallback(
    () => (
      <Text medium style={styles.txtHotKeys}>
        HOT KEYS
      </Text>
    ),
    [],
  );

  return (
    <FlatList
      style={styles.listNews}
      renderItem={renderItem}
      data={props.data}
      keyExtractor={keyExtractor}
      ListHeaderComponent={headerList}
    />
  );
});

export default HotKeys;

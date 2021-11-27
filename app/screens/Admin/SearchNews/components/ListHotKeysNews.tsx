import React, {memo, useCallback} from 'react';
import {TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import FONTS from 'ultis/fonts';
import keyExtractor from 'ultis/keyExtractor';
const data = ['oscar', 'new york fashion show', 'night party', 'lux bar party'];
const ListHotKeysNews = memo(() => {
  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity style={styles.btnNews}>
        <Text style={styles.txtNews}>{item}</Text>
      </TouchableOpacity>
    );
  }, []);
  const headerList = useCallback(
    () => <Text style={styles.txtHotKeys}>HOT KEYS</Text>,
    [],
  );

  return (
    <FlatList
      style={styles.listNews}
      renderItem={renderItem}
      data={data}
      keyExtractor={keyExtractor}
      ListHeaderComponent={headerList}
    />
  );
});

export default ListHotKeysNews;

const styles = StyleSheet.create({
  listNews: {
    paddingLeft: 24,
    flex: 1,
  },
  btnNews: {
    height: 50,
    justifyContent: 'center',
  },
  txtNews: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: '#353B48',
  },
  txtHotKeys: {
    fontSize: 14,
    color: '#7F8FA6',
    fontFamily: FONTS.Medium,
    marginTop: 40,
    marginBottom: 20,
  },
});

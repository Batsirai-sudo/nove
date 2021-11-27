import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBar from 'components/SearchBar';
import ListHotKeyEvents from 'screens/TabSearchEvents/components/ListHotKeyEvents';
import ListNews from 'screens/SearchNews/components/ListNews';

const TabSearchEvents = memo(() => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.container}>
      <SearchBar
        placeHolder={'Search News...'}
        onChangeText={setValue}
        onClear={setValue}
      />
      {!value ? <ListHotKeyEvents /> : <ListNews textSearch={value} />}
    </View>
  );
});

export default TabSearchEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

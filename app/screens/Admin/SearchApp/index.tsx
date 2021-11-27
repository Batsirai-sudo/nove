import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
  IconRadio,
  Errors,
  Loader,
  TextComponent,
  SearchBar,
  HotKeys,
  ActivityIndicator,
  ShimmerItemProduct,
  shimmerHeight,
  ItemProduct,
  FilterProduct2,
  ShimmerLoading,
} from '@components';
import styles from './styles';
const data = ['oscar', 'new york fashion show', 'night party', 'lux bar party'];

const SearchApp = () => {
  const [value, setValue] = useState(true);

  return (
    <View>
      <View>
        <View>
          <SearchBar
            placeHolder={'Search App...'}
            onChangeText={
              (value) => {}
              // handleFilter('search', value)
            }
            // onClear={setValue}
            onFocus={() => {
              //   setValue(true);
            }}
          />
        </View>
        <HotKeys data={data} />
        {/* <View style={styles.listContainer}>
          {!value ? <HotKeys data={data} /> : null}
        </View> */}
      </View>
    </View>
  );
};

export default SearchApp;

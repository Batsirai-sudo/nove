import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import {
  TextComponent,
  CardComponent,
  BottomModal,
  SaveButton,
  SearchBar,
  ItemCategory,
} from '@components';

import {useNavigation, useTheme} from '@react-navigation/native';
import {ROUTES} from '@config';
import {FONTS} from '@utils';
import {CheckBox} from 'react-native-elements';
import filter from 'lodash/filter';

const RecordDeliveredStockTwo = () => {
  const {navigate} = useNavigation();
  const [data, setData] = useState([
    {name: 'Sugar 2kg', id: 1, checked: false},
    {name: 'Milk 12kg', id: 2, checked: false},
    {name: 'Milk 22kg', id: 3, checked: false},
    {name: 'Milk 32kg', id: 4, checked: false},
    {name: 'Milk 42kg', id: 5, checked: false},
    {name: 'Milk 52kg', id: 6, checked: false},
    {name: 'Milk 62kg', id: 7, checked: false},
    {name: 'Milk 72kg', id: 8, checked: false},
    {name: 'Milk 82kg', id: 9, checked: false},
    {name: 'Milk 92kg', id: 10, checked: false},
    {name: 'Milk 20kg', id: 11, checked: false},
    {name: 'Milk 21kg', id: 12, checked: false},
    {name: 'Milk 22kg', id: 13, checked: false},
    {name: 'Milk 23kg', id: 14, checked: false},
    {name: 'Milk 24kg', id: 15, checked: false},
    {name: 'Milk 25kg', id: 16, checked: false},
    {name: 'Milk 26kg', id: 17, checked: false},
    {name: 'Milk 27kg', id: 18, checked: false},
    {name: 'Milk 28kg', id: 19, checked: false},
    {name: 'Milk 29kg', id: 20, checked: false},
  ]);
  const [selectedData, setSelectedData] = useState([]);
  const {colors} = useTheme();
  const onPressCheckbox = (index) => {
    data[index].checked = !data[index].checked;
    setData([...data]);
    setSelectedData([...data]);
  };
  const handleSelect = (category) => {
    const selectCategory = data;
    const findSelect = selectCategory.find((s) => s.id === category.id);
    if (findSelect) {
      console.log(findSelect);
      //   this.setState({
      //     selectCategory: filter(selectCategory, (s) => s.id !== category.id),
      //   });
    } else {
      //   this.setState({
      //     selectCategory: concat(selectCategory, {
      //       id: category.id,
      //       name: category.name,
      //       // slug: category.slug,
      //     }),
      //   });
    }
  };
  //   data.map((category) => (
  //     <ItemCategory
  //       key={category.id}
  //       category={category}
  //       selectCategory={data}
  //       handleSelect={handleSelect}
  //     />
  //   ));
  return (
    <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
      <View style={{marginVertical: 100, marginHorizontal: 5}}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({item, index}) => (
            <View>
              <CheckBox
                title={item.name}
                textStyle={{fontFamily: FONTS.Regular, fontWeight: '400'}}
                // checkedIcon="dot-circle-o"
                // uncheckedIcon="circle-o"
                checkedIcon="check-square-o"
                uncheckedIcon="square-o"
                checked={item.checked}
                containerStyle={{
                  backgroundColor: item.checked
                    ? '#D7E5FE'
                    : colors.thirdBackground,
                  width: '95%',
                  height: 50,
                  borderRadius: 10,
                }}
                onPress={
                  () => {
                    onPressCheckbox(index);
                  }
                  // this.setState({checked: !this.state.checked})
                }
              />
            </View>
          )}
        />
      </View>
      <View style={styles.cardContainer}>
        <Card cornerRadius={25} style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              navigate(ROUTES.SearchApp);
            }}>
            <SearchBar
              placeHolder={'Search App...'}
              editable={true}
              onChangeText={
                (value) => {}
                // handleFilter('search', value)
              }
              // onClear={setValue}
              onFocus={() => {
                // setValue(true);
              }}
            />
          </TouchableOpacity>
        </Card>
      </View>
      <SaveButton
        title="Create New Stock record"
        titleStyle={{fontSize: 15}}
        buttonStyle={{height: 40}}
        containerStyle={{
          marginVertical: 5,
          alignSelf: 'center',
          marginBottom: 50,
          position: 'absolute',
          bottom: 30,
          width: '90%',
        }}
        onPress={() => {
          navigate(ROUTES.RecordDeliveredStockThree);
          console.log(selectedData.filter((x) => x.checked === true));
        }}
        loading={false}
      />
    </View>
  );
};

export default RecordDeliveredStockTwo;

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    height: 50,
    position: 'absolute',
    top: 20,
    width: '100%',
    flexDirection: 'row',
  },
  card: {left: 15, height: 50, width: '90%'},
  container: {
    height: '100%',
  },
});

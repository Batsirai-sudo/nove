import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Icon, TextComponent, SaveButton} from '@components';
import styles from './styles';

const ThemeScreen = () => {
  const themeStorage = useSelector((state) => state.application.theme);
  // const [themeSupport, setTheme] = useState(ThemeSupport);

  // const {colors} = useTheme();
  const dispatch = useDispatch();
  const width = '100%';
  const height = '20%';
  const colors = [
    {color: '#ED3269', name: 'light brilliant crimson', selected: true},
    // {color: 'green', name: 'Green'},
    // {color: 'blue', name: 'Blue'},
  ];

  // useEffect(() => {
  //   setTheme(
  //     themeSupport.map(item => {
  //       return {
  //         ...item,
  //         selected: item.theme == themeStorage,
  //       };
  //     }),
  //   );
  // }, []);

  // const onSelect = selected => {
  //   setTheme(
  //     themeSupport.map(item => {
  //       return {
  //         ...item,
  //         selected: item.theme == selected.theme,
  //       };
  //     }),
  //   );
  // };

  // const onChangeTheme = () => {
  //   const list = themeSupport.filter(item => item.selected);
  //   if (list.length > 0) {
  //     dispatch(ApplicationActions.onChangeTheme(list[0].theme));
  //     StatusBar.setBackgroundColor(list[0].light.colors.primary, true);
  //   }
  // };
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[
          styles.profileItem,
          {borderBottomColor: 'grey', borderBottomWidth: 0.5},
        ]}
        onPress={
          () => {}
          // onSelect(item)
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: item.color,
            }}></View>
          <TextComponent body2 style={{marginHorizontal: 8}}>
            {item.name}
          </TextComponent>
        </View>
        {item.selected && <Icon name="check" size={18} color={'blue'} />}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, height: '100%'}}
      forceInset={{top: 'always'}}>
      <TextComponent style={{marginVertical: 20, textAlign: 'center'}}>
        Theme Color
      </TextComponent>
      <FlatList
        contentContainerStyle={styles.contain}
        data={colors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItem(item)}
      />
      <View style={{paddingHorizontal: 20, paddingVertical: 15, bottom: 10}}>
        <LinearGradient
          style={{
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          colors={['#F05F3E', '#ED3269']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}>
          <SaveButton
            title="Apply"
            //  loading={loading}
            size="small"
            buttonStyle={styles.button}
            full
            onPress={() => {}}></SaveButton>
        </LinearGradient>
      </View>
    </SafeAreaView>

    // <View>
    //   {colors.map((value) => (
    //     <TouchableOpacity
    //       style={{
    //         width,
    //         height,
    //         backgroundColor: value.color,
    //       }}>
    //       <Text>bhbhbhbhbh</Text>
    //     </TouchableOpacity>
    //   ))}
    // </View>
  );
};

export default ThemeScreen;

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
import {Icon, TextComponent} from '@components';
import {ApplicationActions} from '@actions';
import styles from './styles';
import {FontSupport, DefaultFont} from '@config';

// const FontSupport = ['Raleway', 'Roboto', 'Merriweather'];
// const DefaultFont = 'Raleway';

export default function SelectFontOption({navigation}) {
  const storageFont = useSelector((state) => state.application.font);
  const dispatch = useDispatch();

  const [font, setFont] = useState(storageFont);
  const onChange = (font) => {
    dispatch(ApplicationActions.onChangeFont(font));
    navigation.goBack();
  };

  useEffect(() => {
    setFont(storageFont ?? DefaultFont);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
      <View style={styles.contain}>
        <View style={[styles.contentModal, {backgroundColor: '#F5F5F5'}]}>
          <View style={{padding: 8}}>
            {FontSupport.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.item,
                    {
                      borderBottomColor: '#c7c7cc',
                      borderBottomWidth:
                        index == FontSupport.length - 1 ? 0 : 1,
                    },
                  ]}
                  onPress={() => setFont(item)}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextComponent style={{marginHorizontal: 8}}>
                      {item}
                    </TextComponent>
                  </View>
                  {item == font && (
                    <Icon name="check" size={18} color="#E5634D" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.contentAction}>
            <TouchableOpacity
              style={{padding: 8, marginHorizontal: 24}}
              onPress={() => navigation.goBack()}>
              <TextComponent>{'cancel'}</TextComponent>
            </TouchableOpacity>

            <TouchableOpacity
              style={{padding: 8}}
              onPress={() => onChange(font)}>
              <TextComponent>{'apply'}</TextComponent>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

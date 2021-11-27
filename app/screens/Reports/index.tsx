import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
import {Icon, TextComponent} from '@components';
import {ApplicationActions} from '@actions';
import styles from './styles';
import {FontSupport, DefaultFont} from '@config';
import {
  VirtualKeyboard,
  TextComponent as Text,
  SearchBar,
  Input,
} from '@components';
// const FontSupport = ['Raleway', 'Roboto', 'Merriweather'];
// const DefaultFont = 'Raleway';

export default function Index({navigation}) {
  const storageFont = useSelector((state) => state.application.font);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const [font, setFont] = useState(storageFont);

  useEffect(() => {
    setFont(storageFont ?? DefaultFont);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
      <View style={styles.contain}>
        <View style={[styles.contentModal, {backgroundColor: '#F5F5F5'}]}>
          <View
            style={{
              padding: 8,
              borderBottomColor: '#c7c7cc',
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                height: 25,
                width: 25,
                borderRadius: 20,
                backgroundColor: 'black',
                right: 10,
              }}
              onPress={() => navigation.goBack()}>
              <TextComponent whiteColor>{'X'}</TextComponent>
            </TouchableOpacity>
          </View>
          <TextComponent
            style={{color: '#000', fontSize: 50, alignSelf: 'flex-end'}}>
            R {value === 0 || value === '' ? 0 : value}.00
          </TextComponent>
          <View style={styles.contentAction}>
            <TextComponent style={{color: '#7F8FA6', fontSize: 13}}>
              Bill Total :{' '}
            </TextComponent>
            <TextComponent style={{color: '#7F8FA6', fontSize: 13}}>
              R 25.00
            </TextComponent>
          </View>

          <VirtualKeyboard
            color="#7F8FA6"
            pressMode="string"
            leftItem={() => {
              // setItems(90);
            }}
            leftComponent={
              <View
                style={{
                  backgroundColor: '#65D006',
                  height: 40,
                  width: 70,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: -15,
                  top: 10,
                }}>
                <Text whiteColor semibold>
                  Pay
                </Text>
              </View>
            }
            cellStyle={{height: 80}}
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 70,
            }}
            onPress={(val) => {
              setValue(val);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

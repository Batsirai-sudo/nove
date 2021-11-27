import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
import {Icon, TextComponent} from '@components';
// import {ApplicationActions} from '@actions';
import styles from './styles';
// import {useTranslation} from 'react-i18next';

export default function SelectDarkOption({navigation}) {
  // const {t} = useTranslation();
  // const dispatch = useDispatch();

  const storageForceDark = useSelector((state) => state.application.force_dark);
  const [forceDarkMode, setForceDarkMode] = useState(storageForceDark);

  /**
   * call when on change dark option
   * @param {*} forceDarkMode
   */
  const onChange = (forceDarkMode) => {
    // dispatch(ApplicationActions.onForceTheme(forceDarkMode));
    // navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
      <View style={styles.contain}>
        <View style={[styles.contentModal, {backgroundColor: '#F5F5F5'}]}>
          <View style={{padding: 8}}>
            <TouchableOpacity
              style={[
                styles.item,
                {borderBottomColor: '#c7c7cc', borderBottomWidth: 1},
              ]}
              onPress={() => setForceDarkMode(null)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextComponent style={{marginHorizontal: 8}}>
                  {'Dynamic System'}
                </TextComponent>
              </View>
              {forceDarkMode == null && (
                <Icon name="check" size={18} color="#E5634D" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.item,
                {borderBottomColor: '#c7c7cc', borderBottomWidth: 1},
              ]}
              onPress={() => setForceDarkMode(true)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextComponent style={{marginHorizontal: 8}}>
                  {'Always On'}
                </TextComponent>
              </View>
              {forceDarkMode == true && (
                <Icon name="check" size={18} color="#E5634D" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => setForceDarkMode(false)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextComponent style={{marginHorizontal: 8}}>
                  {'Always Off'}
                </TextComponent>
              </View>
              {forceDarkMode == false && (
                <Icon name="check" size={18} color="#E5634D" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.contentAction}>
            <TouchableOpacity
              style={{padding: 8, marginHorizontal: 24}}
              onPress={() => navigation.goBack()}>
              <TextComponent>{'cancel'}</TextComponent>
            </TouchableOpacity>

            <TouchableOpacity
              style={{padding: 8}}
              onPress={() => onChange(forceDarkMode)}>
              <TextComponent primaryColor>{'apply'}</TextComponent>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

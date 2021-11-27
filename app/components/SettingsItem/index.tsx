import React, {memo, useState} from 'react';
import {Switch, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Text from '../Text';

interface Props {
  svgItem?: any;
  title: string;
  txt?: string;
  svgBack?: any;
  switch?: boolean;
  isAdmin?: boolean;
  onPress?: any;
}

const SettingsItem = memo((props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.setting}>
      <View style={styles.svgItem}>{props.svgItem}</View>
      <View style={{flex: 1}}>
        <Text style={styles.txtTitle}>{props.title}</Text>
        {props.txt ? (
          props.isAdmin ? (
            <View
              style={{
                height: 15,
                width: 15,
                borderRadius: 15,
                backgroundColor: 'red',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text bold style={[styles.txt, {color: '#fff', fontSize: 11}]}>
                {props.txt}
              </Text>
            </View>
          ) : (
            <Text style={styles.txt}>{props.txt}</Text>
          )
        ) : null}
      </View>
      <View style={styles.witchAndBack}>
        {props.svgBack}
        {props.switch ? (
          <Switch
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#f4f3f4"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
});
export default SettingsItem;

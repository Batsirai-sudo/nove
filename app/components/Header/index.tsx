import React, {memo, useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SvgArrowBack} from '@svg-components';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../Text';
import styles from './styles';

interface HeaderProps {
  title: string;
  onPress: () => void;
  arrow: boolean;
  leftComponent: any;
  notGradient: any;
  color: any;
  textTitle: any;
}

const Header = memo((props: HeaderProps) => {
  const navigation = useNavigation();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <LinearGradient
      style={styles.linear}
      colors={props.notGradient ? ['#fff', '#fff'] : ['#F05F3E', '#ED3269']}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={props.onPress} style={styles.touch}>
          {props.arrow ? (
            <TouchableOpacity onPress={onBack}>
              <SvgArrowBack color={props.color ? props.color : '#fff'} />
            </TouchableOpacity>
          ) : null}
          {props.leftComponent}
        </TouchableOpacity>
        <View style={{right: 30, position: 'absolute'}}>{props.children}</View>
        <Text style={[styles.textTitle, props.textTitle]}>{props.title}</Text>
      </View>
    </LinearGradient>
  );
});

export default Header;

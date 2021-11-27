import React, {memo, useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../Text';
import {SvgArrowBack} from '@svg-components';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {dimensions} from '@utils';
import {currencyFormatter} from '@config';
const {height_screen, width_screen} = dimensions;

interface Props {
  amount: number;
  title: string;
  deliveredStock: any;
  profit: any;
}

const HeaderReward = memo((props: Props) => {
  const navigation = useNavigation();
  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <LinearGradient
      style={styles.linear}
      colors={['#F05F3E', '#ED3269']}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBack} style={styles.touch}>
          <SvgArrowBack />
        </TouchableOpacity>
        <Text medium style={styles.textTitle}>
          {props.title}
        </Text>
      </View>

      {props.deliveredStock ? (
        <>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              marginTop: 0.01 * height_screen - 30,
              textAlign: 'center',
              // alignSelf: 'center',
            }}>
            {' '}
            Total Amount
          </Text>
          <View
            style={{
              marginTop: 0.01 * height_screen,
              // left: -15,
              // backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
              width: width_screen,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.dollarsIcon}>R</Text>
              <Text style={{fontSize: 50, color: '#fff'}}>{props.amount}</Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'blue',
              top: 20,
            }}>
            <Text whiteColor>Exstimated Profit</Text>
            <Text whiteColor semibold style={{fontSize: 17}}>
              {currencyFormatter(props.profit)}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              marginTop: 0.01 * height_screen - 30,
              textAlign: 'center',
            }}>
            {' '}
            Total Amount
          </Text>
          <View
            style={{
              marginTop: 0.01 * height_screen,
              alignItems: 'center',
              justifyContent: 'center',
              width: width_screen,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.dollarsIcon}>R</Text>
              <Text style={{fontSize: 50, color: '#fff'}}>{props.amount}</Text>
            </View>
          </View>
        </>
      )}
    </LinearGradient>
  );
});
export default HeaderReward;

import {StyleSheet, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {dimensions} from '@utils';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const {height_screen, width_screen} = dimensions;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: APPBAR_HEIGHT + getStatusBarHeight(true),
    justifyContent: 'flex-end',
  },
  touch: {
    position: 'absolute',
    left: 10,
    width: 60,
    bottom: 0,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    color: '#fff',
    fontSize: 16,
  },
  linear: {
    height: 0.35 * height_screen,
  },
  txtBalance: {
    fontSize: 16,
    color: '#fff',
    marginTop: 0.01 * height_screen,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  dollarsIcon: {
    fontSize: 20,
    color: '#fff',
    marginTop: 0.01 * height_screen,

    right: 0.03 * width_screen,
    // marginLeft: 0.35 * width_screen,
  },
  txtAmount: {
    fontSize: 60,
    color: '#fff',
  },
  amount: {
    flexDirection: 'row',
    marginTop: 0.01 * height_screen,
    left: -20,
  },
});

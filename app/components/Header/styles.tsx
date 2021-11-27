import {StyleSheet, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: APPBAR_HEIGHT + getStatusBarHeight(true),
    justifyContent: 'space-between',
    top: 50,
  },

  touch: {
    position: 'absolute',
    left: 24,
  },
  textTitle: {
    color: '#fff',
    fontSize: 16,
  },
});

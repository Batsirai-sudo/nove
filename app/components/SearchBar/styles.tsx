import {StyleSheet} from 'react-native';
import {FONTS} from '@utils';

export default StyleSheet.create({
  txtInput: {
    flex: 1,
    marginHorizontal: 17,
    fontSize: 14,
    fontFamily: FONTS.Regular,
  },
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
});

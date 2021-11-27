import {StyleSheet} from 'react-native';
import {FONTS} from '@utils';
export default StyleSheet.create({
  firsttxt: {
    color: 'red',
    fontWeight: '100',
    fontSize: 14,
    fontFamily: FONTS.Regular,
  },
  secondtxt: {
    fontWeight: '100',
    fontSize: 14,
    fontFamily: FONTS.Regular,
  },
  title: {
    fontSize: 15,
    fontFamily: FONTS.Regular,
  },

  mainContent: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  contentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  },
});

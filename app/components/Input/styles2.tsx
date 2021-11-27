import {StyleSheet} from 'react-native';
import {FONTS} from '@utils';

export default StyleSheet.create({
  input: {
    paddingHorizontal: 7,
    fontFamily: FONTS.Regular,
    height: 46,
    fontSize: 15,
  },
  inputMultiline: {
    height: 122,
    textAlignVertical: 'top',
    paddingTop: 14,
    paddingBottom: 14,
    lineHeight: 15,
  },
  viewRow: {
    flexDirection: 'row',
    paddingHorizontal: 7,
  },
  viewIcon: {
    height: 46,
    width: 36,
    justifyContent: 'center',
  },
  viewInput: {
    flex: 1,
  },
  iconSecure: {
    paddingHorizontal: 7,
    justifyContent: 'center',
  },
});

//   const styles = StyleSheet.create({
//     input: {
//       paddingHorizontal: 7,
//       fontFamily: fonts.regular,
//       height: 46,
//       fontSize: sizes.h5,
//     },
//     inputMultiline: {
//       height: 122,
//       textAlignVertical: 'top',
//       paddingTop: 14,
//       paddingBottom: 14,
//       lineHeight: lineHeights.h5,
//     },
//     viewRow: {
//       flexDirection: 'row',
//       paddingHorizontal: 7,
//     },
//     viewIcon: {
//       height: 46,
//       width: 36,
//       justifyContent: 'center',
//     },
//     viewInput: {
//       flex: 1,
//     },
//     iconSecure: {
//       paddingHorizontal: 7,
//       justifyContent: 'center',
//     },
//   });

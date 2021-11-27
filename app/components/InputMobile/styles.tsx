import {StyleSheet} from 'react-native';
import {FONTS} from '@utils';

export default StyleSheet.create({
  input: {
    height: 46,
    marginLeft: 0,
    fontFamily: FONTS.Regular,
    fontSize: 12,
    lineHeight: 13,
  },
  inputUnderline: {
    height: 38,
  },
  textInput: {
    paddingRight: 14,
    lineHeight: 0,
  },
  textInputUnderLine: {
    paddingRight: 0,
  },
  flag: {
    width: 21,
    height: 14,
    borderWidth: 0,
    borderRadius: 0,
    marginLeft: 14,
  },
  flagUnderline: {
    marginLeft: 0,
  },
  search: {
    paddingVertical: 0,
    paddingBottom: 9,
  },
  viewModal: {
    paddingHorizontal: 25,
  },
  textComponent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    lineHeight: 13,
  },
  viewCode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconChevron: {
    marginRight: 5,
  },
  viewInput: {
    flex: 1,
  },
});

import {StyleSheet} from 'react-native';
import {FONTS} from '@utils';

export const fonts = {
  regular: 'ProductSans-Regular',
  medium: 'ProductSans-Medium',
  bold: 'ProductSans-Bold',
};

export const sizes = {
  base: 14,
  h1: 28,
  h2: 24,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,
};

export const lineHeights = {
  h1: 34,
  h2: 29,
  h3: 22,
  h4: 19,
  h5: 24,
  h6: 18,
};

export default StyleSheet.create({
  content: {
    paddingHorizontal: 25,
  },
  itemTitle: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    lineHeight: 24,
  },
  button: {
    marginVertical: 28,
  },
});

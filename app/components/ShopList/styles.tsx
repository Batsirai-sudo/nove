import {StyleSheet} from 'react-native';
import {dimensions} from '@utils';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const {width_screen} = dimensions;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  btnNext: {
    position: 'absolute',
    bottom: getBottomSpace() + 8,
    width: width_screen - 48,
    height: 50,
    alignSelf: 'center',
    borderRadius: 100,
  },
});
// '#ED3269', '#F05F3E'

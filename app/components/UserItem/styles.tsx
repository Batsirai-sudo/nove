import {StyleSheet} from 'react-native';
import {dimensions} from '@utils';

const {width_screen, height_screen} = dimensions;

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: width_screen,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    marginHorizontal: 0.04 * width_screen,
    height: 40,
    width: 40,
    borderRadius: 40,
    // backgroundColor: 'red',
  },
  txtName: {
    fontSize: 13,
    color: '#353B48',
    marginBottom: 0.01 * height_screen,
  },
  txtNumberFollower: {
    fontSize: 11,
    color: '#7F8FA6',
  },
  txtField: {
    flex: 1,
  },
  svg_Follow: {
    marginRight: 0.06 * width_screen,
  },
});

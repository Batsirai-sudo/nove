import {StyleSheet} from 'react-native';
import {dimensions} from '@utils';
const {height_screen} = dimensions;

export default StyleSheet.create({
  txtTitle: {
    // fontWeight: '500',
    fontSize: 14,
    color: '#353B48',
  },
  txt: {
    fontSize: 14,
    color: '#7F8FA6',
    marginTop: '2%',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    height: (8.2 * height_screen) / 100,
  },
  svgItem: {
    width: '10%',
    marginRight: '6%',
  },
  witchAndBack: {
    width: '20%',
    height: (7 * height_screen) / 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

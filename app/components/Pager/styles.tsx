import {StyleSheet} from 'react-native';
import {dimensions} from '@utils';

const {width_screen, height_screen} = dimensions;
export default StyleSheet.create({
  page: {
    width: width_screen,
    height: height_screen,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: width_screen,
    height: '100%',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    marginTop: height_screen * 0.53,
  },
  des: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
});

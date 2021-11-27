import {StyleSheet} from 'react-native';
import {dimensions, FONTS, Colors} from '@utils';
const {width_screen} = dimensions;

export default StyleSheet.create({
  container: {
    width: (width_screen - 72) / 2,
    borderRadius: 10,
    // overflow: 'hidden',
    marginBottom: 32,
  },
  img: {
    width: (width_screen - 72) / 2,
    height: (width_screen - 72) * 0.5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1,
  },
  title: {
    color: '#353B48',
    fontSize: 16,
    marginTop: 16,
  },
  des: {
    color: '#7F8FA6',
    fontSize: 12,
  },
  block: {
    width: (width_screen - 72) / 2,
    height: (width_screen - 72) * 0.67,
    borderRadius: 10,
    position: 'absolute',
    opacity: 0.6,
  },
  containerCheck: {
    width: (width_screen - 72) / 2,
    height: (width_screen - 72) * 0.67,
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

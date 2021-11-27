import {StyleSheet} from 'react-native';
import {dimensions} from '@utils';
const {height_screen, width_screen} = dimensions;

export default StyleSheet.create({
  ticketItem: {
    flexDirection: 'row',
    paddingHorizontal: 0.05 * width_screen,
    paddingVertical: 0.01 * height_screen,
    width: width_screen * 1,

    // backgroundColor: 'red',
  },
  img: {
    marginRight: 10,
    height: 80,
    width: 80,
    resizeMode: 'contain',
    aspectRatio: 1.5,
  },
  txtTitlePost: {
    fontSize: 12,

    marginBottom: 0.01 * height_screen,
  },
  txtTimePost: {
    fontSize: 12,
    color: '#7F8FA6',
    left: 10,
  },
  amount: {
    fontSize: 15,
    color: '#ED3269',
    right: 15,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '79%',
  },
  row: {flexDirection: 'row'},
});

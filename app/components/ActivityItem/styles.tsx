import {StyleSheet} from 'react-native';
import {dimensions} from '@utils';
const {height_screen, width_screen} = dimensions;

export default StyleSheet.create({
  activityItem: {
    backgroundColor: '#FFF',
    width: width_screen,
    paddingLeft: 0.17 * width_screen,
    paddingRight: 0.064 * width_screen,
    paddingTop: 24,
  },
  svg: {
    position: 'absolute',
    marginTop: 24,
    marginLeft: 24,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtJoin: {
    fontSize: 14,
    color: '#353B48',
  },
  txtBought: {
    fontSize: 14,
    color: '#353B48',
  },
  txtTime_Do: {
    fontSize: 12,
    color: '#7F8FA6',
  },
  img: {
    borderRadius: 10,
    marginRight: 16,
  },
  content: {
    flexDirection: 'row',
    marginTop: 17,
  },
  txtTitlePost: {
    fontSize: 14,
    color: '#353B48',
    marginBottom: 0.01 * height_screen,
  },
  txtTimePost: {
    fontSize: 12,
    color: '#7F8FA6',
  },
});

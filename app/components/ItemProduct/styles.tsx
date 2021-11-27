import {StyleSheet} from 'react-native';
import {dimensions} from '@utils';
const {height_screen, width_screen} = dimensions;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width_screen,
    // paddingLeft: 0.17 * width_screen,
  },
  containerImage: {
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    // marginRight: 1,
  },
  right: {
    flex: 1,
    minHeight: 110,
    marginLeft: 20,
    paddingVertical: 20,
  },
  name: {
    marginTop: 5,
    marginBottom: 10,
  },
  svg: {
    position: 'absolute',
    top: 0,
    marginLeft: 24,
  },
  viewPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityItem: {
    backgroundColor: '#FFF',
    width: width_screen,
    paddingLeft: 0.17 * width_screen,
    paddingRight: 0.064 * width_screen,
    paddingTop: 24,
  },
  container2: {
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

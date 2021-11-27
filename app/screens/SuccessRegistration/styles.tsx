import {StyleSheet} from 'react-native';
import {dimensions, FONTS, Colors} from '@utils';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const {width_screen, height_screen} = dimensions;
const widthImage = width_screen - 50;

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    // marginHorizontal: 25,
    marginTop: 50,
    // backgroundColor: 'red',
    height: height_screen - 150,
    width: width_screen,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    marginTop: 40,
    marginBottom: 19,
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    marginBottom: 50,
    fontSize: 12,
    color: '#80879A',
  },
  buttonView: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 40,
    backgroundColor: 'transparent',
  },
});
// '#ED3269', '#F05F3E'

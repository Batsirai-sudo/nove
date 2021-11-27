import {StyleSheet} from 'react-native';
import {Colors, dimensions, FONTS} from '@utils';
const {width_screen, height_screen} = dimensions;

export default StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    top: 20,
  },
  topCard: {
    height: 180,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: width_screen,
    // alignItems: 'center',
    // backgroundColor: '#d8ebda',
    backgroundColor: '#f2f2f2',
    // borderColor: '#d8ebda',
    // borderWidth: 0.5,
  },
  container: {
    height: height_screen,
  },
  topView: {
    width: width_screen,
    height: 200,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  insideView: {
    // borderBottomWidth: 0.3,

    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',

    marginVertical: 4,
    borderBottomColor: 'grey',
  },
  topTitle: {
    marginVertical: 5,
    justifyContent: 'flex-start',
    width: width_screen,
    paddingHorizontal: 20,
  },
  topTitle2: {
    justifyContent: 'flex-start',
    width: width_screen,
    paddingHorizontal: 20,
  },
  greyBG: {
    width: width_screen - 28,
    borderRadius: 10,
    height: 100,
    paddingHorizontal: 20,
    paddingVertical: 15,
    top: -2,
    alignSelf: 'center',
  },
});

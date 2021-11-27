import {StyleSheet} from 'react-native';
import {dimensions, FONTS, Colors} from '@utils';

const {width_screen, height_screen} = dimensions;

export default StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    width: width_screen,
    justifyContent: 'center',
    // height: height_screen,
  },
  container: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  cardContainer: {
    marginVertical: 15,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {width: 170, padding: 10, height: 150, marginHorizontal: 5},
  power: {height: 50, width: 50},
  topView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 80,
  },
  secondTopView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 60,
  },
  greatingText: {
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: FONTS.Regular,
  },

  cardNotification: {
    padding: 10,
    // marginBottom: 10,
    height: height_screen * 0.12,
    width: width_screen - 50,
  },
  touch: {},
  accountText: {
    right: 5,
  },
  filter: {
    left: 20,
    marginVertical: 10,
    color: 'blue',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // borderBottomColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
    transform: [{rotate: '270deg'}],
  },
});

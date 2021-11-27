import {StyleSheet} from 'react-native';
import {dimensions, FONTS, Colors} from '@utils';

const {width_screen, height_screen} = dimensions;

export default StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    width: width_screen,
    justifyContent: 'center',
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

  chartCart: {
    padding: 10,
    marginBottom: 200,
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
});

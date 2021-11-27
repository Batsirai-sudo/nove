import {StyleSheet} from 'react-native';
import {dimensions, FONTS} from '@utils';

const {width_screen} = dimensions;

export default StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    width: width_screen,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // cardContainer: {
  //   marginVertical: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   flex: 1,
  //   // backgroundColor: 'red',
  // },
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
    marginTop: 50,
  },
  filter: {
    left: 20,
    marginVertical: 10,
    color: 'blue',
  },
});

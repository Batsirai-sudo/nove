import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    width: 140,
    padding: 10,
    height: 140,
    marginHorizontal: 7,
    marginVertical: 7,
  },
  touch: {},
  icon: {},
  iconContainer: {
    top: 5,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  message: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'green',
  },
  profitsContainer: {marginLeft: 10},
  profits: {fontSize: 11, top: 10},
  profits2: {fontSize: 11, top: 30, left: -20},
  currencyContainer: {flexDirection: 'row', marginTop: 20},
  rands: {fontSize: 13},
  shopType: {marginTop: 20},
});

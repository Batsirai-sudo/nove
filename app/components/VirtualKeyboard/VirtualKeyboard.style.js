import {StyleSheet, Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    marginTop: 30,
    // backgroundColor: 'white',
  },
  number: {
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
  backspace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,250,1)',
    marginHorizontal: 25,
    borderRadius: 50,
    height: 60,
  },
});

import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const realWith = height > width ? width : height;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: realWith,
  },
  floatText: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    alignSelf: 'center',
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  floatButton: {
    position: 'absolute',

    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // flexDirection: 'row',

    right: 20,
  },
  loading: {
    height: height - 100,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});

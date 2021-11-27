import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  view: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  image: {
    width: 80,
    height: 80,
  },
  imageCard: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageEmpty: {
    width: 40,
    height: 40,
  },
  button: {
    width: 157,
  },
});

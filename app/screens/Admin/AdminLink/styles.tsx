import {StyleSheet} from 'react-native';
import {Colors, dimensions, FONTS} from '@utils';

export default StyleSheet.create({
  email: {
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 50,
    height: dimensions.height_screen - 150,
  },
  topText: {fontSize: 18},
  card: {
    width: '80%',
    height: 40,
    // top: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    position: 'absolute',
  },
});

import {StyleSheet} from 'react-native';
import {dimensions} from '@utils';
const {width_screen} = dimensions;

export default StyleSheet.create({
  txtAboutUs: {
    marginVertical: '2%',
  },
  txtVersion: {
    fontSize: 14,
    color: '#7F8FA6',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginTop: '10%',
  },
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: '6%',
  },
  topView: {
    height: width_screen * 0.1,
  },
});

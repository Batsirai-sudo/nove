import {StyleSheet} from 'react-native';
import {Colors, dimensions, FONTS} from '@utils';

export default StyleSheet.create({
  googlelogo: {
    width: 100,
    height: 50,
  },
  facebooklogo: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
  email: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  topText: {fontSize: 18, textAlign: 'center', marginHorizontal: 70},
  // card: {
  //   width: '90%',
  //   height: 50,
  //   top: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderLeftWidth: 5,
  //   borderRightWidth: 5,
  // },
  card: {
    width: '90%',
    height: 50,
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    // position: 'absolute',
    // bottom: 10,
  },
  container: {
    flex: 1,
    height: '100%',
  },
  content: {
    paddingHorizontal: 25,
    marginTop: 40,
  },
  rowInput: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  colInput: {
    flex: 1,
    marginHorizontal: 6,
  },
  footer: {
    paddingVertical: 25,
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 17,
  },
  shipping: {
    paddingTop: 17,
  },
  form: {
    marginTop: 13,
  },
  viewManagerStore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
  },
  mobileText: {marginVertical: 40, textAlign: 'center', fontWeight: '300'},
});

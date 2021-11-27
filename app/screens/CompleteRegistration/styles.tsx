import {StyleSheet} from 'react-native';
import {dimensions, FONTS, Colors} from '@utils';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const {width_screen, height_screen} = dimensions;
export default StyleSheet.create({
  container: {height: height_screen},

  stepIndicator: {
    marginVertical: 50,
  },
  page: {
    flex: 1,
    marginTop: 5,
    //   alignItems: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
  textInput: {
    backgroundColor: '#fff',
    borderColor: '#ED3269',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 0.5,
    height: 50,
    textAlign: 'center',
  },
  profileImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    borderRadius: 40,
    marginBottom: 40,
  },
  idprovider: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderStyle: 'dashed',
    borderBottomWidth: 0.5,
  },
  googleFacebookLogo: {
    height: 40,
    width: 40,
    top: -10,
  },
  table: {
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderStyle: 'dashed',
    borderBottomWidth: 0.5,
    height: 40,
  },
  row: {flexDirection: 'row'},
  bold: {fontWeight: 'bold'},
  privacyTermsContainer: {alignItems: 'center', marginTop: 50},
  privacyFirstText: {fontSize: 12},
  privacySecondText: {color: 'blue', fontSize: 13},
});
// '#ED3269', '#F05F3E'

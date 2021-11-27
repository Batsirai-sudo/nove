import {StyleSheet, Platform} from 'react-native';
import {dimensions, FONTS, Colors} from '@utils';
import {getBottomSpace} from 'react-native-iphone-x-helper';
const Color = {
  background: '#1F0808',
  clear: 'rgba(0,0,0,0)',
  facebook: '#3b5998',
  transparent: 'rgba(0,0,0,0)',
  silver: '#F7F7F7',
  steel: '#CCCCCC',
  error: 'rgba(200, 0, 0, 0.8)',
  ricePaper: 'rgba(255,255,255, 0.75)',
  frost: '#D8D8D8',
  cloud: 'rgba(200,200,200, 0.35)',
  windowTint: 'rgba(0, 0, 0, 0.4)',
  panther: '#161616',
  charcoal: '#595959',
  coal: '#2d2d2d',
  bloodOrange: '#fb5f26',
  snow: 'white',
  black: 'black',
  ember: 'rgba(164, 0, 48, 0.5)',
  fire: '#e73536',
  drawer: 'rgba(30, 30, 29, 0.95)',
  eggplant: '#251a34',
  border: '#483F53',
  banner: '#5F3E63',
  text: '#E0D7E5',
  twitter: '#55acee',
  loginBlue: '#0691ce',
  loginGreen: '#4cd964',
  txtgrey: '#8e9396',
  whites: '#E8E8E8',
  greys: '#cccccc',
  darktext: '#6f6f6f',
  shadows: '#b7b7b7',
  lighttxt: '#929597',
  hintblue: '#c9b0c1',
  lightgrey: '#e2e2e2',
  backgrey: '#e6e6e6',
  blacktxt: '#363636',
  skyblue: '#71d4ff',
  txtsky: '#83c8e7',

  //WooCommerce Color
  veryLightGray: '#dcdcdc',
  red: 'red',
  white: 'white',
  lightGray: '#959595',
  yellow: '#ffc700',
  lightBlack: '#111111',
  gray: '#d8d8d8',
};
const {width_screen, height_screen} = dimensions;
export default StyleSheet.create({
  container: {
    height: height_screen,
    width: width_screen,
    backgroundColor: Color.snow,
  },
  topView: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
  },
  bar: {
    borderWidth: 5,
    width: 100,
  },
  topText: {
    fontSize: 18,
  },

  header: {
    backgroundColor: '#0e1130',
    height: height_screen * 0.1,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {
        paddingTop: height_screen * 0.02,
      },
      android: {
        paddingTop: width_screen * 0.04,
      },
    }),
    elevation: 0,
    paddingLeft: width_screen * 0.05,
    paddingRight: width_screen * 0.05,
  },

  left: {
    flex: 0.5,
    backgroundColor: Color.transparent,
  },

  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.transparent,
  },

  textTitle: {
    color: Color.snow,
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: FONTS.Regular,
  },

  right: {
    flex: 0.5,
    alignItems: 'center',
  },

  backArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  heartBg: {
    width: width_screen * 0.054,
    height: width_screen * 0.054,
    borderRadius: width_screen * 0.027,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Color.snow,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heartIcon: {
    color: Color.snow,
    alignSelf: 'center',
  },

  alertBg: {
    width: width_screen * 0.03,
    height: width_screen * 0.03,
    borderRadius: width_screen * 0.015,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -(width_screen * 0.018),
  },

  alertTxt: {
    fontSize: 15,
    fontFamily: FONTS.Regular,
    color: Color.snow,
  },

  bagIcon: {
    marginLeft: width_screen * 0.04,
    color: Color.snow,
  },

  content: {
    width: width_screen,
    height: height_screen * 0.9,
    flexDirection: 'column',
    // alignItems: 'flex-start',
    // alignContent: 'flex-start',
    // justifyContent: 'space-between',
    marginBottom: 100,
    // flexDirection: 'row-reverse',
  },

  rowMain: {
    width: width_screen * 0.5,
    height: height_screen * 0.23,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.veryLightGray,
    backgroundColor: Color.white,
    borderWidth: 0.5,
  },

  imageContainer: {
    width: height_screen * 0.065,
    height: height_screen * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemImgStyle: {
    width: height_screen * 0.055,
    height: height_screen * 0.055,
    resizeMode: 'contain',
  },

  itemText: {
    color: 'black',
    fontSize: 15,
    marginTop: height_screen * 0.03,
    fontWeight: '600',
  },

  notificationCircle: {
    position: 'absolute',
    top: 0,
    left: height_screen * 0.045,
    width: height_screen * 0.026,
    height: height_screen * 0.026,
    borderRadius: height_screen * 0.013,
    backgroundColor: Color.red,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notification: {
    color: Color.white,
    fontFamily: FONTS.Regular,
    fontSize: 12,
    backgroundColor: 'transparent',
  },
});

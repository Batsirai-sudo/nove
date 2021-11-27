import {Platform, StyleSheet, I18nManager, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const Metrics = {
  WIDTH: width,
  HEIGHT: height,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
};

const Colors = {
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

const styles = StyleSheet.create({
  drawercontainer: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    backgroundColor: Colors.snow,
  },

  headerSec: {
    backgroundColor: '#2d324f',
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.05,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05,
  },

  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent,
  },

  backArrow: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },

  textTitle: {
    color: Colors.snow,
    fontSize: 16,
    alignSelf: 'center',
  },

  right: {
    flex: 0.5,
  },

  container: {
    height: Metrics.HEIGHT,
    elevation: 10,
    zIndex: 800,
    backgroundColor: '#36343f',
  },

  listDivider: {
    marginLeft: Metrics.WIDTH * 0.03,
    height: 0.8,
    backgroundColor: '#29282e',
    marginTop: Metrics.HEIGHT * 0.01,
    marginBottom: Metrics.HEIGHT * 0.01,
  },

  headerBg: {
    marginBottom: Metrics.HEIGHT * 0.02,
    backgroundColor: '#312f38',
    ...Platform.select({
      ios: {
        height: Metrics.HEIGHT * 0.17,
      },
      android: {
        height: Metrics.HEIGHT * 0.21,
      },
    }),
  },

  searchBarBg: {
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: '#222127',
    marginHorizontal: Metrics.WIDTH * 0.04,
    marginTop: Metrics.HEIGHT * 0.06,
    paddingHorizontal: Metrics.WIDTH * 0.03,
    paddingVertical: Metrics.WIDTH * 0.01,
    alignItems: 'center',
  },

  headerDivider: {
    height: 1,
    backgroundColor: '#29282e',
    marginTop: Metrics.HEIGHT * 0.01,
  },

  headerTitleBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.HEIGHT * 0.03,
    marginHorizontal: Metrics.WIDTH * 0.04,
  },

  headerTitleTxt: {
    color: '#6b6a70',
    fontSize: 13,
  },

  listBg: {
    flexDirection: 'column',
  },

  menuListItem: {
    flexDirection: 'row',
    marginLeft: Metrics.WIDTH * 0.04,
    marginRight: Metrics.WIDTH * 0.04,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  nameProfileBg: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  nameTxt: {
    color: '#fff',
    fontSize: 14,
    marginLeft: Metrics.WIDTH * 0.03,
  },

  onlineStatusIcon: {
    width: Metrics.WIDTH * 0.022,
    height: Metrics.WIDTH * 0.022,
    borderRadius: Metrics.WIDTH * 0.011,
    backgroundColor: '#39b54a',
  },

  recentUserBg: {
    backgroundColor: '#312f38',
    marginTop: Metrics.WIDTH * 0.03,
    marginBottom: Metrics.HEIGHT * 0.012,
  },

  recentlyTxt: {
    color: '#6f6e74',
    fontSize: 12,
    paddingLeft: I18nManager.isRTL ? 0 : Metrics.WIDTH * 0.04,
    paddingRight: I18nManager.isRTL ? Metrics.WIDTH * 0.04 : 0,
    textAlign: 'left',
    paddingTop: Metrics.WIDTH * 0.045,
    paddingBottom: Metrics.WIDTH * 0.02,
  },

  listRecentBg: {
    flexDirection: 'column',
    paddingBottom: Metrics.WIDTH * 0.02,
  },

  timeTxt: {
    color: '#737179',
    fontSize: 10,
  },

  searchInput: {
    color: '#6d6d71',
    fontSize: 15,
    width: Metrics.WIDTH * 0.6,
    marginLeft: Metrics.WIDTH * 0.02,
    textAlignVertical: 'top',
    ...Platform.select({
      android: {
        paddingTop: 5,
        paddingBottom: 0,
      },
    }),
  },

  profileImg: {
    width: Metrics.WIDTH * 0.1,
    height: Metrics.WIDTH * 0.1,
    resizeMode: 'contain',
  },
});

export default styles;

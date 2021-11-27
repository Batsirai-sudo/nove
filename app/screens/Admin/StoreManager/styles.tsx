import {StyleSheet, Platform, Dimensions} from 'react-native';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 84;

const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  card: {
    width: 70,
    padding: 10,
    height: 70,
    margin: 10,

    // marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    margin: 10,
    // width: 150,
    // height: 200,
  },
  cardTopView: {
    flexDirection: 'row',
    // marginTop: 40,
    top: 30,
    flexWrap: 'wrap',
    // flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  topTxtView: {
    marginTop: 20,
    marginLeft: 30,
    flexDirection: 'row',
  },
  txt: {
    fontSize: 20,
    fontWeight: '600',
    // color: '#E9E7F8',
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },

  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

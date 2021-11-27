import {Platform, StyleSheet, Dimensions} from 'react-native';
import {Colors, dimensions, FONTS} from '@utils';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
    transform: [{rotate: '90deg'}],
    top: 3,
  },
  container: {height},
  header: {
    backgroundColor: '#2d324f',

    borderBottomWidth: 0,
    ...Platform.select({
      ios: {
        height: 56,
      },
      android: {
        height: 66,
        paddingTop: height * 0.02,
      },
    }),
    elevation: 0,
  },
  backArrow: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 0.5,
    backgroundColor: 'transparent',
  },

  body: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: '#2d324f',
  },

  right: {
    flex: 0.5,
  },

  headerTitle: {
    color: '#fff',
    fontFamily: FONTS.Regular,
    fontSize: 18,
  },

  upperListContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    // position: 'absolute',
    // bottom: 100,
  },

  upperRowMain: {
    width: width * 0.33,
    height: width * 0.14,
    justifyContent: 'center',
    margin: width * 0.001,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },

  upperRowSelectedMain: {
    width: width * 0.3,
    height: width * 0.1,
    justifyContent: 'center',
    margin: width * 0.001,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(240,95,62,0.9)',
    borderRadius: 10,
    elevation: 1,
  },
  firsttxt: {
    color: 'blue',
    fontWeight: '100',
    fontSize: 14,
  },
  secondtxt: {
    fontWeight: '100',
    fontSize: 14,
    color: 'red',
  },

  upperListTitle: {
    fontFamily: FONTS.Regular,
    fontSize: 16,
    marginTop: height * 0.008,
    color: '#000',
  },

  upperListImage: {
    height: height * 0.05,
    width: width * 0.1,
    resizeMode: 'contain',
  },
  card: {
    width: 175,
    padding: 10,
    height: 200,
    marginHorizontal: 5,
    marginVertical: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
    borderRightWidth: 1,
    borderRightColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
  },
  buttons: {
    height: 35,
    width: 35,
    backgroundColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    zIndex: 999,
  },
  topTag: {
    backgroundColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
    position: 'absolute',
    top: 0,
    right: 0,
    height: 30,
    width: 40,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  lowerListContent: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.015,
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: height * 0.03,
  },

  lowerRowMain: {
    backgroundColor: '#000',
    width: width * 0.44,
    height: width * 0.445,
    marginBottom: width * 0.01,
    marginTop: width * 0.01,
    alignItems: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: '#000',
  },

  imageBG: {
    width: width * 0.44,
    height: width * 0.445,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    bottom: 0,
    position: 'absolute',
    marginLeft: width * 0.03,
    marginRight: width * 0.04,
  },

  profileContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: height * 0.01,
  },

  profileImg: {
    width: width * 0.065,
    height: width * 0.065,
    borderRadius: width * 0.0325,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    resizeMode: 'cover',
  },

  likeCountText: {
    fontFamily: FONTS.Regular,
    fontSize: 16,
    marginLeft: 5,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        marginBottom: height * 0.01,
      },
      android: {
        marginBottom: height * 0.005,
      },
    }),
  },

  likeImage: {
    marginBottom: height * 0.015,
    width: height * 0.0225,
    height: height * 0.0225,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 15,
  },
  listViewBg: {
    backgroundColor: '#fff',
    elevation: 15,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 8,
      width: 0,
    },
    zIndex: 999,
    position: 'absolute',
    bottom: 80,
    // marginHorizontal: 20,
  },

  profileView: {
    width: width * 0.042,
  },
});

export default styles;

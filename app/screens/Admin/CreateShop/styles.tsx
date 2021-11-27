import {Platform, StyleSheet, Dimensions} from 'react-native';
import {Colors, dimensions, FONTS} from '@utils';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 25,
    marginTop: 50,
  },
  container: {height},

  upperRowMain: {
    width: width,
    height: width * 0.14,
    justifyContent: 'center',
    margin: width * 0.001,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
  },
  upperListTitle: {
    fontFamily: FONTS.Regular,
    fontSize: 16,
    marginTop: height * 0.008,
    color: '#000',
  },
  selectContent: {
    marginBottom: 0,
    borderBottomWidth: 0,
    borderRadius: 8,
  },
  selectMethod: {
    minHeight: 30,
    paddingVertical: 0,
    height: 50,
  },
  viewFoot: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: -10,
    paddingHorizontal: 25,
    flexDirection: 'row',
  },
  footButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  viewManager: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  listViewBg: {
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 8,
      width: 0,
    },
    zIndex: 999,
    position: 'absolute',
    // top: 10,
  },
  selectContainer: {
    width: '100%',
    marginBottom: 10,
  },
  touchContent: {
    paddingLeft: 14,
    paddingRight: 7,
  },
  profileView: {
    width: width * 0.042,
  },
});

export default styles;

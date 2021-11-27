import {StyleSheet} from 'react-native';
import {Colors} from '@utils';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginHorizontal: 25,
    marginTop: 13,
    marginBottom: 7,
  },
  headerCenter: {
    flex: 0,
  },
  header: {
    paddingHorizontal: 25,
  },
  item: {
    marginHorizontal: 25,
  },
  footerEmpty: {
    height: 20,
  },
  footerLoading: {
    marginVertical: 20,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
    transform: [{rotate: '90deg'}],
  },
  triangle2: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(255,255,255,0.9)',
    transform: [{rotate: '90deg'}],
    elevation: 10,
  },
  floatingTag: {
    zIndex: 20,
    backgroundColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
    width: 120,
    height: 100,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingLeft: 10,
    paddingVertical: 5,
    elevation: 10,
  },
  floatingContainer: {
    position: 'absolute',
    top: 100,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountFloating: {
    position: 'absolute',
    bottom: 120,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountTag: {
    zIndex: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 150,
    height: 50,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingLeft: 10,
    paddingVertical: 5,
    elevation: 10,
  },
});

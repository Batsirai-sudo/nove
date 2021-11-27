import {StyleSheet} from 'react-native';
import {FONTS} from '@utils';

export default StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'},
  drawerItem: {alignItems: 'flex-start', marginVertical: 0},
  drawerLabel: {color: 'white', marginLeft: -20},
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    height: 100,
    width: 100,
  },

  headeRight: {
    flexDirection: 'row',
    right: 12,
  },
  text: {
    fontSize: 17,
    color: 'white',
  },
  leftText: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNotification: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSetting: {
    flex: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    position: 'absolute',
    right: 2,
    top: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNotification: {
    fontFamily: FONTS.Medium,
    fontSize: 12,
    color: '#ED3269',
  },
});

const homeStyles = StyleSheet.create({});

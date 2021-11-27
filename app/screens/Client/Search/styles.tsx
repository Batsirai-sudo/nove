import {StyleSheet} from 'react-native';
import {dimensions, FONTS, Colors} from '@utils';

const {width_screen, height_screen} = dimensions;

export default StyleSheet.create({
  listContainer: {
    height: height_screen - 56,
  },

  click: {
    width: 100,
    right: -20,
    alignItems: 'center',
  },
  headerCenter: {
    flex: 0,
  },
  tune: {left: 15},
  header: {
    paddingHorizontal: 25,
  },
  viewSearch: {
    paddingHorizontal: 25,
    marginTop: 13,
    marginBottom: 11,
  },
  viewLoading: {
    marginVertical: 20,
  },
  item: {
    paddingHorizontal: 25,
  },
  viewHiddenItem: {
    alignItems: 'flex-end',
  },
  touchDelete: {
    width: 68,
    height: '100%',
    justifyContent: 'center',
  },
  viewIconAdd: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  iconAdd: {
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
  },
  footerEmpty: {
    height: 50,
    marginBottom: 150,
    alignItems: 'center',
  },
  footerLoading: {
    marginVertical: 20,
    marginBottom: 150,
  },
});

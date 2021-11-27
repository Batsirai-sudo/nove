import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  right: {
    flex: 1,
    marginLeft: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  viewNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  badge: {
    paddingHorizontal: 12,
  },
  time: {
    // marginBottom: 5,
  },
  viewProduct: {
    flexDirection: 'row',
    marginTop: 5,
  },
  dot: {
    marginRight: 8,
  },
  textProduct: {
    flex: 1,
  },
});

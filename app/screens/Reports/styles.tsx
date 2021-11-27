import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 5,
    marginBottom: -55,
    height: '100%',
  },
  contentModal: {
    width: '100%',
    borderRadius: 8,
    padding: 6,
    height: '86%',
    position: 'absolute',
    bottom: 50,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  contentAction: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 24,
  },
});

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  flex: {height: '100%'},
  content: {
    marginHorizontal: 25,
    marginTop: 60,
    marginBottom: 100,
  },
  inputMap: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  viewFoot: {
    marginTop: 20,
    // marginBottom: 30,
    marginHorizontal: -10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
  },
  footButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
  },
  selectMethod: {
    minHeight: 30,
    paddingVertical: 0,
    height: 50,
  },
  selectContent: {
    marginBottom: 0,
    borderBottomWidth: 0,
    borderRadius: 8,
  },
  viewManager: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  selectContainer: {
    width: '100%',
    marginBottom: 10,
  },
  touchContent: {
    paddingLeft: 14,
    paddingRight: 7,
  },
});

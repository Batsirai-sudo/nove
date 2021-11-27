import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  flex: {backgroundColor: '#fff'},
  content: {
    marginHorizontal: 25,
    marginTop: 70,
  },
  inputMap: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
  },
  viewFoot: {
    // marginTop: 20,
    bottom: 40,
    marginHorizontal: -10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    position: 'absolute',
    // backgroundColor: 'red',
  },
  footButton: {
    flex: 1,
    marginHorizontal: 10,
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
  selectContainer: {
    width: '100%',
    marginBottom: 10,
  },
  touchContent: {
    paddingLeft: 14,
    paddingRight: 7,
  },
});
// '#ED3269', '#F05F3E'

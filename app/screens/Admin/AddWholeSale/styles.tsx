import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 25,
    alignItems: 'center',
    marginTop: 40,
  },
  viewInput: {
    width: '100%',
  },
  rowInput: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  colInput: {
    flex: 1,
    marginHorizontal: 6,
    justifyContent: 'center',
  },
  viewManager: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textCatalog: {
    marginVertical: 10,
  },
  viewListRadio: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingVertical: 13,
  },
  touchVisibility: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6.5,
    paddingHorizontal: 20,
  },
  textVisibility: {
    flex: 1,
    marginLeft: 10,
  },
  SaveButton: {
    width: 193,
  },
  containerButton: {
    marginVertical: 26,
  },
  iconClose: {
    marginLeft: 10,
  },
  btnSelectCate: {
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  viewSelectCate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 8,
  },
});

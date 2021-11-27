import {StyleSheet} from 'react-native';
import {Colors, dimensions, FONTS} from '@utils';
const {width_screen, height_screen} = dimensions;

export default StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    top: 20,
  },
  topCard: {
    height: 200,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // alignItems: 'center',
    backgroundColor: '#d8ebda',
    // borderColor: '#d8ebda',
    // borderWidth: 0.5,
  },
  container: {
    height: height_screen,
  },
  topView: {
    width: width_screen,
    height: 130,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  insideView: {
    // borderBottomWidth: 0.3,

    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',

    marginVertical: 4,
    borderBottomColor: 'grey',
  },
  topTitle: {
    marginVertical: 5,
    justifyContent: 'flex-start',
    width: width_screen,
    paddingHorizontal: 20,
  },
  topTitle2: {
    justifyContent: 'flex-start',
    width: width_screen,
    paddingHorizontal: 20,
  },
  greyBG: {
    width: width_screen - 30,
    borderRadius: 10,
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: -2,
    alignSelf: 'center',
  },
  ////////////////////////////////////////////////////////////////
  containert: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#37C2D0',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
    marginHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  columnHeader: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: '600',
    fontSize: 11,
  },
  columnRowTxt: {
    width: '20%',
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 15,
  },
});

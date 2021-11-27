import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const pad = 40;
const widthImage = width - 2 * pad;
const heightImage = (widthImage * 278) / 300;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  textSkip: {
    paddingHorizontal: 5,
  },
  footer: {
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
  },
  containerButton: {
    // marginBottom: 40,
    // marginTop: 20,
  },
  viewDot: {
    flexDirection: 'row',
    marginBottom: 36,
  },
  dot: {
    height: 6,
    marginHorizontal: 3,
    borderRadius: 3,
  },
  item: {
    height: '100%',
    width,
  },
  viewInfo: {
    paddingHorizontal: pad,
  },
  image: {
    width: widthImage,
    height: heightImage,
  },
  viewTextItem: {
    alignItems: 'center',
    marginVertical: 40,
  },
  textItem: {
    textAlign: 'center',
  },
  textTitle: {
    marginBottom: 10,
    fontSize: 20,
  },

  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

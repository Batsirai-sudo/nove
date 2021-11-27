import {StyleSheet} from 'react-native';
const pad = 25;

export default StyleSheet.create({
  loading: {
    marginVertical: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 6,
    overflow: 'hidden',
  },
  cardSelect: {
    borderWidth: 2,
  },
  check: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  containerWrap: {
    paddingHorizontal: pad,
    marginBottom: 15,
    marginHorizontal: -6,
  },
  button: {
    marginHorizontal: pad,
    marginVertical: pad,
  },
});

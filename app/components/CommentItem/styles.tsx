import {StyleSheet} from 'react-native';
import {dimensions} from '@utils';

const {width_screen} = dimensions;

export default StyleSheet.create({
  bigAvatar: {
    width: 32,
    height: 32,
    marginRight: 16,
    marginTop: 4,
    borderRadius: 32 / 2,
  },
  textTime: {
    fontSize: 12,
    color: '#7F8FA6',
    lineHeight: 15,
    marginRight: 24,
  },
  container: {
    width: width_screen - 48,
    flexDirection: 'row',
    marginBottom: 24,
    marginLeft: 24,
  },
  commentView: {
    flex: 1,
  },
  textName: {
    fontSize: 14,
    color: '#353B48',
    lineHeight: 17,
    marginBottom: 8,
  },
  textComment: {
    fontSize: 14,
    color: '#353B48',
    lineHeight: 24,
    marginTop: 8,
  },
  timeView: {
    flexDirection: 'row',
    marginTop: 8,
  },
  textNumberLikes: {
    fontSize: 12,
    textAlign: 'right',
    color: '#353B48',
    lineHeight: 15,
  },
  optionView: {
    flexDirection: 'row',
    width: 128,
    flex: 1,
    backgroundColor: '#ED3269',
    marginLeft: 24,
    marginBottom: 24,
  },
  buttonOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
});

import {StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  keyAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: getBottomSpace(),
  },
  commentView: {
    flex: 1,
    alignItems: 'center',
  },
  writeComment: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 13,
  },
  line: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    height: 1,
    marginTop: 16,
  },
  writeAndSend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#7F8FA6',
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
});

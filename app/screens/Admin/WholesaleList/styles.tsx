import {StyleSheet} from 'react-native';
const AVATAR_SIZE = 70;
const SPACING = 10;

export default StyleSheet.create({
  imageAvatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
  },
  container: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    elevation: 10,
  },
  background: {},
});

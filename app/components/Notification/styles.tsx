import {StyleSheet} from 'react-native';
import {dimensions, FONTS} from '@utils';

const {width_screen, height_screen} = dimensions;
export default StyleSheet.create({
  notificationMessage: {
    flexDirection: 'row',
    height: height_screen * 0.12,
    paddingHorizontal: 0.064 * width_screen,
    paddingVertical: 0.022 * height_screen,
  },
  notificationEvent: {
    height: height_screen * 0.16,
    paddingHorizontal: 0.064 * width_screen,
    paddingVertical: 0.022 * height_screen,
    flexDirection: 'row',
  },
  content: {
    marginLeft: 0.04 * width_screen,
  },
  title: {
    flexDirection: 'row',
  },
  txtTitle: {
    fontSize: 14,
    color: '#353B48',
  },
  txtEvent: {
    fontSize: 14,
    color: '#353B48',
    marginBottom: 0.01 * height_screen,
  },

  description: {
    marginLeft: 0.04 * width_screen,
  },
  eventStyle: {
    flexDirection: 'row',
    marginTop: 0.02 * height_screen,
  },

  txtUserName: {
    fontSize: 14,
    color: '#353B48',
  },
  txtMessage: {
    fontSize: 14,
    color: '#353B48',
    marginVertical: 0.01 * height_screen,
  },
  txtTime: {
    fontSize: 12,
    color: '#7F8FA6',
  },
  txtSend: {
    fontSize: 12,
    color: '#7F8FA6',
  },
});

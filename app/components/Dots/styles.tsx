import {StyleSheet} from 'react-native';
import { dimensions } from '@utils'
import {getBottomSpace} from 'react-native-iphone-x-helper';

const {  height_screen } = dimensions


export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: height_screen * 0.3 + getBottomSpace(),
        flexDirection: 'row',
        alignSelf: 'center',
      },
      dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgb(255,255,255)',
      },
      dotCenter: {
        marginHorizontal: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgb(255,255,255)',
      },
});








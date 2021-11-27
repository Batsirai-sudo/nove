import React from 'react';
import {View, Modal} from 'react-native';
import Text from '../Text';
import PropTypes from 'prop-types';
import {
  PulseLoader,
  DotsLoader,
  TextLoader,
  BubblesLoader,
  CirclesLoader,
  BreathingLoader,
  RippleLoader,
  LinesLoader,
  MusicBarLoader,
  EatBeanLoader,
  DoubleCircleLoader,
  RotationCircleLoader,
  RotationHoleLoader,
  CirclesRotationScaleLoader,
  NineCubesLoader,
  LineDotsLoader,
  ColorDotsLoader,
  OpacityDotsLoader,
} from 'react-native-indicator';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import styles from './styles';
function CustomProgressBar(props) {
  const {visible, loader, loaderText, category, width, height} = props;
  let Loader_type;

  switch (loader) {
    case 1:
      Loader_type = PulseLoader;
      break;
    case 2:
      Loader_type = DotsLoader;
      break;
    case 3:
      Loader_type = CirclesLoader;
      break;
    case 4:
      Loader_type = BreathingLoader;
      break;
    case 5:
      Loader_type = RippleLoader;
      break;
    case 6:
      Loader_type = LinesLoader;
      break;
    case 7:
      Loader_type = MusicBarLoader;
      break;
    case 8:
      Loader_type = EatBeanLoader;
      break;
    case 9:
      Loader_type = DoubleCircleLoader;
      break;
    case 10:
      Loader_type = RotationCircleLoader;
      break;
    case 11:
      Loader_type = RotationHoleLoader;
      break;
    case 12:
      Loader_type = CirclesRotationScaleLoader;
      break;
    case 13:
      Loader_type = NineCubesLoader;
      break;
    case 14:
      Loader_type = LineDotsLoader;
      break;
    case 15:
      Loader_type = ColorDotsLoader;
      break;
    case 16:
      Loader_type = OpacityDotsLoader;
      break;
    default:
      Loader_type = BubblesLoader;
  }

  let Second_Loader;

  switch (loader) {
    case 1:
      Second_Loader = BallIndicator;
      break;
    case 2:
      Second_Loader = BarIndicator;
      break;
    case 3:
      Second_Loader = DotIndicator;
      break;
    case 4:
      Second_Loader = MaterialIndicator;
      break;
    case 5:
      Second_Loader = PacmanIndicator;
      break;
    case 6:
      Second_Loader = PulseIndicator;
      break;
    case 7:
      Second_Loader = SkypeIndicator;
      break;
    case 8:
      Second_Loader = UIActivityIndicator;
      break;
    case 9:
      Second_Loader = WaveIndicator;
      break;
    default:
      Second_Loader = WaveIndicator;
  }

  const Loader = category === 2 ? Second_Loader : Loader_type;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => null}
      visible={visible}>
      <View style={styles.conatiner}>
        {/* <View style={category === 2 ? null : styles.conatiner}> */}
        <View style={[styles.loaderView, {width, height}]}>
          <Loader
            style={styles.loaderStyle}
            color="white"
            size={40}
            // dotRadius={10}
          />
          {loaderText ? (
            <Text
              style={category === 2 ? {top: -15, ...styles.txt} : styles.txt}>
              {loaderText}
            </Text>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

CustomProgressBar.propTypes = {
  visible: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};
CustomProgressBar.defaultProps = {
  visible: false,
  width: 110,
  height: 110,
};

export default CustomProgressBar;

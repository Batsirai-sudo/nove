import React from 'react';
import {Text} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import styles from './styles';
import {Images} from '@config';

const Loader: React.FC = (props) => {
  const {isLoading, textCont} = props;

  return (
    <AnimatedLoader
      visible={isLoading}
      overlayColor="rgba(0, 0, 0, 0.7)"
      source={Images.loader}
      animationStyle={styles.lottie}
      speed={0.7}>
      <Text style={styles.text}>{textCont}</Text>
    </AnimatedLoader>
  );
};

export default Loader;

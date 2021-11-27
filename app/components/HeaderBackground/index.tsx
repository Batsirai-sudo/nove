import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '@utils';

const headerBackground: React.FC = () => {
  return (
    <LinearGradient
      colors={[Colors.firstColorGradient, Colors.secondColorGradient]}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}
    />
  );
};

export default headerBackground;

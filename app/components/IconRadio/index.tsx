import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {View, ViewPropTypes} from 'react-native';
import styles from './styles';

function IconRadio(props) {
  const {colors} = useTheme();
  const {isSelected, containerStyle} = props;

  return (
    <View style={containerStyle}>
      <View
        style={[
          styles.dot,
          {borderColor: colors.thirdText},
          isSelected && {borderColor: colors.primary},
        ]}>
        {isSelected ? (
          <View style={[styles.dotSelect, {backgroundColor: colors.primary}]} />
        ) : null}
      </View>
    </View>
  );
}

IconRadio.propTypes = {
  isSelected: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
};

IconRadio.defaultProps = {
  isSelected: false,
  containerStyle: {},
};

export default IconRadio;

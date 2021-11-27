import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {View, ViewPropTypes} from 'react-native';

function GrayCard(props) {
  const {colors} = useTheme();
  const {Component, style, third, bgcolor, secondary, ...rest} = props;
  const bgColor = third
    ? colors.thirdCard
    : secondary
    ? colors.secondaryCard
    : colors.card;

  return (
    <Component
      {...rest}
      style={[{backgroundColor: bgcolor ? bgcolor : bgColor}, style]}
    />
  );
}

GrayCard.propTypes = {
  Component: PropTypes.elementType,
  secondary: PropTypes.bool,
  third: PropTypes.bool,
  style: ViewPropTypes.style,
};

GrayCard.defaultProps = {
  Component: View,
  secondary: false,
  third: false,
  style: {},
};

export default GrayCard;

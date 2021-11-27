import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {View, Text as TextRN, ViewPropTypes} from 'react-native';
import Text from '../Text';
import styles from './styles';
function ViewLabel(props) {
  const {colors} = useTheme();
  const {
    type,
    label,
    error,
    children,
    containerStyle,
    style,
    labelStyle,
    errorStyle,
    isRequired,
    labelRight,
  } = props;
  const borderColor = error ? colors.error : colors.border;

  if (type === 'underline') {
    return (
      <View style={[styles.containerUnderLine, containerStyle]}>
        <View
          style={[
            styles.content,
            styles.contentUnderline,
            {borderColor: borderColor},
            style,
          ]}>
          {children}
        </View>
        {error ? (
          <Text h6 h6Style={[styles.error, {color: '#80879A'}, errorStyle]}>
            {error}
          </Text>
        ) : null}
      </View>
    );
  }
  return (
    <View style={[styles.container, containerStyle]}>
      {label || labelRight ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text secondary style={[styles.label, labelStyle]}>
            {label}
            {isRequired && <Text style={{color: colors.error}}> *</Text>}
          </Text>
          {labelRight}
        </View>
      ) : null}
      <View
        style={[
          styles.content,
          styles.contentSolid,
          {borderColor: borderColor},
          style,
        ]}>
        {children}
      </View>
      {error ? (
        <Text h6Style={[styles.error, {color: colors.error}, errorStyle]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

ViewLabel.propTypes = {
  type: PropTypes.oneOf(['solid', 'underline']),
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
  containerStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  labelStyle: TextRN.propTypes.style,
  errorStyle: TextRN.propTypes.style,
  isRequired: PropTypes.bool,
  labelRight: PropTypes.node,
};

ViewLabel.defaultProps = {
  type: 'solid',
  containerStyle: {},
  style: {},
  labelStyle: {},
  errorStyle: {},
  isRequired: false,
};
export default ViewLabel;

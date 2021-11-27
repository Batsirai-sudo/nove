import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {View, TextInput, Text, ViewPropTypes} from 'react-native';
import Icon from '../Icon';
import nodeType from '../../helpers/nodeType';
import renderNode from '../../helpers/renderNode';
import styles from './styles';
function InputUnderline(props) {
  const {colors} = useTheme();
  const {icon, viewIcon, style, multiline, ...rest} = props;
  const componentInput = (
    <TextInput
      placeholderTextColor={colors.thirdText}
      {...rest}
      multiline={multiline}
      style={[
        styles.input,
        {
          color: colors.text,
        },
        multiline && styles.inputMultiline,
        icon && styles.inputIcon,
        style,
      ]}
    />
  );
  const renderIcon = (content) =>
    renderNode(Icon, content, {
      size: 20,
      color: colors.thirdText,
    });
  if (icon) {
    return (
      <View style={styles.viewRow}>
        <View style={[styles.viewIcon, viewIcon]}>{renderIcon(icon)}</View>
        <View style={styles.viewInput}>{componentInput}</View>
      </View>
    );
  }
  return componentInput;
}

InputUnderline.propTypes = {
  multiline: PropTypes.bool,
  style: Text.propTypes.style,
  icon: nodeType,
  viewIcon: ViewPropTypes.style,
};

InputUnderline.defaultProps = {
  multiline: false,
  autoCapitalize: 'none',
  style: {},
  viewIcon: {},
};

export default InputUnderline;

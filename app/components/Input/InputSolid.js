import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {
  View,
  TextInput,
  Text,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native';
import Icon from '../Icon';
import nodeType from '../../helpers/nodeType';
import renderNode from '../../helpers/renderNode';
import styles from './styles2';

function InputSolid(props) {
  const {colors} = useTheme();
  const {
    icon,
    viewIcon,
    style,
    multiline,
    rightIcon,
    secureTextEntry,
    onPressRightBtn,
    ...rest
  } = props;
  const [secure, setSecure] = React.useState(secureTextEntry);

  const renderIcon = (content) =>
    renderNode(Icon, content, {
      size: 20,
      color: colors.thirdText,
    });
  return (
    <View style={styles.viewRow}>
      {icon ? (
        <View style={[styles.viewIcon, viewIcon]}>{renderIcon(icon)}</View>
      ) : null}
      <View style={styles.viewInput}>
        <TextInput
          {...rest}
          multiline={multiline}
          placeholder={null}
          secureTextEntry={secure}
          style={[
            styles.input,
            {
              color: colors.text,
            },
            multiline && styles.inputMultiline,
            style,
          ]}
        />
      </View>
      {!multiline && secureTextEntry ? (
        <View style={styles.iconSecure}>
          <Icon
            name={secure ? 'eye' : 'eye-off'}
            size={20}
            color={colors.thirdText}
            onPress={() => setSecure(!secure)}
          />
        </View>
      ) : null}
      {rightIcon ? (
        <View
          style={[
            {
              height: 46,
              backgroundColor: '#F05F3E',
              justifyContent: 'center',
              width: 46,
              left: 10,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            },
          ]}>
          <TouchableOpacity style={{}} onPress={onPressRightBtn}>
            <Icon name={'book-search'} size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

InputSolid.propTypes = {
  multiline: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  style: Text.propTypes.style,
  icon: nodeType,
  viewIcon: ViewPropTypes.style,
};

InputSolid.defaultProps = {
  multiline: false,
  secureTextEntry: false,
  autoCapitalize: 'none',
  style: {},
  viewIcon: {},
};

export default InputSolid;

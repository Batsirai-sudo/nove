import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {Text, ViewPropTypes} from 'react-native';
import {ListItem as ListItemRNE} from 'react-native-elements';
import styles from './styles';

function ListItem(props) {
  const {colors} = useTheme();
  const {
    title,
    rightElement,
    containerStyle,
    titleStyle,
    subtitleStyle,
    bottomDivider,
    leftElement,
    rightIcon,
    ...rest
  } = props;
  return (
    <ListItemRNE
      underlayColor={'transparent'}
      activeOpacity={0.5}
      {...rest}
      bottomDivider={bottomDivider}
      containerStyle={[
        styles.container,
        {backgroundColor: colors.card},
        {borderColor: colors.border},
        bottomDivider && styles.containerUnderLine,
        containerStyle,
      ]}
      titleStyle={[styles.title, {color: colors.text}, titleStyle]}
      subtitleStyle={[
        styles.subTitle,
        {color: colors.thirdText},
        subtitleStyle,
      ]}>
      {leftElement}
      <ListItemRNE.Content>
        <ListItemRNE.Title
          style={[styles.title, {color: colors.text}, titleStyle]}>
          {title}
        </ListItemRNE.Title>
      </ListItemRNE.Content>

      {rightElement}
    </ListItemRNE>
  );
}

ListItem.propTypes = {
  containerStyle: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  subtitleStyle: Text.propTypes.style,
  bottomDivider: PropTypes.bool,
};
ListItem.defaultProps = {
  containerStyle: {},
  bottomDivider: false,
};

export default ListItem;

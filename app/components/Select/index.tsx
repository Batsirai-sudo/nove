import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity, FlatList, ViewPropTypes, View} from 'react-native';
import ViewLabel from '../ViewLabel';
import Modal from '../Modal';
import SelectSolid from './SelectSolid';
import SelectUnderline from './SelectUnderline';
import Icon from '../Icon';
import ListItem from '../ListItem';
import styles from './styles';
function Select(props) {
  const {colors} = useTheme();
  const [visible, setVisible] = React.useState(false);
  const {
    type,
    label,
    error,
    containerStyle,
    contentStyle,
    labelStyle,
    errorStyle,
    isRequired,
    valueSelect,
    options,
    onSelect,
    textEmpty,
    style,
    touchStyle,
    leftComponent,
    createShop,
  } = props;
  const ComponentInput = type === 'underline' ? SelectUnderline : SelectSolid;
  const optionSelect = createShop
    ? options.find((option) => option.value === valueSelect)
    : options.find((option) => option.id === valueSelect);
  const clickSelect = (value) => {
    onSelect(value);
    setVisible(false);
  };
  return (
    <>
      <ViewLabel
        type={type}
        label={label}
        error={error}
        containerStyle={containerStyle}
        style={contentStyle}
        labelStyle={labelStyle}
        errorStyle={errorStyle}
        isRequired={isRequired}>
        <TouchableOpacity style={touchStyle} onPress={() => setVisible(true)}>
          <ComponentInput
            name={optionSelect?.name}
            label={label}
            textEmpty={textEmpty}
            style={style}
          />
        </TouchableOpacity>
      </ViewLabel>
      <Modal visible={visible} setModalVisible={(value) => setVisible(value)}>
        {options && options.length > 0 ? (
          <FlatList
            data={options.filter((x) => x.ignore !== true)}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
              item.ignore ? null : (
                <ListItem
                  title={item.name}
                  onPress={() => clickSelect(item)}
                  titleStyle={[
                    styles.text,
                    item.value === valueSelect && {color: colors.primary},
                  ]}
                  bottomDivider
                  leftElement={leftComponent}
                  rightElement={
                    item.value === valueSelect ? (
                      <Icon
                        name={'check'}
                        size={22}
                        color={colors.primary}
                        iconStyle={styles.icon}
                        activeOpacity={1}
                        underlayColor={'transparent'}
                      />
                    ) : null
                  }
                  // rightElement={
                  //   item.value === valueSelect ? (
                  //     <Icon name="heartbeat" size={20} color={colors.primary} />
                  //   ) : null
                  // }
                  containerStyle={styles.item}
                />
              )
            }
            initialNumToRender={15}
            keyExtractor={(item) => item.value}
            ListFooterComponent={() => <View style={{height: 50}}></View>}
          />
        ) : null}
      </Modal>
    </>
  );
}
// {name: 'check', size: 20, }
Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ).isRequired,
  valueSelect: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
  textEmpty: PropTypes.string,
  style: ViewPropTypes.style,
  touchStyle: ViewPropTypes.style,
};

Select.defaultProps = {
  options: [],
  valueSelect: null,
  onSelect: () => {},
  textEmpty: '',
  style: {},
  touchStyle: {},
};

export default Select;

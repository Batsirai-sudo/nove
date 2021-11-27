import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {View} from 'react-native';
import ListItem from '../ListItem';
import Icon from '../Icon';
import styles from './styles';

function Item(props) {
  const {colors} = useTheme();
  const {
    category,
    handleClick,
    handleSelect,
    isSelect,
    isShowSub,
    rightTextInput,
  } = props;
  return (
    <ListItem
      title={category.name}
      bottomDivider
      leftElement={
        <Icon
          name={isSelect ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={22}
          iconStyle={[styles.icon, isSelect && {color: 'blue'}]}
          activeOpacity={1}
          underlayColor={'transparent'}
          onPress={() => handleSelect(category)}
        />
      }
      rightElement={
        isSelect
          ? rightTextInput
            ? rightTextInput
            : category?.categories?.length > 0 && (
                <Icon
                  name={isShowSub ? 'chevron-down' : 'chevron-right'}
                  size={22}
                  iconStyle={styles.icon}
                  activeOpacity={1}
                  underlayColor={'transparent'}
                />
              )
          : null
      }
      titleStyle={[styles.itemTitle, isSelect && {color: colors.primary}]}
      onPress={category?.categories?.length ? handleClick : null}
      type="underline"
      small
    />
  );
}

function ItemCategory(props) {
  const {category, selectCategory, handleSelect, rightTextInput} = props;
  const [isShowSub, setIsShowSub] = React.useState(false);
  const isSelect = selectCategory.find((a) => a.id === category.id);
  return (
    <>
      <Item
        category={category}
        handleClick={() => {
          setIsShowSub(!isShowSub);
        }}
        handleSelect={handleSelect}
        isSelect={isSelect}
        isShowSub={isShowSub}
        rightTextInput={rightTextInput}
      />
      {category?.categories?.length > 0 && isShowSub && (
        <View style={styles.viewSubs}>
          {category.categories.map((subC) => (
            <ItemCategory
              key={subC.id}
              category={subC}
              selectCategory={selectCategory}
              handleSelect={handleSelect}
            />
          ))}
        </View>
      )}
    </>
  );
}

export default ItemCategory;

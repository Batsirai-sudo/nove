import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {ScrollView, View, TextInput} from 'react-native';
import Button from '../SaveButton';
import Modal from '../Modal';
import isEqual from 'lodash/isEqual';
import concat from 'lodash/concat';
import filter from 'lodash/filter';
import ItemCategories from '../ItemCategories';
import styles from './styles';

class FilterProductComponent extends React.Component {
  constructor(props) {
    super(props);
    const {selectCategory} = props;
    this.state = {
      selectCategory,
      value: 1,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const {visitModal, selectCategory} = this.props;

    if (
      visitModal !== prevProps.visitModal &&
      !isEqual(selectCategory, this.state.selectCategory)
    ) {
      this.setState({
        selectCategory,
      });
    }
  }

  handleSelect = (category) => {
    const {selectCategory} = this.state;

    const findSelect = selectCategory.find((s) => s.id === category.id);
    if (findSelect) {
      this.setState({
        selectCategory: filter(selectCategory, (s) => s.id !== category.id),
      });
    } else {
      this.setState({
        selectCategory: concat(selectCategory, {
          id: category.id,
          name: category.name,
          quantity: category.quantity,
        }),
      });
    }
  };

  onChangeText = (value, id) => {
    const {selectCategory} = this.state;

    const findSelect = selectCategory.find((s, index) => {
      if (s.id === id) {
        s.quantity = value;
      }
      return s.id === id;
    });
  };

  render() {
    const {
      visitModal,
      setModalVisible,
      categories,
      clickFilter,
      children,
    } = this.props;
    const {selectCategory} = this.state;

    return (
      <Modal
        visible={visitModal}
        setModalVisible={setModalVisible}
        maxRatio={0.85}>
        <View style={{marginHorizontal: 20}}>{children}</View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {categories.map((category) => (
              <ItemCategories
                key={category.id}
                category={category}
                selectCategory={selectCategory}
                handleSelect={this.handleSelect}
                rightTextInput={
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <TouchableOpacity
                      onPress={() => {
                        this.increment(category.id);
                      }}>
                      <AntDesign
                        name="pluscircle"
                        size={20}
                        color="blue"
                        style={{left: -5}}
                      />
                    </TouchableOpacity> */}
                    <TextInput
                      key={category.id}
                      style={{
                        backgroundColor: '#E9E9E9',
                        height: 40,
                        width: 50,
                        borderRadius: 5,
                        paddingLeft: 10,
                      }}
                      value={category.quantity}
                      onChangeText={(value) => {
                        this.onChangeText(value, category.id);
                      }}
                    />
                    {/* <TouchableOpacity
                      onPress={() => {
                        this.decrement();
                      }}>
                      <AntDesign
                        name="minuscircle"
                        size={20}
                        color="red"
                        style={{right: -5}}
                      />
                    </TouchableOpacity> */}
                  </View>
                }
              />
            ))}
          </View>
        </ScrollView>
        <Button
          title={'Apply'}
          onPress={() => {
            clickFilter(selectCategory);
            setModalVisible(false);
          }}
          containerStyle={styles.button}
        />
      </Modal>
    );
  }
}

FilterProductComponent.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  categories: PropTypes.array,
  selectCategory: PropTypes.array,
  clickFilter: PropTypes.func,
};
FilterProductComponent.defaultProps = {
  visitModal: false,
  isOpen: false,
  categories: [],
  selectCategory: [],
};
export default function CreateOrderComponent(props) {
  const theme = useTheme();
  return <FilterProductComponent {...props} theme={theme} />;
}

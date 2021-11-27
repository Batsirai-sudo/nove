import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {ScrollView, View} from 'react-native';
import Button from '../SaveButton';
import Modal from '../Modal';
import isEqual from 'lodash/isEqual';
import concat from 'lodash/concat';
import filter from 'lodash/filter';
import ItemCategories from '../ItemCategories';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

class FilterCategories extends React.Component {
  constructor(props) {
    super(props);
    const {selectCategory} = props;
    this.state = {
      selectCategory,
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
          // slug: category.slug,
        }),
      });
    }
  };
  render() {
    const {visitModal, setModalVisible, categories, clickFilter} = this.props;
    const {selectCategory} = this.state;
    return (
      <Modal
        visible={visitModal}
        setModalVisible={setModalVisible}
        maxRatio={0.85}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {categories.map((category) => (
              <ItemCategories
                key={category.id}
                category={category}
                selectCategory={selectCategory}
                handleSelect={this.handleSelect}
              />
            ))}
          </View>
        </ScrollView>
        <LinearGradient
          style={{
            // height: 45,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 10,
            marginHorizontal: 30,

            // justifyContent: 'center',
            // alignItems: 'center',
          }}
          colors={['#F05F3E', '#ED3269']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}>
          <Button
            title="Apply"
            titleStyle={{textAlign: 'center'}}
            size="small"
            buttonStyle={{
              backgroundColor: 'transparent',
              // width: '100%',
              // alignItems: 'center',
              // justifyContent: 'center',
            }}
            onPress={() => {
              clickFilter(selectCategory);
              setModalVisible(false);
            }}
            // containerStyle={styles.button}
          />
        </LinearGradient>
      </Modal>
    );
  }
}

FilterCategories.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  categories: PropTypes.array,
  selectCategory: PropTypes.array,
  clickFilter: PropTypes.func,
};
FilterCategories.defaultProps = {
  visitModal: false,
  isOpen: false,
  categories: [],
  selectCategory: [],
};
export default function FilterProductComponent(props) {
  const theme = useTheme();
  return <FilterCategories {...props} theme={theme} />;
}

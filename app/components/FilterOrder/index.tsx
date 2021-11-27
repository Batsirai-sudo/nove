import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {ScrollView, View} from 'react-native';
import Button from '../SaveButton';
import Modal from '../Modal';
import ListItem from '../ListItem';
import Icon from '../Icon';
import styles from './styles';

class FilterOrder extends React.Component {
  constructor(props) {
    super(props);
    const {valueSelect} = props;
    this.state = {
      valueSelect: valueSelect,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const {visitModal, valueSelect} = this.props;
    if (
      visitModal !== prevProps.visitModal &&
      valueSelect !== this.state.valueSelect
    ) {
      this.changeSelect(valueSelect);
    }
  }

  changeSelect = (value) => {
    this.setState({
      valueSelect: value,
    });
  };
  render() {
    const {
      visitModal,
      setModalVisible,
      filters,
      clickFilter,
      theme,
    } = this.props;
    const {valueSelect} = this.state;
    const {colors} = theme;
    return (
      <Modal
        visible={visitModal}
        setModalVisible={setModalVisible}
        maxRatio={0.85}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {filters.map((filter) => (
              <ListItem
                key={filter.status}
                title={filter.name}
                bottomDivider
                rightElement={
                  filter.status === valueSelect && (
                    <Icon name="check" color={colors.primary} />
                  )
                }
                titleStyle={[
                  styles.itemTitle,
                  filter.status === valueSelect && {color: colors.primary},
                ]}
                onPress={() => this.changeSelect(filter.status)}
              />
            ))}
            <Button
              title={'Apply Changes'}
              onPress={() => clickFilter(valueSelect)}
              containerStyle={styles.button}
            />
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

FilterOrder.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  filters: PropTypes.array,
  valueSelect: PropTypes.string,
  clickFilter: PropTypes.func,
};
FilterOrder.defaultProps = {
  visitModal: false,
  filters: [],
};
export default function FilterProductComponent(props) {
  const theme = useTheme();
  return <FilterOrder {...props} theme={theme} />;
}

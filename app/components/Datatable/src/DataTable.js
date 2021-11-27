import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes, FlatList} from 'react-native';

import {keyExtractor} from '@helpers';

export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }

  shouldComponentUpdate(props) {
    return this.props.dataSource !== props.dataSource;
  }

  render() {
    const {
      style,
      listViewStyle,
      renderHeader,
      dataSource,
      refCallback,
      renderRow,
      ...listViewProps
    } = this.props;

    return (
      <View style={[defaultStyles.verticalContainer, style]}>
        {typeof renderHeader === 'function' && renderHeader()}
        {/* <ListView
          {...listViewProps}
          ref={refCallback}
          style={[defaultStyles.listview, listViewStyle]}
          dataSource={dataSource}
          renderRow={renderRow}
        /> */}
        <FlatList
          contentContainerStyle={[defaultStyles.listview, listViewStyle]}
          data={dataSource}
          keyExtractor={keyExtractor}
          renderItem={renderRow}
          // enableEmptySections
          ListFooterComponent={() => <View style={{height: 400}} />}
        />
      </View>
    );
  }
}

DataTable.propTypes = {
  style: ViewPropTypes.style,
  listViewStyle: PropTypes.number,
  refCallback: PropTypes.func,
  renderHeader: PropTypes.func,
  // dataSource: PropTypes.array.isRequired,
  // renderRow: PropTypes.func.isRequired,
};
DataTable.defaultProps = {
  showsVerticalScrollIndicator: true,
  scrollRenderAheadDistance: 5000,
};

const defaultStyles = StyleSheet.create({
  verticalContainer: {},
  listView: {
    // flex: 1,
  },
});

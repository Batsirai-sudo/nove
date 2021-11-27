import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import styles, {_container} from './Timeline.style';
import Item from './components/Item/Item';

const Timeline = (props) => {
  const {data, backgroundColor, onPress} = props;
  renderItem = (list) => {
    const {item, index} = list;
    const isLastMember = index === data.length - 1;
    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <Item
          {...props}
          data={item}
          list={item.data}
          isLastMember={isLastMember}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={_container(backgroundColor)}>
      <FlatList
        data={data}
        // style={styles.listStyle}
        renderItem={renderItem.bind(this)}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        {...props}
      />
    </SafeAreaView>
  );
};

Timeline.propTypes = {
  data: PropTypes.array,
  backgroundColor: PropTypes.string,
};

Timeline.defaultProps = {
  data: [1, 2, 3, 4, 5],
  backgroundColor: '#fdfdfd',
};

export default Timeline;

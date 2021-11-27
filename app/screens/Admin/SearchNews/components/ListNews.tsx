import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import keyExtractor from 'ultis/keyExtractor';
import NewsItem from 'screens/SearchNews/components/NewsItem';
import FONTS from 'ultis/fonts';

const data = [
  {
    imgEvent: require('assets/SearchNews/Envy.png'),
    event: 'Envy apple makes\n' + ' New York Fashion\n' + ' Week debut',
    time: 'MAR. 10, 2018',
  },
  {
    imgEvent: require('assets/SearchNews/Paris.png'),
    event: 'A Whirlwind Paris\n' + ' Fashion Week with\n' + ' Virgil Abloh',
    time: 'MAR. 24, 2018',
  },
  {
    imgEvent: require('assets/SearchNews/Fashion.png'),
    event: 'Fashion Parties With\n' + ' the French President',
    time: 'MAR. 20, 2018',
  },
  {
    imgEvent: require('assets/SearchNews/NY.png'),
    event: 'NY Fashion Week\n' + 'creator Fern Mallis\n' + ' speaks at next...',
    time: 'MAR. 15, 2018',
  },
  {
    imgEvent: require('assets/SearchNews/Sho.png'),
    event: 'The 1968 Fashion\n' + ' Show, the History\n' + ' Lesson Melania…',
    time: 'MAR. 7, 2018',
  },
];
interface Props {
  textSearch: string;
}
const ListNews = memo((props: Props) => {
  const renderItem = useCallback(({item}) => {
    const {imgEvent, event, time} = item;
    return <NewsItem imgEvent={imgEvent} event={event} time={time} />;
  }, []);
  const renderHeader = useCallback(
    () => (
      <Text style={styles.txtHeader}>
        20 results for “{props.textSearch}” in New York
      </Text>
    ),
    [props.textSearch],
  );
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={renderHeader}
    />
  );
});

export default ListNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtHeader: {
    marginTop: 24,
    marginLeft: 24,
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: '#353B48',
  },
});

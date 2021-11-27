import React, {useState, memo, useCallback} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
  IconRadio,
  Errors,
  Loader,
  TextComponent,
  SearchBar,
  HotKeys,
  ActivityIndicator,
  ShimmerItemNotification,
  NotificationEvent,
  NotificationMessage,
  FilterProduct2,
  ShimmerLoading,
} from '@components';
import styles from './styles';
import {keyExtractor} from '@helpers';

export enum TYPE_NOTIFICATION {
  MESSAGE,
  EVENT,
}
const data = [
  {
    typeNotification: TYPE_NOTIFICATION.MESSAGE,
    avatar: require('./Notification/Sandra.png'),
    userName: 'Sandra Minalo',
    message: '"Hi, My name\'s Sandra Minalo. Can I..."',
    time: '2 HOURS AGO',
    un_Read: true,
  },
  {
    typeNotification: TYPE_NOTIFICATION.MESSAGE,
    avatar: require('./Notification/Linnie.png'),
    userName: 'Linnie Lyons',
    message: '"What do you do for a living?"',
    time: 'SAT, 18 FEB 13:00',
    un_Read: false,
  },
  {
    typeNotification: TYPE_NOTIFICATION.EVENT,
    avatar: require('./Notification/Linnie.png'),
    title: 'You win ticket to the NY premiere of Star',
    imageEvent: require('./Notification/Event.png'),
    event: '"Bottled Art" Wine\n' + 'Painting Nigh',
    time: 'SAT, 18 FEB 13:00',
    un_Read: true,
  },
  {
    typeNotification: TYPE_NOTIFICATION.MESSAGE,
    avatar: require('./Notification/Olga.png'),
    userName: 'Olga Moss',
    message: '"Hi, My name\'s Olga Moss. Nice to meet…”',
    time: '2 HOURS AGO',
    un_Read: false,
  },
  {
    typeNotification: TYPE_NOTIFICATION.EVENT,
    avatar: require('./Notification/Linnie.png'),
    title: 'You win ticket',
    imageEvent: require('./Notification/WWE.png'),
    event: 'Win 2 tickets to WWE @\n' + ' MSG',
    time: 'SUN, MAR. 25  -  4:30 PM EST',
    un_Read: false,
  },
  {
    typeNotification: TYPE_NOTIFICATION.EVENT,
    avatar: require('./Notification/Linnie.png'),
    title: 'You win ticket',
    imageEvent: require('./Notification/Art.png'),
    event: '"Bottled Art" Wine\n' + ' Painting Night',
    time: 'SUN, MAR. 25  -  4:30 PM EST',
    un_Read: true,
  },
  {
    typeNotification: TYPE_NOTIFICATION.MESSAGE,
    avatar: require('./Notification/Linnie.png'),
    userName: 'Linnie Lyons',
    message: '"What do you do for a living?"',
    time: 'SAT, 18 FEB 13:00',
    un_Read: false,
  },
];

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const renderItem = useCallback(({item}) => {
    const {
      typeNotification,
      avatar,
      userName,
      message,
      time,
      un_Read,
      title,
      imageEvent,
      event,
    } = item;
    return typeNotification === 0 ? (
      <NotificationMessage
        avatar={avatar}
        userName={userName}
        message={message}
        time={time}
        un_Read={un_Read}
      />
    ) : (
      <NotificationEvent
        avatar={avatar}
        title={title}
        imageEvent={imageEvent}
        event={event}
        time={time}
        un_Read={un_Read}
      />
    );
  }, []);
  return (
    <View>
      {loading ? (
        <ShimmerLoading
          Component={ShimmerItemNotification}
          style={{marginHorizontal: 25}}
          height={110}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default memo(Notifications);

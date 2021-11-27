import React, {memo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
interface Props {
  avatar: any;
  title: any;
  imageEvent: any;
  event: any;
  time: string;
  un_Read: boolean;
}

export const NotificationEvent = memo((props: Props) => {
  const backGroundColor = {backgroundColor: props.un_Read ? '#FDEECC' : '#FFF'};
  // '#F7F8FA'
  return (
    <TouchableOpacity style={[styles.notificationEvent, backGroundColor]}>
      <Image source={props.avatar} />
      <View style={styles.content}>
        <Text style={styles.txtTitle}>{props.title}</Text>
        <View style={styles.eventStyle}>
          <Image source={props.imageEvent} />
          <View style={styles.description}>
            <Text medium style={styles.txtEvent}>
              {props.event}
            </Text>
            <Text style={styles.txtTime}>{props.time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

interface NotificationMessageProps {
  avatar: any;
  userName: any;
  message: any;
  time: string;
  un_Read: boolean;
}

export const NotificationMessage = memo((props: NotificationMessageProps) => {
  const backGroundColor = {backgroundColor: props.un_Read ? '#F7F8FA' : '#FFF'};

  return (
    <TouchableOpacity style={[styles.notificationMessage, backGroundColor]}>
      <Image source={props.avatar} />
      <View style={styles.content}>
        <Text medium style={styles.txtUserName}>
          {props.userName} <Text style={styles.txtSend}> send you message</Text>
        </Text>
        <Text style={styles.txtMessage}>{props.message}</Text>
        <Text style={styles.txtTime}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
});

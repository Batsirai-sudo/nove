import React, {memo, useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {dimensions} from '@utils';
import {ROUTES} from '@config';
import Text from '../Text';
import moment from 'moment';
const {height_screen, width_screen} = dimensions;

interface Props {
  image: any;
  nameUser: string;
  numberMessage: number;
  message: string;
  time: any;
  pressChat: any;
  id: any;
}

const InboxItem = memo((props: Props) => {
  const backGroundColor = {
    backgroundColor: props.numberMessage !== 0 ? '#F7F8FA' : '#FFF',
  };
  const navigation = useNavigation();
  const onChat = async (id) => {
    await props.pressChat(id, props.nameUser);
    navigation.navigate(ROUTES.Inbox);
  };
  return (
    <TouchableOpacity
      onPress={() => onChat(props.id)}
      style={[styles.inboxItem, backGroundColor]}>
      <Image style={styles.avatar} source={{uri: props.image}} />
      <View style={styles.flex}>
        <View style={styles.content}>
          <View style={{flexDirection: 'row'}}>
            <Text numberOfLines={1} semibold style={styles.txtNameUser}>
              {props.nameUser}
            </Text>
            {props.numberMessage !== 0 ? (
              <View
                style={{
                  backgroundColor: '#ED3269',
                  borderRadius: 15,
                  height: 15,
                  width: 15,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  left: 10,
                }}>
                <Text
                  semibold
                  style={{fontSize: 14, color: '#ffffff', top: -1}}>
                  {props.numberMessage}
                </Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.txtTime}>
            {moment(props.time.toDate()).format('MMM Do,YYYY')}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={{
            ...styles.txtMessage,
            // color: props.numberMessage > 0 ? '#ED3269' : '#000',
          }}>
          {props.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
export default InboxItem;

const styles = StyleSheet.create({
  inboxItem: {
    height: 0.098 * height_screen,
    flexDirection: 'row',
    paddingHorizontal: 0.064 * width_screen,
    alignItems: 'center',
  },
  avatar: {
    marginRight: 0.033 * width_screen,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  txtNameUser: {
    fontSize: 14,
    color: '#353B48',
    width: 140,
  },
  txtNumberMessage: {
    fontSize: 14,
    color: '#353B48',
  },
  txtTime: {
    fontSize: 11,
    color: '#7F8FA6',
  },
  txtMessage: {
    fontSize: 14,
    color: '#353B48',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0.01 * height_screen,
  },
  flex: {
    flex: 1,
  },
  flexDirection: {
    flexDirection: 'row',
  },
});

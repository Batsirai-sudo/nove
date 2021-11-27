import React, {memo, useCallback, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Text from '../Text';
import {ROUTES} from '@config';
import styles from './styles';
import moment from 'moment';
interface Props {
  image: any;
  name: string;
  numberFollower: string;
  date: any;
  getShopCurrentUser: any;
  data: any;
  isAllUsers: any;
  mobileNumber: any;
  email: any;
  account: any;
}

const UserItem = memo((props: Props) => {
  const {navigate} = useNavigation();

  const [follow, setFollow] = useState(false);
  const onPress = useCallback(() => {
    setFollow(!follow);
  }, [follow]);
  const onPeopleProfile = useCallback(() => {
    props.getShopCurrentUser(props.data);
    navigate(ROUTES.ShopUsersDetail);
  }, []);
  return props.isAllUsers ? (
    <TouchableOpacity onPress={onPeopleProfile} style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: `https://ui-avatars.com/api/?name=${props.name}&background=EDA2A5&color=fff`,
        }}

        // source={{
        //   uri:
        //     'https://ui-avatars.com/api/?name=John+Doe&?background=0D8ABC&color=fff',
        // }}
      />
      <View style={styles.txtField}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text semibold style={styles.txtName}>
            {props.name}
          </Text>
          <View
            style={{
              backgroundColor: '#65D006',
              right: 10,
              top: 13,
              width: 111,
              height: 20,
            }}>
            <Text
              style={{
                color: '#fff',

                fontSize: 11,
              }}>
              Active
            </Text>
          </View>
        </View>
        <View style={{}}>
          <Text style={styles.txtNumberFollower}>{props.mobileNumber}</Text>
          <Text
            light
            style={{
              fontSize: 12,
              color: '#7F8FA6',
            }}>
            {props.email}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPeopleProfile} style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: `https://ui-avatars.com/api/?name=${props.name.charAt(0)}`,
        }}
        //&background=EDA2A5&color=fff
        //&background=random
      />
      <View style={styles.txtField}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text semibold style={styles.txtName}>
            {props.name}
          </Text>
          <View
            style={{
              backgroundColor: '#65D006',
              right: 10,
              top: 13,
              width: 80,
              height: 20,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              semibold
              style={{
                color: '#fff',

                fontSize: 11,
              }}>
              {props.account}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text medium style={styles.txtNumberFollower}>
            {props.email}
          </Text>
          {/* <Text
            light
            style={{
              fontSize: 12,
              color: '#000',
            }}>
            {moment(props.date.toDate()).format('HH:mm, ddd Do MMM YYYY')}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default UserItem;

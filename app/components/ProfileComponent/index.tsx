import React, {memo, useCallback} from 'react';
import {Animated, Image, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import styles from './styles';
import {Images} from '@config';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Fontisto';
import {Colors} from '@utils';
import Text from '../Text';
interface Props {
  coverImage: any;
  avatar: any;
  avatarUrl: any;
  userName: string;
  address: string;
  city: string;
  province: string;
  country: string;
  numberMessage: number;
  rewards: number;
  followers: string;
  following: number;
  interested: string[];
  notification: number;
  providerId: string;
  email: string;
  settingsText: string;
  settingsIcon: any;
  isAdmin: any;
}

const ProfileComponent = memo((props: Props) => {
  const navigation = useNavigation();
  const onInbox = useCallback(() => {
    // props.isAdmin ? null : navigation.navigate(ROUTES.Inbox);
  }, [navigation]);
  const onSettings = useCallback(() => {
    navigation.navigate(ROUTES.Settings);
  }, [navigation]);
  const onFollower = useCallback(() => {
    navigation.navigate(ROUTES.TabFollowers);
  }, [navigation]);
  const onFollowing = useCallback(() => {
    navigation.navigate(ROUTES.TabFollowers);
  }, [navigation]);
  const spin = new Animated.Value(0);
  const rotateInterPolate = spin.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  const startAnimation = useCallback(() => {
    Animated.timing(spin, {
      toValue: 180,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [spin]);
  const animatedStyles = {transform: [{rotate: rotateInterPolate}]};
  return (
    <>
      <Image style={styles.coverImage} source={props.coverImage} />
      <LinearGradient
        style={styles.linear}
        colors={['rgba(1, 1, 1, 0.0001)', '#000']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
      />

      <View style={styles.mask}>
        <Image
          style={styles.img}
          source={{uri: 'https://ui-avatars.com/api/?name=John+Doe'}}
        />
        <Text medium style={styles.userName}>
          {props.userName}
        </Text>
        <Text style={styles.address}>{props.address}</Text>
        <Text style={styles.address}>{props.city}</Text>
        <Text style={styles.address}>{props.province}</Text>
        <Text style={styles.address}>{props.country}</Text>
        <View style={styles.btn}>
          <TouchableOpacity onPress={onInbox} style={styles.inbox}>
            <Text medium style={styles.txtInbox}>
              Activities
            </Text>
            <View style={styles.numberMessage}>
              <Text medium style={styles.txtNumberMessage}>
                {props.numberMessage}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSettings} style={styles.rewards}>
            {props.settingsIcon}
            <Text medium style={styles.txtRewards}>
              {' '}
              {props.settingsText}
            </Text>
          </TouchableOpacity>
        </View>
        <View medium style={styles.followStyle}>
          <TouchableOpacity onPress={onFollower}>
            <Text style={styles.followers}>
              <Icon3
                style={{marginLeft: 10}}
                size={20}
                color={Colors.BLACK}
                name="phone"
              />

              <Text style={styles.txtFollow}> {props.followers}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onFollowing}>
            <Text medium style={styles.txtNumberFollow}>
              <Icon
                style={{marginLeft: 10}}
                size={20}
                color={Colors.BLACK}
                name="shopping-store"
              />
              <Text style={styles.txtFollow}> {props.following}</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.interested}>{props.email}</Text>
        <View style={styles.tagStyle}>
          {props.interested.map((item) => (
            <Text style={styles.txtInterested}>{item}</Text>
          ))}
        </View>
        <TouchableOpacity onPress={startAnimation} style={styles.arrDown}>
          <Animated.View style={animatedStyles}>
            <Image
              style={styles.googleFacebookLogo}
              source={
                props.providerId === 'google.com'
                  ? Images.google
                  : props.providerId === 'facebook.com'
                  ? Images.facebook
                  : null
              }
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
});
export default ProfileComponent;

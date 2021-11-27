import React, {memo, useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import {dimensions} from '@utils';
import {SvgArrDown} from '@svg-components';
import {useTheme} from '@react-navigation/native';
import Icon from '../Icon';
import Text from '../Text';
import moment from 'moment';
import {Images} from '@config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width_screen, height_screen} = dimensions;

interface Props {
  coverImage: any;
  avatar: any;
  userName: string;
  address: string;
  city: string;
  country: string;
  account: string;
  userCategory: string;
  province: string;
  email: string;
  registrationDate: any;
  shopsManaging: any;
  mobileNumber: any;
  onOpenPermissions: any;
  permissions: any;
  providerId: any;
  uid: any;
  postalCode: any;
  getCurrentChatID: any;
  dateRef: any;
  interested: string[];
}

const HeaderPeopleProfile = memo((props: Props) => {
  const {colors} = useTheme();

  const navigation = useNavigation();
  const onChat = useCallback(() => {
    props.getCurrentChatID(props.uid);
    navigation.navigate(ROUTES.Inbox);
  }, [navigation]);
  const Permissions = useCallback(() => {
    props.onOpenPermissions();
  }, []);
  const onFollowing = useCallback(() => {
    navigation.navigate(ROUTES.TabFollowers);
  }, [navigation]);
  const data = {
    category: [
      {name: 'Stock Taking', value: '52'},
      {name: 'Mechandise', value: '54'},
      {name: 'Stock Taking', value: '52'},
      {name: 'Mechandise', value: '54'},
      {name: 'Stock Taking', value: '52'},
      {name: 'Mechandise', value: '54'},
      {name: 'Stock Taking', value: '52'},
      {name: 'Mechandise', value: '54'},
    ],
  };
  return (
    <View style={styles.headerProfile}>
      <Image
        blurRadius={10}
        style={styles.coverImage}
        source={require('./img.png')}
      />
      <LinearGradient
        style={styles.linear}
        colors={['#000', 'rgba(1, 1, 1, 0.0001)']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
      />
      <View style={styles.mask}>
        <Image
          style={styles.img}
          source={{uri: 'https://ui-avatars.com/api/?name=John+Doe'}}
        />
        <Text semibold style={styles.userName}>
          {props.userName}
        </Text>
        <Text style={styles.address}>{props.address}</Text>
        <Text style={styles.address}>{props.city}</Text>
        <Text style={styles.address}>{props.country}</Text>
        <Text style={styles.address}>{props.province}</Text>
        <Text style={styles.address}>{props.postalCode}</Text>
        <View style={styles.btn}>
          <TouchableOpacity onPress={onChat} style={styles.inbox}>
            <Text medium style={styles.txtInbox}>
              MESSAGE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Permissions} style={styles.follow}>
            <Text medium style={styles.txtFollow}>
              PERMISSIONS
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.interested}>Permissions :</Text>

        <View style={styles.followStyle}>
          <View
            style={[
              {backgroundColor: colors.secondaryCard},
              {
                flexDirection: 'row',
                flexWrap: 'wrap',
                borderRadius: 8,
              },
            ]}>
            {props.permissions.map((x, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  {backgroundColor: colors.background},
                  {
                    marginHorizontal: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    paddingVertical: 4,
                    borderRadius: 8,
                    marginTop: 10,
                    marginBottom: 10,
                  },
                ]}
                // onPress={() => deleteCate(category)}
              >
                <Text key={i}>{x.name}</Text>
                <Icon
                  name="close-circle"
                  size={14}
                  iconStyle={{marginLeft: 10}}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* <TouchableOpacity onPress={onFollower}>
            <Text style={styles.followers}>
              {props.followers}
              <Text style={styles.txtFollower}> followers</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onFollowing}>
            <Text style={styles.txtNumberFollow}>
              {props.following}
              <Text style={styles.txtFollower}> following</Text>
            </Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.row}>
          <Text style={styles.interested}>Email :</Text>
          <View style={styles.tagStyle}>
            <Text style={styles.txtInterested}> {props.email}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.interested}>Account linked :</Text>
          <View style={[styles.tagStyle, {justifyContent: 'center'}]}>
            <Image
              style={styles.googleFacebookLogo}
              source={
                props.providerId === 'google.com'
                  ? Images.google
                  : props.providerId === 'google.com'
                  ? Images.facebook
                  : ''
              }
            />
            {/* <Text style={styles.txtInterested}>{props.mobileNumber}</Text> */}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.interested}>Mobile Number :</Text>
          <View style={styles.tagStyle}>
            <Text style={styles.txtInterested}>{props.mobileNumber}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.interested}>Registration Date :</Text>
          <View style={styles.tagStyle}>
            <Text style={styles.txtInterested}>
              {' '}
              {moment(props.registrationDate.toDate()).format(
                'HH:mm a, ddd Do MMM YYYY',
              )}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.interested}>Account Type :</Text>
          <View style={styles.tagStyle}>
            <Text style={styles.txtInterested}>{props.account}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.interested}>Category :</Text>
          <View style={styles.tagStyle}>
            <Text style={styles.txtInterested}>{props.userCategory}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.interested}>Number of Shops Managing :</Text>
          <View style={styles.tagStyle}>
            <Text style={styles.txtInterested}>{props.shopsManaging}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.interested}>User ID :</Text>
          <View style={styles.tagStyle}>
            <Text style={styles.txtInterested}>{props.uid}</Text>
          </View>
        </View>
      </View>
      <View style={styles.activity}>
        <Text style={styles.txtActivity}>ACTIVITY</Text>
        <TouchableOpacity
          onPress={() => props.dateRef.current?.open()}
          style={{
            position: 'absolute',
            right: 20,
            // backgroundColor: 'blue',
            width: 50,
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="tune-vertical"
            size={24}
            color="#ED3269"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default HeaderPeopleProfile;

const styles = StyleSheet.create({
  row: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerProfile: {
    backgroundColor: '#FFF',
  },
  coverImage: {
    width: width_screen,
    height: 0.31 * height_screen,
    marginTop: '-0.1%',
  },
  linear: {
    width: width_screen,
    height: 0.31 * height_screen,
    position: 'absolute',
    opacity: 0.2,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 0, height: 4},
  },
  mask: {
    width: 0.87 * width_screen,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginTop: -0.06 * height_screen,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {width: 5, height: 10},
  },
  img: {
    width: 104,
    height: 104,
    borderRadius: 100,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    marginTop: -0.06 * height_screen,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  userName: {
    fontSize: 16,
    color: '#353B48',
    marginTop: 16,
    marginBottom: 7,
    alignSelf: 'center',
  },
  address: {
    fontSize: 14,
    color: '#7F8FA6',
    alignSelf: 'center',
  },
  inbox: {
    width: 110,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#7F8FA6',
    borderRadius: 100,
  },
  rewards: {
    width: 142,
    height: 40,
    backgroundColor: '#ED3269',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    height: 0.1 * height_screen,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F8FA',
  },
  txtInbox: {
    fontSize: 12,
    color: '#7F8FA6',
  },
  googleFacebookLogo: {
    height: 40,
    width: 40,
  },
  numberMessage: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#ED3269',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 6,
    top: -8,
  },
  txtNumberMessage: {
    fontSize: 12,
    color: '#FFF',
  },
  followStyle: {
    marginTop: 30,
    flexDirection: 'row',
    // marginLeft: 30,
    fontSize: 14,
    color: '#353B48',
    justifyContent: 'center',
  },
  followers: {
    marginRight: 40,
  },
  txtFollower: {
    fontSize: 12,
    color: '#7F8FA6',
  },
  txtNumberFollow: {
    fontSize: 14,
    color: '#353B48',
  },
  interested: {
    fontSize: 12,
    color: '#7F8FA6',
    marginLeft: 0,
  },
  tagStyle: {
    flexDirection: 'row',
    marginLeft: 30,
    // marginTop: 8,
  },
  txtInterested: {
    fontSize: 11,
    color: '#353B48',
    marginRight: 8,
  },
  arrDown: {
    alignSelf: 'flex-end',
    marginRight: 24,
    bottom: 24,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  follow: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ED3269',
    borderRadius: 100,
  },
  txtFollow: {
    fontSize: 12,
    color: '#ED3269',
  },
  activity: {
    width: width_screen,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ED3269',
  },
  txtActivity: {
    fontSize: 14,
    color: '#ED3269',
  },
});

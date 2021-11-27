import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  ProfileComponent,
  TextComponent,
  Header,
  ActivityItem,
} from '@components';
import {Images} from '@config';
import {useSelector} from 'react-redux';
import {SvgSetting} from '@svg-components';
import {dimensions, FONTS} from '@utils';
import {AdminContext} from '@context';

const {height_screen, width_screen} = dimensions;

const item = {
  avatar: Images.avatar,
  userName: 'Hieu Le',
  address: 'Washington, DC',
  followers: '1.5M',
  following: 25,
  numberMessage: 2,
  reward: 15,
  interested: ['# Account linked to', '#expo...'],
  notification: 1,
};
const Profile = (props) => {
  const user = useSelector((state) => state.auth.user);
  const {gettActivities} = useContext(AdminContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gettActivities(user.uid).then((val) => {
      const firestoreData = [];
      val.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
        });
      });
      setData(firestoreData);
      setLoading(false);
    });
  }, []);

  return (
    <View>
      <Header></Header>
      <View style={styles.container}>
        <ScrollView>
          <ProfileComponent
            coverImage={Images.profile_cover}
            avatar={user.photoURL}
            isAdmin={true}
            userName={user.fullName}
            // address={`${user.streetAddress} ${user.city} ${user.country}`}
            numberMessage={item.numberMessage}
            settingsIcon={<SvgSetting />}
            settingsText="Settings"
            interested={[
              '',
              '',
              '# Account linked to',
              user.providerId === 'google.com' ? '~~GOOGLE' : '~~FACEBOOK',
            ]}
            followers={user.mobileNumber}
            // following={user.storeDetails.storeName}
            notification={item.notification}
            providerId={user.providerId}
            email={user.email}
          />
          <View style={styles.activity}>
            <Text style={styles.txtActivity}>ACTIVITY</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#000" style={{top: 50}} />
          ) : (
            data.map((item, index) => {
              const {activity, date, title, type} = item;
              return (
                <ActivityItem
                  activityTab={true}
                  activity={activity}
                  date={date}
                  title={title}
                  type={type}
                  key={index}
                />
              );
            })
          )}

          <View style={{height: 200}} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFF',
    height: height_screen,
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
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#ED3269',
  },
});

import React, {memo, useState, useContext} from 'react';
import {View, ScrollView} from 'react-native';
import {TextComponent, Dialog, CustomProgressBar, Errors} from '@components';
import Icon from 'react-native-vector-icons/Fontisto';
import {SettingsItem} from '@components';
import styles from './styles';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ROUTES} from '@config';
import {useNavigation} from '@react-navigation/native';

import {
  SvgUpdates,
  SvgSendFeedback,
  SvgTheme,
  SvgLocation,
  SvgDarkTheme,
  SvgEnableNotification,
  SvgMobile,
  SvgEmail,
  SvgBack,
  SvgProfile,
} from '@svg-components';
const icoSize = 30;
const icoColor = '#353B48';
import {AdminContext} from '../../../context/adminContext';

const Settings = memo(() => {
  const [modalVisible, setModalVisible] = useState(false);
  const {logout} = useContext(AdminContext);
  const [modal, setModal] = useState(false);

  const {navigate} = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Dialog
        content="Hold on!', 'Are you sure you want to LogOut ?"
        title="Logout"
        firstButtonOnPress={() => setModalVisible(false)}
        secondButtonOnPress={async () => {
          setModalVisible(false);
          setModal(true);
          try {
            await logout();
            setModal(false);
            navigate(ROUTES.Walkthrough);
          } catch (err) {
            setModal(false);
            Errors({
              message: 'Changes Successfull',
              description: err.message,
              autoHide: true,
              position: 'center',
            });
          }
        }}
        secondButtontext="Yes"
        modalVisible={modalVisible}
      />
      <CustomProgressBar loaderText="Loging Out" loader={3} visible={modal} />

      <View style={styles.topView} />
      <SettingsItem
        svgItem={<SvgEmail />}
        title={'My Email'}
        txt={'lehieuds@gmail.com'}
        svgBack={<SvgBack />}
        onPress={() => {
          navigate(ROUTES.EditSettings, {type: 'email'});
        }}
      />
      <SettingsItem
        svgItem={<Icon size={icoSize} color={icoColor} name="shopping-store" />}
        title={'Change Shop Information'}
        txt={'Mlambo Shop'}
        svgBack={<SvgBack />}
        onPress={() => {
          navigate(ROUTES.EditSettings, {type: 'shop'});
        }}
      />
      <SettingsItem
        svgItem={<Icon3 size={20} color={icoColor} name="phone" />}
        title={'Change Phone Number'}
        txt={'London'}
        svgBack={<SvgBack />}
        onPress={() => {
          navigate(ROUTES.EditSettings, {type: 'mobile'});
        }}
      />
      <SettingsItem
        svgItem={<Fontisto name="person" size={icoSize} color={icoColor} />}
        title={'Update Profile'}
        txt={'London'}
        svgBack={<SvgBack />}
        onPress={() => {
          navigate(ROUTES.EditSettings, {type: 'profile'});
        }}
      />
      <SettingsItem
        svgItem={
          <Ionicons
            name="ios-color-palette-sharp"
            size={icoSize}
            color={icoColor}
          />
        }
        title={'Theme'}
        txt={'Orange'}
        svgBack={<SvgBack />}
        onPress={() => {
          navigate(ROUTES.ThemeScreen);
        }}
      />
      <SettingsItem
        svgItem={<FontAwesome name="font" size={icoSize} color={icoColor} />}
        title={'Change Font'}
        onPress={() => {
          navigate(ROUTES.SelectFontOption);
        }}
      />
      <SettingsItem
        svgItem={
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={icoSize}
            color={icoColor}
          />
        }
        title={'Dark Theme'}
        onPress={() => {
          navigate(ROUTES.SelectDarkOption);
        }}
      />
      <SettingsItem
        svgItem={
          <Ionicons
            name="notifications-sharp"
            size={icoSize}
            color={icoColor}
          />
        }
        title={'Enable Notification'}
        switch={true}
      />
      <SettingsItem
        svgItem={<Entypo name="location" size={icoSize} color={icoColor} />}
        title={'Turn on Location'}
        switch={true}
      />
      <TextComponent style={styles.txtAboutUs}>ABOUT US</TextComponent>
      <SettingsItem
        svgItem={
          <MaterialCommunityIcons
            name="file-document-edit"
            size={icoSize}
            color={icoColor}
          />
        }
        title={'About us'}
        svgBack={<SvgBack />}
        onPress={() => {
          navigate(ROUTES.AboutUs);
        }}
      />
      <SettingsItem
        svgItem={
          <MaterialIcons name="rate-review" size={icoSize} color={icoColor} />
        }
        title={'Send Feedback'}
        svgBack={<SvgBack />}
        onPress={() => {
          navigate(ROUTES.FeedBack);
        }}
      />
      <SettingsItem
        svgItem={
          <MaterialCommunityIcons
            name="update"
            size={icoSize}
            color={icoColor}
          />
        }
        title={'Check For Update'}
        onPress={() => {
          navigate(ROUTES.Updates);
        }}
      />
      <SettingsItem
        svgItem={
          <MaterialCommunityIcons
            name="power"
            size={icoSize}
            color={icoColor}
          />
        }
        title={'Logout'}
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <TextComponent style={styles.txtVersion}>
        Store Manager 1.0.0
      </TextComponent>
      <View style={{height: 200}}></View>
    </ScrollView>
  );
});

export default Settings;

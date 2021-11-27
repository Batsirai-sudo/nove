import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  Platform,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import {Right, Header, Left, Body} from 'native-base';
import {Container, Content} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {Portal} from 'react-native-portalize';

const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 0,
  },
};
import styles from './styles';
import Drawer from 'react-native-drawer';

import tweens from './tweens';

export default class DrawerChat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'overlay',
      openDrawerOffset: 50,
      closedDrawerOffset: 0,
      panOpenMask: 0.1,
      relativeDrag: false,
      panThreshold: 0.25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: true,
      negotiatePan: false,
      side: 'right',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.drawer.open();
    }, 1000);
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function () {
      that.props.navigation.navigate('Drawer');
      return true;
    });
  }

  setDrawerType(type) {
    this.setState({
      drawerType: type,
    });
  }

  tweenHandler(ratio) {
    if (!this.state.tweenHandlerPreset) {
      return {};
    }
    return tweens[this.state.tweenHandlerPreset](ratio);
  }

  noopChange() {
    this.setState({
      changeVal: Math.random(),
    });
  }

  openDrawer() {
    this.drawer.open();
  }

  setStateFrag(frag) {
    this.setState(frag);
  }

  render() {
    var controlPanel = (
      <ControlPanel
        closeDrawer={() => {
          this.drawer.close();
        }}
      />
    );
    return (
      <Portal>
        <Drawer
          ref={(c) => (this.drawer = c)}
          type={this.state.drawerType}
          animation={this.state.animation}
          openDrawerOffset={this.state.openDrawerOffset}
          closedDrawerOffset={this.state.closedDrawerOffset}
          panOpenMask={this.state.panOpenMask}
          panCloseMask={this.state.panCloseMask}
          relativeDrag={this.state.relativeDrag}
          panThreshold={this.state.panThreshold}
          content={controlPanel}
          styles={drawerStyles}
          disabled={this.state.disabled}
          tweenHandler={this.tweenHandler.bind(this)}
          tweenDuration={this.state.tweenDuration}
          tweenEasing={this.state.tweenEasing}
          acceptDoubleTap={this.state.acceptDoubleTap}
          acceptTap={this.state.acceptTap}
          acceptPan={this.state.acceptPan}
          tapToClose={this.state.tapToClose}
          negotiatePan={this.state.negotiatePan}
          changeVal={this.state.changeVal}
          side={this.state.side}></Drawer>
      </Portal>
    );
  }
}
// Styles

const onlineUserOne =
  'https://antiqueruby.aliansoftware.net//Images/drawer/online_user1_dtewntynine.jpg';
const onlineUserTwo =
  'https://antiqueruby.aliansoftware.net//Images/drawer/online_user2_dtewntynine.jpg';
const onlineUserThree =
  'https://antiqueruby.aliansoftware.net//Images/drawer/online_user3_dtewntynine.jpg';
const onlineUserFour =
  'https://antiqueruby.aliansoftware.net//Images/drawer/online_user4_dtewntynine.jpg';
const onlineUserFive =
  'https://antiqueruby.aliansoftware.net//Images/drawer/online_user5_dtewntynine.jpg';
const onlineUserSix =
  'https://antiqueruby.aliansoftware.net//Images/drawer/online_user6_dtewntynine.jpg';

const recentUserOne =
  'https://antiqueruby.aliansoftware.net//Images/drawer/recent_user1_dtewntynine.jpg';
const recentUserTwo =
  'https://antiqueruby.aliansoftware.net//Images/drawer/recent_user2_dtewntynine.jpg';
const recentUserThree =
  'https://antiqueruby.aliansoftware.net//Images/drawer/recent_user3_dtewntynine.jpg';

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langId: 1,
      activeMenu: 'SignUp',
      dataOnlineUser: [
        {
          id: 1,
          profileImg: {uri: onlineUserOne},
          name: 'Weston Paulk',
          status: 'online',
        },
        {
          id: 2,
          profileImg: {uri: onlineUserTwo},
          name: 'Vannessa Nusbaum',
          status: 'mobile',
        },
        {
          id: 3,
          profileImg: {uri: onlineUserThree},
          name: 'Sidney Straube',
          status: 'online',
        },
        {
          id: 4,
          profileImg: {uri: onlineUserFour},
          name: 'Elois Valencia',
          status: 'online',
        },
        {
          id: 5,
          profileImg: {uri: onlineUserFive},
          name: 'Sarai Boysen',
          status: 'mobile',
        },
        {
          id: 6,
          profileImg: {uri: onlineUserSix},
          name: 'Rogelio Wayt',
          status: 'online',
        },
      ],
      dataRecentUser: [
        {
          id: 1,
          profileImg: {uri: recentUserOne},
          name: 'Ronna Klenke',
          time: '10 mins',
        },
        {
          id: 2,
          profileImg: {uri: recentUserTwo},
          name: 'Derick Merrill',
          time: '14 mins',
        },
        {
          id: 3,
          profileImg: {uri: recentUserThree},
          name: 'Jerome Fiske',
          time: '25 mins',
        },
      ],
    };
  }

  componentWillMount() {
    AsyncStorage.multiGet([
      'langId',
      'siteLink',
      'siteText',
      'copyrighttext',
      'levelTitle',
    ]).then((data) => {
      this.setState({
        langId: data[0][1],
        siteLink: data[1][1],
        siteText: data[2][1],
        copyrighttext: data[3][1],
        levelTitle: data[4][1],
      });
    });
  }

  _handlePress(screenName) {
    var tempVar = '';
    this.setState({activeMenu: screenName, activeMenuImage: tempVar});
    this.props.navigation.navigate(screenName);
  }

  render() {
    const {activeMenuImage} = this.state;
    StatusBar.setBarStyle('light-content', true);

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#2d324f', true);
      StatusBar.setTranslucent(true);
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerBg}>
          <View style={styles.searchBarBg}>
            {/*<Image source={images.searchGreyDrwer} style={styles.searchIcon}/>*/}
            <Ionicons name="ios-search" size={18} color="#868588" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#6d6d71"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              keyboardType="default"
              selectionColor="#6d6d71"
            />
          </View>
          <View style={styles.headerDivider} />
          <View style={styles.headerTitleBg}>
            <Text style={styles.headerTitleTxt}>ONLINE USERS</Text>
            <TouchableOpacity onPress={() => alert('EDIT')}>
              <Text style={styles.headerTitleTxt}>EDIT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {this.state.dataOnlineUser.map((item, index) => {
            return (
              <View key={index} style={styles.listBg}>
                <View style={styles.menuListItem}>
                  <View style={styles.nameProfileBg}>
                    <Image style={styles.profileImg} source={item.profileImg} />
                    <TouchableOpacity onPress={() => alert(item.name)}>
                      <Text style={styles.nameTxt}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                  {item.status == 'online' ? (
                    <View style={styles.onlineStatusIcon} />
                  ) : (
                    <FontAwesome name="mobile" size={22} color="#737179" />
                  )}
                </View>
                <View
                  style={
                    index === this.state.dataOnlineUser.length - 1
                      ? null
                      : styles.listDivider
                  }
                />
              </View>
            );
          })}
          <View style={styles.recentUserBg}>
            <Text style={styles.recentlyTxt}>RECENTLY</Text>
          </View>
          {this.state.dataRecentUser.map((item, index) => {
            return (
              <View key={index} style={styles.listRecentBg}>
                <View style={styles.menuListItem}>
                  <View style={styles.nameProfileBg}>
                    <Image style={styles.profileImg} source={item.profileImg} />
                    <TouchableOpacity onPress={() => alert(item.name)}>
                      <Text style={styles.nameTxt}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.timeTxt}>{item.time}</Text>
                </View>
                <View
                  style={
                    index === this.state.dataRecentUser.length - 1
                      ? null
                      : styles.listDivider
                  }
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

import React, {useContext, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import {AdminContext} from '../../../context/adminContext';
import {
  SaveButton,
  Icon,
  Input,
  Search,
  IconRadio,
  StoreManagerCard as Card,
  FloatButton,
  CustomProgressBar,
  TextComponent as Text,
  CreateOrderPreviewItem,
  HeaderReward,
} from '@components';
import LinearGradient from 'react-native-linear-gradient';
import {SvgArrowBack} from '@svg-components';
import {dimensions} from '@utils';
import {ROUTES} from '@config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, useTheme} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import FacePile from 'react-native-face-pile';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FACES = [
  {
    id: 0,
    imageUrl:
      'https://media.gettyimages.com/photos/young-woman-portrait-in-the-city-picture-id1009749608?s=612x612',
  },
  {
    id: 1,
    imageUrl:
      'https://media.gettyimages.com/photos/young-woman-portrait-in-the-city-picture-id1009749608?s=612x612',
  },
  {
    id: 2,
    imageUrl:
      'https://media.gettyimages.com/photos/young-woman-portrait-in-the-city-picture-id1009749608?s=612x612',
  },
];
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const {height_screen, width_screen} = dimensions;

const Messages = () => {
  const {colors} = useTheme();

  const {adminKey} = useContext(AdminContext);
  const {navigate, goBack} = useNavigation();
  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);
  return (
    <View style={{backgroundColor: colors.thirdBackground, height: '100%'}}>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        hidden={false}
        backgroundColor={'transparent'}
      />
      <LinearGradient
        style={styles.linear}
        colors={['#F05F3E', '#ED3269']}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onBack} style={styles.touch}>
            {/* <SvgArrowBack /> */}
            <Entypo name="cross" size={24} color={'white'} />
            {/* <Text bold style={[styles.textTitle, {fontSize: 20}]}>
              X
            </Text> */}
          </TouchableOpacity>
          <Text
            semibold
            style={[
              styles.textTitle,
              {position: 'absolute', left: 24, fontSize: 25},
            ]}>
            Hey there 👋
          </Text>
        </View>

        <Text style={styles.txtBalance}>
          Hi, we're here to help, please let us know how we can assist.
        </Text>
        {/* <View style={styles.amount}>
          <Text style={styles.dollarsIcon}>R</Text>
          <Text style={styles.txtAmount}>props.amount</Text>
        </View> */}
      </LinearGradient>
      <View style={{top: 150, position: 'absolute', width: '100%'}}>
        <Card
          cornerRadius={5}
          touchOpacity={1}
          elevation={5}
          style={{
            height: 0.25 * height_screen,
            width: '90%',

            padding: 25,

            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
            borderTopWidth: 2,
            borderTopColor: '#82A5F0',
          }}>
          <Text semibold>Support Team conversations</Text>
          <View style={{width: '100%', flexDirection: 'row', marginTop: 15}}>
            <View>
              <FacePile numFaces={2} faces={FACES} />
            </View>
            <View style={{left: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '60%',
                }}>
                <Text style={{color: '#556084'}}>Store Manager</Text>
                <Text style={{left: 80, color: '#556084'}}>1d ago</Text>
              </View>
              <View style={{width: '80%', top: 5}}>
                <Text medium style={{fontSize: 12}} numberOfLines={1}>
                  Hi, we're here to help, please let us know how we can assist.
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                borderRadius: 50,
                width: 200,
                borderColor: '#000',
                height: 35,
                borderWidth: 1,
                marginTop: 30,
              }}>
              <TouchableOpacity
                onPress={() => navigate(ROUTES.SupportTeamInbox)}
                style={{
                  width: 198,
                  height: 32,
                  // backgroundColor: colors.thirdBackground,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  alignSelf: 'center',
                  flexDirection: 'row',
                }}>
                <FontAwesome name="send" size={20} color="#556084" />
                <Text style={{left: 5, fontSize: 12}}>Start conversations</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        <Card
          cornerRadius={5}
          touchOpacity={1}
          elevation={5}
          style={{
            height: 0.18 * height_screen,
            width: '90%',
            marginTop: 20,
            padding: 25,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
            borderTopWidth: 2,
            borderTopColor: '#82A5F0',
          }}>
          <View>
            <Text semibold style={{color: '#556084'}}>
              Find Answers now
            </Text>
            <Input
              // label={'Store Name'}
              value={''}
              onPressRightBtn={() => alert(62)}
              rightIcon
              onChangeText={(value) => {}}
              containerStyle={{marginTop: 20}}
            />
          </View>
        </Card>
        <Card
          cornerRadius={5}
          touchOpacity={1}
          elevation={5}
          style={{
            height: 0.2 * height_screen,
            width: '90%',
            marginTop: 20,
            padding: 25,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
            borderTopWidth: 2,
            borderTopColor: '#82A5F0',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text semibold>My conversations</Text>
          </View>
          <View style={{width: '100%', flexDirection: 'row', marginTop: 15}}>
            <View>
              <FacePile numFaces={2} faces={FACES} />
            </View>
            <View style={{left: 10}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  // width: '60%',
                }}>
                <Text style={{color: '#556084'}}>Users & Clients</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderRadius: 50,
              width: 100,
              borderColor: '#000',
              height: 35,
              borderWidth: 1,
              marginTop: 5,
              alignSelf: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => navigate(ROUTES.MessagesList)}
              style={{
                width: 198,
                height: 32,
                // backgroundColor: colors.thirdBackground,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <FontAwesome name="send" size={20} color="#556084" />
              <Text style={{left: 5, fontSize: 12}}>Chats</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default Messages;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: APPBAR_HEIGHT + getStatusBarHeight(true),
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
    top: -10,
  },
  touch: {
    position: 'absolute',
    right: 24,
  },
  textTitle: {
    color: '#fff',
  },
  linear: {
    height: 0.3 * height_screen,
  },
  txtBalance: {
    fontSize: 13,
    color: '#fff',
    marginTop: 0.01 * height_screen,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 20,
  },

  dollarsIcon: {
    fontSize: 20,
    color: '#fff',
    marginTop: 0.022 * height_screen,
    marginRight: 0.03 * width_screen,
    marginLeft: 0.35 * width_screen,
  },
  txtAmount: {
    fontSize: 60,
    color: '#fff',
  },
  amount: {
    flexDirection: 'row',
    marginTop: 0.01 * height_screen,
    left: -20,
  },
});

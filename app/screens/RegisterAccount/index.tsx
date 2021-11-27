import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  TextComponent as Text,
  Errors,
  Input,
  ListItem,
  Modal,
  Icon,
  CustomProgressBar,
} from '@components';
import LinearGradient from 'react-native-linear-gradient';
import {Images, isAdmin} from '@config';
import {useNavigation, useTheme} from '@react-navigation/native';
import {WEB_CLIENT_ID} from '@env';
import {GoogleSignin} from '@react-native-community/google-signin';
import {AuthContext} from '@context';
import {ROUTES} from '@config';
import {FONTS} from '@utils';
import {registrationRequest} from '@config';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {checkEmailExist} from '@services';
import {LoginManager} from 'react-native-fbsdk';
import {registrationDataFxn} from '@constants';

import {isEmpty} from '@helpers';

const RegisterAccount = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {
    googleRegister,
    userType,
    facebookRegister,
    facebookLogin,
    adminLink,
  } = useContext(AuthContext);
  const {navigate} = useNavigation();
  const [isAccountType, setIsAccountType] = useState(true);
  const [userCategory, setUserCategory] = useState([
    {type: 'Yes', name: 'Yes', isSelected: false},
    {type: 'No', name: 'No', isSelected: false},
  ]);
  const [accountType, setAccountType] = useState('');
  const [registerLogin, setRegisterLogin] = useState(false);
  const [onClickgGoogle, setOnClickgGoogle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hideStatusBar, setHideStatusBar] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [accountFound, setAccountFound] = useState(false);
  const [data, setData] = useState(
    isAdmin(userType.type)
      ? registrationDataFxn().admin.personal
      : registrationDataFxn().user.personal,
  );
  const [getLinkError, setGetLinkError] = useState('');
  // const checkAdminLink = () => {
  //   return accountType === 'User' ? (adminLink ? true : false) : true;
  // };

  const onGoogle = async () => {
    setOnClickgGoogle(true);
    // setIsLoading(true);
    // if (!checkAdminLink()) {
    //   setGetLinkError(
    //     'You cant register at this time, because you dont have admin id to continue reistration. Please request Admin ID from your Admin?',
    //   );
    //   //   setModalVisible(true);
    //   return false;
    // }
    googleRegister(accountType)
      .then(async (res) => {
        if (res === registrationRequest.ACCOUNT_EXIST_IN_FIREBASE) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          Errors({
            message: 'Email Taken',
            autoHide: true,
            description:
              'The email you are trying to register with is already associated with another account try another one!',
          });
        }
        if (res === registrationRequest.USER_CAN_REGISTER) {
          navigate(ROUTES.AdditionalInfor);
        }

        setIsLoading(false);
        setOnClickgGoogle(false);
      })
      .catch((e) => {
        // setIsLoading(false);
        setOnClickgGoogle(false);
      });
  };

  const onFacebook = async () => {
    // if (!checkAdminLink()) {
    //   setGetLinkError(
    //     "You cant register at this time, 'because you dont have admin id to continue reistration. Please request Admin ID from your Admin?",
    //   );
    //   //   setModalVisible(true);
    //   return false;
    // }
    // setIsLoading(true);
    // setIsAccountType(false);
    facebookRegister(accountType)
      .then((res) => {
        res === registrationRequest.ACCOUNT_EXIST_IN_FIREBASE
          ? (async () => {
              await LoginManager.logOut();
              Errors({
                message: 'Account found',
                autoHide: true,
                description:
                  'There is an account  associated with this facebook account. Please try another facebook account !',
              });
            })()
          : navigate(ROUTES.AdditionalInfor);

        // setIsLoading(false);
        // navigate(ROUTES.AdditionalInfor);
      })
      .catch((e) => {
        // alert(e);
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isAdmin(userType.type)) {
      data.account = userType.type;
      data.userCategory = userType.type;
    }
    if (!isAdmin(userType.type)) {
      data.account = userType.subType;
      data.userCategory = userType.type;
    }
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });

    // isAdmin(userType.type)
    //   ? (data.account = userType.type)
    //   : (data.account = userType.subType);
    console.log(data);
  }, []);

  const onRegisterFirebase = async () => {
    data.fullName = `${data?.givenName} ${data?.familyName}`;
    data.registrationType = `EmailPassword`;
    const valid = isEmpty(data);
    if (valid) {
      Errors({
        message: 'Error fields empty',
        autoHide: true,
        description:
          'Complete the form to continue, make sure all fields are not empty',
      });
      return false;
    }

    const isPasswordMatching = checkPassword();

    if (!isPasswordMatching) {
      Errors({
        message: 'Unmatch password',
        autoHide: true,
        description: 'Your password do not match please try again',
      });
      return false;
    }

    if (data.password.length < 6) {
      Errors({
        message: ' Password too short',
        autoHide: true,
        description:
          'Enter a strong password it should be at least 6 characters long',
      });
      return false;
    }
    data.email = data.email.trim();
    setIsLoading(true);
    try {
      const response = await checkEmailExist(data.email);

      response
        ? Errors({
            message: 'Email Taken',
            autoHide: true,
            description:
              'The email you are trying to register with is already associated with another account',
          })
        : setTimeout(() => {
            delete data.confirm_password;
            setIsLoading(false);
            dispatch(AuthActions.onStoreRegistrationData(data));
            navigate(ROUTES.AdditionalInfor);
          }, 500);
    } catch (error) {
      Errors({
        message: 'Error occured',
        autoHide: true,
        description: error.message,
      });
    }
    setIsLoading(false);
  };

  const checkPassword = () => {
    return data.password === data.confirm_password ? true : false;
  };

  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {onClickgGoogle ? (
        <ActivityIndicator
          style={{position: 'absolute', bottom: '50%', alignSelf: 'center'}}
          animating
          color="#000"
          size="large"
        />
      ) : null}
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        visible={isLoading}
      />
      <View>
        <View
          style={{
            marginTop: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image style={styles.logo} source={Images.logo2} />
        </View>
        <View
          style={{
            marginTop: 48,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={onFacebook}>
            <View style={styles.socialButton}>
              <Image
                source={require('./assets/facebook.png')}
                style={styles.socialLogo}
              />
              <Text style={styles.text}>Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={onGoogle}>
            <Image
              source={require('./assets/google.png')}
              style={styles.socialLogo}
            />
            <Text style={styles.text}>Google</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.text,
            {
              color: '#ABB4BD',
              fontSize: 15,
              textAlign: 'center',
              marginVertical: 20,
            },
          ]}>
          or
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          {isAdmin(userType.type) ? (
            <Input
              label={'CEO '}
              value={data?.isSEO}
              icon={{
                name: 'account',
                size: 20,
              }}
              editable={false}
              labelStyle={{fontWeight: '300', fontSize: 12}}
              isRequired
            />
          ) : null}
        </TouchableOpacity>
        <Input
          label={'First Name'}
          value={data?.givenName}
          icon={{
            name: 'account',
            size: 20,
          }}
          labelStyle={{fontWeight: '300', fontSize: 12}}
          isRequired
          onChangeText={(value) => updateData('givenName', value)}
        />
        <Input
          label={'Surname'}
          value={data?.familyName}
          icon={{
            name: 'account',
            size: 20,
          }}
          labelStyle={{fontWeight: '300', fontSize: 12}}
          isRequired
          onChangeText={(value) => updateData('familyName', value)}
        />
        <Input
          label={'Email'}
          value={data?.email}
          icon={{
            name: 'email',
            size: 20,
          }}
          labelStyle={{fontWeight: '300', fontSize: 12}}
          isRequired
          onChangeText={(value) => updateData('email', value)}
        />
        <Input
          label={'Password'}
          secureTextEntry
          icon={{
            name: 'lock',
          }}
          value={data?.password}
          onChangeText={(value) => updateData('password', value)}
        />
        <Input
          label={'Confirm Password'}
          secureTextEntry
          icon={{
            name: 'lock',
          }}
          value={data?.confirm_password}
          onChangeText={(value) => updateData('confirm_password', value)}
        />
        <TouchableOpacity style={{elevation: 5}} onPress={onRegisterFirebase}>
          <LinearGradient
            style={styles.submitContainer}
            colors={['#F05F3E', '#ED3269']}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}>
            <Text
              style={[
                styles.text,
                {
                  color: '#FFF',
                  fontWeight: '600',
                  fontSize: 16,
                },
              ]}>
              Register Account
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 24}}>
          <Text
            style={[
              styles.text,
              {
                color: '#ABB4BD',
                textAlign: 'center',
              },
            ]}>
            Already have an account?
          </Text>

          <TouchableOpacity onPress={() => navigate(ROUTES.Walkthrough)}>
            <Text style={[styles.text, styles.link, {left: 20}]}>
              SignIn Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={modalVisible} maxRatio={0.85}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={[styles.text]}>
              Are you SEO of the Store you are to Register
            </Text>
            {userCategory.map((x, i) => (
              <ListItem
                key={i}
                title={x.name}
                bottomDivider
                rightElement={
                  x.isSelected ? (
                    <Icon
                      name={x.isSelected ? 'check' : null}
                      size={22}
                      color={x.isSelected && colors.primary}
                      iconStyle={styles.icon}
                      activeOpacity={1}
                      underlayColor={'transparent'}
                    />
                  ) : null
                }
                titleStyle={[
                  {fontFamily: FONTS.Regular, fontSize: 12},
                  x.isSelected && {color: colors.primary},
                ]}
                onPress={() => {
                  userCategory.map((res, index) => {
                    if (userCategory[index].isSelected === true) {
                      userCategory[index].isSelected = false;
                    }
                  });
                  userCategory[i].isSelected = !userCategory[i].isSelected;
                  setUserCategory([...userCategory]);
                  updateData(
                    'isSEO',
                    userCategory.filter((h) => h.isSelected)[0].type,
                  );
                  setModalVisible(false);
                }}
                type="underline"
                small
              />
            ))}
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default RegisterAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  content: {
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  logo: {
    height: 100,
    width: 100,
  },
  text: {
    // fontFamily: 'Avenir Next',
    color: '#1D2029',
  },
  socialButton: {
    flexDirection: 'row',
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(171, 180, 189, 0.65)',
    borderRadius: 4,
    backgroundColor: '#fff',
    shadowColor: 'rgba(171, 180, 189, 0.35)',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  socialLogo: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  link: {
    color: '#FF1654',
    // fontSize: 14,
    fontWeight: '500',
  },
  submitContainer: {
    // backgroundColor: '#FF1654',
    fontSize: 16,
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    shadowColor: 'rgba(255, 22, 84, 0.24)',
    shadowOffset: {width: 0, height: 9},
    shadowOpacity: 1,
    shadowRadius: 20,
  },
});

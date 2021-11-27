import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {
  TextComponent as Text,
  Errors,
  CustomProgressBar,
  LoginInputField,
} from '@components';
import LinearGradient from 'react-native-linear-gradient';
import {Images, ErrorMessages} from '@config';
import {useNavigation} from '@react-navigation/native';
import {WEB_CLIENT_ID} from '@env';
import {GoogleSignin} from '@react-native-community/google-signin';
import {AuthContext} from '@context';
import {ROUTES} from '@config';
import {registrationRequest} from '@config';
import SplashScreen from 'react-native-splash-screen';
import {isEmpty} from '@helpers';
import {LoginManager} from 'react-native-fbsdk';

const Index = () => {
  const {navigate} = useNavigation();
  const [accountType, setAccountType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hideStatusBar, setHideStatusBar] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [accountFound, setAccountFound] = useState(false);
  const [data, setData] = useState({email: '', password: ''});
  const [getLinkError, setGetLinkError] = useState('');
  const [onClickgGoogle, setOnClickgGoogle] = useState(false);

  const {googleLogin, facebookLogin, authentication, adminLink} = useContext(
    AuthContext,
  );

  const onGoogle = async () => {
    setOnClickgGoogle(true);

    googleLogin(accountType)
      .then((res) => {
        res === registrationRequest.USER_CAN_REGISTER
          ? (async () => {
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
              Errors({
                message: 'Account not found',
                autoHide: true,
                description:
                  'There is no account found associated with this email address. Please register to get started!',
              });
            })()
          : navigate(ROUTES.AdminStack);
        setOnClickgGoogle(false);
      })
      .catch((e) => {
        setHideStatusBar(true);
        Errors({...ErrorMessages.login_error});
        setOnClickgGoogle(false);
      });
  };
  const onFacebook = async () => {
    // setIsLoading(true);

    facebookLogin(accountType)
      .then((res) => {
        res === registrationRequest.USER_CAN_REGISTER
          ? (async () => {
              await LoginManager.logOut();
              Errors({
                message: 'Account not found',
                autoHide: true,
                description:
                  'There is no account found associated with this facebook account. Please register to get started!',
              });
            })()
          : navigate(ROUTES.AdminStack);
        // : navigate(ROUTES.ClientStack);

        // setIsLoading(false);
        // isSignedIn
        //   ? navigate(ROUTES.Loading)
        //   : Errors({...ErrorMessages.login_error});
      })
      .catch((e) => {
        // setHideStatusBar(true);
        Errors({...ErrorMessages.login_error});
        // setIsLoading(false);
      });
  };

  const onFirebaseSignIn = async () => {
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
    setIsLoading(true);

    data.email = data.email.trim();
    authentication(data)
      .then((response) => {
        setIsLoading(false);
        navigate(ROUTES.Loading);
        // response === 'Admin'
        //   ? navigate(ROUTES.Loading)
        //   : navigate(ROUTES.ClientStack);
      })
      .catch((error) => {
        setIsLoading(false);

        Errors({
          message: 'Error occured',
          autoHide: true,
          description: error.message,
        });
      });
  };

  useEffect(() => {
    const id = 4;

    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });

    // const backAction = () => {
    //   setModalVisible(true);

    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );
    SplashScreen.hide();

    // return () => backHandler.remove();
  }, []);

  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        visible={isLoading}
      />
      {onClickgGoogle ? (
        <ActivityIndicator
          style={{position: 'absolute', bottom: '50%', alignSelf: 'center'}}
          animating
          color="#000"
          size="large"
        />
      ) : null}
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
        <KeyboardAvoidingView>
          <LoginInputField
            style={styles.inputTitle}
            title="Email"
            value={data.email}
            onChangeText={(value) => updateData('email', value)}
          />
          <LoginInputField
            style={{
              marginTop: 32,
              marginBottom: 8,
            }}
            title="Password"
            isSecure={true}
            secureTextEntry={true}
            value={data.password}
            onChangeText={(value) => updateData('password', value)}
          />
          <TouchableOpacity onPress={() => navigate(ROUTES.ForgetPassword)}>
            <Text style={[styles.text, styles.link, {textAlign: 'right'}]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{elevation: 5}} onPress={onFirebaseSignIn}>
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
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <Text
          style={[
            styles.text,
            {
              color: '#ABB4BD',
              textAlign: 'center',
              marginTop: 24,
            },
          ]}>
          Don't have an account?{' '}
          <TouchableOpacity onPress={() => navigate(ROUTES.ChooseAccount)}>
            <Text style={[styles.text, styles.link, {top: 5}]}>
              Register Now
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
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

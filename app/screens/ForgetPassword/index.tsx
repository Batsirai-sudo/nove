import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import {
  TextComponent as Text,
  Errors,
  CustomProgressBar,
  LoginInputField,
  Dialog,
} from '@components';
import LinearGradient from 'react-native-linear-gradient';
import {Images, ErrorMessages} from '@config';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '@context';
import {ROUTES} from '@config';
import {isEmpty} from '@helpers';

const Index = () => {
  const {navigate} = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({email: ''});
  const [modalVisible, setModalVisible] = useState(false);
  const {passwordReset} = useContext(AuthContext);

  const onReset = () => {
    if (data.email === '') {
      Errors({
        message: 'Field empty',
        autoHide: true,
        description: 'Please enter your Email',
      });
    } else {
      setIsLoading(true);

      passwordReset(data.email.trim())
        .then(() => {
          setIsLoading(false);
          setModalVisible(true);
        })
        .catch((e) => {
          setIsLoading(false);
          Errors({
            message: 'Error occured',
            autoHide: true,
            description: e.message,
          });
        });

      // PasswordReset(, (success, error) => {
      //   setLoading(false);
      //   setIsProgress(false);
      //   if (success) {
      //     seteEmail('');

      //     Popup.show({
      //       type: 'Success',
      //       title: 'Successfully Sent ',
      //       button: true,
      //       textBody:
      //         'Information to reset your password, was sent to your email, check your email',
      //       buttonText: 'Done',
      //       callback: () => {
      //         Popup.hide();
      //         navigation.navigate('SignIn');
      //       },
      //     });
      //   }

      //   if (error) {
      //     Popup.show({
      //       type: 'Danger',
      //       title: 'Error',
      //       button: true,
      //       textBody: error,
      //       buttonText: 'OK',
      //       callback: () => {
      //         Popup.hide();
      //       },
      //     });
      //   }
      // });
    }
  };

  const onFirebaseSignIn = async () => {
    // const valid = isEmpty(data);
    Keyboard.dismiss();
    // if (valid) {
    //   Errors({
    //     message: 'Error fields empty',
    //     autoHide: true,
    //     description:
    //       'Complete the form to continue, make sure all fields are not empty',
    //   });
    //   return false;
    // }
    // setIsLoading(true);

    // data.email = data.email.trim();
    // authentication(data)
    //   .then((response) => {
    //     setIsLoading(false);
    //     navigate(ROUTES.Loading);
    //     // response === 'Admin'
    //     //   ? navigate(ROUTES.Loading)
    //     //   : navigate(ROUTES.ClientStack);
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);

    //     Errors({
    //       message: 'Error occured',
    //       autoHide: true,
    //       description: error.message,
    //     });
    //   });
  };

  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        visible={isLoading}
      />
      <Dialog
        modalVisible={modalVisible}
        title="Successfully Sent "
        content="Information to reset your password, was sent to your email. Please check your email"
        firstButtontext="Okay"
        secondButtontext="Open Email"
        secondButtonOnPress={() => {
          Linking.openURL('https://mail.google.com/mail');
          setModalVisible(false);
        }}
        firstButtonOnPress={closeModal}
        onSwipefunc={closeModal}
        onTouchOutside={closeModal}
        height={170}
        animation="scale"
        width="90%"
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

        <KeyboardAvoidingView style={{marginTop: 100}}>
          <LoginInputField
            style={styles.inputTitle}
            title="Email"
            value={data.email}
            onChangeText={(value) => updateData('email', value)}
          />

          <TouchableOpacity
            style={{elevation: 5, marginTop: 50}}
            onPress={onReset}>
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
                Reset Password
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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

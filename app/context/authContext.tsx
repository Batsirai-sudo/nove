import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {AuthActionsCreators, AuthActions} from '@actions';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {registrationRequest} from '@config';
import firestore from '@react-native-firebase/firestore';
import {Errors} from '@components';
import firebase from '@react-native-firebase/app';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const dispatch = useDispatch();
  const [adminLink, setAdminLink] = useState('');
  const [userType, setUserType] = useState('');
  const [connectRegisterWithAdmin, setConnectRegisterWithAdmin] = useState({
    status: false,
  });
  const [loginConnectAdmin, setLoginConnectAdmin] = useState({status: false});

  const getUserObject = async (userData) => {
    dispatch(AuthActions.onStoreRegistrationData(userData));
  };
  const loadUser = async (userid, resolve, reject) => {
    await dispatch(
      AuthActionsCreators.onLoginAuthentication(userid, resolve, reject),
    );
  };
  const getUserData = async (uid) => {
    try {
      const result = await firestore().collection('Users').doc(uid).get();
      return result.data();
    } catch (error) {}
  };
  const checkUserDetailInFirestore = async (uid, accountType) => {
    accountType === 'Admin'
      ? await firestore()
          .collection('Users')
          .doc(uid)
          .get()
          .then((response) => {
            console.log('response', response);
            return true;
          })
      : await firestore()
          .collection('Users')
          .doc(adminLink)
          .collection('Users')
          .get(uid)
          .then((response) => {
            console.log('response', response);
            return true;
          });
  };

  return (
    <AuthContext.Provider
      value={{
        getUserType: (x) => {
          setUserType(x);
        },
        userType,
        getAdminLink: (x) => {
          setAdminLink(x);
        },
        loginConnectAdmin,
        setLoginConnectAdmin,
        adminLink,
        connectRegisterWithAdmin,
        setConnectRegisterWithAdmin,
        getAdminDetails: async () => {
          return new Promise(async (resolve, reject) => {
            await firestore()
              .collection('Users')
              .doc(adminLink)
              .get()
              .then((response) => {
                resolve(response);
              });
          });
        },
        googleRegister: async (accountType) => {
          return new Promise(async (resolve, reject) => {
            try {
              // Get the users ID token
              await GoogleSignin.hasPlayServices();
              const userObj = await GoogleSignin.signIn();
              // Create a Google credential with the token
              const googleCredential = auth.GoogleAuthProvider.credential(
                userObj.idToken,
              );
              const checkEmail = userObj.user.email;
              await auth()
                .fetchSignInMethodsForEmail(checkEmail)
                .then(async (res) => {
                  if (res.length) {
                    resolve(registrationRequest.ACCOUNT_EXIST_IN_FIREBASE);
                  } else {
                    // Sign-in the user with the credential
                    const userInfor = {
                      email: userObj.user.email,
                      familyName: userObj.user.familyName,
                      givenName: userObj.user.givenName,
                      photoURL: userObj.user.photo,
                      fullName: userObj.user.name,
                      registrationType: `Google`,
                    };

                    const data = {
                      ...userInfor,
                      credentials: googleCredential,
                    };
                    getUserObject(data);
                    console.log(data);
                    resolve(registrationRequest.USER_CAN_REGISTER);
                  }
                });
            } catch (error) {
              reject(error);

              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // alert(error.code,error.code );
                Errors({
                  message: `Error code:  ${error.code}`,
                  autoHide: true,
                  description: 'SignUp action cancelled',
                });
                // showMessage({
                //   description: 'SignUp action cancelled',
                //   type: 'danger',
                //   // floating:true,
                //   position: 'top',
                //   icon: 'danger',
                //   autoHide: true,
                //   onPress: () => {
                //     /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
                //   },
                // });
                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                Errors({
                  message: `Error code:  ${error.code}`,
                  autoHide: true,
                  description: error.message,
                });
                // showMessage({
                //   message: `Error code:  ${error.code}`,
                //   description: error.message,
                //   type: 'danger',
                //   // floating:true,
                //   position: 'top',
                //   icon: 'danger',
                //   autoHide: true,
                //   onPress: () => {
                //     /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
                //   },
                // });

                // operation (e.g. sign in) is in progress already
              } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              ) {
                Errors({
                  message: `Error code:  ${error.code}`,
                  autoHide: true,
                  description: error.message,
                });
                // showMessage({
                //   message: `Error code:  ${error.code}`,
                //   description: error.message,
                //   type: 'danger',
                //   // floating:true,
                //   position: 'top',
                //   icon: 'danger',
                //   autoHide: true,
                //   onPress: () => {
                //     /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
                //   },
                // });
                // play services not available or outdated
              } else {
                // some other error happened
                Errors({
                  message: `Error code:  ${error.code}`,
                  autoHide: true,
                  description: error.message,
                });

                // showMessage({
                //   message: `Error code:  ${error.code}r`,
                //   description: error.message,
                //   type: 'danger',
                //   autoHide: true,
                //   icon: 'danger',
                //   onPress: () => {
                //     /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
                //   },
                // });
              }
            }
          });
        },
        googleLogin: async () => {
          return new Promise(async (resolve, reject) => {
            try {
              // Get the users ID token
              await GoogleSignin.hasPlayServices();
              const userObj = await GoogleSignin.signIn();
              // Create a Google credential with the token
              const googleCredential = auth.GoogleAuthProvider.credential(
                userObj.idToken,
              );
              const checkEmail = userObj.user.email;
              const res = await auth().fetchSignInMethodsForEmail(checkEmail);
              if (res.length) {
                const response = await auth().signInWithCredential(
                  googleCredential,
                );
                loadUser(response.user.uid, resolve, reject);
              } else {
                // Sign-in the user with the credential
                resolve(registrationRequest.USER_CAN_REGISTER);
              }
            } catch (error) {
              reject(error);

              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // alert(error.code,error.code );
                Errors({
                  message: `Error code:  ${error.code}`,
                  autoHide: true,
                  description: 'SignUp action cancelled',
                });

                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                Errors({
                  message: `Error code:  ${error.code}`,
                  autoHide: true,
                  description: error.message,
                });

                // operation (e.g. sign in) is in progress already
              } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              ) {
                Errors({
                  message: `Error code:  ${error.code}`,
                  autoHide: true,
                  description: error.message,
                });
                // play services not available or outdated
              } else {
                // some other error happened
                Errors({
                  message: `Error code:  ${error.code}`,
                  autoHide: true,
                  description: error.message,
                });
              }
            }
          });
        },

        facebookRegister: async (accountType) => {
          return new Promise(async (resolve, reject) => {
            try {
              // Attempt login with permissions
              const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email',
              ]);

              if (result.isCancelled) {
                throw 'User cancelled the login process';
              }

              // Once signed in, get the users AccesToken
              const data = await AccessToken.getCurrentAccessToken();

              if (!data) {
                throw 'Something went wrong obtaining access token';
              }

              // Create a Firebase credential with the AccessToken
              const facebookCredential = auth.FacebookAuthProvider.credential(
                data.accessToken,
              );
              const response = await auth().signInWithCredential(
                facebookCredential,
              );
              const checkUserExist = await firestore()
                .collection('Users')
                .doc(response.user.uid)
                .get();
              await auth().signOut();

              if (checkUserExist.data()) {
                resolve(registrationRequest.ACCOUNT_EXIST_IN_FIREBASE);
              } else {
                const userInfor = {
                  email: response.user.email,
                  familyName: response.additionalUserInfo.profile.last_name,
                  givenName: response.additionalUserInfo.profile.first_name,
                  photoURL: response.user.photoURL,
                  fullName: response.additionalUserInfo.profile.name,
                  registrationType: `Facebook`,
                };

                const data = {
                  ...userInfor,
                  credentials: facebookCredential,
                };
                getUserObject(data);
                console.log('data', data);
                console.log('response', response);
                resolve(registrationRequest.USER_CAN_REGISTER);
              }
              // Sign-in the user with the credential
              // return auth()
              //   .signInWithCredential(facebookCredential)
              //   .then((response) => {
              //     const userData = {
              //       idToken: data.accessToken,
              //       email: response.additionalUserInfo.profile.email,
              //       familyName: response.additionalUserInfo.profile.first_name,
              //       givenName: response.additionalUserInfo.profile.last_name,
              //       socialProviderId: response.additionalUserInfo.profile.id,
              //       fullName: response.additionalUserInfo.profile.name,
              //       photoURL: response.user.photoURL,
              //       providerId: response.additionalUserInfo.providerId,
              //       uid: response.user.uid,
              //       account: accountType,
              //     };

              //     getUserObject(userData);
              //   });
            } catch (error) {
              Errors({
                message: `Error happened`,
                autoHide: true,
                description: error.message,
              });
              // showMessage({
              //   message: `Error happened`,
              //   description: 'an error ocuured on trying to authenticate',
              //   type: 'danger',
              //   // floating:true,
              //   position: 'top',
              //   icon: 'danger',
              //   autoHide: true,
              //   onPress: () => {
              //     /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
              //   },
              // });
              // some other error happened
            }
          });
        },
        facebookLogin: async () => {
          return new Promise(async (resolve, reject) => {
            try {
              // Attempt login with permissions
              const result = await LoginManager.logInWithPermissions([
                'public_profile',
                'email',
              ]);
              if (result.isCancelled) {
                throw 'User cancelled the login process';
              }
              // Once signed in, get the users AccesToken
              const data = await AccessToken.getCurrentAccessToken();
              if (!data) {
                throw 'Something went wrong obtaining access token';
              }
              // Create a Firebase credential with the AccessToken
              const facebookCredential = auth.FacebookAuthProvider.credential(
                data.accessToken,
              );
              // Sign-in the user with the credential
              const response = await auth().signInWithCredential(
                facebookCredential,
              );
              const checkUserExist = await firestore()
                .collection('Users')
                .doc(response.user.uid)
                .get();

              if (!checkUserExist.data()) {
                await auth().signOut();
                resolve(registrationRequest.USER_CAN_REGISTER);
              } else {
                loadUser(response.user.uid, resolve, reject);
              }
            } catch (error) {
              reject(error);
              Errors({
                message: `Error happened`,
                autoHide: true,
                description: error.message,
              });

              // showMessage({
              //   message: `Error code:  ${error.code}`,
              //   description: error.message,
              //   type: 'danger',
              //   // floating:true,
              //   position: 'top',
              //   icon: 'danger',
              //   autoHide: false,
              //   onPress: () => {
              //     /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
              //   },
              // });
              // some other error happened
            }
          });
        },
        completeRegistration: async (data, navigate, setModal) => {
          try {
            data.account === 'Admin'
              ? dispatch(
                  AuthActionsCreators.onAdminCompleteRegistration(
                    data,
                    navigate,
                    setModal,
                  ),
                )
              : dispatch(
                  AuthActionsCreators.onUserCompleteRegistration(
                    data,
                    navigate,
                    setModal,
                  ),
                );
          } catch (error) {
            showMessage({
              message: `Error code:  ${error.code}`,
              description: error.message + 12,
              type: 'danger',
              // floating:true,
              position: 'top',
              icon: 'danger',
              autoHide: false,
              onPress: () => {
                /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
              },
            });
            // some other error happened
          }
        },

        authentication: async (data) => {
          return new Promise(async (resolve, reject) => {
            try {
              const response = await auth().signInWithEmailAndPassword(
                data.email,
                data.password,
              );
              // const uid = response.user.uid;
              // const result = await getUserData(uid);
              // dispatch(AuthActions.onLogin(result));
              resolve(true);
            } catch (error) {
              reject(error);
            }
          });
        },
        getSpecificshop: async (id) => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore().collection('Shops').doc(id);
            try {
              const response = await ref.get();
              resolve(response);
            } catch (error) {
              console.log(error);
              reject(error);
            }
          });
        },
        connectingShop: async (data) => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore().collection('Users').doc(data.id);
            try {
              await ref.update({
                myShops: firebase.firestore.FieldValue.arrayUnion(data.data),
              });
              await firestore()
                .collection('Shops')
                .doc(data.shopId)
                .update({
                  ownerID: firebase.firestore.FieldValue.arrayUnion(data.id),
                });

              resolve(true);
            } catch (error) {
              console.log(error);
              reject(error);
            }
          });
        },
        passwordReset: async (email) => {
          return new Promise(async (resolve, reject) => {
            const actionCodeSettings = {
              android: {
                installApp: true,
                packageName: 'com.batsiraimuchareva',
              },
              handleCodeInApp: true,
              url: 'https://www.investmentsatraders33.com/sponsorid/0/0',
            };

            try {
              await auth().sendPasswordResetEmail(email);
              resolve(true);
            } catch (error) {
              reject(error);
            }
          });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// const userData =  "react-native-reanimated": "^1.13.2",

//   idToken: userObj.idToken,
//   email: userObj.user.email,
//   familyName: userObj.user.familyName,
//   givenName: userObj.user.givenName,
//   socialProviderId: userObj.user.id,
//   fullName: userObj.user.name,
//   photoURL: userObj.user.photo,
//   providerId: response.additionalUserInfo.providerId,
//   uid: response.user.uid,
//   account: accountType,
//   googleCredential,
// }

// await auth()
//   .signInWithCredential(googleCredential)
//   .then(async (response) => {
//     const userData = {
//       idToken: userObj.idToken,
//       email: userObj.user.email,
//       familyName: userObj.user.familyName,
//       givenName: userObj.user.givenName,
//       socialProviderId: userObj.user.id,
//       fullName: userObj.user.name,
//       photoURL: userObj.user.photo,
//       providerId: response.additionalUserInfo.providerId,
//       uid: response.user.uid,
//       account: accountType,
//       googleCredential,
//     };
//     await auth().signOut();

//     const isInformationAvailable = await checkUserDetailInFirestore(
//       response.user.uid,
//       accountType,
//     );

//     // if (isInformationAvailable) {
//     //   resolve(registrationRequest.USER_CAN_LOGIN_INSTEAD);
//     // } else {
//     //   getUserObject(userData);
//     //   resolve(registrationRequest.USER_CAN_REGISTER);
//     // }
//   });

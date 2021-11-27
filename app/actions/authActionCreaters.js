// import * as actionTypes from './actionTypes';
// import auth from '@react-native-firebase/auth';
// import {onSignIn} from '../errors/index';
// import firebase from '@react-native-firebase/app';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {AuthActions} from '@actions';
import {Errors} from '@components';
import {ROUTES} from '@config';
import auth from '@react-native-firebase/auth';
import {getImageUri} from '@services';
import firebase from '@react-native-firebase/app';

export const onLoginAuthentication = (userid, resolve, reject) => (
  dispatch,
) => {
  try {
    firestore()
      .collection('Users')
      .doc(userid)
      .get()
      .then((response) => {
        dispatch(AuthActions.onLogin(response.data()));
        const success = 'success';
        resolve(success);
      });
  } catch (error) {
    reject(error.message);
  }
};
export const onAdminCompleteRegistration = (data, navigate, setModal) => (
  dispatch,
) => {
  const register = async () => {
    try {
      let userData;

      if (data.registrationType === `EmailPassword`) {
        const response = await auth().createUserWithEmailAndPassword(
          data.email,
          data.password,
        );

        const shopObj = await onCreateShop(data.store, response.user.uid);
        // const downloadedUrl = await getImageUri(
        //   data.avatarUrl,
        //   data.fullName,
        //   'Profile-Pictures',
        // );

        // data.avatarUrl = downloadedUrl;
        userData = {
          account: data.account,
          password: data.password,
          city: data.city,
          country: data.country,
          date: new Date(),
          myShops: [shopObj],
          streetAddress: data.streetAddress,
          postalCode: data.postalCode,
          province: data.province,
          registrationType: data.registrationType,
          mobileNumber: data.mobileNumber,
          email: data.email,
          familyName: data.familyName,
          givenName: data.givenName,
          fullName: data.fullName,
          permissions: [],
          photoURL: '',
          uid: response.user.uid,
          // avatarUrl: data.avatarUrl,
          userCategory: data.userCategory,
          status: 'Active',
        };
        await auth().signInWithEmailAndPassword(data.email, data.password);
      } else {
        const credentials = data.credentials;
        const response = await auth().signInWithCredential(credentials);
        delete data.credentials;

        const shopObj = await onCreateShop(data.store, response.user.uid);

        userData = {
          account: data.account,
          password: data.password,

          city: data.city,
          country: data.country,
          date: new Date(),
          registrationType: data.registrationType,
          myShops: [shopObj],
          streetAddress: data.streetAddress,
          postalCode: data.postalCode,
          province: data.province,
          mobileNumber: data.mobileNumber,
          permissions: [],
          email: data.email,
          familyName: data.familyName,
          givenName: data.givenName,
          fullName: data.fullName,
          photoURL: data.photoURL,
          uid: response.user.uid,
          avatarUrl: data.avatarUrl,
          userCategory: data.userCategory,
          status: 'Active',
        };
      }
      firestore()
        .collection('Users')
        .doc(userData.uid)
        .set(userData)
        .then(async () => {
          dispatch(AuthActions.onLogin(userData));
          setModal(false);
          navigate(ROUTES.SuccessRegistration);
        });
    } catch (error) {
      dispatch(AuthActions.errorRegistration());
      Errors({message: error.message});
    }
  };

  register();
};
export const onUserCompleteRegistration = (data, navigate, setModal) => async (
  dispatch,
) => {
  try {
    let userData;
    data.account === 'Client' ? (data.myShops = []) : null;

    if (data.registrationType === `EmailPassword`) {
      const response = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      // const downloadedUrl = await getImageUri(
      //   data.avatarUrl,
      //   data.fullName,
      //   'Profile-Pictures',
      // );

      // data.avatarUrl = downloadedUrl;
      userData = {
        account: data.account,
        password: data.password,

        city: data.city,
        country: data.country,
        date: new Date(),
        myShops: data.myShops,
        streetAddress: data.streetAddress,
        suburb: data.suburb,
        postalCode: data.postalCode,
        province: data.province,
        registrationType: data.registrationType,
        mobileNumber: data.mobileNumber,
        email: data.email,
        familyName: data.familyName,
        givenName: data.givenName,
        fullName: data.fullName,
        permissions: [],
        photoURL: '',
        uid: response.user.uid,
        // avatarUrl: data.avatarUrl,
        userCategory: data.userCategory,
        status: 'Active',
      };
      await auth().signInWithEmailAndPassword(data.email, data.password);
    } else {
      const credentials = data.credentials;
      const response = await auth().signInWithCredential(credentials);
      delete data.credentials;
      userData = {
        account: 'Users',
        city: data.city,
        country: data.country,
        password: data.password,

        date: new Date(),
        registrationType: data.registrationType,
        myShops: data.myShops,
        streetAddress: data.streetAddress,
        postalCode: data.postalCode,
        province: data.province,
        mobileNumber: data.mobileNumber,
        permissions: [],
        email: data.email,
        familyName: data.familyName,
        givenName: data.givenName,
        fullName: data.fullName,
        photoURL: data.photoURL,
        uid: response.user.uid,
        avatarUrl: data.avatarUrl,
        userCategory: data.userCategory,
        status: 'Active',
      };
    }
    userData.adminID = data.adminLink;
    firestore()
      .collection('Users')
      .doc(userData.uid)
      .set(userData)
      .then(async () => {
        dispatch(AuthActions.onLogin(userData));
        setModal(false);
        navigate(ROUTES.SuccessRegistration);
      });
  } catch (error) {
    dispatch(AuthActions.errorRegistration());
    Errors({message: error.message});
  }
};
export const onLoadUser = (userid, callback) => async (dispatch) => {
  try {
    await firestore()
      .collection('Users')
      .doc(userid)
      .get()
      .then((response) => {
        dispatch(AuthActions.onLogin(response.data()));
        callback(response.data().account, response.data().myShops);
      });
  } catch (error) {
    Errors({message: error.message});
    console.log(' error',error);

  }
};

// ADDITIONAL FUNCTIONS
export const onCreateShop = async (data, id) => {
  data.createdAt = new Date();
  data.ownerID = [id];
  data.creator = id;
  data.storeType = {name: data.storeType.name};
  data.products = 0;
  data.weeksStartingDate = new Date(moment().weekday(1));
  data.weeksStartingDayName = moment().weekday(1).format('dddd');
  data.weekNumber = 1;
  data.currentWeekFirstDay = new Date(moment().weekday(1));
  data.mondayCreatedAt = new Date(moment().weekday(1).setHours(-24, 0, 0, 0));
  data.currentWeekLastDay = new Date(
    moment(moment().weekday(1)).add(7, 'days'),
  );
  const docref = await firestore().collection('Shops').add(data);
  return {id: docref.id, name: data.name, type: data.storeType};
};

export const onConnectingStoreRegistration = (data, navigate, setModal) => (
  dispatch,
) => {
  const register = async () => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );

      const userData = {
        account: data.account,
        city: data.city,
        country: data.country,
        password: data.password,

        date: new Date(),
        myShops: [data.store],
        streetAddress: data.streetAddress,
        postalCode: data.postalCode,
        province: data.province,
        registrationType: data.registrationType,
        mobileNumber: data.mobileNumber,
        email: data.email,
        familyName: data.familyName,
        givenName: data.givenName,
        fullName: data.fullName,
        permissions: [],
        photoURL: '',
        uid: response.user.uid,
        // avatarUrl: data.avatarUrl,
        userCategory: data.userCategory,
        status: 'Active',
      };
      await auth().signInWithEmailAndPassword(data.email, data.password);
      console.log(userData);
      firestore()
        .collection('Users')
        .doc(userData.uid)
        .set(userData)
        .then(async () => {
          await firestore()
            .collection('Shops')
            .doc(data.store.id)
            .update({
              ownerID: firebase.firestore.FieldValue.arrayUnion(userData.uid),
            });

          dispatch(AuthActions.onLogin(userData));
          setModal(false);
          navigate(ROUTES.SuccessRegistration);
        });
    } catch (error) {
      dispatch(AuthActions.errorRegistration());
      Errors({message: error.message});
    }
  };

  register();
};

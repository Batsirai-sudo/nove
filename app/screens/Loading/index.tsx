import React, {useEffect, useCallback, memo, useState, useContext} from 'react';
import {
  StatusBar,
  View,
  BackHandler,
  Dimensions,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {ROUTES} from '@config';
import {CommonActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {AuthActionsCreators} from '@actions';
import VersionCheck from 'react-native-version-check';
import {
  Modal,
  ModalContent,
  SlideAnimation,
  ModalTitle,
  ModalFooter,
  ModalButton,
} from 'react-native-modals';
import {TextComponent as Text} from '@components';
import styles from './styles';
import SplashScreen from 'react-native-splash-screen';
import {FONTS} from '@utils';
import {UIActivityIndicator} from 'react-native-indicators';
import {AuthContext} from '@context';

const Loading = memo((props) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const {connectingShop, loginConnectAdmin} = React.useContext(AuthContext);
  let counter = 0;
  const [modalVisible, setModalVisible] = useState(false);
  const [storeLink, setStoreLink] = useState(false);
  const onAuthChange = useCallback(async (user) => {
    counter++;
    if (counter === 1) {
      user
        ? await dispatch(
            AuthActionsCreators.onLoadUser(user.uid, (response, myShops) => {
              response === 'Admin'
                ? (async () => {
                    loginConnectAdmin.status
                      ? (() => {
                          if (
                            myShops
                              .map((x) => x.id)
                              .includes(loginConnectAdmin.shopId)
                          ) {
                            console.log('already connected');
                            return nav.dispatch(
                              CommonActions.reset({
                                index: 1,
                                routes: [{name: ROUTES.AdminStack}],
                              }),
                            );
                          }

                          connectingShop({
                            id: user.uid,
                            data: loginConnectAdmin.data,
                            shopId: loginConnectAdmin.shopId,
                          })
                            .then((x) => {
                              nav.dispatch(
                                CommonActions.reset({
                                  index: 1,
                                  routes: [{name: ROUTES.AdminStack}],
                                }),
                              );
                            })
                            .catch((err) => {
                              alert(err.message);
                            });
                        })()
                      : nav.dispatch(
                          CommonActions.reset({
                            index: 1,
                            routes: [{name: ROUTES.AdminStack}],
                          }),
                        );
                  })()
                : null;

              response === 'Worker' || response === 'Client'
                ? nav.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: ROUTES.ClientStack}],
                    }),
                  )
                : null;
            }),
          )
        : nav.dispatch(
            CommonActions.reset({
              index: 1,
              // routes: [{name: ROUTES.FirstScreen}],
              routes: [{name: ROUTES.Tour}],
            }),
          );
    }
  });

  const Footer = () => {
    return (
      <ModalFooter>
        <ModalButton
          textStyle={{
            color: 'blue',
            fontWeight: '100',
            fontSize: 14,
            fontFamily: FONTS.Regular,
          }}
          bordered={true}
          text={'Update'}
          onPress={() => {
            BackHandler.exitApp();

            Linking.openURL(storeLink);
          }}
        />
        <ModalButton
          textStyle={{
            color: 'red',
            fontWeight: '100',
            fontSize: 14,
            fontFamily: FONTS.Regular,
          }}
          text={'Cancel'}
          onPress={() => {
            BackHandler.exitApp();
          }}
        />
      </ModalFooter>
    );
  };

  const Title = () => {
    return (
      <ModalTitle
        textStyle={{fontFamily: FONTS.Regular}}
        title={'Update Required'}
      />
    );
  };

  const AnimationType = () => {
    return new SlideAnimation({
      initialValue: 0, // optional
      slideFrom: 'bottom', // optional
      useNativeDriver: true, // optional
    });
  };

  const renderContent = () => {
    return (
      <ModalContent
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          top: 10,
        }}>
        <Text>
          A new update for{' '}
          <Text semibold primaryColor>
            instore
          </Text>{' '}
          is available
        </Text>
        <Text>please update to continue.</Text>
      </ModalContent>
    );
  };

  useEffect(() => {
    SplashScreen.hide();
    // const subscriber = auth().onAuthStateChanged(onAuthChange);
    VersionCheck.needUpdate().then(async (res) => {
      if (res) {
        if (res.isNeeded) {
          setStoreLink(res.storeUrl);
          setModalVisible(true);
        }
        if (!res.isNeeded) {
          try {
            const subscriber = auth().onAuthStateChanged(onAuthChange);
            return subscriber; // unsubscribe on unmount
          } catch (err) {
            alert(err.message);
          }
        }
      } else {
        // const subscriber = auth().onAuthStateChanged(onAuthChange);
        // return subscriber; // unsubscribe on unmount
        setModalVisible(true);
      }
    });
    // return subscriber; // unsubscribe on unmount

    // FullScreen.onFullScreen();
    // auth().signOut();
    // console.log(VersionCheck.getPackageName());
    // console.log(VersionCheck.getCurrentBuildNumber()); // 10
    // console.log(VersionCheck.getCurrentVersion()); // 0.1.1
    // VersionCheck.getLatestVersion().then((latestVersion) => {
    //   console.log(latestVersion); // 0.1.2
    // });
  }, []);

  return (
    // <ToggleView>
    <View>
      <Modal
        visible={modalVisible}
        footer={Footer()}
        onTouchOutside={() => {
          setModalVisible(true);
          BackHandler.exitApp();
        }}
        width={Dimensions.get('window').width - 60}
        height={180}
        modalTitle={Title()}
        modalAnimation={AnimationType()}
        swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
        swipeThreshold={200} // default 100
        onSwipeOut={() => {
          setModalVisible(true);
          BackHandler.exitApp();
        }}>
        {renderContent()}
      </Modal>

      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'#fff'}
      />
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#556084', fontSize: 20, right: -90}}>
            Loading Store ...
          </Text>
          {/* <ActivityIndicator
            animating
            size="large"
            style={{left: 10}}
            color="#556084"
          /> */}
          <UIActivityIndicator
            color="#556084"
            size={30}
            // dotRadius={10}
          />
        </View>
      </View>
    </View>
    // </ToggleView>
  );
});

export default Loading;

// const checKUpdates = () => {
//   // VersionCheck.getLatestVersion({
//   //   provider: 'appStore', // for iOS
//   // }).then((latestVersion) => {
//   //   console.log(latestVersion); // 0.1.2
//   // });

//   // VersionCheck.getLatestVersion({
//   //   provider: 'playStore', // for Android
//   // }).then((latestVersion) => {
//   //   console.log(latestVersion); // 0.1.2
//   // });

//   // VersionCheck.getLatestVersion() // Automatically choose profer provider using `Platform.select` by device platform.
//   //   .then((latestVersion) => {
//   //     console.log(latestVersion); // 0.1.2
//   //   });

//   VersionCheck.getLatestVersion({
//     forceUpdate: true,
//     provider: () =>
//       fetch('http://your.own/api')
//         .then((r) => r.json())
//         .then(({version}) => version), // You can get latest version from your own api.
//   }).then((latestVersion) => {
//     console.log(latestVersion);
//   });

//   VersionCheck.needUpdate().then(async (res) => {
//     console.log(res.isNeeded); // true
//     if (res.isNeeded) {
//       Linking.openURL(res.storeUrl); // open store if update is needed.
//     }
//   });

//   VersionCheck.needUpdate({
//     depth: 2,
//   }).then((res) => {
//     console.log(res.isNeeded);
//     // false; because first two fields of current and the latest versions are the same as "0.1".
//   });

//   VersionCheck.needUpdate({
//     currentVersion: '1.0',
//     latestVersion: '2.0',
//   }).then((res) => {
//     console.log(res.isNeeded); // true
//   });

//   VersionCheck.needUpdate({
//     depth: 1,
//     currentVersion: '2.1',
//     latestVersion: '2.0',
//   }).then((res) => {
//     console.log(res.isNeeded); // false
//   });
// };

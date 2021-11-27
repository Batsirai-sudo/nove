import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {AuthContext} from '@context';
import LinearGradient from 'react-native-linear-gradient';
import {
  TextComponent as Text,
  Errors,
  CustomProgressBar,
  Dialog,
} from '@components';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import _ from 'lodash';

const index = ({route}) => {
  const {
    getAdminLink,
    getSpecificshop,
    connectingShop,
    setConnectRegisterWithAdmin,
    getUserType,
    setLoginConnectAdmin,
  } = React.useContext(AuthContext);
  const {navigate} = useNavigation();
  const [shop, setShop] = useState({});
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [waiting, setwaiting] = useState(true);

  useEffect(() => {
    SplashScreen.hide();

    if (typeof route.params !== 'undefined') {
      getAdminLink(route.params.shopid);
      getSpecificshop(route.params.shopid).then((x) => {
        setShop({...x.data(), id: x.id});
        _.isEmpty(user) ? setDialogVisible(true) : null;
        setwaiting(false);
      });
    } else {
    }
  }, []);

  const connect = () => {
    const status = _.isEmpty(user);
    if (status) {
      return setDialogVisible(true);
      // return Errors({
      //   message: 'Login required',
      //   onPress: () => {
      //     navigate(ROUTES.Login);
      //   },
      //   description:
      //     'You need to login first to connect your to the shop! Click here to Login',
      // });
    }

    if (user.myShops.map((x) => x.id).includes(shop.id)) {
      return Errors({
        message: 'Connecting Rejected',
        onPress: () => {
          navigate(ROUTES.Loading);
        },
        description:
          'You cannot connect to this shop because you already manage this shop! Click here to continue',
      });
    }
    setIsLoading(true);
    connectingShop({
      id: user.uid,
      data: {
        name: shop.name,
        id: shop.id,
        type: {name: shop.storeType.name},
      },
      shopId: route.params.shopid,
    })
      .then((x) => {
        setIsLoading(false);
        navigate(ROUTES.Loading);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Dialog
        title="Alert"
        titleTextStyles={{color: 'red'}}
        content={
          'It seems you are not signed in this Device, so can you login if you have an acoount  or Register with this shop to get started'
        }
        firstButtontext="Login"
        firstButtonTextStyles={{color: 'red'}}
        firstButtonOnPress={() => {
          setDialogVisible(false);
          setLoginConnectAdmin({
            status: true,
            id: '',
            data: {
              name: shop.name,
              id: shop.id,
              type: {name: shop.storeType.name},
            },
            shopId: route.params.shopid,
          });
          navigate(ROUTES.Login);
          // deletProduct();
        }}
        secondButtontext="Register Store"
        secondButtonOnPress={() => {
          getUserType({type: 'Admin'});

          setConnectRegisterWithAdmin({
            status: true,
            data: {
              name: shop.name,
              id: shop.id,
              type: {name: shop.storeType.name},
            },
          });
          setDialogVisible(false);
          navigate(ROUTES.RegisterAccount);
        }}
        onSwipefunc={() => setDialogVisible(false)}
        onTouchOutside={() => setDialogVisible(false)}
        modalVisible={dialogVisible}
        height={200}
      />
      <CustomProgressBar
        category={2}
        loaderText="Connecting..."
        loader={7}
        width={120}
        height={100}
        visible={isLoading}
      />
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        width={120}
        height={100}
        visible={waiting}
      />
      <View style={{marginVertical: 50}}>
        <Text>You are about to connect to </Text>
        <Text semibold style={{textAlign: 'center', marginTop: 10}}>
          {' '}
          {shop.name} Shop
        </Text>
      </View>
      <TouchableOpacity onPress={connect} style={{width: '80%'}}>
        <LinearGradient
          style={{
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          colors={['#F05F3E', '#ED3269']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
            }}>
            Connect Shop
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

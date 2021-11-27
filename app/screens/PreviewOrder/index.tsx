import React, {useCallback, useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {
  SaveButton,
  FloatButton,
  CustomProgressBar,
  TextComponent,
  CreateOrderPreviewItem,
  HeaderReward,
} from '@components';
import {dimensions, FONTS} from '@utils';
import {keyExtractor} from '@helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {currencyFormatter} from '@config';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {ROUTES, uniqueid, resetToHome} from '@config';
import {useSelector} from 'react-redux';
import {CommonContext} from '@context';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const {height_screen, width_screen} = dimensions;

const PreviewOrder = () => {
  const {navigate, dispatch} = useNavigation();
  const navigation = useNavigation();
  const order = useSelector((state) => state.admin.order);
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState(order.productsData);
  const [orderNumber, setOrderNumber] = useState(uniqueid(6));
  const {requestOrder, sendShopOrder} = useContext(CommonContext);
  const [modal, setModal] = useState(false);

  const renderItem = useCallback(({item}) => {
    const {value, name, amount, mass, InCase} = item;
    return (
      <CreateOrderPreviewItem
        titlePost={name}
        quantity={`x ${value}`}
        amount={currencyFormatter(amount)}
        mass={mass}
        Incase={InCase}
      />
    );
  }, []);

  const onConvertToPDF = useCallback(() => {
    navigate(ROUTES.ConvertToPdf);
    // navigate(ROUTES.SuccessOrder)
    // dispatch(AdminActions.onCreateBatchOrderPdf(pets));
    // navigation.navigate(ROUTES.ConvertBatchToPDF);
  }, []);

  useEffect(() => {}, []);

  const onSendOrder = async () => {
    setModal(true);
    const adminID = order.admin.adminID;
    const adimFullName = order.admin.fullName;
    const shopID = order.shop.shopID;
    const storeType = order.shop.storeType;
    const shopName = order.shop.name;

    delete order.admin;
    delete order.shop;

    const orderData = {
      ...order,
      createdAt: new Date(),
      orderNumber: orderNumber,
      invoice: uniqueid(10),
      userId: user.uid,
      fullName: user.fullName,
      mobile: user.mobileNumber,
      userCategory: user.userCategory,
      seen: false,
      status: 'Pending',
      orderType: order.type,
      adminID,
      month: moment().format('MMMM'),
      metadata: {
        adminID,
        adimFullName,
        shopID,
        storeType,
        shopName,
      },
    };

    try {
      orderData.orderType === 'User_Orders'
        ? await requestOrder(orderData).then(() => {
            setModal(false);
            const params = {
              orderData: {
                orderType: order.type,
                orderNumber: orderNumber,
                amount: order.totalAmount,
              },
            };
            resetToHome(navigation, 'PreviewOrder', params);
          })
        : null;
      orderData.orderType === 'Stock'
        ? await sendShopOrder(orderData).then(() => {
            setModal(false);
            const params = {
              orderData: {
                orderType: order.type,
                orderNumber: orderNumber,
                amount: order.totalAmount,
              },
            };
            resetToHome(navigation, 'PreviewOrder', params);
          })
        : null;

      //     import { CommonActions } from '@react-navigation/native';

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [
      //       { name: 'Home' },
      //       {
      //         name: 'Profile',
      //         params: { user: 'jane' },
      //       },
      //     ],
      //   })
      // );

      // import { CommonActions } from '@react-navigation/native';

      // navigation.dispatch(
      //   CommonActions.navigate({
      //     name: 'Profile',
      //     params: {
      //       user: 'jane',
      //     },
      //   })
      // );

      // navigate(ROUTES.SuccessOrder, {
      //   ,
      // });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{height: '100%'}}>
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        visible={modal}
      />
      <HeaderReward amount={order.totalAmount} />

      <View
        style={[
          styles.inputShape,
          {
            top: -0.03 * height_screen,
            marginHorizontal: 0.05 * width_screen,
            elevation: 5,
            zindex: 1,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View>
            <TextComponent bold style={styles.topText}>
              {order.totalItems}
            </TextComponent>
            <TextComponent style={styles.topTextSub}>Total items</TextComponent>
          </View>
          <View style={{height: 40, width: 1, backgroundColor: '#000'}}></View>
          <View>
            <TextComponent bold style={styles.topText}>
              #{orderNumber}
            </TextComponent>
            <TextComponent style={styles.topTextSub}>
              {order.type === 'Stock' ? 'Stock Order Number' : 'Order Number'}
            </TextComponent>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.inputShape,
          {
            top: -0.105 * height_screen,
            zIndex: -1,
            marginHorizontal: 0.08 * width_screen,
            elevation: 3,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View>
            <TextComponent>bhbh</TextComponent>
          </View>
          <View style={{height: 40, width: 1, backgroundColor: '#000'}}></View>
          <View>
            <TextComponent>bhbh</TextComponent>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
          ListFooterComponent={() => <View style={{height: 200}}></View>}
        />
      </View>
      <View
        style={{
          marginHorizontal: 10,
          bottom: 2,
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
        }}>
        <LinearGradient
          style={{
            // height: 45,
            // marginBottom: 40,
            // marginTop: 20,
            borderRadius: 10,

            // justifyContent: 'center',
            // alignItems: 'center',
          }}
          colors={['#F05F3E', '#ED3269']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}>
          <SaveButton
            title={'Request Order'}
            titleStyle={{textAlign: 'center'}}
            size="small"
            style={{alignItems: 'center'}}
            // loading={loading}
            buttonStyle={{
              backgroundColor: 'transparent',
              // width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              onSendOrder();
            }}
          />
        </LinearGradient>
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          borderRadius: 50,
          bottom: 100,
          right: 20,
          elevation: 10,
          zIndex: 100,

          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {}}>
        <LinearGradient
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          colors={['#F05F3E', '#ED3269']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}>
          <FontAwesome name="file-pdf-o" size={25} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
      {/* <FloatButton bottom={120} bgcolor="#ED3269" onPress={onConvertToPDF}>
        <FontAwesome5 name="file-pdf" size={30} color={iconColor} />
      </FloatButton> */}
    </View>
  );
};

export default PreviewOrder;

const styles = StyleSheet.create({
  footButton: {
    // flex: 1,
    marginHorizontal: 10,
    top: 50,
  },
  inputShape: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    flexDirection: 'row',
    height: 0.085 * height_screen,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0.04 * width_screen,
  },
  txtApply: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#ED3269',
  },
  topText: {textAlign: 'center'},
  topTextSub: {textAlign: 'center', color: '#353B48'},
  container: {
    top: -80,
    height: '70%',
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  block: {
    height: 200,
  },
  firsttxt: {
    fontWeight: '100',
    fontSize: 14,
  },
  secondtxt: {
    fontWeight: '100',
    fontSize: 14,
    color: 'red',
  },
});
//  "user": {"account": "User",
// "adminID":
// "HQUK6sXMZ9hqDOHmJywjyHIbbKb2",
// "city": "hwhwh",
//  "country": "hwhwh",
//  "date": [FirestoreTimestamp],
//  "email": "betterdaystech@gmail.com",
//   "familyName": "ORG",

//   "fullName": "BETTERDAYS ORG",
//    "givenName": "BETTERDAYS",
//     "idToken": "
//     ", "isSEO": false,
//      "mobileNumber": "0671254408",
//       "photoURL"
//       "policy": null,
//        "postalCode": "1632",
//        "providerId": "google.com",
//         "province": "Gauteng ",
//          "shopName": null,
//          "socialProviderId": "104204011469961583608",
//           "storeDetails": [Object],
//            "streetAddress": "192 lqaqa Tembisa ",
//             "streetAddress2": "Seotloana 660 Sparrow St",
//              "uid": "tr4QIDDRdySNvzFpz6WGoa7kDPQ2",
//               "userCategory": "User"}}}

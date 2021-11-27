import React, {useCallback, useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {
  SaveButton,
  Icon,
  Input,
  Search,
  IconRadio,
  Dialog,
  FloatButton,
  CustomProgressBar,
  TextComponent,
  CreateOrderPreviewItem,
  HeaderReward,
} from '@components';
import {dimensions, FONTS} from '@utils';
import {
  Modal,
  ModalContent,
  SlideAnimation,
  ModalTitle,
  ModalFooter,
  ModalButton,
  ScaleAnimation,
} from 'react-native-modals';
import {keyExtractor} from '@helpers';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Images} from '@config';
import {useNavigation} from '@react-navigation/native';
import {ROUTES, uniqueid} from '@config';
import {useSelector} from 'react-redux';
import {AdminContext} from '@context';
import moment from 'moment';

const {height_screen, width_screen} = dimensions;
const data = [
  {
    img: Images.heineken_bottle,
    titlePost: 'Heineken Bottle(12 x 650ml) - Case',
    timePost: 'SUN, MAR. 25  -  4:30 PM EST111111111',
    quantity: 'x 345',
    amount: 250,
    mass: '500ml',
    Incase: 12,
  },
  {
    img: Images.heineken_can,
    titlePost: 'Win 2 tickets to WWE @ MSG',
    quantity: 'x 345',
    amount: 250,
  },
  {
    titlePost: '"Bottled Art" Wine Painting\n' + ' Night',
    quantity: 'x 345',
    amount: 250,
  },
];
const PreviewOrder = () => {
  const {navigate, reset} = useNavigation();
  const order = useSelector((state) => state.admin.order);
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState(order.productsData);
  const [orderNumber, setOrderNumber] = useState(uniqueid(6));
  const {requestOrder} = useContext(AdminContext);
  const [modal, setModal] = useState(false);

  const renderItem = useCallback(({item}) => {
    // const {img, titlePost, timePost, quantity, amount, mass, Incase} = item;
    const {value, name, amount, mass, Incase} = item;
    return (
      <CreateOrderPreviewItem
        // img={img}
        titlePost={name}
        // timePost={timePost}
        quantity={`x ${value}`}
        amount={amount}
        mass={mass}
        Incase={Incase}
        // case={case}
      />
    );
  }, []);
  const iconColor = 'white';

  const onConvertToPDF = useCallback(() => {
    navigate(ROUTES.ConvertToPdf);
    // navigate(ROUTES.SuccessOrder)
    // dispatch(AdminActions.onCreateBatchOrderPdf(pets));
    // navigation.navigate(ROUTES.ConvertBatchToPDF);
  }, []);

  useEffect(() => {
    console.log('order', order);
  }, []);

  const onSendOrder = async () => {
    setModal(true);
    const orderData = {
      ...order,
      createAt: new Date(),
      orderNumber: orderNumber,
      invoice: uniqueid(10),
      userId: user.uid,
      adminID: user.adminID,
      userCategory: user.userCategory,
      seen: false,
      status: 'Pending',
      orderType: order.type,
      month: moment().format('MMMM'),
    };
    console.log(orderData);
    await requestOrder(orderData);
    setModal(false);
    navigate(ROUTES.SuccessOrder, {
      orderData: {
        orderType: order.type,
        orderNumber: orderNumber,
        amount: order.totalAmount,
      },
    });
  };

  return (
    <View style={{height: '100%'}}>
      <CustomProgressBar
        loaderText="Please wait..."
        loader={3}
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
          ListFooterComponent={() => (
            <>
              <View style={styles.block} />
            </>
          )}
        />
      </View>

      <FloatButton bottom={120} bgcolor="#ED3269" onPress={onConvertToPDF}>
        <FontAwesome5 name="file-pdf" size={30} color={iconColor} />
      </FloatButton>
      <View style={styles.footButton}>
        <SaveButton
          title={'Request Order'}
          size="small"
          // loading={loading}
          onPress={() => {
            onSendOrder();
          }}
        />
      </View>
    </View>
  );
};

export default PreviewOrder;

const styles = StyleSheet.create({
  footButton: {
    // flex: 1,
    marginHorizontal: 10,
    bottom: 0,
    position: 'absolute',
    width: '90%',
    alignSelf: 'center',
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

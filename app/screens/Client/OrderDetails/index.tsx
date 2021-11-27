import React, {useState, useContext, useEffect} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
  IconRadio,
  Errors,
  Loader,
  TextComponent,
  SearchBar,
  HotKeys,
  ActivityIndicator,
  ShimmerItemOrder,
  shimmerItemOrderHeight,
  ItemOrder,
  GrayCard,
  FloatButton,
} from '@components';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-shadow-cards';
import styles from './styles';
import {Colors, dimensions, FONTS} from '@utils';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ClientContext} from '@context';
import moment from 'moment';
import {currencyFormatter} from '@config';

const {width_screen, height_screen} = dimensions;
const OrderDetails = (props) => {
  const [elevation] = useState(5);
  const [orderUser, setOrderUser] = useState({});
  const {colors} = useTheme();
  const {mySelectedOrders} = useContext(ClientContext);

  useEffect(() => {
    console.log(mySelectedOrders.productsData);
    // props.navigation.setOptions({
    //   headerTitle: () => (
    //     <TextComponent
    //       style={{
    //         fontSize: 16,
    //         color: 'white',
    //       }}>
    //       {currentFromHomeOrders.orderNumber}
    //     </TextComponent>
    //   ),
    // });
    // getIndividualUser(currentFromHomeOrders.userId).then((res) => {
    //   console.log(currentFromHomeOrders);
    //   setOrderUser(res.data());
    // });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{}}>
        <View style={styles.topContainer}>
          {/* <View style={styles.topTitle}>
            <TextComponent semibold>Personal Information</TextComponent>
          </View> */}

          {/* <Card cornerRadius={2} elevation={elevation} style={styles.topCard}>
            <View style={styles.insideView}>
              <Image
                style={{left: 15, height: 50, width: 50, borderRadius: 50}}
                source={{uri: orderUser.photoURL}}
              />
            </View>
            <View style={styles.insideView}>
              <Ionicons
                name="person-circle-outline"
                size={24}
                color={'#7F8FA6'}
              />
              <TextComponent
                style={{
                  left: 15,
                  fontWeight: '500',
                  fontSize: 12,
                  color: '#000',
                }}>
                {orderUser.fullName}
              </TextComponent>
            </View>

            <View style={styles.insideView}>
              <FontAwesome name="phone" size={24} color={'#7F8FA6'} />
              <TextComponent
                style={{left: 15, fontWeight: '500', fontSize: 12}}>
                {orderUser.mobileNumber}
              </TextComponent>
            </View>
            <View style={styles.insideView}>
              <Ionicons name="mail-unread" size={24} color={'#7F8FA6'} />
              <TextComponent
                style={{
                  left: 15,
                  fontWeight: '500',
                  fontSize: 12,
                }}>
                {orderUser.email}
              </TextComponent>
            </View>
          </Card> */}

          <View style={{alignItems: 'center', top: 30}}>
            <View style={styles.topTitle2}>
              <TextComponent>Order Summary Details</TextComponent>
            </View>
            <View
              style={{
                width: width_screen - 20,

                borderWidth: 0.5,
                top: 5,
                borderRadius: 10,

                borderColor: '#BDBDBD',
              }}>
              <GrayCard secondary style={styles.greyBG}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextComponent semibold style={{fontSize: 12}}>
                    Invoice Number
                  </TextComponent>
                  <TextComponent style={{fontSize: 12}}>
                    # {mySelectedOrders.invoice}
                  </TextComponent>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <TextComponent semibold style={{fontSize: 12}}>
                    Order Number
                  </TextComponent>
                  <TextComponent style={{fontSize: 12}}>
                    # {mySelectedOrders.orderNumber}
                  </TextComponent>
                </View>

                <View
                  style={{
                    flexDirection: 'row',

                    marginTop: 15,
                  }}>
                  <TextComponent style={{fontSize: 12}}>
                    Admin Fullname :
                  </TextComponent>
                  <TextComponent ultraLight style={{left: 40, fontSize: 12}}>
                    {mySelectedOrders.metadata.adimFullName}
                  </TextComponent>
                </View>

                <View
                  style={{
                    flexDirection: 'row',

                    marginTop: 9,
                  }}>
                  <TextComponent style={{fontSize: 12}}>
                    Admin Shop :
                  </TextComponent>
                  <TextComponent ultraLight style={{left: 40, fontSize: 12}}>
                    {mySelectedOrders.metadata.shopName}
                  </TextComponent>
                </View>

                <View
                  style={{
                    flexDirection: 'row',

                    marginTop: 9,
                  }}>
                  <TextComponent style={{fontSize: 12}}>Time :</TextComponent>
                  <TextComponent ultraLight style={{left: 40, fontSize: 12}}>
                    {moment(mySelectedOrders.createAt.toDate()).format(
                      'HH:mm:ss a',
                    )}
                  </TextComponent>
                </View>

                <View
                  style={{
                    flexDirection: 'row',

                    marginTop: 9,
                  }}>
                  <TextComponent style={{fontSize: 12}}>Date :</TextComponent>
                  <TextComponent ultraLight style={{left: 40, fontSize: 12}}>
                    {moment(mySelectedOrders.createAt.toDate()).format(
                      'dddd Do MMM YYYY',
                    )}
                  </TextComponent>
                </View>
                <View
                  style={{
                    flexDirection: 'row',

                    marginTop: 9,
                  }}>
                  <TextComponent style={{fontSize: 12}}>Status :</TextComponent>
                  <TextComponent
                    ultraLight
                    style={{left: 40, fontSize: 12, color: 'orange'}}>
                    {mySelectedOrders.status}
                  </TextComponent>
                </View>
              </GrayCard>

              {mySelectedOrders.productsData.map((product) => (
                <View style={{paddingHorizontal: 10, marginTop: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 30,
                    }}>
                    <TextComponent style={{fontSize: 11}}>
                      {product.name} ( {product.mass} )
                    </TextComponent>
                    <TextComponent style={{fontSize: 11}}>
                      x {product.value}
                    </TextComponent>
                    <TextComponent style={{fontSize: 11, fontWeight: '600'}}>
                      {currencyFormatter(product.amount)}
                    </TextComponent>
                  </View>
                </View>
              ))}
              {/* <View style={{paddingHorizontal: 10, marginTop: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 30,
                  }}>
                  <TextComponent style={{fontSize: 11}}>
                    Batch Order
                  </TextComponent>
                  <TextComponent style={{fontSize: 11}}>x 25</TextComponent>
                  <TextComponent style={{fontSize: 11, fontWeight: '600'}}>
                    R 5000.00
                  </TextComponent>
                </View>
              </View>
              <View style={{paddingHorizontal: 10, marginTop: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 30,
                  }}>
                  <TextComponent style={{fontSize: 11}}>
                    Batch Order
                  </TextComponent>
                  <TextComponent style={{fontSize: 11}}>x 25</TextComponent>
                  <TextComponent style={{fontSize: 11, fontWeight: '600'}}>
                    R 5000.00
                  </TextComponent>
                </View>
              </View> */}

              <View
                style={{
                  paddingHorizontal: 10,
                  marginTop: 10,
                  borderTopWidth: 1,
                  marginHorizontal: 10,
                  paddingTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 40,
                  }}>
                  <TextComponent bold style={{fontSize: 11}}>
                    Total Amount
                  </TextComponent>

                  <TextComponent style={{fontSize: 11, fontWeight: '600'}}>
                    {currencyFormatter(mySelectedOrders.totalAmount)}
                  </TextComponent>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 10,
                  marginHorizontal: 20,
                  top: -10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 30,
                  }}>
                  <TextComponent bold style={{fontSize: 11}}>
                    Total Items
                  </TextComponent>

                  <TextComponent
                    style={{
                      fontSize: 11,
                      fontWeight: '600',
                      color: colors.primary,
                    }}>
                    {mySelectedOrders.totalItems}
                  </TextComponent>
                  <TextComponent style={{fontSize: 11, fontWeight: '600'}}>
                    ..................
                  </TextComponent>
                </View>
              </View>
            </View>
          </View>
          <View style={{height: 400}}></View>
        </View>
      </ScrollView>
      <FloatButton bottom={180}>
        <AntDesign name="edit" size={30} color="#fff" />
      </FloatButton>
      <FloatButton
        bottom={100}
        onPress={() => {
          alert(12);
        }}>
        <FontAwesome name="file-pdf-o" size={30} color="#fff" />
      </FloatButton>
    </View>
  );
};

export default OrderDetails;

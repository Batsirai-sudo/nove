import React, {useContext, useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import styles from './styles';
import {Images} from '@config';
import {useSelector} from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {FONTS} from '@utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {
  TextComponent,
  CardComponent,
  BottomModal,
  SearchBar,
  Header,
} from '@components';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import SplashScreen from 'react-native-splash-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '@utils';
import LottieView from 'lottie-react-native';
import {ClientContext, CommonContext} from '@context';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const filters = [
  {
    name: 'Last 7 days',
    status: '',
  },
  {
    name: 'Last Month',
    status: 'month',
  },
  {
    name: 'Last Year',
    status: 'year',
  },
];

const ClientHome = ({route, navigation}) => {
  const [elevation] = useState(0);
  const {getSpecificshop} = useContext(ClientContext);
  const {getMyCurrentShop} = useContext(CommonContext);
  const [shop, setShop] = useState([]);
  const [visible, setVisible] = useState(false);

  const [type, setType] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [filterType, setFilterType] = useState(filters[0].name);
  const {colors} = useTheme();
  const animation = useRef();
  const {navigate} = useNavigation();
  const setModalVisible = (value) => {
    setTimeout(() => {
      // setModal(false);
    }, 5000);
    setModal(value);
  };
  useEffect(() => {
    animation.current.play();
    // animation.current.pause();

    getSpecificshop().then((response) => {
      console.log(response.data());
      getMyCurrentShop({...response.data(), id: response.id});
      setShop(response.data());
      setVisible(true);
    });

    SplashScreen.hide();
  }, []);
  return (
    <View>
      {/* <StatusBar
        barStyle={'light-content'}
        translucent={true}
        hidden={false}
        backgroundColor="#ED3269"
      /> */}
      <Header
        leftComponent={
          <TouchableOpacity
            style={{
              // backgroundColor: 'red',
              left: -10,
              height: 50,
              width: 50,
              alignItems: 'center',
              top: -5,
              // justifyContent: 'center',
            }}
            onPress={() => navigation.openDrawer()}>
            <AntDesign style={{}} name="menu-unfold" size={24} color="white" />
          </TouchableOpacity>
        }>
        <View>
          <TextComponent bold style={{color: 'white', fontSize: 15}}>
            {user.userCategory}
          </TextComponent>
        </View>
        {/* <TouchableOpacity>
          <Entypo name="shopping-cart" size={30} color="white" />
          <View
            style={{
              borderRadius: 30,
              height: 20,
              width: 20,
              backgroundColor: 'white',
              top: -40,
              left: -15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextComponent bold>1</TextComponent>
          </View>
        </TouchableOpacity> */}
        {/* <LottieView
          ref={animation}
          source={require('./cart.json')}
          autoPlay
          loop
        /> */}
      </Header>

      <ScrollView
        contentContainerStyle={[
          styles.mainContainer,
          {backgroundColor: colors.thirdBackground},
        ]}>
        <View style={styles.topView}>
          {/* colors={[Colors.firstColorGradient, Colors.secondColorGradient]} */}

          {/* <TextComponent regular style={styles.greatingText}>
            Hie, {user.givenName}
          </TextComponent> */}
          {/* <Image source={Images.power} style={styles.power} /> */}
          <View>
            {/* <TextComponent regular style={styles.greatingText}>
              Hie, {user.givenName}
            </TextComponent> */}
            {/* <MaterialIcons
              style={styles.iconAccount}
              name="notifications-active"
              size={40}
              color="#37C2D0"
            /> */}

            {/* <View
              style={{
                position: 'absolute',
                backgroundColor: 'red',
                height: 18,
                width: 18,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'center',
                left: -5,
              }}>
              <Text style={{color: 'white'}}>1</Text>
            </View> */}
            {/* <Text style={[styles.accountText, {color: colors.primary}]}>
              {user.account}
            </Text> */}
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.container}>
            {[1].map((x, i) => (
              <ShimmerPlaceHolder
                key={i}
                visible={visible}
                shimmerStyle={{
                  // alignSelf: 'center',
                  marginHorizontal: 7,
                  marginVertical: 7,
                  borderRadius: 15,
                  width: 140,
                  height: 140,
                }}>
                {visible ? (
                  <CardComponent
                    // styles={{backgroundColor: '#f3f8e8'}}
                    isClients={false}
                    profits={shop.statistics.profits}
                    shopType={shop?.storeType?.name + ' ' + 'Shop'}
                    onPress={() => {
                      navigate(ROUTES.StoreManager);
                    }}>
                    <Ionicons name="ios-beer" size={24} color="white" />
                  </CardComponent>
                ) : null}
              </ShimmerPlaceHolder>
            ))}

            <CardComponent
              // styles={{backgroundColor: '#e2fcfb'}}
              // isClients={true}
              // notifications={true}
              onPress={() => {
                navigate(ROUTES.Expenses);
              }}
              // shopType="Grocery Shop"
              orders="EXPENSES "
              subtitle="& LOSSES">
              <MaterialCommunityIcons
                name="account-group"
                size={24}
                color="white"
              />
            </CardComponent>
          </View>

          <View style={styles.container}>
            <CardComponent
              // styles={{backgroundColor: '#eaeaf8'}}
              // isClients={true}
              onPress={() => {
                navigate(ROUTES.POSScreenTab);
                // navigate(ROUTES.ScanProducts);
              }}
              orders="POINT"
              subtitle="OF SELL">
              <Fontisto name="shopping-pos-machine" size={30} color="white" />
            </CardComponent>

            <CardComponent
              // styles={{backgroundColor: '#fce9fe'}}
              orders="CREATE"
              subtitle="ORDER"
              onPress={() => {
                navigate(ROUTES.CreateOrder);
              }}>
              <View>
                <Entypo name="plus" size={30} color="white" />
              </View>
            </CardComponent>
          </View>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <MaterialCommunityIcons
            style={styles.filter}
            name="tune"
            size={28}
            color="black"
          />
        </TouchableOpacity> */}
        <View>
          <View style={{flexDirection: 'row', marginTop: 50}}>
            <TextComponent bold style={{marginVertical: 10}}>
              Transactions
            </TextComponent>
            <TextComponent
              bold
              style={{marginVertical: 10, color: '#37C2D0', left: 10}}>
              (#12563)
            </TextComponent>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View
                style={{
                  height: 10,
                  backgroundColor: '#37C2D0',
                  width: 10,
                  borderRadius: 10,
                  marginLeft: -5,
                }}></View>
              <View
                style={{width: 1, backgroundColor: '#37C2D0', flexGrow: 1}}
              />
            </View>
            <View>
              <View>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={[styles.triangle, {borderBottomColor: '#eff0f4'}]}
                  />
                  <Card
                    elevation={elevation}
                    style={[
                      styles.cardNotification,
                      {backgroundColor: '#eff0f4'},
                    ]}>
                    <View
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#f6d3d4',
                          height: 25,
                          width: 25,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        <AntDesign name="infocirlce" color="grey" size={25} />
                      </View>
                      <Entypo
                        name="dots-three-vertical"
                        size={24}
                        color="#000"
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{left: 40}}>
                        <TextComponent bold>Account Created</TextComponent>
                        <View style={{width: '83%'}}>
                          <TextComponent style={{fontSize: 10}}>
                            Your Account was successfully created and was
                            verified.
                          </TextComponent>
                        </View>
                      </View>
                      <Entypo
                        name="chevron-right"
                        size={24}
                        style={{top: 10}}
                        color="#000"
                      />
                    </View>
                  </Card>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 5,
                    marginLeft: 20,
                  }}>
                  <TextComponent ultraLight style={{fontSize: 12}}>
                    Fri 12 Dec 2016
                  </TextComponent>
                  <View
                    style={{
                      elevation: 5,
                      borderRadius: 10,
                      height: 20,
                      width: 20,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextComponent bold style={{fontSize: 12}}>
                      1
                    </TextComponent>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#37C2D0',
                      height: 2,
                      width: '60%',
                    }}
                  />
                </View>
              </View>

              <View>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={[styles.triangle, {borderBottomColor: '#dbebdb'}]}
                  />
                  <Card
                    elevation={elevation}
                    style={[
                      styles.cardNotification,
                      {backgroundColor: '#dbebdb'},
                    ]}>
                    <View
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#f6d3d4',
                          height: 25,
                          width: 25,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 5,
                        }}>
                        <AntDesign
                          name="checkcircle"
                          color="#14d324"
                          size={25}
                        />
                      </View>
                      <Entypo
                        name="dots-three-vertical"
                        size={24}
                        color="#000"
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{left: 40}}>
                        <TextComponent bold>Account Created</TextComponent>
                        <View style={{width: '83%'}}>
                          <TextComponent style={{fontSize: 10}}>
                            Your Account was successfully created and was
                            verified.
                          </TextComponent>
                        </View>
                      </View>
                      <Entypo
                        name="chevron-right"
                        size={24}
                        style={{top: 10}}
                        color="#000"
                      />
                    </View>
                  </Card>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 5,
                    marginLeft: 20,
                  }}>
                  <TextComponent ultraLight style={{fontSize: 12}}>
                    Sat 01 April 2019
                  </TextComponent>
                  <View
                    style={{
                      elevation: 5,
                      borderRadius: 10,
                      height: 20,
                      width: 20,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextComponent bold style={{fontSize: 12}}>
                      2
                    </TextComponent>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#37C2D0',
                      height: 2,
                      width: '60%',
                    }}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={[styles.triangle, {borderBottomColor: '#fcdcda'}]}
                  />
                  <Card
                    elevation={elevation}
                    style={[
                      styles.cardNotification,
                      {backgroundColor: '#fcdcda'},
                    ]}>
                    <View
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#f6d3d4',
                          height: 25,
                          width: 25,
                          borderRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 5,
                        }}>
                        <Entypo
                          name="circle-with-cross"
                          color="#c63228"
                          size={25}
                        />
                      </View>
                      <Entypo
                        name="dots-three-vertical"
                        size={24}
                        color="#000"
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View style={{left: 40}}>
                        <TextComponent bold>Account Created</TextComponent>
                        <View style={{width: '83%'}}>
                          <TextComponent style={{fontSize: 10}}>
                            Your Account was successfully created and was
                            verified.
                          </TextComponent>
                        </View>
                      </View>
                      <Entypo
                        name="chevron-right"
                        size={24}
                        style={{top: 10}}
                        color="#000"
                      />
                    </View>
                  </Card>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 5,
                    marginLeft: 20,
                  }}>
                  <TextComponent ultraLight style={{fontSize: 12}}>
                    Mon 24 Jan 2016
                  </TextComponent>
                  <View
                    style={{
                      elevation: 5,
                      borderRadius: 10,
                      height: 20,
                      width: 20,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextComponent bold style={{fontSize: 12}}>
                      3
                    </TextComponent>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#37C2D0',
                      height: 2,
                      width: '60%',
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{height: 100}} />
        </View>
      </ScrollView>
      <View
        style={{
          width: 50,

          height: 50,
          position: 'absolute',
          top: 100,
          // backgroundColor: 'red',
          width: '100%',
          flexDirection: 'row',
        }}>
        <Card cornerRadius={25} style={{left: 15, height: 50, width: '75%'}}>
          <TouchableOpacity
            onPress={() => {
              navigate(ROUTES.SearchApp);
            }}>
            <SearchBar
              placeHolder={'Search App...'}
              editable={false}
              onChangeText={
                (value) => {}
                // handleFilter('search', value)
              }
              // onClear={setValue}
              onFocus={() => {
                // setValue(true);
              }}
            />
          </TouchableOpacity>
        </Card>
        <TouchableOpacity
          onPress={() => {
            navigate(ROUTES.Notifications);
          }}
          style={{width: '25%'}}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#E32378',
              height: 16,
              width: 16,
              borderRadius: 10,
              left: 25,
              top: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextComponent bold style={{fontSize: 10, color: '#fff'}}>
              1
            </TextComponent>
          </View>
          <LottieView
            ref={animation}
            source={require('./animation.json')}
            autoPlay
            loop
          />
        </TouchableOpacity>
      </View>

      <View style={{position: 'absolute', top: 30, zIndex: 100}}>
        <LottieView source={require('./animation.json')} autoPlay loop />
      </View>

      {/* 
      <View
        style={{
          backgroundColor: Colors.firstColorGradient,
          width: 50,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          height: 30,
          position: 'absolute',
          top: 0,
          left: 20,
        }}>
        <AntDesign
          style={{left: 15}}
          onPress={() => navigation.openDrawer()}
          name="menu-unfold"
          size={24}
          color="#fff"
        />
      </View> */}

      <BottomModal
        // visitModal={modal}
        setModalVisible={setModalVisible}
        filters={filters}
        valueSelect={type}
        clickFilter={(value) => {
          setType(value);
          if (value === '') {
            setFilterType(filters[0].name);
          }
          if (value === 'month') {
            setFilterType(filters[1].name);
          }
          if (value === 'year') {
            setFilterType(filters[2].name);
          }
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default ClientHome;

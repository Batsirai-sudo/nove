import React, {
  memo,
  useCallback,
  useContext,
  useState,
  useLayoutEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  StatusBar,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@client/Home';
import Search from '@screens/Search';
import RecordDeliveredDetails from '@screens/RecordDeliveredDetails';
import Notifications from '@screens/Notifications';
import Reports from '@screens/Reports';
import DeliveriesReportList from '@screens/DeliveriesReportList';
import Profile from '@screens/Profile';
import OrderDetails from '@client/OrderDetails';
import SearchApp from '@client/SearchApp';
import StartStockTaking from '@client/StartStockTaking';
import CreateOrder from '@client/CreateOrder';
import CreateOrder3 from '@client/CreateOrder3';
import PreviewOrder from '@client/PreviewOrder';
import ConvertToPdf from '@client/ConvertToPdf';
import Invoices from '@client/Invoices';
import Settings from '@screens/Settings';
import CreateOrderDetails from '@screens/CreateOrderDetails';
import CreateOrder2 from '@client/CreateOrder2';
import EditProduct from '@client/EditProduct';
import EditSettings from '@client/EditSettings';
import SelectDarkOption from '@screens/SelectDarkOption';
import SelectFontOption from '@screens/SelectFontOption';
import ThemeScreen from '@screens/ThemeScreen';
import AboutUs from '@screens/AboutUs';
import ProfitsDetails from '@screens/ProfitsDetails';
import ExpenseLossesSuccessfullRecorded from '@client/ExpenseLossesSuccessfullRecorded';
import FeedBack from '@screens/FeedBack';
import SingleCategory from '@screens/SingleCategory';
import Updates from '@screens/Updates';
import ProductDetails from '@screens/ProductDetails';
import ScanProducts from '@screens/ScanProducts';
import GetBarCode from '@screens/GetBarCode';
import ExpenseDetails from '@screens/ExpenseDetails';
import LossesDetails from '@screens/LossesDetails';
import Categories from '@screens/Categories';
import AddProducts from '@screens/AddProducts';
import StoreManager from '@client/StoreManager';
import Profits2 from '@screens/Profits2';
import Profits from '@screens/Profits';
import StockTaking from '@client/StockTaking';
import WriteStock from '@client/WriteStock';
import RecordDeliveredStock from '@screens/RecordDeliveredStock';
import Expenses from '@screens/Expenses';
import LossRecords from '@screens/LossRecords';
import TransactionsList from '@screens/TransactionsList';
import StockTakingList from '@screens/StockTakingList';
import ShopStockList from '@screens/ShopStockList';
import POSAmount from '@screens/POSAmount';
import POSHistory from '@screens/POSHistory';
import POSProducts from '@screens/POSProducts';
import ExpenseRecords from '@screens/ExpenseRecords';
import Previledges from '@screens/Previledges';
import OrderRecords from '@client/OrderRecords';
import Inbox from '@screens/Inbox';
import RecordDeliveredStockSuccess from '@screens/RecordDeliveredStockSuccess';

import Credits from '@client/Credits';
import MyOrders from '@client/MyOrders';
import SuccessOrder from '@screens/SuccessOrder';

import {ROUTES} from '@config';
import {headerBackground} from '@components';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TextComponent, Dialog} from '@components';
import Animated from 'react-native-reanimated';
import styles from './styles';
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {SvgHomeTab, SvgSeach, SvgProfile, SvgUsers} from '@svg-components';
import {
  CardStyleInterpolators,
  TransitionPresets,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {ClientProvider, ClientContext} from '../../context/clientContext';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {Colors, FONTS} from '@utils';
import {SvgSetting, SvgNotification} from '@svg-components';
import Icon from 'react-native-vector-icons/AntDesign';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Host} from 'react-native-portalize';

const ClientStackScreen = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStackScreen = createStackNavigator();
const MainStack = createStackNavigator();
const BottomTab = AnimatedTabBarNavigator();
const Tab = createMaterialTopTabNavigator();
const ProfitsTab = createMaterialTopTabNavigator();
const POSTab = createMaterialTopTabNavigator();

const POSScreenTab = memo(() => {
  return (
    <POSTab.Navigator
      lazy={true}
      tabBarOptions={{
        activeTintColor: '#ED3269',
        inactiveTintColor: '#7F8FA6',
        indicatorStyle: {
          backgroundColor: '#ED3269',
          width: 100,
          height: 4,
          left: 17,
        },
        labelStyle: {
          fontSize: 11,
          fontFamily: FONTS.Regular,
        },
        style: {
          marginTop: 50,
          elevation: -10,
        },
      }}>
      <POSTab.Screen
        options={{title: 'Amount'}}
        name={ROUTES.POSAmount}
        component={POSAmount}
      />
      <POSTab.Screen
        options={{tabBarLabel: 'Products'}}
        name={ROUTES.POSProducts}
        component={POSProducts}
      />
      {/* <POSTab.Screen
        options={{tabBarLabel: 'POSAmount'}}
        name={ROUTES.POSAmount}
        component={POSAmount}
      /> */}
      <POSTab.Screen
        options={{tabBarLabel: 'History'}}
        name={ROUTES.POSHistory}
        component={POSHistory}
      />
    </POSTab.Navigator>
  );
});
const TabProfile = memo(() => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ED3269',
        inactiveTintColor: '#7F8FA6',
        indicatorStyle: {
          backgroundColor: '#ED3269',
        },
      }}>
      <Tab.Screen
        name={ROUTES.MyOrders}
        options={{tabBarLabel: 'Orders'}}
        component={MyOrders}
      />
      <Tab.Screen name={ROUTES.Invoices} component={Invoices} />
      <Tab.Screen name={ROUTES.Credits} component={Credits} />
    </Tab.Navigator>
  );
});
const ProfitsProfile = memo(() => {
  return (
    <ProfitsTab.Navigator
      tabBarOptions={{
        activeTintColor: '#ED3269',
        inactiveTintColor: '#7F8FA6',
        indicatorStyle: {
          backgroundColor: '#ED3269',
        },
        labelStyle: {fontFamily: 'Montserrat-Regular'},
      }}>
      <ProfitsTab.Screen name={ROUTES.Profits} component={Profits} />
      <ProfitsTab.Screen
        options={{tabBarLabel: 'Reports'}}
        name={ROUTES.Profits2}
        component={Profits2}
      />
      {/* <Tab.Screen name={ROUTES.Credits} component={Credits} /> */}
    </ProfitsTab.Navigator>
  );
});

const BottomTabStack = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // navigation.setOptions({tabBarVisible: false});

    if (routeName === 'DrawerStack') {
      const backAction = () => {
        setModalVisible(true);

        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [route]);

  return (
    <>
      <Dialog
        content="Hold on!', 'Are you sure you want to Exit App?"
        title="Exit App"
        firstButtonOnPress={() => setModalVisible(false)}
        secondButtonOnPress={() => BackHandler.exitApp()}
        secondButtontext="Yes"
        modalVisible={modalVisible}
      />
      <BottomTab.Navigator
        screenOptions={{
          headerBackground: headerBackground,
          headerTintColor: '#FFF',
        }}
        initialRouteName={ROUTES.DrawerStack}
        appearence={{
          floating: true,
          horizontalPadding: 20,
          dotSize: 'small',
          whenActiveShow: 'icon-only',
          dotCornerRadius: 50,
        }}
        tabBarOptions={{
          activeTintColor: Colors.BOTTOM_TAB_ACTIVE,
          inactiveTintColor: Colors.BOTTOM_TAB_INACTIVE,
          activeBackgroundColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
          tabStyle: {
            top: -40,
            backgroundColor: Colors.WHITE_OPACITY,
            marginHorizontal: 100,
            height: 60,
          },
        }}>
        <BottomTab.Screen
          name="DrawerStack"
          component={DrawerStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackground,
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size}) => (
              <AntDesign
                name="home"
                color={focused ? color : '#222222'}
                size={24}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={ROUTES.Search}
          component={Search}
          options={{
            gestureEnabled: false,
            tabBarLabel: 'Search',
            unmountOnBlur: true,
            tabBarIcon: ({focused, color, size}) => (
              <SvgSeach color={focused ? color : '#222222'} />
            ),
          }}
        />

        <BottomTab.Screen
          name={ROUTES.Profile}
          component={Profile}
          options={{
            gestureEnabled: false,
            unmountOnBlur: true,
            tabBarLabel: 'Profile',
            tabBarIcon: ({focused, color, size}) => (
              <SvgProfile color={focused ? color : '#222222'} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

const DrawerContent = (props) => {
  const [iconSize] = useState(20);
  const {navigate} = useNavigation();

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        top: -40,
      }}>
      <View>
        <View>
          {/* <Image
            source={Images.facebook}
            resizeMode="center"
            style={styles.avatar}
          /> */}
        </View>
        <View>
          <DrawerItem
            label="Home"
            labelStyle={styles.drawerLabel}
            // focused={true}
            // style={styles.drawerItem}
            onPress={() => navigate(ROUTES.Home)}
            icon={() => <AntDesign name="home" color="white" size={iconSize} />}
          />
          {/* <DrawerItem
            label="Add Product"
            labelStyle={styles.drawerLabel}
            // focused={true}
            // style={styles.drawerItem}
            onPress={() => navigate(ROUTES.AddProducts)}
            icon={() => (
              <Fontisto
                name="shopping-basket-add"
                color="white"
                size={iconSize}
              />
            )}
          /> */}
          <DrawerItem
            label="My Orders"
            labelStyle={styles.drawerLabel}
            // focused={true}
            // style={styles.drawerItem}
            onPress={() => navigate(ROUTES.TabProfile)}
            icon={() => (
              <Ionicons name="documents" color="white" size={iconSize} />
            )}
          />
          {/* <DrawerItem
            label="Messages"
            labelStyle={{color: 'white', marginLeft: -16}}
            // style={{alignItems: 'flex-start', marginVertical: 0}}
            onPress={() => props.navigation.navigate('Messages')}
            icon={() => (
              <AntDesign name="message1" color="white" size={iconSize} />
            )}
          /> */}
        </View>
      </View>

      <View>
        <DrawerItem
          label="Categories"
          labelStyle={{color: 'white', marginLeft: -16}}
          icon={() => (
            <FontAwesome name="cubes" color="white" size={iconSize} />
          )}
          onPress={() => props.navigation.navigate(ROUTES.Categories)}
        />
      </View>
      <View>
        <DrawerItem
          label="Logout"
          labelStyle={{color: 'white', marginLeft: -16}}
          icon={() => <AntDesign name="logout" color="white" size={iconSize} />}
          onPress={() => alert('Are your sure to logout?')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerStack = ({route}) => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const navigation = useNavigation();

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};
  // useLayoutEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(route);
  //   // navigation.setOptions({tabBarVisible: false});
  //   console.log(route);

  //   if (routeName === 'Screens') {
  //     navigation.setOptions({tabBarVisible: false});
  //   } else {
  //     navigation.setOptions({tabBarVisible: true});
  //   }
  // }, [navigation, route]);
  return (
    <LinearGradient style={{flex: 1}} colors={['#ED3269', '#F05F3E']}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{flex: 1}}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={(props) => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="Screens">
          {(props) => <HomeStack {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};

const HomeStack = ({style, route}) => {
  const navigation = useNavigation();

  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <HomeStackScreen.Navigator
        headerMode="none"
        screenOptions={{
          headerBackground: headerBackground,
          headerTintColor: '#FFF',
          cardStyleInterpolator:
            CardStyleInterpolators.forRevealFromBottomAndroid,
        }}>
        <HomeStackScreen.Screen
          name={ROUTES.Home}
          component={Home}
          options={{
            title: 'fdf',
            headerRight: () => (
              <View style={styles.headeRight}>
                <View style={styles.btnNotification}>
                  <TouchableOpacity onPress={() => {}}>
                    <SvgNotification />
                  </TouchableOpacity>
                  <View style={styles.notification}>
                    <Text style={styles.txtNotification}>1</Text>
                  </View>
                </View>
              </View>
            ),

            headerLeft: () => (
              <Icon
                style={{left: 15}}
                onPress={() => navigation.openDrawer()}
                name="menu-unfold"
                size={24}
                color="white"
              />
            ),
          }}
        />
      </HomeStackScreen.Navigator>
    </Animated.View>
  );
};

function ClientStack() {
  // const navigation = useNavigation();
  // alert(52);
  // // const {addCategory} = useContext(AdminContext);
  // setTimeout(() => {
  //   console.log(useContext(AdminContext));
  // }, 5000);
  const forFade = ({current, closing}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <ClientProvider>
      <Host>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <MainStack.Navigator
          screenOptions={{
            gestureEnabled: true,
            headerBackground: headerBackground,
            headerTintColor: '#FFF',
            ...TransitionPresets.RevealFromBottomAndroid,

            // cardStyleInterpolator:
            //   CardStyleInterpolators.forRevealFromBottomAndroid,
            // headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            // ...TransitionPresets.ModalPresentationIOS,
            // headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            // headerRight: () => (
            //   <TouchableOpacity style={{left: -20, top: 10}}>
            //     <Entypo name="shopping-cart" size={20} color="white" />
            //     <View
            //       style={{
            //         borderRadius: 30,
            //         height: 15,
            //         width: 15,
            //         backgroundColor: 'white',
            //         top: -30,
            //         left: -15,
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //       }}>
            //       <TextComponent bold>1</TextComponent>
            //     </View>
            //   </TouchableOpacity>
            // ),
            // gestureEnabled: false,
            // ...TransitionPresets.SlideFromRightIOS,
            // ...TransitionPresets.ModalSlideFromBottomIOS,
            // ...TransitionPresets.RevealFromBottomAndroid,
            // ...TransitionPresets.ModalPresentationIOS,
          }}
          initialRouteName="BottomTabStack">
          <MainStack.Screen
            options={{title: '', headerShown: false}}
            name="BottomTabStack"
            component={BottomTabStack}
          />
          <MainStack.Screen
            name={ROUTES.Notifications}
            component={Notifications}
            options={{
              title: '',
            }}
          />
          <MainStack.Screen
            name={ROUTES.RecordDeliveredStockSuccess}
            component={RecordDeliveredStockSuccess}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.CreateOrderDetails}
            component={CreateOrderDetails}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.CreateOrder2}
            component={CreateOrder2}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.EditProduct}
            component={EditProduct}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.SearchApp}
            component={SearchApp}
            options={{
              title: '',
            }}
          />
          <MainStack.Screen
            name={ROUTES.DeliveriesReportList}
            component={DeliveriesReportList}
            options={{
              title: '',
            }}
          />
          <MainStack.Screen
            name={ROUTES.CreateOrder}
            component={CreateOrder}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.CreateOrder3}
            component={CreateOrder3}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.PreviewOrder}
            component={PreviewOrder}
            options={{
              title: '',

              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.ConvertToPdf}
            component={ConvertToPdf}
            options={{
              title: '',
            }}
          />

          <MainStack.Screen
            name={ROUTES.ShopStockList}
            component={ShopStockList}
            options={{
              title: '',
            }}
          />
          <MainStack.Screen
            name={ROUTES.StockTakingList}
            component={StockTakingList}
            options={{
              title: '',
            }}
          />
          <MainStack.Screen
            name={ROUTES.TransactionsList}
            component={TransactionsList}
            options={{
              title: '',
            }}
          />

          <MainStack.Screen
            name={ROUTES.OrderDetails}
            component={OrderDetails}
            options={{
              title: '',
            }}
          />
          <MainStack.Screen
            name={ROUTES.Reports}
            component={Reports}
            options={{
              title: '',

              // headerShown: false,
            }}
          />

          <MainStack.Screen
            name={ROUTES.SuccessOrder}
            component={SuccessOrder}
            options={{
              title: '',

              headerShown: false,
            }}
          />

          <MainStack.Screen
            name={ROUTES.TabProfile}
            component={TabProfile}
            options={{
              title: '',
            }}
          />
          <MainStack.Screen
            name={ROUTES.Settings}
            component={Settings}
            options={{
              title: '',
            }}
          />
          <MainStack.Screen
            name={ROUTES.EditSettings}
            component={EditSettings}
            options={{
              title: '',
            }}
          />

          <MainStack.Screen
            options={{
              headerShown: false,
              title: '',
            }}
            name={ROUTES.AboutUs}
            component={AboutUs}
          />
          <MainStack.Screen
            options={{
              title: '',
            }}
            name={ROUTES.SingleCategory}
            component={SingleCategory}
          />
          <MainStack.Screen
            options={{
              headerTitle: () => (
                <TextComponent
                  style={{color: 'white', alignSelf: 'center', left: -30}}>
                  FeedBack
                </TextComponent>
              ),
            }}
            name={ROUTES.FeedBack}
            component={FeedBack}
          />
          <MainStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name={ROUTES.Updates}
            component={Updates}
          />
          <MainStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name={ROUTES.Inbox}
            component={Inbox}
          />
          <MainStack.Screen
            options={{
              title: '',
            }}
            name={ROUTES.ThemeScreen}
            component={ThemeScreen}
          />
          <MainStack.Screen
            name={ROUTES.SelectDarkOption}
            component={SelectDarkOption}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.SelectFontOption}
            component={SelectFontOption}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.Categories}
            component={Categories}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.AddProducts}
            component={AddProducts}
            options={{
              headerTitle: () => (
                <TextComponent style={{color: 'white'}}>
                  Add products
                </TextComponent>
              ),
            }}
          />
          <MainStack.Screen
            name={ROUTES.ScanProducts}
            component={ScanProducts}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.GetBarCode}
            component={GetBarCode}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.ExpenseLossesSuccessfullRecorded}
            component={ExpenseLossesSuccessfullRecorded}
            options={{
              headerShown: false,
            }}
          />

          <MainStack.Screen
            name={ROUTES.ProductDetails}
            component={ProductDetails}
            options={{
              headerRight: null,
              title: '',
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.StoreManager}
            component={StoreManager}
            options={{
              headerRight: null,
              title: '',
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.StockTaking}
            component={StockTaking}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              // headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.RecordDeliveredStock}
            component={RecordDeliveredStock}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.Expenses}
            component={Expenses}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              // headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.ProfitsProfile}
            component={ProfitsProfile}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              // headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.RecordDeliveredDetails}
            component={RecordDeliveredDetails}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.WriteStock}
            component={WriteStock}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.ExpenseDetails}
            component={ExpenseDetails}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              // headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.LossesDetails}
            component={LossesDetails}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              // headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.ProfitsDetails}
            component={ProfitsDetails}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              // headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.StartStockTaking}
            component={StartStockTaking}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              // headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.LossRecords}
            component={LossRecords}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.ExpenseRecords}
            component={ExpenseRecords}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.Previledges}
            component={Previledges}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              // headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.POSScreenTab}
            component={POSScreenTab}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name={ROUTES.OrderRecords}
            component={OrderRecords}
            options={{
              headerRight: null,
              title: '',
              // ...TransitionPresets.ModalPresentationIOS,
              headerShown: false,
            }}
          />
        </MainStack.Navigator>
      </Host>
    </ClientProvider>
  );
}

export default ClientStack;

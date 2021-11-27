import React, { memo, useState } from 'react';
import { ROUTES } from '@config';
import { AdminProvider } from '../../context/adminContext';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import { SvgHomeTab, SvgSeach, SvgProfile, SvgUsers } from '@svg-components';
import { headerBackground } from '@components';
import { Colors, FONTS } from '@utils';
import Icon from 'react-native-vector-icons/AntDesign';
import { CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { SvgNotification } from '@svg-components';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StartStockTaking from '@admin/StartStockTaking';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextComponent, Dialog } from '@components';
import styles from './styles';
import Settings from '@screens/Settings';
import SingleCategory from '@screens/SingleCategory';
import SelectUsersForBroadcast from '@admin/SelectUsersForBroadcast';
import Expenses from '@screens/Expenses';
import ReportsLists from '@screens/ReportsLists';
import ScanBarCode from '@screens/ScanBarCode';
import Products from '@screens/Products';
import StoreManager from '@admin/StoreManager';
import BroadCastMessaging from '@admin/BroadCastMessaging';
import ShopCreatingSuccessfull from '@admin/ShopCreatingSuccessfull';
import OrderDetails from '@screens/OrderDetails';
import ClientsOrderDetails from '@admin/ClientsOrderDetails';
import BatchOrderDetails from '@admin/BatchOrderDetails';
import EditBatchOrder from '@admin/EditBatchOrder';
import SupportTeamInbox from '@admin/SupportTeamInbox';
import CreateShop from '@admin/CreateShop';
import SuccessOrder from '@screens/SuccessOrder';
import POSAmount from '@screens/POSAmount';

import POSHistory from '@screens/POSHistory';
import POSProducts from '@screens/POSProducts';
import POSScanproduct from '@screens/POSScanproduct';

import ConvertBatchToPDF from '@admin/ConvertBatchToPDF';
import ConvertToPdf from '@screens/ConvertToPdf';
import Categories from '@screens/Categories';
import Brands from '@screens/Brands';
import SelectShopSettings from '@admin/SelectShopSettings';
import PreviewOrder from '@screens/PreviewOrder';
import EditSettings from '@screens/EditSettings';
import Profits2 from '@screens/Profits2';
import Profits from '@screens/Profits';
import ExpenseDetails from '@screens/ExpenseDetails';
import Home from '@admin/Home';
import AdminShopList from '@admin/AdminShopList';
import ShopUsersDetail from '@admin/ShopUsersDetail';
import WholesaleList from '@admin/WholesaleList';
import Inbox from '@admin/Inbox';
import AddWholeSale from '@admin/AddWholeSale';
import AllUsersList from '@admin/AllUsersList';
import AddProducts from '@screens/AddProducts';
import ScanProducts from '@admin/ScanProducts';
import GetBarCode from '@admin/GetBarCode';
import Orders from '@admin/Orders';
import UsersOrders from '@admin/UsersOrders';
import ExpenseLossesSuccessfullRecorded from '@screens/ExpenseLossesSuccessfullRecorded';
import Search from '@screens/Search';
import POSHistoryDetail from '@screens/POSHistoryDetail';
import Reports from '@screens/Reports';
import Messages from '@admin/Messages';
import MessagesList from '@admin/MessagesList';
import AdminLink from '@admin/AdminLink';
import Profile from '@screens/Profile';
import SelectDarkOption from '@screens/SelectDarkOption';
import SelectFontOption from '@screens/SelectFontOption';
import ThemeScreen from '@screens/ThemeScreen';
import AboutUs from '@screens/AboutUs';
import FeedBack from '@screens/FeedBack';
import Updates from '@screens/Updates';
import RecordDeliveredDetails from '@screens/RecordDeliveredDetails';
import RecordDeliveredStock from '@screens/RecordDeliveredStock';
import OrderRecords from '@admin/OrderRecords';
import SelectedShop from '@admin/SelectedShop';
import WriteStock from '@screens/WriteStock';
import ProfitsDetails from '@screens/ProfitsDetails';
import EditProduct from '@screens/EditProduct';
import LossRecords from '@screens/LossRecords';
import ExpenseRecords from '@screens/ExpenseRecords';
import ShopUsers from '@admin/ShopUsers';
import DeliveriesReportList from '@screens/DeliveriesReportList';
import DebtsList from '@screens/DebtsList';
import StockTakingList from '@screens/StockTakingList';
import ShopStockList from '@screens/ShopStockList';
import StockTaking from '@admin/StockTaking';
import Notifications from '@screens/Notifications';
import SearchApp from '@screens/SearchApp';
import Credits from '@screens/Credits';
import POSPaymentOption from '@screens/POSPaymentOption';
import { Host } from 'react-native-portalize';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsConnected } from 'react-native-offline';
import RecordDeliveredStockSuccess from '@screens/RecordDeliveredStockSuccess';

const BottomTab = AnimatedTabBarNavigator();
const Drawer = createDrawerNavigator();
const HomeStackScreen = createStackNavigator();
const MainStack = createStackNavigator();
const ProfitsTab = createMaterialTopTabNavigator();
const CategoryBrands = createMaterialTopTabNavigator();
const OrdersTab = createMaterialTopTabNavigator();
const ReportsTab = createMaterialTopTabNavigator();
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
			}}
		>
			<POSTab.Screen options={{ title: 'Amount' }} name={ROUTES.POSAmount} component={POSAmount} />
			<POSTab.Screen options={{ tabBarLabel: 'Products' }} name={ROUTES.POSProducts} component={POSProducts} />
			{/* <POSTab.Screen
        options={{tabBarLabel: 'POSAmount'}}
        name={ROUTES.POSAmount}
        component={POSAmount}
      /> */}
			<POSTab.Screen options={{ tabBarLabel: 'History' }} name={ROUTES.POSHistory} component={POSHistory} />
		</POSTab.Navigator>
	);
});
const ReportsTabScreenTab = memo(() => {
	return (
		<ReportsTab.Navigator
			lazy={true}
			tabBarOptions={{
				activeTintColor: '#ED3269',
				inactiveTintColor: '#7F8FA6',
				indicatorStyle: {
					backgroundColor: '#ED3269',
				},
				labelStyle: {
					fontSize: 10,
					fontFamily: FONTS.Regular,
				},
			}}
		>
			<ReportsTab.Screen
				options={{ title: 'Deliveries' }}
				name={ROUTES.DeliveriesReportList}
				component={DeliveriesReportList}
			/>
			<ReportsTab.Screen
				options={{ tabBarLabel: 'Inventory' }}
				name={ROUTES.StockTakingList}
				component={StockTakingList}
			/>
			<ReportsTab.Screen
				options={{ tabBarLabel: 'Orders' }}
				name={ROUTES.ShopStockList}
				component={ShopStockList}
			/>
			<ReportsTab.Screen options={{ tabBarLabel: 'Debts' }} name={ROUTES.DebtsList} component={DebtsList} />
		</ReportsTab.Navigator>
	);
});

const ProfitsProfile = memo(() => {
	return (
		<ProfitsTab.Navigator
			lazy={true}
			tabBarOptions={{
				activeTintColor: '#ED3269',
				inactiveTintColor: '#7F8FA6',
				indicatorStyle: {
					backgroundColor: '#ED3269',
				},
				labelStyle: {
					// fontSize: 10,
					fontFamily: FONTS.Regular,
				},
			}}
		>
			<ProfitsTab.Screen
				// options={{title: 'Available Profit'}}
				name={ROUTES.Profits}
				component={Profits}
			/>
			<ProfitsTab.Screen options={{ tabBarLabel: 'Reports' }} name={ROUTES.Profits2} component={Profits2} />
		</ProfitsTab.Navigator>
	);
});

const CategoryBrandsScreen = memo(() => {
	return (
		<CategoryBrands.Navigator
			tabBarOptions={{
				activeTintColor: '#ED3269',
				inactiveTintColor: '#7F8FA6',
				indicatorStyle: {
					backgroundColor: '#ED3269',
				},
			}}
		>
			<CategoryBrands.Screen
				name={ROUTES.Categories}
				component={Categories}
				options={{ tabBarLabel: 'Categories' }}
			/>
			<CategoryBrands.Screen name={ROUTES.Brands} component={Brands} options={{ tabBarLabel: 'Brands' }} />
		</CategoryBrands.Navigator>
	);
});
const OrdersTabScreen = memo(() => {
	return (
		<OrdersTab.Navigator
			tabBarOptions={{
				activeTintColor: '#ED3269',
				inactiveTintColor: '#7F8FA6',
				indicatorStyle: {
					backgroundColor: '#ED3269',
				},
			}}
		>
			<OrdersTab.Screen name={ROUTES.Orders} component={Orders} options={{ tabBarLabel: 'Client Orders' }} />
			<OrdersTab.Screen
				name={ROUTES.UsersOrders}
				component={UsersOrders}
				options={{ tabBarLabel: 'User Orders' }}
			/>
		</OrdersTab.Navigator>
	);
});
const BottomTabStack = ({ route }) => {
	const [modalVisible, setModalVisible] = useState(false);

	// useLayoutEffect(() => {
	//   const routeName = getFocusedRouteNameFromRoute(route);
	//   // navigation.setOptions({tabBarVisible: false});
	//   console.log('routeName', routeName);
	//   console.log('route', route);

	//   if (routeName === 'DrawerStack') {
	//     const backAction = () => {
	//       setModalVisible(true);

	//       return true;
	//     };

	//     const backHandler = BackHandler.addEventListener(
	//       'hardwareBackPress',
	//       backAction,
	//     );

	//     return () => backHandler.remove();
	//   }
	// }, [route]);

	return (
		<BottomTab.Navigator
			screenOptions={{
				headerBackground: headerBackground,
				headerTintColor: '#FFF',
				unmountOnBlur: true,
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
					marginHorizontal: 70,
					height: 60,
				},
			}}
		>
			<BottomTab.Screen
				name="DrawerStack"
				component={DrawerStack}
				options={{
					headerShown: false,
					gestureEnabled: false,
					headerBackground,
					tabBarLabel: 'Home',
					tabBarIcon: ({ focused, color, size }) => (
						<AntDesign name="home" color={focused ? color : '#222222'} size={24} />
					),
				}}
			/>
			{/* <BottomTab.Screen
        name={ROUTES.Search}
        component={Search}
        options={{
          gestureEnabled: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({focused, color, size}) => (
            <SvgSeach color={focused ? color : '#222222'} />
          ),
        }}
      /> */}
			<BottomTab.Screen
				name={ROUTES.AllUsersList}
				component={AllUsersList}
				options={{
					gestureEnabled: false,
					tabBarLabel: 'Profile',
					tabBarIcon: ({ focused, color, size }) => <SvgUsers color={focused ? color : '#222222'} />,
				}}
			/>
			<BottomTab.Screen
				name={ROUTES.Profile}
				component={Profile}
				options={{
					gestureEnabled: false,
					tabBarLabel: 'Profile',
					tabBarIcon: ({ focused, color, size }) => <SvgProfile color={focused ? color : '#222222'} />,
				}}
			/>
		</BottomTab.Navigator>
	);
};

const DrawerContent = (props) => {
	const [iconSize] = useState(20);
	const { navigate } = useNavigation();

	return (
		<DrawerContentScrollView
			{...props}
			scrollEnabled={false}
			contentContainerStyle={{
				flex: 1,
				justifyContent: 'center',
				top: -40,
			}}
		>
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
						label="Messages"
						labelStyle={{ color: 'white', marginLeft: -16 }}
						// style={{alignItems: 'flex-start', marginVertical: 0}}
						onPress={() => navigate(ROUTES.Messages)}
						icon={() => <AntDesign name="message1" color="white" size={iconSize} />}
					/>
				</View>
			</View>

			<View>
				<DrawerItem
					label="Create Order"
					labelStyle={{ color: 'white', marginLeft: -16 }}
					icon={() => <SvgHomeTab color="white" size={iconSize} />}
					// onPress={() => props.navigation.navigate(ROUTES.Categories)}
				/>
			</View>
			<View>
				<DrawerItem
					label="Create Shop"
					labelStyle={{ color: 'white', marginLeft: -16 }}
					icon={() => <FontAwesome5 name="store" size={iconSize} color="white" />}
					onPress={() => props.navigation.navigate(ROUTES.CreateShop)}
				/>
			</View>

			<View>
				<DrawerItem
					label="Categories"
					labelStyle={{ color: 'white', marginLeft: -16 }}
					icon={() => <FontAwesome name="cubes" color="white" size={iconSize} />}
					onPress={() => navigate(ROUTES.SelectedShop, { type: 'categories_brands' })}
				/>
			</View>
			{/* <View>
        <DrawerItem
          label="Logout"
          labelStyle={{color: 'white', marginLeft: -16}}
          icon={() => <AntDesign name="logout" color="white" size={iconSize} />}
          onPress={() => alert('Are your sure to logout?')}
        />
      </View> */}
		</DrawerContentScrollView>
	);
};

const DrawerStack = ({ route }) => {
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

	const animatedStyle = { borderRadius, transform: [{ scale }] };
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
	const upadating = (props) => {
		setProgress(props.progress);
		return <DrawerContent {...props} />;
	};
	return (
		<LinearGradient style={{ flex: 1 }} colors={['#ED3269', '#F05F3E']}>
			<Drawer.Navigator
				drawerType="slide"
				overlayColor="transparent"
				drawerStyle={styles.drawerStyles}
				contentContainerStyle={{ flex: 1 }}
				drawerContentOptions={{
					activeBackgroundColor: 'transparent',
					activeTintColor: 'white',
					inactiveTintColor: 'white',
				}}
				sceneContainerStyle={{ backgroundColor: 'transparent' }}
				drawerContent={upadating}
			>
				<Drawer.Screen name="Screens">
					{(props) => <HomeStack {...props} style={animatedStyle} />}
				</Drawer.Screen>
			</Drawer.Navigator>
		</LinearGradient>
	);
};

const HomeStack = ({ style, route }) => {
	const navigation = useNavigation();
	return (
		<Animated.View style={StyleSheet.flatten([styles.stack, style])}>
			<HomeStackScreen.Navigator
				headerMode="none"
				screenOptions={{
					headerBackground: headerBackground,
					headerTintColor: '#FFF',
					cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
				}}
			>
				<HomeStackScreen.Screen
					name={ROUTES.Home}
					component={Home}
					options={{
						title: '',
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
								style={{ left: 15 }}
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

function AdminStack() {
	const forFade = ({ current, closing }) => ({
		cardStyle: {
			opacity: current.progress,
		},
	});
	const { navigate, goBack } = useNavigation();
	const isConnected = useIsConnected();

	// isConnected ? alert('Connected') : alert('Not connected to internet');
	return (
		<AdminProvider>
			<Host>
				<MainStack.Navigator
					// gestureEnabled={false}
					screenOptions={{
						headerBackground: headerBackground,
						headerTintColor: '#FFF',

						// ...TransitionPresets.ModalPresentationIOS,
						// headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
						gestureEnabled: true,
						// ...TransitionPresets.SlideFromRightIOS,
						// ...TransitionPresets.ModalSlideFromBottomIOS,
						...TransitionPresets.RevealFromBottomAndroid,
						// ...TransitionPresets.ModalPresentationIOS,
					}}
					initialRouteName="BottomTabStack"
				>
					<MainStack.Screen
						options={{ title: '', headerShown: false }}
						name={ROUTES.BottomTabStack}
						component={BottomTabStack}
					/>
					<MainStack.Screen
						name={ROUTES.AdminShopList}
						component={AdminShopList}
						options={{
							title: '',
						}}
					/>
					<MainStack.Screen
						name={ROUTES.ExpenseDetails}
						component={ExpenseDetails}
						options={{
							title: '',
						}}
					/>
					<MainStack.Screen
						name={ROUTES.Credits}
						component={Credits}
						options={{
							headerTitle: () => (
								<TextComponent
									style={{
										color: 'white',
									}}
								>
									Record Debts
								</TextComponent>
							),
						}}
					/>
					<MainStack.Screen
						name={ROUTES.ShopCreatingSuccessfull}
						component={ShopCreatingSuccessfull}
						options={{
							title: '',
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.SelectShopSettings}
						component={SelectShopSettings}
						options={{
							title: '',
						}}
					/>
					<MainStack.Screen
						name={ROUTES.ShopUsersDetail}
						component={ShopUsersDetail}
						options={{
							title: '',
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.WriteStock}
						component={WriteStock}
						options={{
							title: '',
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.CreateShop}
						component={CreateShop}
						options={{
							title: '',
							// ...TransitionPresets.ModalPresentationIOS,
						}}
					/>
					<MainStack.Screen
						options={{
							headerTitle: () => (
								<TextComponent
									style={{
										fontSize: 17,
										color: 'white',
									}}
								>
									{ROUTES.Settings}
								</TextComponent>
							),
						}}
						name={ROUTES.Settings}
						component={Settings}
					/>
					<MainStack.Screen
						options={{
							title: '',
							// ...TransitionPresets.ModalPresentationIOS,
						}}
						name={ROUTES.EditSettings}
						component={EditSettings}
					/>
					<MainStack.Screen
						options={{
							title: '',
							headerShown: false,
						}}
						name={ROUTES.AboutUs}
						component={AboutUs}
					/>
					<MainStack.Screen
						options={{
							headerShown: false,
						}}
						name={ROUTES.ScanBarCode}
						component={ScanBarCode}
					/>
					<MainStack.Screen
						options={{
							title: '',
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
						}}
						name={ROUTES.ThemeScreen}
						component={ThemeScreen}
					/>

					<MainStack.Screen name={ROUTES.GetBarCode} component={GetBarCode} />
					<MainStack.Screen
						options={{
							title: '',
						}}
						name={ROUTES.Expenses}
						component={Expenses}
					/>
					<MainStack.Screen
						options={{
							headerShown: false,
						}}
						name={ROUTES.ExpenseLossesSuccessfullRecorded}
						component={ExpenseLossesSuccessfullRecorded}
					/>
					<MainStack.Screen
						options={{
							title: '',
						}}
						name={ROUTES.ShopUsers}
						component={ShopUsers}
					/>

					<MainStack.Screen
						name={ROUTES.SuccessOrder}
						component={SuccessOrder}
						options={{
							headerShown: false,
						}}
					/>
					<MainStack.Screen name={ROUTES.ReportsLists} component={ReportsLists} options={{ title: '' }} />
					<MainStack.Screen
						name={ROUTES.PreviewOrder}
						component={PreviewOrder}
						options={{
							title: '',
							headerShown: false,
						}}
					/>

					<MainStack.Screen
						name={ROUTES.ConvertBatchToPDF}
						component={ConvertBatchToPDF}
						options={{
							title: '',
							// headerShown: false,
						}}
					/>

					<MainStack.Screen
						name={ROUTES.ConvertToPdf}
						component={ConvertToPdf}
						options={{
							title: '',
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.SelectUsersForBroadcast}
						component={SelectUsersForBroadcast}
						options={{
							title: '',
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.POSHistoryDetail}
						component={POSHistoryDetail}
						options={{
							title: '',
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.BroadCastMessaging}
						component={BroadCastMessaging}
						options={{
							title: '',
							headerShown: false,
						}}
					/>
					<MainStack.Screen name={ROUTES.EditBatchOrder} component={EditBatchOrder} />
					<MainStack.Screen
						name={ROUTES.BatchOrderDetails}
						component={BatchOrderDetails}
						options={{
							title: '',
						}}
					/>
					<MainStack.Screen
						name={ROUTES.ClientsOrderDetails}
						component={ClientsOrderDetails}
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
						name={ROUTES.StartStockTaking}
						component={StartStockTaking}
						options={{
							headerRight: null,
							title: '',
							gestureEnabled: true,
						}}
					/>

					<MainStack.Screen
						name={ROUTES.OrdersTabScreen}
						component={OrdersTabScreen}
						options={{
							title: '',
						}}
					/>
					<MainStack.Screen
						name={ROUTES.StoreManager}
						component={StoreManager}
						options={{ title: '', headerShown: false }}
					/>
					<MainStack.Screen
						name={ROUTES.Inbox}
						component={Inbox}
						options={{ title: '', headerShown: false }}
					/>
					<MainStack.Screen
						name={ROUTES.SupportTeamInbox}
						component={SupportTeamInbox}
						options={{ title: '', headerShown: false }}
					/>
					<MainStack.Screen name={ROUTES.AdminLink} component={AdminLink} options={{ title: '' }} />
					<MainStack.Screen
						name={ROUTES.CategoryBrandsScreen}
						component={CategoryBrandsScreen}
						options={{ title: '' }}
					/>
					<MainStack.Screen
						name={ROUTES.ScanProducts}
						component={ScanProducts}
						options={{ headerShown: false }}
					/>
					<MainStack.Screen
						name={ROUTES.AddProducts}
						component={AddProducts}
						options={{
							title: '',
						}}
					/>
					<MainStack.Screen
						name={ROUTES.EditProduct}
						component={EditProduct}
						options={{
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.AddWholeSale}
						component={AddWholeSale}
						options={{
							headerTitle: () => (
								<TextComponent
									style={{
										alignSelf: 'center',
										right: 30,
										fontSize: 15,
										color: 'white',
									}}
								>
									Add WholeSale Shop
								</TextComponent>
							),
						}}
					/>
					<MainStack.Screen
						name={ROUTES.WholesaleList}
						component={WholesaleList}
						options={{
							title: '',

							headerRight: () => (
								<View style={styles.headeRight}>
									<View style={styles.btnNotification}>
										<TouchableOpacity onPress={() => {}}>
											<MaterialIcons name="playlist-add" size={30} color="white" />
										</TouchableOpacity>
									</View>
								</View>
							),
						}}
					/>

					<MainStack.Screen
						name={ROUTES.ProfitsProfile}
						component={ProfitsProfile}
						options={{
							headerTitle: () => (
								<TextComponent
									style={{
										color: 'white',
									}}
								>
									Profits
								</TextComponent>
							),
						}}
					/>
					<MainStack.Screen
						name={ROUTES.Messages}
						component={Messages}
						options={{
							headerRight: null,
							title: '',
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.MessagesList}
						component={MessagesList}
						options={{
							headerRight: null,
							title: '',
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.RecordDeliveredStock}
						component={RecordDeliveredStock}
						options={{
							headerRight: null,
							title: '',
							gestureEnabled: false,
							headerShown: false,
						}}
					/>

					<MainStack.Screen
						name={ROUTES.SelectDarkOption}
						component={SelectDarkOption}
						options={{
							cardStyleInterpolator: forFade,
							cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.SelectFontOption}
						component={SelectFontOption}
						options={{
							cardStyleInterpolator: forFade,
							cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.Reports}
						component={Reports}
						options={{
							cardStyleInterpolator: forFade,
							cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.LossRecords}
						component={LossRecords}
						options={{
							title: '',
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.SelectedShop}
						component={SelectedShop}
						options={{
							headerTitle: () => (
								<TextComponent
									style={{
										fontSize: 15,
										color: 'white',
									}}
								>
									Select Store
								</TextComponent>
							),
						}}
					/>
					<MainStack.Screen
						name={ROUTES.OrderRecords}
						component={OrderRecords}
						options={{
							title: '',
							headerShown: false,
						}}
					/>

					<MainStack.Screen
						name={ROUTES.RecordDeliveredDetails}
						component={RecordDeliveredDetails}
						options={{
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.RecordDeliveredStockSuccess}
						component={RecordDeliveredStockSuccess}
						options={{
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.ExpenseRecords}
						component={ExpenseRecords}
						options={{
							headerShown: false,
						}}
					/>
					<MainStack.Screen
						name={ROUTES.Products}
						component={Products}
						options={{
							title: '',
						}}
					/>
					<MainStack.Screen
						name={ROUTES.ProfitsDetails}
						component={ProfitsDetails}
						options={{
							title: '',
						}}
					/>
					<MainStack.Screen
						name={ROUTES.SingleCategory}
						component={SingleCategory}
						options={{
							title: '',
						}}
					/>
					<MainStack.Screen
						name={ROUTES.ReportsTabScreenTab}
						component={ReportsTabScreenTab}
						options={{
							headerTitle: () => (
								<TextComponent
									style={{
										fontSize: 15,
										color: 'white',
									}}
								>
									Shop Reports
								</TextComponent>
							),
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
						options={{
							headerTitle: () => (
								<TextComponent
									style={{
										alignSelf: 'center',
										right: 30,
										fontSize: 15,
										color: 'white',
									}}
								>
									Stock Taking
								</TextComponent>
							),
						}}
						name={ROUTES.StockTaking}
						component={StockTaking}
					/>
					<MainStack.Screen
						options={{
							headerTitle: () => (
								<TextComponent
									style={{
										alignSelf: 'center',
										right: 30,
										fontSize: 15,
										color: 'white',
									}}
								>
									Notifications
								</TextComponent>
							),
						}}
						name={ROUTES.Notifications}
						component={Notifications}
					/>
					<MainStack.Screen
						options={{
							headerLeft: null,
							headerTitle: () => (
								<TextComponent
									style={{
										alignSelf: 'center',
										right: -25,
										fontSize: 15,
										color: 'white',
									}}
								>
									SearchApp
								</TextComponent>
							),
							headerRight: () => (
								<TouchableOpacity
									onPress={() => {
										goBack();
									}}
									style={{ right: 25 }}
								>
									<Entypo name="cross" size={24} color={'white'} />
								</TouchableOpacity>
							),
							headerStyle: { height: 100 },
						}}
						name={ROUTES.SearchApp}
						component={SearchApp}
					/>
				</MainStack.Navigator>
			</Host>
		</AdminProvider>
	);
}

export default AdminStack;

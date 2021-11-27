import React, { useState, useRef, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, DeviceEventEmitter, SafeAreaView } from 'react-native';
import { VirtualKeyboard, TextComponent as Text, SearchBar, Input } from '@components';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { ROUTES, keyGenerator } from '@config';
import { dimensions } from '@utils';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Modal, ModalContent, ScaleAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import { useSelector, useDispatch } from 'react-redux';
import { CommonContext } from '@context';
import FirstRoute, {
	EnterAmountScreen,
	PaymentMethodModal,
	DiscountModal,
	SuccessModal,
	AddProductModal,
} from '@screens/Carts/current';
import _ from 'lodash';
import { currencyFormatter, determineWhichNumber, recordSellsForCash } from '@config';
import { AdminActions } from '@actions';
import { FONTS } from '@utils';
import productModalStyles from './styles';
import { UIActivityIndicator } from 'react-native-indicators';

const ProductModal = (props) => {
	const {
		content,
		firstButtonOnPress,
		secondButtonOnPress,
		title,
		modalVisible,
		firstButtonTextStyles,
		secondButtonTextStyles,
		titleTextStyles,
		setCloseModal,
	} = props;
	const Footer = () => {
		return (
			<ModalFooter>
				<ModalButton
					textStyle={[productModalStyles.firsttxt, firstButtonTextStyles]}
					bordered={true}
					text={'Sell'}
					onPress={firstButtonOnPress}
				/>
				<ModalButton
					textStyle={[productModalStyles.secondtxt, secondButtonTextStyles]}
					text={'Cancel'}
					onPress={secondButtonOnPress}
				/>
			</ModalFooter>
		);
	};
	const closeModal = () => {
		setCloseModal(false);
	};

	const Title = () => {
		return <ModalTitle textStyle={[productModalStyles.title, titleTextStyles]} title={title} />;
	};
	const AnimationType = () => {
		return new ScaleAnimation({
			initialValue: 0,
			useNativeDriver: true,
		});
	};

	const renderContent = () => {
		return <ModalContent style={productModalStyles.contentStyle}>{content}</ModalContent>;
	};
	return (
		<Modal
			visible={modalVisible}
			footer={Footer()}
			onTouchOutside={closeModal}
			width={dimensions.width_screen - 60}
			height={410}
			modalTitle={Title()}
			modalAnimation={AnimationType()}
			swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
			swipeThreshold={200} // default 100
			onSwipeOut={closeModal}
		>
			{renderContent()}
		</Modal>
	);
};

const SecondRoute = () => (
	<View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', marginTop: 50 }}>
		<Text>Coming Soon</Text>
	</View>
);
const index = ({ navigation }) => {
	const { navigate } = useNavigation();
	const modalizeRef = useRef<Modalize>(null);
	const enterAmountRef = useRef<Modalize>(null);
	const addProductModalizeRef = useRef<Modalize>(null);
	// const cartModal = useRef<Modalize>(null);
	const [scannedProductData, setScannedProduct] = useState({});
	const cartRef = useRef<Modalize>(null);
	const [loadingScannedProduct, setLoadingScannedProduct] = useState(false);
	const [totalDiscount, setTotalDiscount] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	const [enterAmountValue, setEnterAmountValue] = useState(0);
	const [currentCart, setCurrentCart] = useState({});
	const [paymentMethod, setPaymentMethod] = useState('');
	const [bilChange, setBilChange] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [productNotFound, setProductNotFound] = useState(false);
	const [fetchProductmodalVisible, setFetchProductModalVisible] = useState(false);
	const [billlessError, setBilllessError] = useState(false);
	const [discountModal, setDiscountModal] = useState(false);
	const [howManyLoad, sethowManyLoad] = useState(false);
	const layout = useWindowDimensions();
	const dispatch = useDispatch();
	const sellCarts = useSelector((state) => state.admin.sellCarts);
	const user = useSelector((state) => state.auth.user);
	const [index, setIndex] = React.useState(0);

	const { recordProduct, myCurrentShop, getScannedProduct, productsCart, setproductsCart } = useContext(
		CommonContext
	);

	const findProductScanned = (barcodeResult) => {
		setFetchProductModalVisible(true);

		getScannedProduct(barcodeResult).then((res) => {
			// console.log(res);
			if (res.message === 'product found') {
				setLoadingScannedProduct(false);

				setScannedProduct({ ...res.products.docs[0].data(), id: res.products.docs[0].id });
				console.log(res.products.docs[0].id);
				// navigate(8ROUTES.ProductDetails);
			}
			if (res.message === 'product not found') {
				setLoadingScannedProduct(false);
				setProductNotFound(true);
			}
			// setLoading(false);
			// const firestoreData = [];
			// res.forEach((result) => {
			//   firestoreData.push({
			//     ...result.data(),
			//     key: result.id,
			//   });
			// });
			// setProducts(firestoreData);
			// setRefreshing(false);

			// res.docs.forEach((doc) => {
			//   console.log(doc.data());
			// });
		});
	};

	const clicksCalculateAmountUtems = (x, typ) => {
		const { currentCart } = this.state;

		const incrementedItems = 1 + Number(currentCart?.totalItems);

		const first = x.salePrice * 1;
		const incrementedAmount = first + currentCart?.totalAmount;

		let incrementedData = currentCart?.data;

		if (isArray(incrementedData)) {
			typ === 'same' ? null : incrementedData.push(x);
		}
		if (!isArray(incrementedData)) {
			incrementedData = [];
		}
		currentCart.totalItems = incrementedItems;
		currentCart.totalAmount = incrementedAmount;

		this.setState({ currentCart });
		return {
			items: incrementedItems,
			totalAmount: incrementedAmount,
			data: incrementedData,
		};
	};

	// {"InCase": "12",
	//  "buyingPrice": "86",
	//   "category": [],
	//   "count": 10,
	//   "key": "8mAdgrhSYwdqPLWUTAy9",
	//    "mass": "125l",
	//     "name": "ABI coca cola ",
	//      "quantity": 1,
	//       "salePrice": "11"}

	//       {"InCase": "12",
	//       "barcode": "6001240550014",
	//        "buyingPrice": "190",
	//         "category": [],
	//          "cratePrize": false,
	//          "mass": "1L",
	//          "productName": "Liqui Fruit Cranberry",
	//           "salePrice": "22",
	//        }
	const addToCart = () => {
		const saveToCartData = {
			InCase: scannedProductData.InCase,
			barcode: scannedProductData.barcode,
			buyingPrice: determineWhichNumber(scannedProductData.buyingPrice).value,
			category: scannedProductData.category,
			count: 0,
			key: scannedProductData.id,
			mass: scannedProductData.mass,
			name: scannedProductData.productName,
			salePrice: determineWhichNumber(scannedProductData.salePrice).value,
			quantity: 1,
		};
		if (_.isEmpty(currentCart)) {
			currentCart.data = [saveToCartData];
		} else {
			if (currentCart?.data.map((x) => x.key).includes(scannedProductData.id)) {
				const dataIndex = currentCart.data.map((x) => x.key).indexOf(scannedProductData.id);

				currentCart.data[dataIndex].quantity = parseInt(currentCart.data[dataIndex].quantity) + 1;
			} else {
				currentCart.data.push(saveToCartData);
			}
		}

		DeviceEventEmitter.emit('event.reloadcart', 'edit');

		const amount = currentCart.totalAmount ? currentCart.totalAmount : 0;
		const items = currentCart.totalItems ? currentCart.totalItems : 0;
		currentCart.totalAmount = amount + determineWhichNumber(scannedProductData.salePrice).value;
		currentCart.totalItems = items + 1;
		currentCart.id = myCurrentShop.id;
		setValue(0);
		saveCart(currentCart);
	};

	const [routes] = React.useState([
		{ key: 'first', title: 'Current Cart' },
		{ key: 'second', title: 'Saved Carts' },
	]);
	const clearCart = (id) => {
		setproductsCart({});
		dispatch(AdminActions.OnResetPOSCart(id));
	};
	const saveCart = (data) => {
		setproductsCart(data);
		dispatch(AdminActions.OnSavePOSCart(data));
	};
	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'first':
				return (
					<FirstRoute
						productsdata={currentCart}
						totalDiscount={totalDiscount}
						clearCart={() => {
							clearCart(myCurrentShop.id);
							DeviceEventEmitter.emit('event.reloadcart', 'reset');
						}}
						shopid={myCurrentShop.id}
						cartState={() => setCurrentCart({})}
						removeProducts={(id) => {
							const filt = currentCart.data.filter((r) => r.key !== id);
							const deletedItem = currentCart.data.filter((r) => r.key === id);
							currentCart.data = filt;
							setCurrentCart(currentCart);

							const sub1 = deletedItem[0].salePrice * deletedItem[0].quantity;
							const sub2Amount = currentCart.totalAmount - sub1;

							const subItems = currentCart?.totalItems - deletedItem[0].quantity;
							currentCart.totalItems = subItems;
							currentCart.totalAmount = sub2Amount;
							setTotalAmount(sub2Amount);

							DeviceEventEmitter.emit('event.reloadcart', 'edit');

							if (currentCart.totalItems === 0 || currentCart.totalAmount === 0) {
								setCurrentCart({});

								return clearCart(myCurrentShop.id);
							}

							setCurrentCart({ ...currentCart });
							saveCart({
								data: currentCart.data,
								id: myCurrentShop.id,
								totalItems: subItems,
								totalAmount: sub2Amount,
							});
						}}
						inrement={(x, id) => {
							const tttotalitems = currentCart.data
								.map((r) => Number(r.quantity))
								.reduce((a, b) => a + b);

							const tttotalamount = currentCart.data
								.map((r) => Number(r.productTotalAmount))
								.reduce((a, b) => a + b);
							currentCart.data = x;
							currentCart.totalItems = tttotalitems;
							currentCart.totalAmount = tttotalamount;
							setTotalAmount(tttotalamount);

							// this.setState({currentCart});
							setCurrentCart({ ...currentCart });

							saveCart({
								data: currentCart.data,
								id: myCurrentShop.id,
								totalItems: tttotalitems,
								totalAmount: tttotalamount,
							});
							DeviceEventEmitter.emit('event.reloadcart', 'edit');
						}}
						charge={(val) => {
							setTotalAmount(val);
							cartRef.current.close();
							modalizeRef.current.open();
						}}
						setDiscountModal={setDiscountModal}
						setTotalDiscount={setTotalDiscount}
					/>
				);
			case 'second':
				return <SecondRoute />;
			default:
				return null;
		}
	};
	const renderTabBar = (props) => (
		<TabBar
			{...props}
			indicatorStyle={{
				// backgroundColor: '#ED3269',
				backgroundColor: '#fff',
				width: 100,
				left: 55,
				height: 3,
			}}
			renderLabel={({ route, focused, color }) => (
				<Text
					style={{
						color,
						margin: 8,
						// fontWeight: focused ? '500' : '400',
						// width: 60,
					}}
				>
					{route.title}
				</Text>
			)}
			renderBadge={({ route }) =>
				route.key === 'second2' ? (
					<View
						style={{
							left: -50,
							height: 20,
							width: 20,
							borderRadius: 20,
							backgroundColor: '#65D006',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text whiteColor semibold style={{}}>
							5
						</Text>
					</View>
				) : null
			}
			// pressColor="pink"
			pressColor="#fff"
			// activeColor="#ED3269"
			activeColor="#ED3269"
			style={{ backgroundColor: 'white', elevation: -10 }}
			inactiveColor="#7F8FA6"
			// scrollEnabled={true}
		/>
	);
	//Reports
	const [value, setValue] = useState(0);

	const registerClickScanButton = () => {
		DeviceEventEmitter.addListener('event.scanProduct', (barcodeResult) => {
			setLoadingScannedProduct(true);

			findProductScanned(barcodeResult);
		});
		navigate(ROUTES.ScanBarCode, { type: 'pos' });
	};

	React.useEffect(() => {
		// const unsubscribe = navigation.addListener('focus', () => {

		howManyLoad
			? setCurrentCart(productsCart)
			: (() => {
					if (typeof sellCarts === 'undefined') {
						saveCart({
							data: [],
							id: myCurrentShop.id,
							totalItems: 0,
							totalAmount: 0,
						});
					} else {
						const currentValue = sellCarts.filter((x) => x.id === myCurrentShop.id);
						setCurrentCart(currentValue.length === 0 ? {} : currentValue[0]);
						sethowManyLoad(true);
					}
			  })();
		// const unsubscribe = navigation.addListener('focus', () => {
		//   const currentValue = sellCarts.filter((x) => x.id === myCurrentShop.id);
		//   setCurrentCart({...(currentValue.length === 0 ? {} : currentValue[0])});
		// });
		// });

		// return unsubscribe;
	}, [productsCart]);
	return (
		<View style={{ height: '100%', width: '100%' }}>
			<StatusBar barStyle="dark-content" />
			<ProductModal
				modalVisible={fetchProductmodalVisible}
				title={scannedProductData?.barcode}
				firstButtonOnPress={() => {
					setFetchProductModalVisible(false);
					addToCart();
					cartRef.current.open();
				}}
				secondButtonOnPress={() => setFetchProductModalVisible(false)}
				content={
					loadingScannedProduct ? (
						<UIActivityIndicator
							style={{}}
							color="black"
							size={30}
							// dotRadius={10}
						/>
					) : productNotFound ? (
						<View style={{ width: '100%', alignItems: 'center' }}>
							<Text bold whiteColor>
								Product not found! Do you want to create it
							</Text>
							<TouchableOpacity
								onPress={() => {
									setFetchProductModalVisible(false);
									addProductModalizeRef.current.open();
								}}
								style={{
									backgroundColor: '#0B3F80',
									width: 140,
									height: 40,
									borderRadius: 5,
									marginLeft: 5,
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: 20,
								}}
							>
								<Text whiteColor style={{ fontSize: 12 }}>
									Create Product
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={{ width: '100%', alignItems: 'center' }}>
							<View style={{ marginTop: 30 }}>
								<View
									style={{
										backgroundColor: '#0B3F80',
										width: 50,
										height: 50,
										borderRadius: 30,
										marginLeft: 5,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Text bold whiteColor>
										{scannedProductData?.productName?.charAt(0)}
									</Text>
								</View>
							</View>
							<View style={{ marginTop: 20 }}>
								<Text medium style={{ fontSize: 20 }}>
									{scannedProductData?.productName}
								</Text>
							</View>
							<View style={{ marginTop: 10 }}>
								<Text style={{ fontSize: 15 }}>{scannedProductData?.mass}</Text>
							</View>

							{/* <View style={{ marginTop: 30 }}>
								<Text>sdsdcsadc</Text>
							</View> */}
							<View
								style={{
									marginTop: 20,
									// flexDirection: 'row',
									// justifyContent: 'space-between',
									// width: '80%',
								}}
							>
								<Text bold style={{ fontSize: 25 }}>
									{currencyFormatter(scannedProductData.salePrice)}
								</Text>
							</View>

							<View
								style={{
									marginTop: 10,
									flexDirection: 'row',
									justifyContent: 'space-between',
									width: '80%',
								}}
							>
								<TouchableOpacity
									onPress={() => {
										addToCart();
										setFetchProductModalVisible(false);
										registerClickScanButton();
									}}
									style={{
										backgroundColor: '#0B3F80',
										width: 110,
										height: 40,
										borderRadius: 5,
										marginLeft: 5,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Text whiteColor style={{ fontSize: 12 }}>
										Scan Another
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										setFetchProductModalVisible(false);

										addToCart();
									}}
									style={{
										backgroundColor: '#0B3F80',
										width: 110,
										height: 40,
										borderRadius: 5,
										marginLeft: 5,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Text whiteColor style={{ fontSize: 12 }}>
										Add to Cart
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					)
				}
				setCloseModal={setFetchProductModalVisible}
			/>
			<SuccessModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				totalAmount={totalAmount}
				bilChange={bilChange}
				modalizeRef={modalizeRef}
			/>

			<DiscountModal
				discountModal={discountModal}
				setDiscountModal={setDiscountModal}
				setTotalDiscount={setTotalDiscount}
				totalDiscount={totalDiscount}
			/>

			<AddProductModal
				barcode={scannedProductData?.barcode}
				user={user}
				recordProduct={recordProduct}
				addProductModalizeRef={addProductModalizeRef}
			/>

			<View style={{ alignSelf: 'center', marginTop: 100 }}>
				<Text style={{ fontSize: 40, color: 'black' }}>R {value === 0 || value === '' ? 0 : value}.00</Text>
			</View>
			<View
				style={{
					bottom: 35,
					position: 'absolute',

					width: '100%',
				}}
			>
				<VirtualKeyboard
					color="#7F8FA6"
					pressMode="string"
					leftItem={() => {
						if (value === 0) {
							return alert('You can add an empty number');
						}
						const val = {
							key: keyGenerator(20),
							mass: '',
							name: 'Custom Amount',
							productTotalAmount: determineWhichNumber(value).value,
							quantity: 1,
							salePrice: determineWhichNumber(value).value,
						};
						DeviceEventEmitter.emit('event.reloadcart', 'edit');
						// DeviceEventEmitter.removeAllListeners('event.testEvent');
						if (_.isEmpty(currentCart)) {
							currentCart.data = [val];
						} else {
							currentCart.data.push(val);
						}

						const amount = currentCart.totalAmount ? currentCart.totalAmount : 0;
						const items = currentCart.totalItems ? currentCart.totalItems : 0;
						currentCart.totalAmount = amount + determineWhichNumber(value).value;
						currentCart.totalItems = items + 1;
						currentCart.id = myCurrentShop.id;
						setValue(0);
						saveCart(currentCart);
					}}
					leftComponent={
						<Text
							style={{
								color: '#8CCC80',
								fontSize: 17,
							}}
						>
							Add
						</Text>
					}
					onPress={(val) => {
						setValue(val);
						setTotalAmount(val);
					}}
				/>
				<View style={{ width: '80%' }}>
					{_.isEmpty(currentCart) ? (
						<TouchableOpacity
							onPress={(val) => {
								if (determineWhichNumber(value).value === 0) {
									return alert("You can't charge  empty ");
								}
								const mydata = {
									key: keyGenerator(20),
									mass: '',
									name: 'Custom Amount',
									productTotalAmount: determineWhichNumber(value).value,
									quantity: 1,
									salePrice: determineWhichNumber(value).value,
								};

								currentCart.data = [mydata];
								currentCart.totalAmount = determineWhichNumber(value).value;
								currentCart.totalItems = 1;
								currentCart.id = myCurrentShop.id;

								modalizeRef.current.open();
							}}
							style={{
								height: 50,
								width: '90%',
								backgroundColor: '#65D006',
								alignSelf: 'center',
								marginTop: 35,
								borderRadius: 5,
								alignItems: 'center',
								justifyContent: 'center',
								bottom: -10,
							}}
						>
							<Text semibold whiteColor style={{ fontSize: 15 }}>
								Charge {currencyFormatter(determineWhichNumber(value).value)}
							</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={(val) => {
								cartRef.current.open();
							}}
							style={{
								height: 50,
								width: '100%',
								backgroundColor: '#1F4655',
								alignSelf: 'center',
								marginTop: 35,
								borderRadius: 35,
								alignItems: 'center',
								justifyContent: 'space-between',
								bottom: -10,
								flexDirection: 'row',
								paddingHorizontal: 20,
								left: 5,
							}}
						>
							<View style={{ flexDirection: 'row' }}>
								<MaterialIcons name="shopping-cart" style={[styles.actionButtonIcon]} />
								<Text whiteColor style={{ fontSize: 14, left: 10 }}>
									{currentCart.totalItems} {currentCart.totalItems > 1 ? 'items' : 'item'}{' '}
								</Text>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<Text whiteColor style={{ fontSize: 14 }}>
									{currencyFormatter(currentCart?.totalAmount)}
								</Text>
								<MaterialCommunityIcons
									name="chevron-up-circle"
									style={[styles.actionButtonIcon, { left: 10, color: '#65D006' }]}
								/>
							</View>
						</TouchableOpacity>
					)}
				</View>
			</View>
			{/*Rest of App come ABOVE the action button component!*/}
			<ActionButton
				radius={150}
				size={50}
				bgColor="rgba(0, 0, 0, 0.4)"
				style={{ top: -50 }}
				position="right"
				buttonColor="rgba(231,76,60,1)"
			>
				<ActionButton.Item
					buttonColor="#9b59b6"
					size={50}
					title="New Task"
					onPress={() => addProductModalizeRef.current.open()}
				>
					<MaterialCommunityIcons name="plus" style={styles.actionButtonIcon} />
				</ActionButton.Item>
				<ActionButton.Item
					buttonColor="#3498db"
					size={50}
					autoInactive={true}
					title="Barcode"
					onPress={() => {
						// navigate(ROUTES.ScanBarCode, {type: 'edit'})
					}}
				>
					<MaterialCommunityIcons
						name="barcode-scan"
						style={styles.actionButtonIcon}
						onPress={registerClickScanButton}
					/>
				</ActionButton.Item>
				<ActionButton.Item
					buttonColor="#1abc9c"
					title="All Tasks"
					size={50}
					onPress={() => {
						cartRef.current.open();
					}}
				>
					<MaterialIcons name="shopping-cart" style={styles.actionButtonIcon} />
				</ActionButton.Item>
			</ActionButton>

			<EnterAmountScreen
				enterAmountRef={enterAmountRef}
				setEnterAmountValue={setEnterAmountValue}
				enterAmountValue={enterAmountValue}
				billlessError={billlessError}
				totalAmount={totalAmount}
				currentCart={currentCart}
				paymentMethod={paymentMethod}
				setBilChange={setBilChange}
				setModalVisible={setModalVisible}
				setBilllessError={setBilllessError}
				clearCart={clearCart}
			/>

			<PaymentMethodModal
				modalizeRef={modalizeRef}
				totalAmount={totalAmount}
				setEnterAmountValue={setEnterAmountValue}
				setPaymentMethod={setPaymentMethod}
				enterAmountRef={enterAmountRef}
			/>

			<Portal>
				<Modalize panGestureEnabled={false} ref={cartRef}>
					<View>
						<View
							style={{
								width: '100%',
								height: 40,
								justifyContent: 'center',
							}}
						>
							<TouchableOpacity
								onPress={() => {
									cartRef.current.close();
								}}
								style={{
									alignSelf: 'flex-end',
									alignItems: 'center',
									justifyContent: 'center',
									height: 20,
									width: 20,
									borderRadius: 25,
									backgroundColor: 'black',
									right: 20,
								}}
							>
								<Text whiteColor>X</Text>
							</TouchableOpacity>
						</View>

						<TabView
							navigationState={{ index, routes }}
							renderScene={renderScene}
							onIndexChange={setIndex}
							initialLayout={{ width: layout.width }}
							renderTabBar={renderTabBar}
						/>
					</View>
				</Modalize>
			</Portal>
		</View>
	);
};

export default index;

const styles = StyleSheet.create({
	actionButtonIcon: {
		fontSize: 20,
		height: 25,
		color: 'white',
	},
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 20,
	},
});

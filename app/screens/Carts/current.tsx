import React, { useState, useRef, useContext } from 'react';
import { View, TouchableOpacity, ScrollView, DeviceEventEmitter, KeyboardAvoidingView } from 'react-native';
import {
	TextComponent as Text,
	Input,
	FilterCategories,
	SaveButton,
	Errors,
	CustomProgressBar,
	Dialog,
} from '@components';
import { currencyFormatter, determineWhichNumber } from '@config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import { dimensions } from '@utils';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import { VirtualKeyboard } from '@components';
import { recordSellsForCash } from '@config';
import { CommonContext } from '@context';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modal, ModalContent, ScaleAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import { FONTS } from '@utils';
import { CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { isEmpty } from '@helpers';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@config';

const cartOptions = ['Saved', 'Note', 'Clear'];
const options = [
	{
		name: 'Payment link',
		icon: <MaterialCommunityIcons color="#319BBB" name="vector-link" size={30} />,
	},
	{
		name: 'Voucher',
		icon: <MaterialCommunityIcons color="#319BBB" name="credit-card-multiple-outline" size={30} />,
	},
	{
		name: 'Cash',
		icon: <Ionicons color="#319BBB" name="ios-cash-outline" size={30} />,
	},
];
const FirstRoute = (props) => {
	const [data, setData] = React.useState(props?.productsdata?.data);
	const [totalAmount, setTotalAmount] = React.useState(0);
	const [totalItems, setTotalItems] = React.useState('');
	const [emptyCart, setEmptyCart] = React.useState('');

	React.useEffect(() => {
		runCheckings();
	}, [props.totalDiscount]);

	const runCheckings = () => {
		if (typeof data === 'undefined') {
			setEmptyCart('Your cart is empty');
			return null;
		}
		setEmptyCart('');
		const newData = data?.map((x) => {
			x.productTotalAmount = saleQuanity(x);

			return x;
		});
		calculate(newData);
	};

	const saleQuanity = (x) => {
		const sale = determineWhichNumber(x.salePrice).value;
		const quantity = determineWhichNumber(x.quantity).value;
		return sale * quantity;
	};

	const calculate = (newData) => {
		if (newData?.length === 0) {
			setTotalItems(0);

			return setTotalAmount(0);
		}

		const amount = newData.map((x) => x.productTotalAmount).reduce((a, b) => a + b);

		const items = newData.map((x) => x.quantity).reduce((a, b) => a + b);

		setTotalAmount(amount - determineWhichNumber(props?.totalDiscount).value);
		setTotalItems(items);
	};

	const incrementToClass = (x, id) => {
		props.inrement(x, id);
	};
	return (
		<View
			style={{
				flex: 1,
				height: dimensions.height_screen - 170,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{cartOptions.map((x, i) => (
					<TouchableOpacity
						key={i}
						onPress={() => {
							if (x === 'Clear') {
								props.clearCart();
								setTotalAmount(0);
								setData([]);
							}
						}}
						style={{
							backgroundColor: '#E8E9EE',
							height: 40,
							width: 100,
							marginHorizontal: 10,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 5,
						}}
					>
						<Text key={i} style={{ color: x === 'Clear' ? '#ED3269' : '#1F4657' }}>
							{x}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			{emptyCart !== '' ? (
				<Text style={{ textAlign: 'center', marginTop: 50 }}>{emptyCart}</Text>
			) : (
				<ScrollView style={{ marginTop: 30 }}>
					{data?.map((x, i) => (
						<View key={i} style={{}}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									margin: 10,
									backgroundColor: '#F8F9FB',
								}}
							>
								<View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Menu key={i}>
										<MenuTrigger key={i}>
											<View
												style={{
													height: 45,
													width: 45,
													backgroundColor: '#065281',
													margin: 10,
													borderRadius: 2,
													justifyContent: 'center',
													alignItems: 'center',
												}}
											>
												<View
													style={{
														backgroundColor: 'white',
														height: 30,
														width: 30,
														borderRadius: 30,
														justifyContent: 'center',
														alignItems: 'center',
													}}
												>
													<Text bold style={{}}>
														{x.quantity}
													</Text>
												</View>
											</View>
										</MenuTrigger>
										<MenuOptions
											customStyles={{
												optionsContainer: [
													{ width: 130, marginLeft: 80, marginTop: 40, height: 70 },
												],
											}}
										>
											<MenuOption
											// onSelect={() => alert(`Save`)}
											// text="Discount"
											>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-evenly',
														alignItems: 'center',
													}}
												>
													<View style={{ top: -5 }}>
														<AntDesign
															key={i}
															name="minus"
															color="black"
															size={15}
															onPress={() => {
																if (data[i].quantity === 0) {
																	return false;
																}
																data[i].quantity = data[i].quantity - 1;
																data[i].productTotalAmount = saleQuanity(data[i]);
																calculate(data);
																setData([...data]);
															}}
														/>
													</View>
													<View style={{ width: 50 }}>
														<Input
															key={i}
															value={`${x.quantity}`}
															onChangeText={(value) => {
																data[i].quantity = Number(value);
																data[i].productTotalAmount = saleQuanity(data[i]);
																calculate(data);
																incrementToClass(data, data[i].key);
																setData([...data]);
															}}
														/>
													</View>
													<View style={{ top: -5 }}>
														<AntDesign
															name="plus"
															color="black"
															onPress={() => {
																data[i].quantity = Number(data[i].quantity) + 1;
																data[i].productTotalAmount = saleQuanity(data[i]);
																calculate(data);
																setData([...data]);
															}}
															size={15}
														/>
													</View>
												</View>
											</MenuOption>
										</MenuOptions>
									</Menu>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<View style={{ width: 150 }}>
											<Text numberOfLines={1} style={{ fontSize: 11 }}>
												{x.name}
											</Text>
										</View>

										<Text style={{ textAlign: 'center', fontSize: 11 }}>
											{x.mass === '' ? '' : `( ${x.mass} )`}
										</Text>
									</View>
								</View>

								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Text semibold style={{ textAlign: 'center', fontSize: 11, color: '#0B3F80' }}>
										{currencyFormatter(x.productTotalAmount)}
									</Text>
									<Menu>
										<MenuTrigger>
											<MaterialCommunityIcons name="dots-vertical" size={24} color="#000" />
										</MenuTrigger>
										<MenuOptions
											customStyles={{
												optionsContainer: [{ height: 160, justifyContent: 'center' }],
											}}
										>
											<MenuOption
												onSelect={() => alert(`Save`)}
												// text="Discount"
											>
												<Text style={{ left: 10, marginVertical: 5 }}>Discount</Text>
											</MenuOption>
											<MenuOption
												onSelect={() => alert(`Not called`)}
												// disabled={true}
												// text="Note"
											>
												<Text style={{ left: 10, marginVertical: 5 }}>Note</Text>
											</MenuOption>
											<MenuOption
												onSelect={() => {
													const id = data[i].key;
													const z = data.filter((d) => d.key !== id);
													setData([...z]);
													calculate(z);

													props.removeProducts(id);
												}}
											>
												<Text style={{ color: 'red', left: 10, marginVertical: 5 }}>
													Remove
												</Text>
											</MenuOption>
										</MenuOptions>
									</Menu>
								</View>
							</View>
						</View>
					))}
					<View style={{ height: 250 }} />
				</ScrollView>
			)}
			<View
				style={{
					position: 'absolute',
					bottom: 0,
					width: '100%',
					backgroundColor: 'white',
				}}
			>
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
						width: '90%',
						alignSelf: 'center',
						borderBottomWidth: 1,
						height: 30,
						marginVertical: 5,
						borderBottomColor: '#D2D2D2',
					}}
				>
					<Text style={{}}>Discount</Text>
					{props.totalDiscount === 0 ? (
						<AntDesign
							name="pluscircleo"
							color="black"
							onPress={() => {
								props.setDiscountModal(true);
							}}
							size={20}
						/>
					) : (
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ right: 10, color: 'red' }}>-R {props.totalDiscount}.00</Text>

							<AntDesign
								name="minuscircleo"
								color="black"
								onPress={() => {
									props.setTotalDiscount(0);
								}}
								size={20}
							/>
						</View>
					)}
				</View>
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
						width: '90%',
						alignSelf: 'center',
					}}
				>
					<Text style={{}}>Total</Text>
					<Text semibold style={{}}>
						{currencyFormatter(totalAmount)}
					</Text>
				</View>

				<TouchableOpacity
					onPress={(val) => {
						totalAmount === 0 ? null : props.charge(totalAmount);
					}}
					style={{
						height: 40,
						width: '90%',
						backgroundColor: totalAmount === 0 ? 'rgba(101, 208, 6,0.5)' : '#65D006',
						alignSelf: 'center',
						marginTop: 10,
						borderRadius: 5,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text semibold whiteColor style={{ fontSize: 15 }}>
						Charge {currencyFormatter(totalAmount)}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const EnterAmountScreen = (props) => {
	// const enterAmountRef = useRef<Modalize>(null);
	// const [enterAmountValue, setEnterAmountValue] = useState(0);
	// const [totalAmount, setTotalAmount] = useState(0);
	// const [billlessError, setBilllessError] = useState(false);
	// const [bilChange, setBilChange] = useState('');
	// const [modalVisible, setModalVisible] = useState(false);
	const { myCurrentShop, recordShopSells } = useContext(CommonContext);
	const user = useSelector((state) => state.auth.user);

	return (
		<Portal>
			<Modalize modalStyle={{ height: '100%', backgroundColor: '#F5F5F5' }} ref={props.enterAmountRef}>
				<View
					style={{
						alignItems: 'center',
						// justifyContent: 'center',
						padding: 5,
						height: '100%',
					}}
				>
					<View
						style={[
							{
								width: '100%',
								borderRadius: 8,
								padding: 6,
								height: '100%',
								// position: 'absolute',
								// bottom: 50,
							},
							{ backgroundColor: '#F5F5F5' },
						]}
					>
						<View
							style={{
								padding: 8,
								borderBottomColor: '#c7c7cc',
								borderBottomWidth: 1,
							}}
						>
							<TouchableOpacity
								style={{
									alignSelf: 'flex-end',
									alignItems: 'center',
									justifyContent: 'center',
									height: 25,
									width: 25,
									borderRadius: 20,
									backgroundColor: 'black',
									right: 10,
								}}
								onPress={() => props.enterAmountRef.current.close()}
							>
								<Text whiteColor>{'X'}</Text>
							</TouchableOpacity>
						</View>
						<Text style={{ color: '#000', fontSize: 50, alignSelf: 'flex-end' }}>
							R{' '}
							{props.enterAmountValue === 0 || props.enterAmountValue === '' ? 0 : props.enterAmountValue}
							.00
						</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-end',
								paddingTop: 24,
							}}
						>
							<Text style={{ color: '#7F8FA6', fontSize: 13 }}>Bill Total : </Text>
							<Text style={{ color: '#7F8FA6', fontSize: 13 }}>R {props.totalAmount}.00</Text>
						</View>
						{props.billlessError && (
							<Text style={{ color: 'red', fontSize: 12, alignSelf: 'flex-end' }}>
								You cant enter amount below the Total bill
							</Text>
						)}
						<VirtualKeyboard
							color="#7F8FA6"
							pressMode="string"
							leftItem={(val) => {
								if (props.enterAmountValue < props.totalAmount) {
									props.setEnterAmountValue(0);
									return props.setBilllessError(true);
								}
								const paidChange =
									determineWhichNumber(props.enterAmountValue).value -
									determineWhichNumber(props.totalAmount).value;
								props.currentCart.change = paidChange;
								props.currentCart.shop = myCurrentShop;
								props.currentCart.totalAmount2 = props.totalAmount;
								props.currentCart.enterAmountValue = props.enterAmountValue;
								props.currentCart.paymentMethod = props.paymentMethod;
								props.currentCart.user = user;

								recordSellsForCash(props.currentCart, recordShopSells);
								props.setBilChange(paidChange);
								props.enterAmountRef.current.close();
								DeviceEventEmitter.emit('event.reloadcart', 'reset');
								props.setModalVisible(true);
								props.clearCart(myCurrentShop.id);
							}}
							leftComponent={
								<View
									style={{
										backgroundColor: '#65D006',
										height: 40,
										width: 70,
										borderRadius: 15,
										alignItems: 'center',
										justifyContent: 'center',
										left: -15,
										top: 10,
									}}
								>
									<Text whiteColor semibold>
										Pay
									</Text>
								</View>
							}
							cellStyle={{ height: 80 }}
							style={{
								marginLeft: 10,
								marginRight: 10,
								marginTop: 70,
							}}
							onPress={(val) => {
								if (props.enterAmountValue < props.totalAmount) {
									props.setBilllessError(false);
								}
								// setEnterAmountValue(determineWhichNumber(val).value);
								props.setEnterAmountValue(determineWhichNumber(val).value);
							}}
						/>
					</View>
				</View>
			</Modalize>
		</Portal>
	);
};

export const PaymentMethodModal = (props) => {
	return (
		<Portal>
			<Modalize ref={props.modalizeRef}>
				<View
					style={{
						width: '100%',
						height: 50,
						justifyContent: 'center',
					}}
				>
					<TouchableOpacity
						onPress={() => {
							props.modalizeRef.current.close();
						}}
						style={{
							alignSelf: 'flex-end',
							alignItems: 'center',
							justifyContent: 'center',
							height: 30,
							width: 30,
							borderRadius: 30,
							backgroundColor: 'black',
							right: 20,
						}}
					>
						<Text whiteColor>X</Text>
					</TouchableOpacity>
				</View>
				<View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
					<Text style={{ fontSize: 50, color: '#1F4657' }}> {currencyFormatter(props.totalAmount)}</Text>
					<Text style={{ fontSize: 11, color: '#696E71' }}>Total Amount due</Text>
					<View
						style={{
							borderRadius: 4,
							width: 100,
							height: 30,
							borderWidth: 1,
							borderColor: '#4D9EB9',
							alignItems: 'center',
							justifyContent: 'center',
							marginVertical: 30,
						}}
					>
						<Text style={{ fontSize: 11, color: '#39B7CF' }}>Split bill</Text>
					</View>
				</View>
				<View style={{ alignItems: 'center', marginBottom: 10 }}>
					<Text style={{ color: '#2D3E45' }}>Select payment method</Text>
				</View>
				<View>
					<View
						style={{
							flexDirection: 'row',
							width: '100%',
							justifyContent: 'center',
							paddingHorizontal: 20,
							flexWrap: 'wrap',
						}}
					>
						{options.map((x, i) => (
							<TouchableOpacity
								key={i}
								onPress={() => {
									props.setEnterAmountValue(0);
									props.setPaymentMethod(x.name);
									if (x.name === 'Cash') {
										props.modalizeRef.current.close();
										return props.enterAmountRef.current.open();
									}
									props.modalizeRef.current.close();
									// setModalVisible(true);
									// navigate(ROUTES.Reports);,
								}}
								style={{
									height: 100,
									width: 150,
									borderWidth: 1,
									borderRadius: 8,
									margin: 10,
									borderColor: '#39B7CF',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{x.icon}
								<Text key={i} style={{ color: '#319BBB' }}>
									{x.name}
								</Text>
							</TouchableOpacity>
						))}
						<View
							style={{
								height: 100,
								width: 150,
								margin: 10,
							}}
						></View>
					</View>
				</View>
			</Modalize>
		</Portal>
	);
};

export const DiscountModal = (props) => {
	return (
		<Modal
			visible={props.discountModal} //discountModal
			onTouchOutside={() => {
				props.setDiscountModal(false);
			}}
			width={dimensions.width_screen - 40}
			height={215}
			modalTitle={<ModalTitle textStyle={{ fontSize: 15, fontFamily: FONTS.Regular }} title={'Discount'} />}
			modalAnimation={
				new ScaleAnimation({
					initialValue: 0, // optional
					animationDuration: 150, // optional
					useNativeDriver: true, // optional
				})
			}
			footer={
				<ModalFooter>
					<ModalButton
						textStyle={{
							color: 'red',
							fontWeight: '100',
							fontSize: 14,
							fontFamily: FONTS.Regular,
						}}
						bordered={true}
						text={'Cancel'}
						onPress={() => {
							props.setTotalDiscount(0);
							props.setDiscountModal(false);
						}}
					/>
					<ModalButton
						textStyle={{
							fontWeight: '100',
							fontSize: 14,
							fontFamily: FONTS.Regular,
						}}
						text={'Apply'}
						onPress={() => {
							props.setDiscountModal(false);
							props.setTotalDiscount(props.totalDiscount);
						}}
					/>
				</ModalFooter>
			}
			swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
			swipeThreshold={200} // default 100
			onSwipeOut={() => {
				props.setDiscountModal(false);
			}}
		>
			<ModalContent>
				<View>
					<View>
						<View
							style={{
								// height: 40,
								width: '100%',
								alignSelf: 'center',
								borderRadius: 5,
								top: 10,
							}}
						>
							<Input
								label={'Total Amount Discount'}
								labelStyle={{ alignSelf: 'center', fontSize: 12 }}
								onChangeText={(value) => props.setTotalDiscount(value)}
								value={`${props.totalDiscount}`}
								keyboardType="numeric"
								style={{ width: '100%' }}
								placeholder="efui"
							/>
						</View>
					</View>
				</View>
			</ModalContent>
		</Modal>
	);
};

export const SuccessModal = (props) => {
	return (
		<Modal
			visible={props.modalVisible}
			onTouchOutside={() => {}}
			width={dimensions.width_screen - 20}
			height={430}
			// modalTitle={
			//   <ModalTitle textStyle={{fontSize: 15}} title={'Cash R56.90'} />
			// }
			modalAnimation={
				new ScaleAnimation({
					initialValue: 0, // optional
					animationDuration: 150, // optional
					useNativeDriver: true, // optional
				})
			}
			// swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
			swipeThreshold={200} // default 100
			onSwipeOut={() => {}}
		>
			<ModalContent>
				<View
					style={{
						height: 30,
						width: '110%',
						borderBottomWidth: 1,
						borderBottomColor: '#BABDC9',
						left: -15,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Text style={{ fontSize: 11, left: 10, color: '#7F8FA6' }}>
						CASH: {currencyFormatter(props.totalAmount)}
					</Text>
					<TouchableOpacity
						onPress={() => {
							props.setModalVisible(false);
						}}
						style={{
							// position: 'absolute',
							right: 20,
							backgroundColor: '#E0E5F2',
							borderRadius: 30,
							height: 30,
							width: 30,
							alignItems: 'center',
							justifyContent: 'center',
							top: -10,
						}}
					>
						<Text>X</Text>
					</TouchableOpacity>
				</View>
				<View>
					<View style={{ alignItems: 'center', marginTop: 15 }}>
						<AntDesign name="checkcircleo" color="#65D006" size={90} />
						<Text style={{ fontSize: 20, marginTop: 30, color: '#7F8FA6' }}>Success!</Text>
					</View>
					<View>
						<Text style={{ textAlign: 'center', top: 50 }}>Change: R {props.bilChange}.00</Text>
						<TouchableOpacity
							onPress={(val) => {
								props.setModalVisible(false);
							}}
							style={{
								height: 40,
								width: '90%',
								backgroundColor: '#0084DB',
								alignSelf: 'center',
								marginTop: 35,
								borderRadius: 5,
								alignItems: 'center',
								justifyContent: 'center',
								bottom: -25,
							}}
						>
							<Text whiteColor style={{ fontSize: 12 }}>
								DONE
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={(val) => {
								props.modalizeRef.current.open();
							}}
							style={{
								height: 40,
								width: '90%',
								borderColor: '#0084DB',
								alignSelf: 'center',
								marginTop: 10,
								borderRadius: 5,
								alignItems: 'center',
								justifyContent: 'center',
								bottom: -25,
								borderWidth: 1,
							}}
						>
							<Text style={{ fontSize: 12, color: '#0084DB' }}>Send Recepient</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ModalContent>
		</Modal>
	);
};

export const AddProductModal = (props) => {
	const { navigate } = useNavigation();
	const user = props.user;
	const dataForm = () => {
		return {
			productName: '',
			// brand: '',
			salePrice: '',
			mass: '',
			buyingPrice: '',
			barcode: props.barcode,
			// productURI: '',
			// catalogVisibility: '',
			InCase: '',
			category: [],
			cratePrize: true,
			user: {
				fullName: user.fullName,
				id: user.uid,
			},
		};
	};
	const [data, setData] = React.useState(dataForm());
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		props.barcode ? updateData('barcode', props.barcode) : null;
	}, []);

	const saveProduct = async () => {
		const valid = isEmpty(data);
		valid
			? Errors({
					message: 'Empty Fields',
					position: 'bottom',
					autoHide: true,
					description: 'Please fill all fields',
			  })
			: (async () => {
					setIsLoading(true);

					props
						.recordProduct(data, user.myShops[0].id)
						.then(() => {
							setIsLoading(false);
							setData(dataForm());
							Errors({
								message: 'Product created',
								description: ` Your ${data.productName} was successfull added into shop`,
								autoHide: true,
								type: 'success',
								position: 'bottom',
							});
							props.addProductModalizeRef.current.close();
						})
						.catch((error) => {
							setIsLoading(false);
							Errors({
								message: 'Error ocuured',
								description: error,
								position: 'bottom',
							});
						});
			  })();
	};
	const updateData = (key, value) => {
		setData({
			...data,
			[key]: value,
		});
	};

	return (
		<Portal>
			<Modalize ref={props.addProductModalizeRef}>
				<View
					style={{
						width: '100%',
						height: 50,
						justifyContent: 'center',
					}}
				>
					<CustomProgressBar
						category={2}
						loaderText="Creating..."
						loader={7}
						width={110}
						height={110}
						visible={isLoading}
					/>
					<TouchableOpacity
						onPress={() => {
							props.addProductModalizeRef.current.close();
						}}
						style={{
							alignSelf: 'flex-end',
							alignItems: 'center',
							justifyContent: 'center',
							height: 30,
							width: 30,
							borderRadius: 30,
							backgroundColor: 'black',
							right: 20,
						}}
					>
						<Text whiteColor>X</Text>
					</TouchableOpacity>
				</View>
				<View>
					<View
						style={{
							width: '100%',
							justifyContent: 'center',
							paddingHorizontal: 20,
						}}
					>
						<KeyboardAvoidingView behavior="height">
							<ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
								<View>
									<Input
										label={'Product Name'}
										value={data?.productName}
										isRequired
										onChangeText={(value) => updateData('productName', value)}
									/>

									<Input
										label={'Mass (kg /g /ml /L) '}
										value={data?.mass}
										isRequired
										onChangeText={(value) => updateData('mass', value)}
									/>
									<Input
										label={'In a Case'}
										value={data?.InCase}
										isRequired
										keyboardType="numeric"
										onChangeText={(value) => updateData('InCase', value)}
									/>

									<View
										style={{
											flexDirection: 'row',
											marginHorizontal: -6,
										}}
									>
										<View
											style={{
												flex: 1,
												marginHorizontal: 6,
												justifyContent: 'center',
											}}
										>
											<Input
												label={'Buying price/ case'}
												isRequired
												keyboardType="numeric"
												value={data?.buyingPrice}
												onChangeText={(value) => updateData('buyingPrice', value)}
											/>
										</View>
										<View
											style={{
												flex: 1,
												marginHorizontal: 6,
												justifyContent: 'center',
											}}
										>
											<View>
												<CheckBox
													title={'Crate price'}
													textStyle={{
														fontFamily: FONTS.Regular,
														fontWeight: '400',
														fontSize: 11,
													}}
													checkedIcon="check-square-o"
													uncheckedIcon="square-o"
													checked={data?.cratePrize}
													containerStyle={{
														backgroundColor: 'white',
														width: '95%',
														height: 20,
														borderRadius: 10,
														borderColor: 'white',
													}}
													onPress={() => {
														data.cratePrize = !data.cratePrize;
														setData({ ...data });
													}}
												/>
											</View>
										</View>
									</View>
									{data?.cratePrize ? (
										<Input
											label={'Crate price'}
											value={data?.crate}
											isRequired
											onChangeText={(value) => updateData('crate', value)}
										/>
									) : null}
									<Input
										label={'Sale price'}
										value={data?.salePrice}
										isRequired
										keyboardType="numeric"
										onChangeText={(value) => updateData('salePrice', value)}
									/>

									<View>
										<Input
											label={'Barcode Digits '}
											onChangeText={(value) => updateData('barcode', value)}
											value={data?.barcode}
											style={{ width: '70%' }}
										/>
									</View>
								</View>

								<SaveButton
									title="Scan Bar Code"
									size="small"
									secondary
									buttonStyle={[
										{
											alignItems: 'center',
											width: 300,
											alignSelf: 'center',
											height: 150,
											borderWidth: 0.5,
										},
									]}
									containerStyle={{
										marginVertical: 5,
										alignSelf: 'center',
										marginBottom: 50,
									}}
									onPress={() => {
										DeviceEventEmitter.addListener('event.addProductsLoadbarcode', (res) => {
											props.addProductModalizeRef.current.open();
											updateData('barcode', res);
										});
										props.addProductModalizeRef.current.close();
										navigate(ROUTES.ScanBarCode, { type: 'addPos' });
									}}
								/>
								<View
									style={{
										marginHorizontal: 10,
										bottom: 2,
										width: '90%',
										alignSelf: 'center',
									}}
								>
									<LinearGradient
										style={{
											borderRadius: 10,
										}}
										colors={['#F05F3E', '#ED3269']}
										start={{ x: 1, y: 0 }}
										end={{ x: 1, y: 1 }}
									>
										<SaveButton
											title={'Save'}
											titleStyle={{ textAlign: 'center' }}
											size="small"
											style={{ alignItems: 'center' }}
											buttonStyle={{
												backgroundColor: 'transparent',
												alignItems: 'center',
												justifyContent: 'center',
											}}
											onPress={saveProduct}
										/>
									</LinearGradient>
								</View>
							</ScrollView>
						</KeyboardAvoidingView>
					</View>
				</View>
			</Modalize>
		</Portal>
	);
};

export default FirstRoute;

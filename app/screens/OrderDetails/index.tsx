import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { Dialog, Input, TextComponent, GrayCard, Accordion } from '@components';
import styles from './styles';
import { dimensions, FONTS } from '@utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CommonContext } from '@context';
import moment from 'moment';
import { currencyFormatter, determineWhichNumber } from '@config';
import LinearGradient from 'react-native-linear-gradient';
import { Modal, ModalContent, ScaleAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import { StyleSheet } from 'react-native';

const productModalStyles = StyleSheet.create({
	firsttxt: {
		color: 'red',
		fontWeight: '100',
		fontSize: 14,
		fontFamily: FONTS.Regular,
	},
	secondtxt: {
		fontWeight: '100',
		fontSize: 14,
		fontFamily: FONTS.Regular,
	},
	title: {
		fontSize: 15,
		fontFamily: FONTS.Regular,
	},

	mainContent: {
		paddingHorizontal: 12,
		paddingVertical: 20,
		flexDirection: 'row',
	},
	contentStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		top: 10,
		height: 300,
	},
});
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

const { width_screen, height_screen } = dimensions;
const OrderDetails = (props) => {
	const { goBack } = useNavigation();
	const [elevation] = useState(5);
	const [orderUser, setOrderUser] = useState({});
	const [sections, setsections] = useState([]);
	const [fullData, setFullData] = useState([]);
	const [showLeft, setShowLeft] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [data, setData] = useState({});
	const [modalDelete, setModalDelete] = useState(false);
	const [activeSections, setActiveSections] = useState([]);
	const { colors } = useTheme();
	const { mySelectedOrders, deleteProductFromDeliveries } = useContext(CommonContext);
	const [arrayLength, setArrayLength] = useState({
		current: 0,
		full: 0,
	});
	const createSections = async () => {
		let count = 1;

		const SECTIONS = await mySelectedOrders.products.map((x) => {
			x.totalSalePrice =
				determineWhichNumber(x.salePrice).value *
				determineWhichNumber(x.quantity).value *
				determineWhichNumber(x.InCase).value;
			x.totalBuyingPrice = determineWhichNumber(x.buyingPrice).value * determineWhichNumber(x.quantity).value;
			if (x.includingVat) {
				const first = parseInt(x.vat) / 100;
				const second = first * parseInt(x.amount);

				return {
					title: {
						name: `${x.name}  ( ${x.mass} )`,
						quantity: x.quantity,
						amount: x.amount,
						count: count++,
					},
					content: { ...x, includingVatAmount: second, vatamount: second },
				};
			}
			return {
				title: {
					name: `${x.name}  ( ${x.mass} )`,
					quantity: x.quantity,
					amount: x.amount,
					count: x.count,
				},
				content: { ...x },
			};
		});

		setsections(SECTIONS.slice(0, 10));
		setFullData(SECTIONS);
		setArrayLength({ full: SECTIONS.length, current: 10 });

		const totalvat = SECTIONS.filter((x) => x.content.includingVat)
			.map((v) => v.content.vatamount)
			.reduce((a, b) => a + b);
		mySelectedOrders.totalvat = totalvat;

		const totalS = SECTIONS.map((x) => x.content.totalSalePrice).reduce((a, b) => a + b);
		const totalB = SECTIONS.map((x) => x.content.totalBuyingPrice).reduce((a, b) => a + b);
		const totalQ = SECTIONS.map((x) => determineWhichNumber(x.content.quantity).value1).reduce((a, b) => a + b);
		mySelectedOrders.statistics.totalBuyingAmount = totalB;
		mySelectedOrders.statistics.totalSellingAmount = totalS;
		mySelectedOrders.statistics.profit = totalS - totalB;
		mySelectedOrders.statistics.totalItems = totalQ;
		// const SECTIONS = [
		//   {
		//     title: 'First',
		//     content: 'Lorem ipsum...',
		//   },
		//   {
		//     title: 'Second',
		//     content: 'Lorem ipsum...',
		//   },
		// ];
	};
	const shopOrders = async () => {
		console.log(mySelectedOrders.rendertype);
		let count = 1;
		const SECTIONS = await mySelectedOrders.productsData.map((x) => {
			x.totalSalePrice = parseInt(x.salePrice) * parseInt(x.value) * parseInt(x.InCase);
			x.totalBuyingPrice = parseInt(x.buyingPrice) * parseInt(x.value);
			// x.count = ;
			return {
				title: {
					name: `${x.name}  ( ${x.mass} )`,
					value: x.value,
					amount: x.amount,
					count: count++,
				},
				content: { ...x },
			};
		});
		setsections(SECTIONS.slice(0, 10));
		setFullData(SECTIONS);
		setArrayLength({ full: SECTIONS.length, current: 10 });
	};
	useEffect(() => {
		mySelectedOrders.rendertype === 'stock' ? shopOrders() : createSections();
		props.navigation.setOptions({
			headerTitle: () => (
				<TextComponent
					style={{
						fontSize: 16,
						color: 'white',
					}}
				>
					{mySelectedOrders.rendertype === 'stock' ? 'Stock' : null}
					{mySelectedOrders.rendertype === 'deliveries' ? 'Stock Deliveries' : null}
				</TextComponent>
			),
		});

		// getIndividualUser(currentFromHomeOrders.userId).then((res) => {
		//   console.log(currentFromHomeOrders);
		//   setOrderUser(res.data());
		// });
	}, []);
	const updateSections = (val) => {
		setActiveSections(val);
		// this.setState({activeSections});
	};
	const renderSectionTitle = (section) => {
		return (
			<View>
				<TextComponent>renderSectionTitle</TextComponent>
			</View>
		);
	};
	const renderHeader = (section) => {
		const item = section.title;
		return (
			<View style={{ paddingHorizontal: 10, marginTop: 20 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: 30,
					}}
				>
					<View style={{ width: '60%' }}>
						<TextComponent numberOfLines={1} style={{ fontSize: 10 }}>
							<TextComponent bold>{item.count}) </TextComponent> {item.name}
						</TextComponent>
					</View>
					<View style={{ width: '15%' }}>
						<TextComponent style={{ fontSize: 10, width: 50, textAlign: 'center' }}>
							x {mySelectedOrders.rendertype === 'stock' ? item.value : item.quantity}
						</TextComponent>
					</View>
					<View style={{ width: '25%', alignItems: 'flex-end' }}>
						<TextComponent style={{ fontSize: 10, fontWeight: '600' }}>
							{currencyFormatter(item.amount)}
						</TextComponent>
					</View>
				</View>
			</View>
		);
	};
	const renderContent = (section) => {
		const item = section.content;
		return (
			<View>
				<GrayCard secondary style={styles.greyBG}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent style={{ fontSize: 12 }}>* Name</TextComponent>
						<TextComponent semibold style={{ fontSize: 11, color: '#ED3269' }}>
							{item.name} ( {item.mass} )
						</TextComponent>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent style={{ fontSize: 12 }}>* In a case</TextComponent>
						<TextComponent semibold style={{ fontSize: 11, color: '#ED3269' }}>
							{item.InCase}
						</TextComponent>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent
							style={{
								fontSize: 12,
								color: item.includingVat ? 'green' : 'red',
							}}
						>
							* {item.includingVat ? 'Including Vat' : 'Excluding Vat'}
						</TextComponent>
						<TextComponent semibold style={{ fontSize: 11, color: '#ED3269' }}>
							{currencyFormatter(item.includingVat ? item.includingVatAmount : item.amount)}
						</TextComponent>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent
							style={{
								fontSize: 12,
							}}
						>
							* Quantity
						</TextComponent>
						<TextComponent semibold style={{ fontSize: 11, color: '#ED3269' }}>
							{item.quantity}
						</TextComponent>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent style={{ fontSize: 12 }}>* Each selling prize</TextComponent>
						<TextComponent semibold style={{ fontSize: 11, color: '#ED3269' }}>
							{currencyFormatter(item.salePrice)}
						</TextComponent>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
							marginBottom: 20,
						}}
					>
						<TextComponent
							style={{
								fontSize: 12,
							}}
						>
							* Each cost prize
						</TextComponent>
						<TextComponent semibold style={{ fontSize: 11, color: '#ED3269' }}>
							{currencyFormatter(parseInt(item.buyingPrice) / parseInt(item.InCase))}
						</TextComponent>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent style={{ fontSize: 12 }}>* Total Selling Prize</TextComponent>
						<TextComponent semibold style={{ fontSize: 11, color: '#ED3269' }}>
							{currencyFormatter(item.totalSalePrice)}
						</TextComponent>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent style={{ fontSize: 12 }}>* Total Cost Prize</TextComponent>
						<TextComponent semibold style={{ fontSize: 11, color: '#ED3269' }}>
							{currencyFormatter(item.totalBuyingPrice)}
						</TextComponent>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent semibold style={{ fontSize: 12, left: 100 }}>
							* Profit{' '}
						</TextComponent>
						<TextComponent
							semibold
							style={{
								fontSize: 11,
								color: '#ED3269',
								textDecorationLine: 'underline',
							}}
						>
							{currencyFormatter(item.profit?.amount)}
						</TextComponent>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<TouchableOpacity
							style={{
								height: 30,
								width: 30,
								borderRadius: 30,
								backgroundColor: 'red',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={() => {
								setModalVisible(true);
								setData(item);
							}}
						>
							<AntDesign name="edit" size={17} color={'#fff'} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								height: 30,
								width: 30,
								borderRadius: 30,
								backgroundColor: 'red',
								marginHorizontal: 30,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={() => {
								setData(item);
								setModalDelete(true);
							}}
						>
							<AntDesign name="delete" size={17} color={'#fff'} />
						</TouchableOpacity>
					</View>
				</GrayCard>
			</View>
		);
	};
	const renderShopContent = (section) => {
		const item = section.content;
		return (
			<View>
				<GrayCard secondary style={styles.greyBG}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent style={{ fontSize: 12 }}>* Name</TextComponent>
						<TextComponent semibold style={{ fontSize: 12, color: '#ED3269' }}>
							{item.name} ( {item.mass} )
						</TextComponent>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent style={{ fontSize: 12 }}>* In a case</TextComponent>
						<TextComponent semibold style={{ fontSize: 12, color: '#ED3269' }}>
							{item.InCase}
						</TextComponent>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent
							style={{
								fontSize: 12,
							}}
						>
							* Quantity
						</TextComponent>
						<TextComponent semibold style={{ fontSize: 12, color: '#ED3269' }}>
							{item.value}
						</TextComponent>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent style={{ fontSize: 12 }}>* Each selling prize</TextComponent>
						<TextComponent semibold style={{ fontSize: 12, color: '#ED3269' }}>
							{currencyFormatter(item.salePrice)}
						</TextComponent>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
							marginBottom: 20,
						}}
					>
						<TextComponent
							style={{
								fontSize: 12,
							}}
						>
							* Each cost prize
						</TextComponent>
						<TextComponent semibold style={{ fontSize: 12, color: '#ED3269' }}>
							{currencyFormatter(parseInt(item.buyingPrice) / parseInt(item.InCase))}
						</TextComponent>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent style={{ fontSize: 12 }}>* Total Selling Prize</TextComponent>
						<TextComponent semibold style={{ fontSize: 12, color: '#ED3269' }}>
							{currencyFormatter(item.totalSalePrice)}
						</TextComponent>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent style={{ fontSize: 12 }}>* Total Cost Prize</TextComponent>
						<TextComponent semibold style={{ fontSize: 12, color: '#ED3269' }}>
							{currencyFormatter(item.totalBuyingPrice)}
						</TextComponent>
					</View>
				</GrayCard>
			</View>
		);
	};
	const ListHeaderComponent = () => (
		<GrayCard secondary style={styles.greyBG}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<TextComponent semibold style={{ fontSize: 12 }}>
					Invoice Number
				</TextComponent>
				<TextComponent style={{ fontSize: 12 }}># {mySelectedOrders.invoice}</TextComponent>
			</View>
			{
				(mySelectedOrders.routeType = 'stock' ? null : (
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 10,
						}}
					>
						<TextComponent semibold style={{ fontSize: 12 }}>
							Delivery Number
						</TextComponent>
						<TextComponent style={{ fontSize: 12 }}># {mySelectedOrders.deliveryNumber}</TextComponent>
					</View>
				))
			}

			<View
				style={{
					flexDirection: 'row',

					marginTop: 15,
				}}
			>
				<TextComponent style={{ fontSize: 12 }}>Name :</TextComponent>
				<TextComponent ultraLight style={{ left: 40, fontSize: 12 }}>
					{mySelectedOrders.fullName}
				</TextComponent>
			</View>

			<View
				style={{
					flexDirection: 'row',

					marginTop: 9,
				}}
			>
				<TextComponent style={{ fontSize: 12 }}> Shop :</TextComponent>
				<TextComponent ultraLight style={{ left: 40, fontSize: 12 }}>
					{mySelectedOrders.metadata.shopName}
				</TextComponent>
			</View>

			<View
				style={{
					flexDirection: 'row',

					marginTop: 9,
				}}
			>
				<TextComponent style={{ fontSize: 12 }}>Time :</TextComponent>
				<TextComponent ultraLight style={{ left: 40, fontSize: 12 }}>
					{moment(mySelectedOrders.createdAt.toDate()).format(' HH:mm:ss a')}
				</TextComponent>
			</View>

			<View
				style={{
					flexDirection: 'row',

					marginTop: 9,
				}}
			>
				<TextComponent style={{ fontSize: 12 }}>Date :</TextComponent>
				<TextComponent ultraLight style={{ left: 40, fontSize: 12 }}>
					{moment(mySelectedOrders.createdAt.toDate()).format('dddd Do MMM YYYY')}
				</TextComponent>
			</View>
			<View
				style={{
					flexDirection: 'row',

					marginTop: 9,
				}}
			>
				<TextComponent semibold style={{ fontSize: 12 }}>
					{mySelectedOrders.type}
				</TextComponent>
				<TextComponent
					ultraLight
					style={{
						left: 40,
						fontSize: 12,
						color: 'orange',
					}}
				></TextComponent>
			</View>
		</GrayCard>
	);
	const ListFooterComponent = () => (
		<View style={{ marginBottom: 100 }}>
			<View
				style={{
					paddingHorizontal: 10,
					marginTop: 10,
					borderTopWidth: 1,
					marginHorizontal: 10,
					paddingTop: 10,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: 40,
					}}
				>
					<TextComponent bold style={{ fontSize: 11 }}>
						Total Buying Amount
					</TextComponent>

					<TextComponent
						style={{
							fontSize: 11,
							fontWeight: '600',
							color: '#ED3269',
						}}
					>
						{currencyFormatter(mySelectedOrders.statistics.totalBuyingAmount)}
					</TextComponent>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: 20,
						top: -15,
					}}
				>
					<TextComponent bold style={{ fontSize: 11 }}>
						Total Selling Amount
					</TextComponent>

					<TextComponent
						style={{
							fontSize: 11,
							fontWeight: '600',
							color: '#ED3269',
						}}
					>
						{currencyFormatter(mySelectedOrders.statistics.totalSellingAmount)}
					</TextComponent>
				</View>
				<TextComponent
					style={{
						fontSize: 11,
						fontWeight: '600',
						alignSelf: 'flex-end',
					}}
				>
					..........................
				</TextComponent>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: 40,
					}}
				>
					<TextComponent style={{ fontSize: 11 }}>Estimated Profit</TextComponent>

					<TextComponent
						style={{
							fontSize: 11,
							fontWeight: '600',
							color: '#ED3269',
						}}
					>
						{currencyFormatter(mySelectedOrders.statistics.profit)}
					</TextComponent>
				</View>
			</View>
			<View
				style={{
					paddingHorizontal: 10,
					marginHorizontal: 20,
					top: -10,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: 30,
					}}
				>
					<TextComponent style={{ fontSize: 11 }}>Total Items</TextComponent>

					<TextComponent
						style={{
							fontSize: 11,
							fontWeight: '600',
							color: '#ED3269',
						}}
					>
						{mySelectedOrders.statistics.totalItems}
					</TextComponent>
					<TextComponent
						style={{
							fontSize: 11,
							fontWeight: '600',
							color: '#fff',
						}}
					>
						..................
					</TextComponent>
				</View>
			</View>

			<View
				style={{
					paddingHorizontal: 10,
					marginHorizontal: 20,
					top: -10,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: 30,
					}}
				>
					<TextComponent style={{ fontSize: 11 }}>Total Vat</TextComponent>

					<TextComponent
						style={{
							fontSize: 11,
							fontWeight: '600',
							color: '#ED3269',
						}}
					>
						{currencyFormatter(mySelectedOrders.totalvat)}
					</TextComponent>
					<TextComponent
						style={{
							fontSize: 11,
							fontWeight: '600',
							color: '#fff',
						}}
					>
						..................
					</TextComponent>
				</View>
			</View>
		</View>
	);
	const ListShopFooterComponent = () => (
		<View style={{ marginBottom: 100 }}>
			<View
				style={{
					paddingHorizontal: 10,
					marginTop: 10,
					borderTopWidth: 1,
					marginHorizontal: 10,
					paddingTop: 10,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: 40,
					}}
				>
					<TextComponent bold style={{ fontSize: 11 }}>
						Total Buying Amount
					</TextComponent>

					<TextComponent
						style={{
							fontSize: 11,
							fontWeight: '600',
							color: '#ED3269',
						}}
					>
						{currencyFormatter(mySelectedOrders.totalAmount)}
					</TextComponent>
				</View>
			</View>
			<View
				style={{
					paddingHorizontal: 10,
					marginHorizontal: 20,
					top: -10,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						height: 30,
					}}
				>
					<TextComponent style={{ fontSize: 11, width: '53%' }}>Total Items</TextComponent>

					<TextComponent
						style={{
							fontSize: 11,
							fontWeight: '600',
							color: '#ED3269',
						}}
					>
						{mySelectedOrders.totalItems}
					</TextComponent>
					<TextComponent
						style={{
							fontSize: 11,
							fontWeight: '600',
							color: '#fff',
						}}
					>
						..................
					</TextComponent>
				</View>
			</View>
		</View>
	);
	const deleteData = () => {
		setModalDelete(false);
		deleteProductFromDeliveries(mySelectedOrders.key, data);
		goBack();
		DeviceEventEmitter.emit('event.reloadDeliveries', {});
		DeviceEventEmitter.removeAllListeners('event.reloadDeliveries');
		// const x = fullData.filter((r) => {
		// 	return r.key !== data.key;
		// });

		// setsections(x.slice(0, 10));
		// setFullData(x);
		// setArrayLength({ full: x.length, current: 10 });
		// const totalvat = x
		// 	.filter((v) => v.content.includingVat)
		// 	.map((v) => v.content.vatamount)
		// 	.reduce((a, b) => a + b);

		// mySelectedOrders.totalvat = totalvat;
	};

	return (
		<View style={styles.container}>
			<Dialog
				modalVisible={modalDelete}
				title="Delete Warning"
				content={
					<View>
						<TextComponent>Do you want to delete</TextComponent>
						<TextComponent bold style={{ marginTop: 11 }}>
							{data?.name}
						</TextComponent>
						<TextComponent style={{ marginTop: 11, textAlign: 'center' }}>{data?.mass}</TextComponent>
					</View>
				}
				height={220}
				onSwipefunc={() => setModalDelete(false)}
				onTouchOutside={() => setModalDelete(false)}
				firstButtontext="Delete"
				secondButtontext="Cancel"
				firstButtonOnPress={() => {
					deleteData();
				}}
				secondButtonOnPress={() => setModalDelete(false)}
			/>
			<ProductModal
				modalVisible={modalVisible}
				title={'scannedProductData'}
				firstButtonOnPress={() => setModalVisible(false)}
				secondButtonOnPress={() => setModalVisible(false)}
				content={
					<View style={{ width: '100%', alignItems: 'center' }}>
						<View style={{ marginTop: 10 }}>
							<TextComponent style={{ fontSize: 15 }}>{data.name}</TextComponent>
						</View>

						<View style={{ marginTop: 20 }}>
							<TextComponent>{data.mass}</TextComponent>
						</View>
						<View
							style={{
								marginTop: 20,
								// flexDirection: 'row',
								// justifyContent: 'space-between',
								// width: '80%',
							}}
						></View>
						<Input
							label={'Amount'}
							// onChangeText={(value) => updateData('barcode', value)}
							value={data.buyingPrice}
							style={{ width: '100%' }}
						/>
						<Input
							label={'Quantity'}
							// onChangeText={(value) => updateData('barcode', value)}
							value={data.quantity}
							style={{ width: '100%' }}
						/>
						<View
							style={{
								marginTop: 10,
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: '100%',
							}}
						></View>
					</View>
				}
				setCloseModal={setModalVisible}
			/>
			{/* <ScrollView contentContainerStyle={{}}> */}
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
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 30,
						height: 30,
						width: '100%',
					}}
				>
					{true ? (
						<>
							<TouchableOpacity
								onPress={() => {
									// const first = arrayLength.current;
									// const last = 10 + arrayLength.current;
									const first = arrayLength.current;
									const last = arrayLength.current - 10;

									setsections([...fullData.slice(last, first)]);
									if (arrayLength.current == 10) return setShowLeft(false);

									setArrayLength({
										...arrayLength,
										current: last,
									});
								}}
								style={{
									height: 30,
									width: 60,
									alignItems: 'center',
									justifyContent: 'center',
									left: 20,
								}}
							>
								{showLeft ? (
									<LinearGradient
										style={{
											height: 20,
											width: 35,
											borderRadius: 20,
											elevation: 5,
											justifyContent: 'center',
											alignItems: 'center',
										}}
										colors={['#F05F3E', '#ED3269']}
										start={{ x: 1, y: 0 }}
										end={{ x: 1, y: 1 }}
									>
										<View style={{ flexDirection: 'row' }}>
											<AntDesign name="arrowleft" size={20} color="white" />
										</View>
									</LinearGradient>
								) : null}
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									const first = arrayLength.current;
									const last = 10 + arrayLength.current;
									if (arrayLength.current > arrayLength.full) return false;
									setsections([...fullData.slice(first, last)]);
									setArrayLength({
										...arrayLength,
										current: last,
									});
									setShowLeft(true);
								}}
								style={{
									height: 30,
									width: 60,
									alignItems: 'center',
									justifyContent: 'center',
									right: 20,
								}}
							>
								<LinearGradient
									style={{
										height: 20,
										width: 35,
										borderRadius: 20,
										elevation: 5,
										justifyContent: 'center',
										alignItems: 'center',
									}}
									colors={['#F05F3E', '#ED3269']}
									start={{ x: 1, y: 0 }}
									end={{ x: 1, y: 1 }}
								>
									<View style={{ flexDirection: 'row' }}>
										<AntDesign name="arrowright" size={20} color="white" />
									</View>
								</LinearGradient>
							</TouchableOpacity>
						</>
					) : null}
				</View>
				<View style={{ alignItems: 'center', top: 5 }}>
					<View style={styles.topTitle2}>
						<TextComponent>Report Summary Details</TextComponent>
					</View>
					<View
						style={{
							width: width_screen - 20,

							borderWidth: 0.5,
							top: 5,
							borderRadius: 10,

							borderColor: '#BDBDBD',
							height: height_screen - 135,
						}}
					>
						<Accordion
							sections={sections}
							activeSections={activeSections}
							underlayColor="#ccc--"
							// renderSectionTitle={renderSectionTitle}
							renderHeader={renderHeader}
							renderContent={mySelectedOrders.rendertype === 'stock' ? renderShopContent : renderContent}
							onChange={updateSections}
							ListHeaderComponent={ListHeaderComponent}
							ListFooterComponent={
								mySelectedOrders.rendertype === 'stock' ? ListShopFooterComponent : ListFooterComponent
							}
						/>

						{/* <FlatList
              data={mySelectedOrders.products}
              keyExtractor={keyExtractor}
              renderItem={({item}) => (
                <View style={{paddingHorizontal: 10, marginTop: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 30,
                    }}>
                    <TextComponent style={{fontSize: 11}}>
                      <TextComponent bold>{item.count}) </TextComponent>{' '}
                      {item.name} ( {item.mass} )
                    </TextComponent>
                    <TextComponent style={{fontSize: 11}}>
                      x {item.quantity}
                    </TextComponent>
                    <TextComponent style={{fontSize: 11, fontWeight: '600'}}>
                      {currencyFormatter(item.amount)}
                    </TextComponent>
                  </View>
                </View>
              )}
              ListHeaderComponent={() => (
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
                      Delivery Number
                    </TextComponent>
                    <TextComponent style={{fontSize: 12}}>
                      # {mySelectedOrders.deliveryNumber}
                    </TextComponent>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',

                      marginTop: 15,
                    }}>
                    <TextComponent style={{fontSize: 12}}>Name :</TextComponent>
                    <TextComponent ultraLight style={{left: 40, fontSize: 12}}>
                      {mySelectedOrders.fullName}
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
                      {moment(mySelectedOrders.createdAt.toDate()).format(
                        ' HH:mm:ss a',
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
                      {moment(mySelectedOrders.createdAt.toDate()).format(
                        'dddd Do MMM YYYY',
                      )}
                    </TextComponent>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',

                      marginTop: 9,
                    }}>
                    <TextComponent semibold style={{fontSize: 12}}>
                      {mySelectedOrders.type}
                    </TextComponent>
                    <TextComponent
                      ultraLight
                      style={{
                        left: 40,
                        fontSize: 12,
                        color: 'orange',
                      }}></TextComponent>
                  </View>
                </GrayCard>
              )}
              ListFooterComponent={() => (
                <View style={{marginBottom: 100}}>
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
                        Total Buying Amount
                      </TextComponent>

                      <TextComponent
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: '#ED3269',
                        }}>
                        {currencyFormatter(
                          mySelectedOrders.statistics.totalBuyingAmount,
                        )}
                      </TextComponent>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: 20,
                        top: -15,
                      }}>
                      <TextComponent bold style={{fontSize: 11}}>
                        Total Selling Amount
                      </TextComponent>

                      <TextComponent
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: '#ED3269',
                        }}>
                        {currencyFormatter(
                          mySelectedOrders.statistics.totalSellingAmount,
                        )}
                      </TextComponent>
                    </View>
                    <TextComponent
                      style={{
                        fontSize: 11,
                        fontWeight: '600',
                        alignSelf: 'flex-end',
                      }}>
                      ..........................
                    </TextComponent>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: 40,
                      }}>
                      <TextComponent style={{fontSize: 11}}>
                        Estimated Profit
                      </TextComponent>

                      <TextComponent
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: '#ED3269',
                        }}>
                        {currencyFormatter(mySelectedOrders.statistics.profit)}
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
                      <TextComponent style={{fontSize: 11}}>
                        Total Items
                      </TextComponent>

                      <TextComponent
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: '#ED3269',
                        }}>
                        {mySelectedOrders.statistics.totalItems}
                      </TextComponent>
                      <TextComponent
                        style={{
                          fontSize: 11,
                          fontWeight: '600',
                          color: '#fff',
                        }}>
                        ..................
                      </TextComponent>
                    </View>
                  </View>
                </View>
              )}
            /> */}
					</View>
				</View>
				<View style={{ height: 400 }}></View>
			</View>
			{/* </ScrollView> */}
			{/* <FloatButton bottom={180}>
        <AntDesign name="edit" size={30} color="#fff" />
      </FloatButton> */}
			{/* <FloatButton
        bottom={100}
        onPress={() => {
          alert(12);
        }}>
      </FloatButton> */}

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
				onPress={() => {}}
			>
				<LinearGradient
					style={{
						height: 50,
						width: 50,
						borderRadius: 50,
						justifyContent: 'center',
						alignItems: 'center',
					}}
					colors={['#F05F3E', '#ED3269']}
					start={{ x: 1, y: 0 }}
					end={{ x: 1, y: 1 }}
				>
					<FontAwesome name="file-pdf-o" size={25} color="#fff" />
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

export default OrderDetails;

// class AccordionView extends Component {
//   state = {
//     activeSections: [],
//   };

//   _renderSectionTitle = (section) => {
//     return (
//       <View style={styles.content}>
//         <Text>{section.content}</Text>
//       </View>
//     );
//   };

//   _renderHeader = (section) => {
//     return (
//       <View style={styles.header}>
//         <Text style={styles.headerText}>{section.title}</Text>
//       </View>
//     );
//   };

//   _renderContent = (section) => {
//     return (
//       <View style={styles.content}>
//         <Text>{section.content}</Text>
//       </View>
//     );
//   };

//   _updateSections = (activeSections) => {
//     this.setState({activeSections});
//   };

//   render() {
//     return (
//       <Accordion
//         sections={SECTIONS}
//         activeSections={this.state.activeSections}
//         renderSectionTitle={this._renderSectionTitle}
//         renderHeader={this._renderHeader}
//         renderContent={this._renderContent}
//         onChange={this._updateSections}
//       />
//     );
//   }
// }

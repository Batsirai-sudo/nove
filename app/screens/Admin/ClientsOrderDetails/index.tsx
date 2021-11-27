import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Image } from 'react-native';
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
import { Card } from 'react-native-shadow-cards';
import styles from './styles';
import { Colors, dimensions, FONTS } from '@utils';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useTheme } from '@react-navigation/native';
import { AdminContext } from '@context';
import moment from 'moment';
import { currencyFormatter, ROUTES } from '@config';

const { width_screen, height_screen } = dimensions;
const OrderDetails = (props) => {
	const [elevation] = useState(5);
	const [orderUser, setOrderUser] = useState({});
	const [productsData, setProductsData] = useState([]);
	const [edit, setEdit] = useState(false);
	const { colors } = useTheme();
	const { currentFromHomeOrders, getIndividualUser } = useContext(AdminContext);
	const { navigate } = useNavigation();
	useEffect(() => {
		setProductsData(currentFromHomeOrders.data);
		props.navigation.setOptions({
			headerTitle: () => (
				<TextComponent
					style={{
						fontSize: 16,
						color: 'white',
					}}
				>
					{currentFromHomeOrders.orderNumber}
				</TextComponent>
			),
		});
		getIndividualUser(currentFromHomeOrders.userId).then((res) => {
			setOrderUser(res.data());
		});
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{}}>
				<View style={styles.topView}>
					<Feather name="check-circle" size={40} color="green" />
					<TextComponent style={{ fontWeight: '600' }}>Order Accepted</TextComponent>
					<TextComponent style={{ fontSize: 10, textAlign: 'center' }}>
						The system accepted this order by default because it was submitted within the weeky time frame,
						if you wish to cancel you can reject anytime.
					</TextComponent>
					<TextComponent
						style={{
							fontWeight: '600',
							top: 10,
							color: 'green',
							letterSpacing: 3,
						}}
					>
						Order Number: #{currentFromHomeOrders.orderNumber}
					</TextComponent>
				</View>
				<View style={styles.topContainer}>
					<View style={styles.topTitle}>
						<TextComponent semibold>Personal Information</TextComponent>
					</View>

					<Card cornerRadius={2} elevation={elevation} style={styles.topCard}>
						<View style={styles.insideView}>
							{/* <Image
                style={{left: 15, height: 50, width: 50, borderRadius: 50}}
                source={{uri: orderUser.photoURL}}
              /> */}
						</View>
						<View style={styles.insideView}>
							<Ionicons name="person-circle-outline" size={20} color={'#7F8FA6'} />
							<TextComponent
								style={{
									left: 15,
									fontWeight: '500',
									fontSize: 12,
									color: '#000',
								}}
							>
								{orderUser.fullName}
							</TextComponent>
						</View>

						<View style={styles.insideView}>
							<FontAwesome name="phone" size={20} color={'#7F8FA6'} />
							<TextComponent style={{ left: 15, fontWeight: '500', fontSize: 12 }}>
								{orderUser.mobileNumber}
							</TextComponent>
						</View>
						<View style={styles.insideView}>
							<Ionicons name="mail-unread" size={20} color={'#7F8FA6'} />
							<TextComponent
								style={{
									left: 15,
									fontWeight: '500',
									fontSize: 12,
								}}
							>
								{orderUser.email}
							</TextComponent>
						</View>

						<View style={styles.insideView}>
							<Ionicons name="bulb" size={20} color={'gold'} />
							<TextComponent
								style={{
									left: 15,
									fontWeight: '500',
									fontSize: 12,
									color: 'orange',
								}}
							>
								{currentFromHomeOrders.status}
							</TextComponent>
						</View>

						<View style={styles.insideView}>
							<Ionicons name="bulb" size={20} color={'red'} />
							<TextComponent
								style={{
									left: 15,
									fontWeight: '900',
									fontSize: 12,
									color: 'red',
								}}
							>
								UNPAID
							</TextComponent>
						</View>
					</Card>

					<View style={{ alignItems: 'center', top: 50 }}>
						<View style={styles.topTitle2}>
							<TextComponent semibold>Order Detail</TextComponent>
						</View>
						<View
							style={{
								width: width_screen - 20,

								borderWidth: 0.5,
								top: 5,
								borderRadius: 10,
								borderColor: '#BDBDBD',
							}}
						>
							<GrayCard secondary style={styles.greyBG}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<TextComponent style={{ color: colors.primary, fontSize: 12 }}>
										Invoice Number
									</TextComponent>
									<TextComponent style={{ fontSize: 12 }}>
										# {currentFromHomeOrders.invoice}
									</TextComponent>
								</View>

								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<TextComponent style={{ color: colors.primary, fontSize: 12 }}>Time</TextComponent>
									<TextComponent style={{ fontSize: 12 }}>
										{moment(currentFromHomeOrders?.createdAt?.toDate()).format('HH:mm:ss a')}
									</TextComponent>
								</View>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<TextComponent style={{ color: colors.primary, fontSize: 12 }}>Date</TextComponent>
									<TextComponent style={{ fontSize: 12 }}>
										{moment(currentFromHomeOrders?.createdAt?.toDate()).format('dddd Do MMM YYYY')}
									</TextComponent>
								</View>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<TextComponent style={{ color: colors.primary, fontSize: 12 }}>
										Location
									</TextComponent>
									<TextComponent style={{ fontSize: 12 }}></TextComponent>
								</View>
							</GrayCard>

							{productsData?.map((product, index) => (
								<View key={index} style={{ paddingHorizontal: 10, marginTop: 20 }}>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											height: 30,
										}}
									>
										<TextComponent  key={index}  style={{ fontSize: 11 }}>
											{product.name} ({product.mass})
										</TextComponent>

										{edit ? (
											<View
												style={{
													flexDirection: 'row',
													justifyContent: 'space-between',
													width: '50%',
												}}
											> 
				   							<View style={{ width: '30%' }}>
											   https://80c43899fef6.ngrok.io
												<Input
												 key={index} 
													style={{ width: '30%', height: 33 ,paddingHorizontal:0,paddingVertical:0}}
													value={`${product.quantity}`}
													// keyboardType="numeric"
													onChangeText={(value) => {
														productsData[index].quantity = value;
														setProductsData(productsData); 
													}}
												/>
												</View>
												<View style={{ width: '30%' }}>
													<Input
														style={{ width: '100%', height: 33,paddingHorizontal:0,paddingVertical:0, }}
														value={`${product.amount}`}
														onChangeText={(value) => {
															productsData[index].quantity = value;
															setProductsData(productsData);
														}}
													/>
												</View>
											</View>
										) : (
											<View
												style={{
													flexDirection: 'row',
													justifyContent: 'space-between',
													width: '50%',
												}}
											>
												<TextComponent style={{ fontSize: 11 }}>
													x {product.quantity}
												</TextComponent>
												<TextComponent style={{ fontSize: 11, fontWeight: '600' }}>
													{currencyFormatter(product.amount)}
												</TextComponent>
											</View>
										)}
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
										Total Amount
									</TextComponent>

									<TextComponent style={{ fontSize: 11, fontWeight: '600' }}>
										{currencyFormatter(currentFromHomeOrders.totalAmount)}
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
									<TextComponent bold style={{ fontSize: 11 }}>
										Total Items
									</TextComponent>

									<TextComponent
										style={{
											fontSize: 11,
											fontWeight: '600',
											color: colors.primary,
										}}
									>
										{currentFromHomeOrders.totalItems}
									</TextComponent>
									<TextComponent style={{ fontSize: 11, fontWeight: '600' }}>
										..................
									</TextComponent>
								</View>
							</View>
						</View>
					</View>
					<View style={{ height: 400 }}></View>
				</View>
			</ScrollView>
			<FloatButton top={180} onPress={() => setEdit(true)}>
				<AntDesign name="edit" size={20} color="black" />
			</FloatButton>
			<FloatButton
				top={240}
				onPress={() => {
					navigate(ROUTES.ConvertToPdf, { currentFromHomeOrders, orderUser });
				}}
			>
				<FontAwesome name="file-pdf-o" size={20} color="black" />
			</FloatButton>

			<FloatButton
				top={300}
				onPress={() => {
					alert(12);
				}}
			>
				<AntDesign name="delete" size={20} color="black" />
			</FloatButton>
		</View>
	);
};

export default OrderDetails;

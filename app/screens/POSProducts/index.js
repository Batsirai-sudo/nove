/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { createRef } from 'react';
import { View, Dimensions, TouchableOpacity, FlatList, DeviceEventEmitter } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { TextComponent as Text, SearchBar, ShimmerLoading, ShimmerHistory } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import { CommonContext } from '@context';
import { currencyFormatter, determineWhichNumber } from '@config';
import { keyExtractor } from '@helpers';
import { connect } from 'react-redux';
import { AdminActions } from '@actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import _ from 'lodash';
import { TabView, TabBar } from 'react-native-tab-view';
import isArray from 'lodash/isArray';
import FirstRoute, { EnterAmountScreen, PaymentMethodModal, DiscountModal, SuccessModal } from '@screens/Carts/current';

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;

const ViewTypes = {
	FULL: 0,
	HALF_LEFT: 1,
	HALF_RIGHT: 2,
};

let containerCount = 0;
// const sellCarts = useSelector((state) => state.admin.sellCarts);

class CellContainer extends React.Component {
	constructor(args) {
		super(args);
		this._containerId = containerCount++;
	}
	render() {
		const { count, name, mass, salePrice } = this.props.data;
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				style={{
					width: '95%',
					alignSelf: 'center',
					height: 65,
					alignItems: 'center',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						marginTop: 30,
						backgroundColor: '#F8F9FB',
						height: 65,
						width: '100%',
						alignItems: 'center',
						borderRadius: 5,
					}}
				>
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
							{count}
						</Text>
					</View>
					<View
						style={{
							justifyContent: 'space-between',
							flexDirection: 'row',
							width: '85%',
						}}
					>
						<View style={{ width: 150 }}>
							<Text numberOfLines={1} style={{ left: 15, fontSize: 11 }}>
								{name}
							</Text>
						</View>
						<View style={{}}>
							<Text numberOfLines={1} style={{ fontSize: 11 }}>
								( {mass} )
							</Text>
						</View>

						<View style={{}}>
							<Text semibold style={{ color: '#0B3F80' }}>
								{currencyFormatter(salePrice)}
							</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>

			// <View {...this.props}>
			//   {this.props.children}
			//   <Text>Cell Id: {this._containerId}</Text>
			// </View>
		);
	}
}

/***
 * To test out just copy this component and render in you root component
 */
class RecycleTestComponent extends React.Component {
	static contextType = CommonContext;

	constructor(props) {
		super(props);

		this.myref = createRef();
		this.enterAmountRef = createRef();
		this.modalizeRef = createRef();
		let { width } = Dimensions.get('window');
		//Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
		//THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
		this.state = {
			dataProvider: new DataProvider((r1, r2) => {
				return r1 !== r2;
			}),
			routes: [
				{ key: 'first', title: 'Current Cart' },
				{ key: 'second', title: 'Saved Carts' },
			],
			loading: true,
			empty: false,
			fullData: [],
			index: 0,
			currentCart: {},
			categoryData: [{ key: 1, name: 'All', isSeleced: true }],
			howManyLoad: false,
			totalDiscount: 0,
			enterAmountValue: 0,
			paymentMethod: '',
			totalAmount: 0,
			billlessError: false,
			bilChange: '',
			modalVisible: false,
			billlessError: false,
			discountModal: false,
		};
		//Create the layout provider
		//First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
		//Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
		//If you need data based check you can access your data provider here
		//You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
		//NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
		this._layoutProvider = new LayoutProvider(
			(index) => {
				return ViewTypes.FULL;
			},
			(type, dim) => {
				dim.width = width;
				dim.height = 80;
			}
		);

		this._rowRenderer = this._rowRenderer.bind(this);

		//Since component should always render once data has changed, make data provider part of the state
		// this.state = {
		//   dataProvider: dataProvider.cloneWithRows(this._generateArray(5000)),
		// };
	}

	// ..........................

	// renderScene = SceneMap({
	//   first: FirstRoute,
	//   second: SecondRoute,
	// });

	renderTabBar = (props) => (
		<TabBar
			{...props}
			indicatorStyle={{
				backgroundColor: '#ED3269',
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
				route.key === 'second' ? (
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
			activeColor="#ED3269"
			activeColor="#ED3269"
			style={{ backgroundColor: 'white', elevation: -10 }}
			inactiveColor="#7F8FA6"
			// scrollEnabled={true}
		/>
	);
	// ..........................
	_generateArray(n) {
		let arr = new Array(n);
		for (let i = 0; i < n; i++) {
			arr[i] = i;
		}
		return arr;
	}

	componentDidMount() {
		DeviceEventEmitter.addListener('event.reloadcart', (res) => {
			if (res === 'reset') {
				return this.setState({
					currentCart: {},
				});
			}
			this.setState({
				currentCart: this.context.productsCart,
			});
		});
		// this._unsubscribe = this.props.navigation.addListener('focus', () => {
		this.state.howManyLoad
			? this.setState({
					currentCart: this.context.productsCart,
			  })
			: (() => {
					const currentValue = this.props.sellCarts.filter((x) => x.id === this.context.myCurrentShop.id);
					this.setState({
						currentCart: currentValue.length === 0 ? {} : currentValue[0],
						howManyLoad: true,
					});
			  })();

		// });
		this.getProductsFromServer();
	}

	componentWillUnmount() {
		DeviceEventEmitter.removeAllListeners('event.reloadcart');
	}
	// // UNSAFE_componentWillReceiveProps(nextProps) {

	// // }

	// UNSAFE_componentWillReceiveProps(nextProps) {
	//   if (this.props.sellCarts !== nextProps.sellCarts) {
	//     alert(89);
	//     // this.setState({
	//     //   title: nextProps.post.title,
	//     //   body: nextProps.post.body,
	//     //   category: nextProps.post.category,
	//     // })
	//   }
	// }

	// getDerivedStateFromProps() {

	// }

	// static myn() {
	//   // this.cont();
	// }
	// cont() {

	// }
	// shouldComponentUpdate(nextProps, nextState) {
	//   // this.context.productsCart;

	//   if (
	//     this.context.productsCart.totalItems !== nextState.currentCart.totalItems
	//   ) {

	//     return true;
	//   }
	//   return false;
	// }

	getProductsFromServer = () => {
		const { getCategories, getProducts, myCurrentShop } = this.context;
		// this.props.clearCart(myCurrentShop.id);
		Promise.all([getCategories(), getProducts()]).then((response) => {
			const categoryData = [];
			const productsData = [];
			let count = 1;

			/** @Category first in First index */
			response[0].forEach((result) => {
				categoryData.push({
					...result.data(),
					key: result.id,
					isSeleced: false,
				});
			});

			/**Second index for @Products */

			response[1].forEach((result) => {
				productsData.push({
					key: result.id,
					name: result.data().productName,
					mass: result.data().mass,
					quantity: 1,
					count: count++,
					buyingPrice: result.data().buyingPrice,
					salePrice: result.data().salePrice,
					InCase: result.data().InCase,
					category: result.data().category,
				});
			});

			const currentValue = this.props.sellCarts.filter((x) => x.id === myCurrentShop.id);
			this.setState({
				dataProvider: this.state.dataProvider.cloneWithRows([...productsData]),
				loading: false,
				fullData: [...productsData],
				categoryData: [...this.state.categoryData, ...categoryData],
				currentCart: currentValue.length === 0 ? {} : currentValue[0],
			});
		});
	};
	// Given type and data return the view component
	clicksCalculateAmountUtems = (x, typ) => {
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
	_rowRenderer(type, data) {
		//You can return any view here, CellContainer has no special significance
		console.log('-----=====', data);
		return (
			<CellContainer
				onPress={() => {
					const { currentCart } = this.state;

					const { setproductsCart } = this.context;

					if (_.isEmpty(currentCart)) {
						this.setState({
							currentCart: {
								data: [data],
								id: this.context.myCurrentShop.id,
								totalItems: 1,
								totalAmount: data.salePrice * Number(data.quantity),
							},
						});
						const saveToCartData = {
							data: [data],
							id: this.context.myCurrentShop.id,
							totalItems: 1,
							totalAmount: data.salePrice * Number(data.quantity),
						};
						setproductsCart(saveToCartData);

						return this.props.saveCart(saveToCartData);
					}

					if (currentCart?.data.map((x) => x.key).includes(data.key)) {
						const dataIndex = currentCart.data.map((x) => x.key).indexOf(data.key);
						//
						//
						currentCart.data[dataIndex].quantity = parseInt(currentCart.data[dataIndex].quantity) + 1;
						const clickValues2 = this.clicksCalculateAmountUtems(data, 'same');

						const saveToCartData2 = {
							data: currentCart.data,
							id: this.context.myCurrentShop.id,
							totalItems: clickValues2.items,
							totalAmount: clickValues2.totalAmount,
						};
						setproductsCart(saveToCartData2);

						this.props.saveCart(saveToCartData2);
						return false;
					}
					const clickValues = this.clicksCalculateAmountUtems(data);
					const saveToCartData3 = {
						data: clickValues.data,
						id: this.context.myCurrentShop.id,
						totalItems: clickValues.items,
						totalAmount: clickValues.totalAmount,
					};

					setproductsCart(saveToCartData3);

					this.props.saveCart(saveToCartData3);
				}}
				data={data}
				style={styles.containerGridLeft}
			/>
		);
	}

	renderScene = ({ route }) => {
		switch (route.key) {
			case 'first':
				return (
					<FirstRoute
						productsdata={this.state.currentCart}
						totalDiscount={this.state.totalDiscount}
						clearCart={() => {
							const { setproductsCart } = this.context;

							this.props.clearCart(this.context.myCurrentShop.id);
							setproductsCart({});

							this.state.currentCart.data.map((cart) => {
								return (cart.quantity = 1);
							});
							this.setState({ currentCart: null });
						}}
						removeProducts={(id) => {
							const { currentCart } = this.state;
							const { setproductsCart } = this.context;

							const filt = currentCart.data.filter((r) => r.key !== id);
							const deletedItem = currentCart.data.filter((r) => r.key === id);
							currentCart.data = filt;
							this.setState({ currentCart });

							const sub1 = deletedItem[0].salePrice * deletedItem[0].quantity;
							const sub2Amount = currentCart.totalAmount - sub1;

							const subItems = currentCart?.totalItems - deletedItem[0].quantity;
							currentCart.totalItems = subItems;
							currentCart.totalAmount = sub2Amount;
							if (currentCart.totalItems === 0 || currentCart.totalAmount === 0) {
								this.setState({ currentCart: {} });
								return this.props.clearCart(this.context.myCurrentShop.id);
							}
							const saveToCartData4 = {
								data: currentCart.data,
								id: this.context.myCurrentShop.id,
								totalItems: subItems,
								totalAmount: sub2Amount,
							};
							setproductsCart(saveToCartData4);

							this.setState({ currentCart });
							this.props.saveCart(saveToCartData4);
						}}
						inrement={(x, id) => {
							const { currentCart } = this.state;
							const { setproductsCart } = this.context;

							const tttotalitems = currentCart.data
								.map((r) => Number(r.quantity))
								.reduce((a, b) => a + b);

							const tttotalamount = currentCart.data
								.map((r) => Number(r.productTotalAmount))
								.reduce((a, b) => a + b);
							currentCart.data = x;
							currentCart.totalItems = tttotalitems;
							currentCart.totalAmount = tttotalamount;

							this.setState({ currentCart });
							const saveToCartData5 = {
								data: currentCart.data,
								id: this.context.myCurrentShop.id,
								totalItems: tttotalitems,
								totalAmount: tttotalamount,
							};
							setproductsCart(saveToCartData5);

							this.props.saveCart(saveToCartData5);
						}}
						charge={(val) => {
							this.setState({ totalAmount: val });
							// setTotalAmount(val);
							this.myref.current.close();
							this.modalizeRef.current.open();
						}}
						setDiscountModal={(val) => this.setState({ discountModal: val })}
						setTotalDiscount={(val) => this.setState({ totalDiscount: val })}
					/>
				);
			case 'second':
				return <SecondRoute />;
			default:
				return null;
		}
	};

	containsQuery = ({ name }, query) => {
		if (name.toLowerCase().includes(query)) {
			return true;
		}
		return false;
	};

	handleSearch = (value) => {
		const formattedQuery = value.toLowerCase();
		const data = _.filter(this.state.fullData, (x) => {
			return this.containsQuery(x, formattedQuery);
		});
		if (data.length === 0) {
			return this.setState({ empty: true });
		}
		this.setState({
			dataProvider: this.state.dataProvider.cloneWithRows([...data]),
			empty: false,
		});
		// handleLoad();
	};

	render() {
		const { loading, currentCart, empty } = this.state;
		return (
			<View style={{ height: '100%' }}>
				<SearchBar
					placeHolder={'Search product...'}
					// value={query}
					onChangeText={(value) => {
						this.handleSearch(value);
					}}
					onClear={(value) => {
						//   handleSearch(value);
					}}
					onFocus={() => {
						//   setValue(true);
					}}
					style={{ width: '80%' }}
				/>
				<DiscountModal
					discountModal={this.state.discountModal}
					setDiscountModal={(val) => this.setState({ discountModal: val })}
					setTotalDiscount={(val) => this.setState({ totalDiscount: val })}
					totalDiscount={this.state.totalDiscount}
				/>
				<SuccessModal
					modalVisible={this.state.modalVisible}
					setModalVisible={(val) => this.setState({ modalVisible: val })}
					totalAmount={this.state.totalAmount}
					bilChange={this.state.bilChange}
					modalizeRef={this.modalizeRef}
				/>
				{loading ? null : _.isEmpty(currentCart) ? null : (
					<TouchableOpacity
						onPress={(val) => {
							// modalizeRef.current.open();
							this.myref.current.open();
						}}
						style={{
							height: 50,
							width: '100%',
							backgroundColor: '#1F4655',
							alignSelf: 'center',
							// marginTop: 35,
							borderRadius: 35,
							alignItems: 'center',
							justifyContent: 'space-between',
							bottom: 25,
							flexDirection: 'row',
							paddingHorizontal: 20,
							left: 5,
							position: 'absolute',
							elevation: 5,
							zIndex: 500,
						}}
					>
						<View style={{ flexDirection: 'row' }}>
							<MaterialIcons name="shopping-cart" style={[styles.actionButtonIcon]} />
							<Text whiteColor style={{ fontSize: 14, left: 10 }}>
								{currentCart?.totalItems} {currentCart?.totalItems > 1 ? 'items' : 'item'}
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
				<View style={{ marginHorizontal: 0 }}>
					<FlatList
						horizontal
						data={this.state.categoryData}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								onPress={() => {
									const res = this.state.categoryData.map((x, i) => {
										if (x.isSeleced) {
											x.isSeleced = false;
										}
										if (x.key === item.key) {
											x.isSeleced = true;
										}
										return x;
									});

									this.setState({ categoryData: res });
									const data = _.filter(this.state.fullData, (v) => {
										if (item.name === 'All') {
											return v.category !== item.name;
										}

										return v.category.map((f) => f.name).includes(item.name);
									});
									if (data.length === 0) {
										return this.setState({
											loading: true,
											dataProvider: this.state.dataProvider.cloneWithRows([...data]),
										});
									}
									this.setState({
										loading: false,

										dataProvider: this.state.dataProvider.cloneWithRows([...data]),
									});
								}}
							>
								<LinearGradient
									style={{
										borderRadius: 20,
										width: 120,
										height: 30,
										marginHorizontal: 7,
										alignItems: 'center',
										justifyContent: 'center',
									}}
									colors={item.isSeleced ? ['#F05F3E', '#ED3269'] : ['#fff', '#fff']}
									start={{ x: 1, y: 0 }}
									end={{ x: 1, y: 1 }}
								>
									<Text semibold style={{ color: item.isSeleced ? '#fff' : '#000' }}>
										{item.name}
									</Text>
								</LinearGradient>
							</TouchableOpacity>
						)}
						keyExtractor={keyExtractor}
					/>
					{/* <View style={{flexDirection: 'row'}}>
            <LinearGradient
              style={{
                borderRadius: 20,
                width: 70,
                height: 30,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 7,
              }}
              colors={['#fff', '#fff']}
              start={{x: 1, y: 0}}
              end={{x: 1, y: 1}}>
              <Text semibold style={{color: '#000'}}>
                Bread
              </Text>
            </LinearGradient>
          </View> */}
				</View>

				{loading ? (
					<ShimmerLoading Component={ShimmerHistory} style={{ marginHorizontal: 15, top: 20 }} height={110} />
				) : empty ? (
					<View style={{ alignSelf: 'center', marginTop: 50 }}>
						<Text style={{ color: 'red' }}>Product not Found search for another ...!</Text>
					</View>
				) : (
					<RecyclerListView
						layoutProvider={this._layoutProvider}
						dataProvider={this.state.dataProvider}
						rowRenderer={this._rowRenderer}
						renderFooter={() => <View style={{ height: 200 }} />}
						style={{ height: '100%', width: '100%' }}
					/>
				)}
				<PaymentMethodModal
					modalizeRef={this.modalizeRef}
					totalAmount={this.state.totalAmount}
					setEnterAmountValue={(val) => this.setState({ enterAmountValue: val })}
					setPaymentMethod={(val) => this.setState({ paymentMethod: val })}
					enterAmountRef={this.enterAmountRef}
				/>

				<EnterAmountScreen
					enterAmountRef={this.enterAmountRef}
					setEnterAmountValue={(val) => this.setState({ enterAmountValue: val })}
					enterAmountValue={this.state.enterAmountValue}
					billlessError={this.state.billlessError}
					totalAmount={this.state.totalAmount}
					currentCart={this.state.currentCart}
					paymentMethod={this.state.paymentMethod}
					setBilChange={(val) => this.setState({ bilChange: val })}
					setModalVisible={(val) => this.setState({ modalVisible: val })}
					setBilllessError={(val) => this.setState({ billlessError: val })}
					clearCart={(val) => {
						this.props.clearCart(val);
						this.context.setproductsCart({});
					}}
				/>

				<Portal>
					<Modalize panGestureEnabled={false} ref={this.myref}>
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
										this.myref.current.close();
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
								navigationState={{
									index: this.state.index,
									routes: this.state.routes,
								}}
								renderScene={this.renderScene}
								onIndexChange={(val) => this.setState({ index: val })}
								initialLayout={{ width: Dimensions.get('window').width }}
								renderTabBar={this.renderTabBar}
							/>
						</View>
					</Modalize>
				</Portal>
			</View>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return { sellCarts: state.admin?.sellCarts };
};
const mapDispatchToProps = (dispatch) => {
	return {
		saveCart: (data) => {
			dispatch(AdminActions.OnSavePOSCart(data));
		},
		clearCart: (id) => {
			dispatch(AdminActions.OnResetPOSCart(id));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(RecycleTestComponent);

const styles = {
	actionButtonIcon: {
		fontSize: 20,
		height: 25,
		color: 'white',
	},
	container: {
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#00a1f1',
	},
	containerGridLeft: {
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#ffbb00',
	},
	containerGridRight: {
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#7cbb00',
	},
};

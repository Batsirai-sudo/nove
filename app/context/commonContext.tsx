import React, { createContext, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { WEB_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-community/google-signin';
import { ClientActions } from '@actions';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { LoginManager } from 'react-native-fbsdk';
import { AuthActions, AdminActions } from '@actions';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { firebaseValue, productsUpdates } from '@services';
import { splitting } from '@config';
import moment from 'moment';

export const CommonContext = createContext(null);

export const CommonProvider = ({ children }) => {
	// State Management
	const [editproducts, setEditProduct] = useState({});
	const user = useSelector((state) => state.auth.user);
	const [deliveredStock, setDeliveredStock] = useState({});
	const [productsCart, setproductsCart] = useState({});
	const [scannedProduct, setScannedProduct] = useState({});
	const [posDetailHistory, setPosDetailHistory] = useState({});
	const [myCurrentShop, setMyCurrentShop] = useState({});
	const [productsForStockDelivery, setProductsForStockDelivery] = useState({
		length: 0,
		data: [],
	});
	const [sendOrderData, setSendOrderData] = useState({});
	const [storeClientsOrder, setStoreClientsOrder] = useState({});
	const [product_barcode, setProduct_barcode] = useState('');
	const [shopId_Data, setShopId_Data] = useState('');
	const [mySelectedOrders, setMySelectedOrders] = useState({});
	const [lossesExpensesDetailsData, setLossesExpensesDetails] = useState('');
	const [weeklyDeliveriesDetails, setWeeklyDeliveriesDetails] = useState('');
	const [expensesLossesDetails, setExpensesLossesDetails] = useState('');
	const [selectedWrittenShopOrders, setSelectedWrittenShopOrders] = useState({});

	const dispatch = useDispatch();
	const [profitCalculationHistoryData, setProfitCalculationHistoryData] = useState({});
	// Functions
	const firebaseFieldValue = (value) => {
		const increment = firebase.firestore.FieldValue.increment(parseInt(value));
		const decrementProfits = firebase.firestore.FieldValue.increment(-parseInt(value));
		return {
			increment,
			profits: decrementProfits,
		};
	};

	const updateExpenses = async (amount, ref, type) => {
		const result = firebaseFieldValue(amount);
		type === 'Expenses'
			? await ref.update({
					'statistics.expenses': result.increment,
					'statistics.profits': result.profits,
			  })
			: await ref.update({
					'statistics.losses': result.increment,
					'statistics.profits': result.profits,
			  });

		const response = await ref
			.collection('ProfitsHistory')
			.where('recent', '==', 'now')
			.orderBy('createdAt', 'desc')
			.limit(1)
			.get();

		type === 'Expenses'
			? await ref.collection('ProfitsHistory').doc(response.docs[0].id).update({
					expenses: result.increment,
					overalProfit: result.profits,
			  })
			: await ref.collection('ProfitsHistory').doc(response.docs[0].id).update({
					losses: result.increment,
					overalProfit: result.profits,
			  });
	};

	const getActiveWeekProfit = async (ref) => {
		const firstday = moment(myCurrentShop.mondayCreatedAt.toDate());
		const today = moment();
		const weekValue = today.diff(firstday, 'weeks');
		const result = await ref.collection('ProfitsHistory').where('week', '==', weekValue).get();

		const firestoreData = [];
		result.forEach((g) => {
			firestoreData.push({
				...g.data(),
				key: g.id,
			});
		});
		return firestoreData[0].key;
	};
	const updateProfitsHistory = async (data, ref, id) => {
		const profit = firebase.firestore.FieldValue.increment(data.overalProfit);
		if (data.data.deliveryType === 'weekly') {
			await ref
				.collection('ProfitsHistory')
				.doc(id)
				.update({
					weeklyDeliveries: firebase.firestore.FieldValue.arrayUnion(data.data.weeklyDeliveries[0]),
					overalProfit: profit,
					month: data.month,
					recent: 'now',
					updatedAt: new Date(),
					records: firebase.firestore.FieldValue.increment(1),
				});
		}

		if (data.data.deliveryType === 'daily') {
			await ref
				.collection('ProfitsHistory')
				.doc(id)
				.update({
					dailyDeliveries: firebase.firestore.FieldValue.arrayUnion(data.data.dailyDeliveries[0]),
					overalProfit: profit,
					month: data.month,
					recent: 'now',
				});
		}

		await ref.update({ 'statistics.profits': profit });

		// const result = firebaseFieldValue(amount);
		// type === 'Expenses'
		//   ? await ref.update({
		//       'statistics.expenses': result.increment,
		//       'statistics.profits': result.profits,
		//     })
		//   : await ref.update({
		//       'statistics.losses': result.increment,
		//       'statistics.profits': result.profits,
		//     });
	};
	const updateActivity = async (activityData, uid) => {
		firestore().collection('Users').doc(uid).collection('Activity').add(activityData);
	};
	const googleSignOut = async (resolve) => {
		await GoogleSignin.revokeAccess();
		await GoogleSignin.signOut();
		await destroyUserState();
		resolve({ success: true });
	};
	const destroyUserState = async () => {
		await dispatch(AuthActions.onLogout());
	};
	const facebookSignOut = async (resolve) => {
		await LoginManager.logOut();
		await destroyUserState();
		resolve({ success: true });
	};
	const incremetProfits = (value) => {
		const increment = firebase.firestore.FieldValue.increment(value);
		return increment;
	};

	return (
		<CommonContext.Provider
			value={{
				myCurrentShop,
				productsCart,
				setproductsCart,
				getMyCurrentShop: (x) => {
					setMyCurrentShop(x);
				},
				expensesLossesDetails,
				lossesExpensesDetailsData,
				getLossesExpensesDetails: (x) => {
					setLossesExpensesDetails(x);
				},
				storeClientsOrder,
				setStoreClientsOrder,
				posDetailHistory,
				setPosDetailHistory,
				productsForStockDelivery,
				setProductsForStockDelivery,
				mySelectedOrders,
				getMySelectedOrders: (x) => {
					setMySelectedOrders(x);
				},
				sendOrderData,
				getSendOrderData: (x) => {
					setSendOrderData({ ...sendOrderData, ...x });
				},
				getSelectedWrittenShopOrders: (x) => {
					setSelectedWrittenShopOrders(x);
				},
				selectedWrittenShopOrders,
				editproducts,
				getEditProduct: (data) => {
					setEditProduct(data);
				},
				shopId_Data,
				getShopId_Data: (x) => {
					setShopId_Data(x);
				},
				getDeliveredStock: (x) => {
					setDeliveredStock(x);
				},

				deliveredStock,
				profitCalculationHistoryData,
				getProfitCalculationHistoryData: (x) => {
					setProfitCalculationHistoryData(x);
				},
				getProfitCalculationHistory: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('ProfitsHistory')
							// .where('recent', '==', 'now')
							.where('month', '==', currentMonth)
							.orderBy('createdAt', 'desc');

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							reject(error);
						}
					});
				},
				getImageUri: async (photoURI, productName) => {
					return new Promise(async (resolve, reject) => {
						try {
							const storageRef = storage()
								.ref('Products')
								.child(productName + '-' + new Date().getTime() + '/' + new Date());
							const task = storageRef.putFile(photoURI).then(() => {
								storageRef.getDownloadURL().then((downloadedUrl) => {
									resolve(downloadedUrl);
								});
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				load: (val) => {
					setProduct_barcode(val);
				},
				product_barcode,
				recordProduct: (data) => {
					return new Promise((resolve, reject) => {
						const ref = firestore().collection('Shops').doc(myCurrentShop.id);
						try {
							const promise = ref.collection('Products').add(data);
							promise.then(async (res) => {
								await firebaseValue.increamentProducts(1, ref, 'increment');
								// await productsUpdates.createProductUpdates(
								//   ref,
								//   res.id,
								//   'added',
								// );
								resolve({ success: true });
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				getCategories: async () => {
					return new Promise(async (resolve, reject) => {
						try {
							firestore()
								.collection('Shops')
								.doc(myCurrentShop.id)
								.collection('Categories')
								.get()
								.then((category) => {
									resolve(category);
								});
						} catch (error) {
							reject(error);
						}
					});
				},
				getBrands: async () => {
					return new Promise(async (resolve, reject) => {
						try {
							firestore()
								.collection('Shops')
								.doc(myCurrentShop.id)
								.collection('Brands')
								.get()
								.then((category) => {
									resolve(category);
								});
						} catch (error) {
							reject(error);
						}
					});
				},
				logout: async () => {
					return new Promise(async (resolve, reject) => {
						GoogleSignin.configure({
							webClientId: WEB_CLIENT_ID,
						});
						await setTimeout(async () => {
							try {
								await auth().signOut();
								user.providerId === 'google.com' ? googleSignOut(resolve) : facebookSignOut(resolve);
							} catch (error) {
								reject(error);
							}
						}, 2000);
					});
				},
				getProducts: async (query, category) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(myCurrentShop.id).collection('Products');

						try {
							category
								? ref
										.where('category', 'array-contains', category.trim().replace(/['"]+/g, ''))
										.get()
										.then((products) => {
											resolve(products);
										})
								: ref
										.orderBy('productName', 'asc')
										.get()
										.then((products) => {
											resolve(products);
										});
						} catch (error) {
							reject(error);
						}
					});
				},
				getProductsForOrders: async (id) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(id).collection('Products');

						try {
							ref.orderBy('productName', 'asc')
								.get()
								.then((products) => {
									resolve(products);
								});
						} catch (error) {
							reject(error);
						}
					});
				},

				deleteProduct: async (id) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('Products')
							.doc(id);

						try {
							ref.delete().then((products) => {
								resolve(true);
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				getProductsForDeliveryStock: async () => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(myCurrentShop.id).collection('Products');

						try {
							ref.get().then((products) => {
								const firestoreData = [];
								let count = 1;

								products.forEach((result) => {
									firestoreData.push({
										key: result.id,
										name: result.data().productName,
										mass: result.data().mass,
										quantity: '',
										vat: 15,
										includingVat: true,
										excludingVat: false,
										count: count++,
										amount: '',
										buyingPrice: result.data().buyingPrice,
										salePrice: result.data().salePrice,
										isSelected: false,
										InCase: result.data().InCase,
									});

									resolve(true);
								});
								setProductsForStockDelivery({
									length: firestoreData.length,
									data: firestoreData,
								});
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				createCategory: (data) => {
					return new Promise(async (resolve, reject) => {
						const reference = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('Categories');
						try {
							const promise = reference.add(data);
							promise.then(() => {
								resolve({ success: true });
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				createBrand: (data) => {
					return new Promise(async (resolve, reject) => {
						const reference = firestore().collection('Shops').doc(myCurrentShop.id).collection('Brands');
						try {
							const promise = reference.add(data);
							promise.then(() => {
								resolve({ success: true });
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				updateProduct: async (data) => {
					return new Promise(async (resolve, reject) => {
						const id = data.key;
						// data.category = [data.category[0].name];
						delete data.key;

						const reference = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('Products')
							.doc(id);
						try {
							const promise = reference.update(data);
							promise.then(() => {
								resolve({ success: true });
							});
						} catch (error) {
							reject(error);
						}
					});
				},

				checkBarCode: async (barcode) => {
					return new Promise(async (resolve, reject) => {
						const reference = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('Products')
							.where('barcode', '==', barcode);
						try {
							const promise = reference.get();
							promise.then((res) => {
								resolve(res);
							});
						} catch (error) {
							reject(error);
						}
					});
				},

				getAdmins: () => {
					return new Promise(async (resolve, reject) => {
						const fxn = (id) => {
							return new Promise((resolve2, reject2) => {
								firestore()
									.collection('Users')
									.doc(id)
									.get()
									.then((res) => {
										resolve2({ ...res.data(), key: res.id });
									})
									.catch((error) => {
										reject2(error);
									});
							});
						};
						//A simple promise that resolves after a given time
						const promises = [];
						user.adminID.map((x) => {
							promises.push(fxn(x));
						});
						try {
							//We are passing an array of pending promises to Promise.all
							Promise.all(promises).then((response) => {
								resolve(response);
							}); // doesn't resolve
						} catch (error) {
							reject(error);
						}
					});
				},
				getAdminShops: (shopsArray) => {
					return new Promise(async (resolve, reject) => {
						const fxn = (id) => {
							return new Promise((resolve2, reject2) => {
								firestore()
									.collection('Shops')
									.doc(id)
									.get()
									.then((res) => {
										resolve2({ ...res.data(), key: res.id });
									})
									.catch((error) => {
										reject2(error);
									});
							});
						};
						//A simple promise that resolves after a given time
						const promises = [];
						shopsArray.map((x) => {
							promises.push(fxn(x.id));
						});
						try {
							//We are passing an array of pending promises to Promise.all
							Promise.all(promises).then((response) => {
								resolve(response);
							}); // doesn't resolve
						} catch (error) {
							reject(error);
						}
					});
				},
				requestOrder: async (data) => {
					return new Promise(async (resolve, reject) => {
						const id = data.admin.adminID;

						const reference = firestore().collection('Users').doc(id).collection('Orders');
						try {
							const promise = reference.add(data);
							promise.then(async (docRef) => {
								await firestore()
									.collection('Users')
									.doc(user.uid)
									.collection('Orders')
									.doc(docRef.id)
									.set(data);
								// dispatch(ClientActions.onResetStoreOrder());
								resolve({ success: true });
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				sendShopOrder: async (data) => {
					return new Promise(async (resolve, reject) => {
						const reference = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('WrittenShopOrders');
						try {
							const promise = reference.add(data);
							promise.then(async (docRef) => {
								// await firestore()
								//   .collection('Users')
								//   .doc(user.uid)
								//   .collection('Orders')
								//   .doc(docRef.id)
								//   .set(data);
								// dispatch(ClientActions.onResetStoreOrder());
								resolve({ success: true });
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				getRecentRecordedStock: async () => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('WrittenShopOrders')
							// .where('type', '==', 'Stock')
							.orderBy('createAt', 'desc')
							.limit(1);
						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				weeklyDeliveriesDetails,
				weeklyDeliveries: async (data) => {
					return new Promise(async (resolve, reject) => {
						const profitsData = data.profitsData;
						delete data.profitsData;
						const ref = firestore().collection('Shops').doc(myCurrentShop.id);

						try {
							const response = await ref.collection('WeeklyDeliveries').add(data);
							await ref.update({
								'statistics.profits': incremetProfits(data.profit),
							});
							const res = {
								...profitsData,
								weeklyDeliveredProfit: data.profit,
								invoiceNumber: data.invoiceNumber,
								transactionID: data.transactionID,
								createdAt: data.createdAt,
							};
							await ref.collection('ProfitsHistory').add(res);
							setWeeklyDeliveriesDetails(res);
							resolve(response);
						} catch (error) {
							reject(error);
						}
					});
				},
				getExpensesHistory: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('Expenses')
							.where('month', '==', currentMonth)
							.orderBy('createdAt', 'desc');
						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				getUserForExpensesLosses: async (id) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Users').doc(id);
						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				getLossesHistory: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('Losses')
							// .where('type', '==', 'Stock')
							.where('month', '==', currentMonth);
						// .orderBy('createdAt', 'desc');

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				createStockTaking: async (dataArray) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(myCurrentShop.id).collection('StockTaking');

						try {
							const response = await ref.add({
								createdAt: new Date(),
								creator: user.fullName,
								creatorID: user.uid,
								categories: [],
								usersJoined: [],
								totalAmount: 0,
								status: 'Active',
							});
							dataArray.map(async (item) => {
								await ref.doc(response.id).collection('Products').add(item);
							});
							await dispatch(AdminActions.activateStockTakingActive(response.id));
							resolve(response);
						} catch (error) {
							reject(error);
						}
					});
				},
				checkActiveStockTakings: async () => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(user.myShops[0].id)
							.collection('StockTaking')
							.where('status', '==', 'Active');

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				gettActivities: async () => {
					return new Promise(async (resolve, reject) => {
						try {
							firestore()
								.collection('Users')
								.doc(user.uid)
								.collection('Activity')
								.orderBy('date', 'desc')
								.limit(10)
								.get()
								.then((category) => {
									resolve(category);
								});
						} catch (error) {
							reject(error);
						}
					});
				},
				updateSettings: async (data, activity) => {
					const uuid = data.uid;
					delete data.uid;
					return new Promise(async (resolve, reject) => {
						const reference = firestore().collection('Users').doc(uuid);
						try {
							const promise = reference.update(data);
							promise.then(async () => {
								await updateActivity(activity, uuid);
								dispatch(ClientActions.updateSettings(data));
								resolve({ success: true });
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				getShopWrittenOrders: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('ShopOrders')
							.where('month', '==', currentMonth)
							.orderBy('createAt', 'desc');
						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							reject(error);
						}
					});
				},
				postFeedback: async (data) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Feedback');

						try {
							await ref.add(data);
							resolve({ success: true });
						} catch (error) {
							reject(error);
						}
					});
				},
				getFeedback: async () => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Feedback')
							.where('id', '==', user.uid)
							.orderBy('createdAt', 'desc');

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							reject(error);
						}
					});
				},
				getAvailableProfit: async () => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(myCurrentShop.id);

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							reject(error);
						}
					});
				},
				getRecentProfitCalculation: async () => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('ProfitsHistory')
							.where('recent', '==', 'now')
							.orderBy('createdAt', 'desc')
							.limit(1);

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							reject(error);
						}
					});
				},
				getMyOrders: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Users')
							.doc(user.uid)
							.collection('Orders')
							.where('month', '==', currentMonth)
							.orderBy('createAt', 'desc');

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				getShopStockOrders: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('WrittenShopOrders')
							.where('month', '==', currentMonth)
							.orderBy('createdAt', 'desc');
						// const ref = firestore()
						//   .collection('Users')
						//   .doc(user.uid)

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				getStockTakings: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('StockTaking')
							.where('month', '==', currentMonth)
							.orderBy('createdAt', 'desc');
						// const ref = firestore()
						//   .collection('Users')
						//   .doc(user.uid)

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				getTransactions: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('Transactions')
							.where('month', '==', currentMonth)
							.orderBy('createdAt', 'desc');
						// const ref = firestore()
						//   .collection('Users')
						//   .doc(user.uid)

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				getShopDeliveries: async (currentMonth) => {
					console.log('currentMonth', currentMonth);
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('Deliveries')
							.where('month', '==', currentMonth)
							.orderBy('createdAt', 'desc');

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				deleteProductFromDeliveries: async (id, obj) => {
					return new Promise(async (resolve, reject) => {
						delete obj.includingVatAmount;
						delete obj.vatamount;
						delete obj.totalBuyingPrice;
						delete obj.totalSalePrice;

						const ref = firestore().collection('Shops').doc(myCurrentShop.id);

						try {
							const response = await ref
								.collection('Deliveries')
								.doc(id)
								.update({
									products: firebase.firestore.FieldValue.arrayRemove(obj),
									'statistics.profit': firebase.firestore.FieldValue.increment(-obj.profit?.amount),
								});
							console.log('result.docs[0].', id);

							ref.update({
								'statistics.profits': firebase.firestore.FieldValue.increment(-obj.profit?.amount),
							});
							const firstday = moment(myCurrentShop.mondayCreatedAt.toDate());
							const today = moment();
							const weekValue = today.diff(firstday, 'weeks');

							ref.collection('ProfitsHistory')
								.where('week', '==', weekValue)
								.get()
								.then((result) => {
									console.log(result.docs[0].id);
									ref.collection('ProfitsHistory')
										.doc(result.docs[0].id)
										.update({
											overalProfit: firebase.firestore.FieldValue.increment(-obj.profit?.amount),
										});
								});

							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				recordExpenseLosses: async (data, type) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(myCurrentShop.id);

						try {
							await ref.collection(type).add(data);
							await updateExpenses(data.amount, ref, type);
							data.type = type;
							setExpensesLossesDetails(data);
							resolve({ success: true });
						} catch (error) {
							reject(error);
						}
					});
				},
				recordDeliveries: async (data, profitsData) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(myCurrentShop.id);

						try {
							await ref.collection('Deliveries').add(data);
							const id = await getActiveWeekProfit(ref);

							await updateProfitsHistory(profitsData, ref, id);
							resolve({ success: true });
						} catch (error) {
							reject(error);
						}
					});
				},
				// createWeek: async (data) => {
				//   return new Promise(async (resolve, reject) => {
				//     const ref = firestore().collection('Shops').doc(data.id);
				//     const firstday = moment(data.createdAt.toDate());
				//     const today = moment();

				//     try {
				//       await ref.update({
				//         weeksStartingDate: new Date(
				//           moment(data.createdAt.toDate()).weekday(1),
				//         ),
				//         weeksStartingDayName: moment(data.createdAt.toDate())
				//           .weekday(1)
				//           .format('dddd'),
				//         weekNumber: today.diff(firstday, 'weeks'),
				//       });
				//       resolve({success: true});
				//     } catch (error) {
				//       reject(error);
				//     }
				//   });
				// },
				checkWeek: async (data) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(myCurrentShop.id);

						try {
							await ref.get().then((response) => {
								resolve({ ...response.data() });
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				createDebt: async (data) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(myCurrentShop.id).collection('Debts');

						try {
							await ref.add(data).then((response) => {
								setExpensesLossesDetails({ type: 'debt' });
								resolve(true);
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				getDebts: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('Debts')
							.where('month', '==', currentMonth)
							.orderBy('createdAt', 'desc');
						try {
							await ref.get().then((response) => {
								resolve(response);
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				recordShopSells: async (data, topLevelData) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(myCurrentShop.id).collection('Sells');

						try {
							await ref
								.where('month', '==', topLevelData.month)
								.orderBy('createdAt', 'desc')
								.limit(1)
								.get()
								.then(async (response) => {
									if (response.docs.length > 0) {
										const day = response.docs[0].data().day;
										if (day === topLevelData.day) {
											ref.doc(response.docs[0].id).update({
												dailySells: firebase.firestore.FieldValue.arrayUnion(data),
												todayTotalAmount: firebase.firestore.FieldValue.increment(
													topLevelData.todayTotalAmount
												),
												todayTotalItems: firebase.firestore.FieldValue.increment(
													topLevelData.todayTotalItems
												),
												lastUpdatedAt: new Date(),
											});
										} else {
											await ref.add({
												...topLevelData,
												dailySells: [data],
											});
										}
									} else {
										await ref.add({
											...topLevelData,
											dailySells: [data],
										});
									}
									resolve(response.docs.length);
								});

							// .update({
							//         weeklyDeliveries: firebase.firestore.FieldValue.arrayUnion(
							//           data.data.weeklyDeliveries[0],
							//         ),
							//         overalProfit: profit,
							//         month: data.month,
							//         recent: 'now',
							//         updatedAt: new Date(),
							//         records: firebase.firestore.FieldValue.increment(1),
							//       });

							// const ref2 = firestore()
							//   .collection('Shops')
							//   .doc(myCurrentShop.id)
							//   .collection('Sells');
							// await ref2.add(data).then((response) => {
							//   resolve(response);
							// });
						} catch (error) {
							reject(error);
						}
					});
				},
				getShopSells: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(myCurrentShop.id)
							.collection('Sells')
							.where('month', '==', currentMonth)
							.orderBy('createdAt', 'desc')
							.limit(1);
						try {
							await ref.get().then((response) => {
								resolve(response);
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				getScannedProduct: async (query) => {
					return new Promise(async (resolve, reject) => {
						try {
							firestore()
								.collection('Shops')
								.doc(myCurrentShop.id)
								.collection('Products')
								.where('barcode', '==', query)
								.get()
								.then((products) => {
									let message = '';
									if (products.docs.length > 0) {
										message = 'product found';
										setScannedProduct(products);
									} else {
										message = 'product not found';
									}
									resolve({ products, message });
								});
						} catch (error) {
							reject(error);
						}
					});
				},
				scannedProduct,
			}}
		>
			{children}
		</CommonContext.Provider>
	);
};

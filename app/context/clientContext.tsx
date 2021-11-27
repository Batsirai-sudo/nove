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

export const ClientContext = createContext(null);

export const ClientProvider = ({ children }) => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [stockTackingTotal, setStockTackingTotal] = useState(0);
	const [profitCalculationHistoryData, setProfitCalculationHistoryData] = useState({});

	return (
		<ClientContext.Provider
			value={{
				profitCalculationHistoryData,
				getProfitCalculationHistoryData: (x) => {
					setProfitCalculationHistoryData(x);
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
				clientKey: async () => {
					try {
						alert(123);
					} catch (error) {}
				},
				setstockTaking: (val) => {
					setStockTackingTotal(val);
				},
				stockTackingTotal,

				getSpecificshop: async () => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore().collection('Shops').doc(user.myShops[0].id);
						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},

				recordProduct: async (data) => {
					return new Promise(async (resolve, reject) => {
						const reference = firestore().collection('Products');

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
				getFeedbackResponses: () => {
					return new Promise(async (resolve, reject) => {
						const snap = firestore().collection('Feedback');

						try {
							const unsubscribe = snap.onSnapshot((querySnapshot) => {
								const FeedbackData = querySnapshot
									.docChanges()
									.filter(({ type }) => type === 'added')
									.map(({ doc }) => {
										const data = doc.data();
										return {
											...data,
											_id: doc.id,
										};
									});
								resolve(FeedbackData);
							});
						} catch (error) {
							reject(error);
						}
					});
				},
				getAdminInformations: async (id) => {
					return new Promise(async (resolve, reject) => {
						try {
							firestore()
								.collection('Users')
								.doc(id)
								.get()
								.then((result) => {
									resolve(result);
								});
						} catch (error) {
							reject(error);
						}
					});
				},
				stockOrdershistory: async (currentMonth) => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Users')
							.doc(user.adminID)
							.collection('Orders')
							.where('type', '==', 'Stock')
							.where('month', '==', currentMonth);
						try {
							const response = await ref.get();
							console.log(response);
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				getProfitCalculationHistory: async () => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(user.myShops[0].id)
							.collection('ProfitsHistory')
							.orderBy('createdAt', 'desc');
						// .limit(1);

						try {
							const response = await ref.get();
							resolve(response);
						} catch (error) {
							console.log(error);
							reject(error);
						}
					});
				},
				getProfitsHistory: async () => {
					return new Promise(async (resolve, reject) => {
						const ref = firestore()
							.collection('Shops')
							.doc(user.myShops[0])
							.collection('ProfitsHistory')
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
			}}
		>
			{children}
		</ClientContext.Provider>
	);
};

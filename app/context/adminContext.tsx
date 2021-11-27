import React, {createContext, useState} from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AdminActions} from '@actions';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {AuthActions} from '@actions';
import {WEB_CLIENT_ID} from '@env';
import {ClientActions} from '@actions';
import firebase from '@react-native-firebase/app';


export const AdminContext = createContext(null);



export const AdminProvider = ({children}) => {
  const [currentChatID, setCurrentChatID] = useState({});
  const [currentFromHomeOrders, setCurrentFromHomeOrders] = useState({});
  const [editproducts, setEditProduct] = useState({});
  const [shopCurrentUser, setShopCurrentUser] = useState({});
  const [myshopDataArray, setMyshopDataArray] = useState([]);
  const [broadcastMessageIDs, setBroadcastMessageIDs] = useState([]);
  const [prizeInclude, setPrizeInclude] = useState(false);
  const [currentShoplistSelected, setCurrentShoplistSelected] = useState(false);
  const [currentShopEdit, setCurrentShopEdit] = useState({});
  const [currentShopSelectedData, setCurrentShopSelectedData] = useState({});
  const [stockTackingTotal, setStockTackingTotal] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [expensesLossesDetails, setExpensesLossesDetails] = useState('');
  const [weeklyDeliveriesDetails, setWeeklyDeliveriesDetails] = useState('');

  const googleSignOut = async (resolve) => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await destroyUserState();
    resolve({success: true});
  };
  const facebookSignOut = async (resolve) => {
    await LoginManager.logOut();
    await destroyUserState();
    resolve({success: true});
  };
  const destroyUserState = async () => {
    await dispatch(AuthActions.onLogout());
  };
  const firebaseFieldValue = (value) => {
    const increment = firebase.firestore.FieldValue.increment(parseInt(value));
    const decrementProfits = firebase.firestore.FieldValue.increment(
      -parseInt(value),
    );
    return {
      increment,
      profits: decrementProfits,
    };
  };
  const incremetProfits = (value) => {
    const increment = firebase.firestore.FieldValue.increment(value);
    return increment;
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
  };

  const updateActivity = async (activityData, uid) => {
    firestore()
      .collection('Users')
      .doc(uid)
      .collection('Activity')
      .add(activityData);
  };
  return (
    <AdminContext.Provider
      value={{
        currentFromHomeOrders,
        getCurrentFromHomeOrders: (x) => {
          setCurrentFromHomeOrders(x);
        },
        currentShopSelectedData,
        currentShopEdit,
        getCurrentShopEdit: (x) => {
          setCurrentShopEdit(x[0]);
        },
        shopCurrentUser,
        getShopCurrentUser: (x) => {
          setShopCurrentUser(x);
        },
        broadcastMessageIDs,
        getBroadcastMessageIDs: (val) => {
          setBroadcastMessageIDs(val);
        },

        currentChatID,
        getCurrentChatID: (id, name) => {
          setCurrentChatID({id, name});
        },
        setstockTaking: (val) => {
          setStockTackingTotal(val);
        },
        stockTackingTotal,
        adminKey: async () => {
          try {
            alert(123);
          } catch (error) {}
        },

        updateProduct: async (data) => {
          return new Promise(async (resolve, reject) => {
            const id = data.key;
            const currentShopID = data.currentShopID;
            delete data.key;
            delete data.currentShopID;
            const reference = firestore()
              .collection('Shops')
              .doc(currentShopID)
              .collection('Products')
              .doc(id);
            try {
              const promise = reference.update(data);
              promise.then(() => {
                resolve({success: true});
              });
            } catch (error) {
              reject(error);
            }
          });
        },

        getProducts: async (query, currentShopID) => {
          return new Promise(async (resolve, reject) => {
            try {
              firestore()
                .collection('Shops')
                .doc(currentShopID)
                .collection('Products')
                .get()
                .then((products) => {
                  resolve(products);
                });
            } catch (error) {
              reject(error);
            }
          });
        },
        getEditProduct: (data) => {
          setEditProduct(data);
        },
        editproducts,
        IncludePrizePdf: (val) => {
          setPrizeInclude(val);
        },
        prizeInclude,
        createCategory: (data) => {
          return new Promise(async (resolve, reject) => {
            const reference = firestore().collection('Category');

            try {
              const promise = reference.add(data);
              promise.then(() => {
                resolve({success: true});
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

                dispatch(AdminActions.updateSettings(data));
                resolve({success: true});
              });
            } catch (error) {
              reject(error);
            }
          });
        },
        updateShops: async (data, activity) => {
          const id = data.id;
          const uuid = data.uid;
          delete data.uid;
          delete data.id;
          return new Promise(async (resolve, reject) => {
            const reference = firestore().collection('Shops').doc(id);
            try {
              const promise = reference.update(data);
              promise.then(async () => {
                await updateActivity(activity, uuid);

                resolve({success: true});
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
                user.providerId === 'google.com'
                  ? googleSignOut(resolve)
                  : facebookSignOut(resolve);
              } catch (error) {
                reject(error);
              }
            }, 2000);
          });
        },
        currentShoplistSelected,
        getCurrentShoplistSelected: (val) => {
          setCurrentShoplistSelected(val);
        },
        updateUserForShopCreate: async (data) => {
          return new Promise(async (resolve, reject) => {
            try {
              // promise.then(async (docRef) => {
              //   const shops = user.myShops;
              //   shops.push({
              //     id: docRef.id,
              //     name: data.name,
              //     type: data.storeType,
              //   });                   .set({myShops: shops}, {merge: true});
              // dispatch(AdminActions.onResetStoreOrder());
              await firestore()
                .collection('Users')
                .doc(user.uid)
                .update({
                  myShops: firebase.firestore.FieldValue.arrayUnion(data),
                });

              resolve({success: true});
              // });
            } catch (error) {
              reject(error);
            }
          });
        },
        getMyshops: async () => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore()
              .collection('Shops')
              .where('ownerID', 'array-contains', user.uid);
            try {
              const response = await ref.get();
              resolve(response);
            } catch (error) {
              reject(error);
            }
          });
        },
        getSpecificshop: async (id) => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore().collection('Shops').doc(id);
            try {
              const response = await ref.get();
              setCurrentShopSelectedData({...response.data(), id: response.id});
              resolve(response);
            } catch (error) {
              console.log(error);
              reject(error);
            }
          });
        },
        getShopDataArray: (x) => {
          setMyshopDataArray(x);
        },
        myshopDataArray,
        requestOrder: async (data) => {
          return new Promise(async (resolve, reject) => {
            delete data.adminID;
            const reference = firestore()
              .collection('Shops')
              .doc(myshopDataArray[0].key)
              .collection('ShopOrders');

            try {
              const promise = reference.add(data);
              promise.then(() => {
                dispatch(ClientActions.onResetStoreOrder());
                resolve({success: true});
              });
            } catch (error) {
              reject(error);
            }
          });
        },
        recordExpenseLosses: async (data, type) => {
          return new Promise(async (resolve, reject) => {
            const id = data.shopID;
            delete data.shopID;
            const ref = firestore().collection('Shops').doc(id);

            try {
              await ref.collection(type).add(data);
              await updateExpenses(data.amount, ref, type);
              data.type = type;
              setExpensesLossesDetails(data);
              resolve({success: true});
            } catch (error) {
              reject(error);
            }
          });
        },
        expensesLossesDetails,
        stockOrdershistory: async (currentMonth) => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore()
              .collection('Users')
              .doc(user.uid)
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
        getRecentRecordedStock: async () => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore()
              .collection('Shops')
              .doc(myshopDataArray[0].key)
              .collection('ShopOrders')
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
        weeklyDeliveries: async (data) => {
          return new Promise(async (resolve, reject) => {
            const profitsData = data.profitsData;
            delete data.profitsData;
            const ref = firestore().collection('Shops').doc(user.myShops[0]);

            try {
              const response = await ref
                .collection('WeeklyDeliveries')
                .add(data);
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
              console.log(error);
              reject(error);
            }
          });
        },
        weeklyDeliveriesDetails,
        getAvailableProfit: async () => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore().collection('Shops').doc(user.myShops[0]);

            try {
              const response = await ref.get();
              resolve(response);
            } catch (error) {
              console.log(error);
              reject(error);
            }
          });
        },
        getRecentProfitCalculation: async () => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore()
              .collection('Shops')
              .doc(user.myShops[0])
              .collection('ProfitsHistory')
              .orderBy('createdAt', 'desc')
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
        getLossesHistory: async () => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore()
              .collection('Shops')
              .doc(user.myShops[0])
              .collection('Losses')
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
        getExpensesHistory: async () => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore()
              .collection('Shops')
              .doc(user.myShops[0])
              .collection('Expenses')
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
        createStockTaking: async (dataArray) => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore()
              .collection('Shops')
              .doc(user.myShops[0])
              .collection('StockTaking');

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
              await dispatch(
                AdminActions.activateStockTakingActive(response.id),
              );
              resolve(response);
            } catch (error) {
              console.log(error);
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
        getAllUsers: async () => {
          return new Promise(async (resolve, reject) => {
            const ref = firestore()
              .collection('Users')
              .where('adminID', 'array-contains', user.uid)
              .where('connectlink', 'array-contains', user.uid);
            console.log(user.uid);
            try {
              const response = await ref.get();
              resolve(response);
            } catch (error) {
              reject(error);
            }
          });
        },
        getUsersForSpecificShop: async (obj, myCurrentShop) => {
          return new Promise(async (resolve, reject) => {
            const getUsersPromise = (id) => {
              return new Promise((resolve2, reject2) => {
                firestore()
                  .collection('Users')
                  .doc(id)
                  .get()
                  .then((res) => {
                    resolve2({
                      ...res.data(),
                      key: res.id,
                      date: res.data().date,
                      name: res.data().fullName,
                      image: {uri: res.data().photoURL},
                    });
                  })
                  .catch((error) => {
                    reject2(error);
                  });
              });
            };
            //A simple promise that resolves after a given time
            const promises = [];
            myCurrentShop.ownerID.map((x) => {
              if (x === user.uid) return false;
              promises.push(getUsersPromise(x));
            });
            try {
              //We are passing an array of pending promises to Promise.all
              Promise.all(promises).then(async (response) => {
                resolve(response);
                console.log('admins', response);

                const ref = firestore()
                  .collection('Users')
                  .where('myShops', 'array-contains', obj);
                const anotherResponse = await ref.get();
                const firestoreData = [];

                anotherResponse.docs
                  .filter((x) => x.id !== user.uid)
                  .forEach((result) => {
                    firestoreData.push({
                      ...result.data(),
                      key: result.id,
                      image: {uri: result.data().photoURL},
                      name: result.data().fullName,
                      date: result.data().date,
                    });
                  });
                const full = response.concat(firestoreData);

                resolve(full);
              }); // doesn't resolve
            } catch (error) {
              reject(error);
            }

            try {
            } catch (error) {
              console.log(error);
              reject(error);
            }
          });
        },
        gettActivities: async (uid) => {
          return new Promise(async (resolve, reject) => {
            try {
              firestore()
                .collection('Users')
                .doc(uid)
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
        updateUserPermissions: async (data) => {
          return new Promise(async (resolve, reject) => {
            try {
              const id = data.uid;
              delete data.uid;
              firestore()
                .collection('Users')
                .doc(id)
                .update(data)
                .then((res) => {
                  resolve(res);
                });
            } catch (error) {
              reject(error);
            }
          });
        },
        getClientsOrders: async () => {
          return new Promise(async (resolve, reject) => {
            
            try {
              firestore()
                .collection('Users')
                .doc(user.uid)
                .collection('Orders')
                .get()
                .then((res) => {
                  resolve(res)

                });
            } catch (error) {
              reject(error);
            }
          });
        },
        getShopsOrders: async (data) => {
          return new Promise(async (resolve, reject) => {
            try {
              firestore()
                .collectionGroup('WrittenShopOrders')
                .where('adminID', '==', user.uid)
                .orderBy('createdAt', 'desc')
                .get()
                .then((res) => {
                  resolve(res);
                });
            } catch (error) {
              console.log(error);
              reject(error);
            }
          });
        },
        getIndividualUser: async (id) => {
          return new Promise(async (resolve, reject) => {
            try {
              firestore()
                .collection('Users')
                .doc(id)
                .get()
                .then((res) => {
                  resolve(res);
                });
            } catch (error) {
              reject(error);
            }
          });
        },
        // getMyShop: async () => {
        //   return new Promise(async (resolve, reject) => {
        //     const ref = firestore().collection('Shops').doc(user.myShops[0]);

        //     try {
        //       const response = await ref.get();
        //       resolve(response);
        //     } catch (error) {
        //       reject(error);
        //     }
        //   });
        // },
      }}>
      {children}
    </AdminContext.Provider>
  );
};

//  "postalCode": "1632", "providerId": "google.com",
//  "province": "Gauteng ",
//   "shopName": null,
//   "socialProviderId": "104204011469961583608",
//    "storeDetails":
//     {"address":
//      {"storeAddress":
//       "192 lqaqa Tembisa Sparrow st",
//       "storeCity": "Kempton Park ",
//        "storeCountry": "South Africa ",
//         "storePostalCode": "1632"},
//         "storeEmail": "mlambofamilyinvesd@gmail.com",
//         "storeLogo": "ghkg", "storeMobileNumber":
//          "0737971797", "storeName": "Mlambo Family Investment ",
//           "storeSlogan": "<div>A good product the best service .
//           </div>", "storeType": "dtjdg"},
//            "streetAddress": "192 lqaqa Tembisa "
//            , "streetAddress2": "Seotloana 660 Sparrow St",

// "uid": "tr4QIDDRdySNvzFpz6WGoa7kDPQ2",
//  "userCategory": "User"}

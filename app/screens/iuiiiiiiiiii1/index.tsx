import Autocomplete from 'react-native-autocomplete-input';
import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {AdminContext} from '@context';
import {TextComponent as Text, SaveButton} from '@components';
import {useTheme, useNavigation} from '@react-navigation/native';
import Androw from 'react-native-androw';
import {ROUTES} from '@config';

const RecordDeliveredStock = () => {
  const [data, setData] = useState([1, 2, 3]);
  const {colors} = useTheme();
  const {navigate} = useNavigation();

  // useEffect(() => {
  //   getProducts(query).then((response) => {
  //     const firestoreData = [];
  //     response.forEach((result) => {
  //       firestoreData.push({
  //         ...result.data(),
  //         key: result.id,
  //       });
  //     });
  //     setData({...data, films: firestoreData});
  //     console.log(firestoreData);
  //   });
  // }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
      <View style={{marginHorizontal: 15, marginBottom: 15}}>
        <Text medium style={{color: colors.primary, fontSize: 11}}>
          Record your delivered stock, so that
        </Text>
        <Text medium style={{color: colors.primary, fontSize: 11}}>
          that the system can calculate profits for your delivery.
        </Text>
        <Text medium style={{color: colors.primary, fontSize: 11}}>
          You need to enter the buying prize for each item,
        </Text>
        <Text medium style={{color: colors.primary, fontSize: 11}}>
          so choose from 2 options below to get items ~
        </Text>
        <Text style={{color: '#00', marginTop: 10}}>
          (1) Your recent stock or
        </Text>
        <Text style={{color: '#00'}}>(2) Create a new stock record</Text>
      </View>
      <TouchableOpacity style={styles.row}>
        <View style={styles.smallBar} />
        <View style={styles.monthTxt}>
          <Text bold style={{color: '#00'}}>
            Recent Orders
          </Text>
        </View>
        <View style={styles.smallBar} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: 'red',
          width: '90%',
          alignSelf: 'center',
          // marginHorizontal: 15,
        }}>
        <SaveButton
          title="Recent Stock "
          titleStyle={{fontSize: 15}}
          buttonStyle={{height: 40}}
          containerStyle={{
            marginVertical: 5,
            alignSelf: 'center',
            marginBottom: 50,

            width: '45%',
          }}
          onPress={() => {}}
          loading={false}
        />

        <SaveButton
          title="Create New  "
          titleStyle={{fontSize: 15}}
          buttonStyle={{height: 40}}
          containerStyle={{
            marginVertical: 5,
            alignSelf: 'center',
            marginBottom: 50,

            width: '45%',
          }}
          onPress={() => {
            navigate(ROUTES.RecordDeliveredStockThree);
          }}
          loading={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  smallBar: {
    width: '30%',
    backgroundColor: '#000',
    height: 1,
    alignSelf: 'center',
  },
  containerAndroid: {
    width: '95%',
    height: null,
    paddingTop: 12,
    paddingLeft: 16,
    paddingBottom: 3,
    borderRadius: 322,
    alignSelf: 'baseline',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowRadius: 7,
    shadowOpacity: 0.09,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  monthTxt: {
    width: '33.3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  container: {
    // padding: 20,
    paddingTop: 65,

    height: '100%',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray',
  },
});

export default RecordDeliveredStock;

// import * as React from 'react';
// import {useTheme} from '@react-navigation/native';
// import {AdminContext} from '../../../context/adminContext';
// import {
//   View,
//   KeyboardAvoidingView,
//   ScrollView,
//   Switch,
//   TouchableOpacity,
//   Alert,
//   Text,
// } from 'react-native';
// // import Header from 'src/components/Header';
// import {
//   SaveButton,
//   Icon,
//   Input,
//   InputImage,
//   FilterCategories,
//   IconRadio,
//   Errors,
//   Loader,
//   Dialog,
// } from '@components';

// import {isEmpty} from '@helpers';
// import {useNavigation} from '@react-navigation/native';
// import {ROUTES} from '@config';
// import filter from 'lodash/filter';
// import styles from './styles';
// import {TextComponent} from '@components';
// import {useSelector} from 'react-redux';
// import {dimensions} from '@utils';
// import _ from 'lodash';

// function AddProducts(props) {
//   const {colors} = useTheme();
//   const {navigate} = useNavigation();
//   const user = useSelector((state) => state.auth.user);

//   const {
//     getImageUri,
//     product_barcode,
//     recordProduct,
//     load,
//     getCategories,
//   } = React.useContext(AdminContext);
//   let batsirai = [];
//   const {navigation, route} = props;
//   const product = route?.params?.data ?? null;
//   const typeForm = product ? 'edit' : 'add';

//   const dataForm = () => {
//     return {
//       productName: '',
//       brand: '',
//       salePrice: '',
//       regularPrice: '',
//       buyingPrice: '',
//       barcode: product_barcode,
//       productURI: '',
//       catalogVisibility: '',
//       category: [],
//       user: {
//         fullName: user.fullName,
//         id: user.uid,
//       },
//       vat: '',
//     };
//   };
//   const [data, setData] = React.useState(dataForm());
//   const [visitModal, setVisitModal] = React.useState(false);
//   const [image, setImage] = React.useState(product?.images?.[0]?.src ?? '');
//   const [categories, setCategories] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [dialogVisible, setDialogVisible] = React.useState(false);
//   const [currenCategoryDelete, setCurrenCategoryDelete] = React.useState(false);

//   const listVisibility = [
//     {
//       value: 'visible',
//       name: 'Shop & Search Results (recommended)',
//     },
//     {
//       value: 'catalog',
//       name: 'Shop Only',
//     },

//     {
//       value: 'hidden',
//       name: 'Hidden',
//     },
//   ];
//   React.useEffect(() => {
//     updateData('barcode', product_barcode);
//     fetchCategory();
//   }, [product_barcode]);

//   const fetchCategory = () => {
//     getCategories().then((response) => {
//       setLoading(false);
//       const firestoreData = [];
//       response.forEach((result) => {
//         firestoreData.push({
//           ...result.data(),
//           key: result.id,
//         });
//       });

//       let sorted = _.sortBy(firestoreData, (a) => a.name);
//       setCategories(sorted);
//       console.log(sorted);
//     });
//   };
//   //   React.useEffect(() => {
//   //     const fetchCategories = async () => {
//   //       try {
//   //         const dataCategories = await services.getCategories();
//   //         setCategories(dataCategories);
//   //       } catch (e) {
//   //         setLoading(false);
//   //       }
//   //     };
//   //     fetchCategories();
//   //   }, []);

//   const updateData = (key, value) => {
//     setData({
//       ...data,
//       [key]: value,
//     });
//   };
//   const setModalVisible = (value) => {
//     setVisitModal(value);
//   };

//   const saveProduct = async () => {
//     const valid = isEmpty(data);

//     console.log(valid);
//     console.log(dataForm);

//     valid
//       ? Errors({
//           message: 'Empty Fields',
//           position: 'bottom',
//           autoHide: true,
//           description: 'Please fill all fields',
//         })
//       : (async () => {
//           setIsLoading(true);
//           await getImageUri(data.productURI, data.productName)
//             .then((downloadedUrl) => {
//               data.productURI = downloadedUrl;

//               recordProduct(data)
//                 .then(() => {
//                   setIsLoading(false);
//                   setData(dataForm());
//                   load('');
//                 })
//                 .catch((error) => {
//                   setIsLoading(false);

//                   Errors({
//                     message: 'Error ocuured',
//                     description: error,
//                     position: 'bottom',
//                   });
//                 });
//             })
//             .catch((e) => {
//               setIsLoading(false);

//               Errors({
//                 message: 'Error ocuured',
//                 description: e,
//                 position: 'bottom',
//               });
//             });
//         })();

//     // console.log(data);
//     // // adminKey();
//     // // Errors({message: 'error', position: 'top', autoHide: true});
//     // // setLoading(true);
//     // if (product) {
//     //   //   handleUpdate();
//     // } else {
//     //   //   handleCreate();
//     // }
//   };

//   //   const handleUpdate = async () => {
//   //     try {
//   //       await services.updateProduct(product.id, {...data, image}, userToken);
//   //       setLoading(false);
//   //       showMessage({
//   //         message: t('message:text_title_update_product'),
//   //         description: t('message:text_update_product'),
//   //         type: 'success',
//   //       });
//   //       if (route?.params?.goBack) {
//   //         route.params.goBack();
//   //       }
//   //       navigation.goBack();
//   //     } catch (e) {
//   //       setLoading(false);
//   //       showMessage({
//   //         message: t('message:text_title_update_product'),
//   //         description: e.message,
//   //         type: 'danger',
//   //       });
//   //     }
//   //   };
//   //   const handleCreate = async () => {
//   //     try {
//   //       const result = await services.addProduct({...data, image}, userToken);
//   //       if (result.id && data.categories.length > 0) {
//   //         await services.updateProduct(
//   //           result.id,
//   //           {categories: data.categories},
//   //           userToken,
//   //         );
//   //       }
//   //       setLoading(false);
//   //       showMessage({
//   //         message: t('message:text_title_create_product'),
//   //         description: t('message:text_create_product'),
//   //         type: 'success',
//   //       });
//   //       if (route?.params?.goBack) {
//   //         route.params.goBack();
//   //       }
//   //       navigation.goBack();
//   //     } catch (e) {
//   //       setLoading(false);
//   //       showMessage({
//   //         message: t('message:text_title_create_product'),
//   //         description: e.message,
//   //         type: 'danger',
//   //       });
//   //     }
//   //   };
//   const deleteCate = (category) => {
//     setDialogVisible(true);
//     setCurrenCategoryDelete(category.id);
//     // Alert.alert(
//     //   'Delelte categories',
//     //   'Are you sure ?',
//     //   [
//     //     {
//     //       text: 'Cancel',
//     //       onPress: () => {},
//     //       style: 'cancel',
//     //     },
//     //     {
//     //       text: 'OK',
//     //       onPress: () =>
//     //         updateData(
//     //           'category',
//     //           filter(data.category, (s) => s.id !== category.id),
//     //         ),
//     //     },
//     //   ],
//     //   {cancelable: false},
//     // );
//   };

//   return (
//     <View style={styles.container}>
//       <Dialog
//         firstButtonTextStyles={{color: colors.primary}}
//         secondButtonTextStyles={{color: 'red'}}
//         content="Hold on!', 'Are you sure you want Delete?"
//         title="Delete Category"
//         firstButtonOnPress={() => {
//           updateData(
//             'category',
//             filter(data.category, (s) => s.id !== currenCategoryDelete),
//           );
//           setDialogVisible(false);
//         }}
//         secondButtonOnPress={() => {
//           setDialogVisible(false);
//         }}
//         onSwipefunc={() => {
//           setDialogVisible(false);
//         }}
//         onTouchOutside={() => {
//           setDialogVisible(false);
//         }}
//         secondButtontext="Cancel"
//         firstButtontext="OK"
//         modalVisible={dialogVisible}
//       />
//       <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View style={styles.content}>
//             <View style={styles.viewInput}>
//               <Input
//                 label={'Product Name'}
//                 value={data?.productName}
//                 isRequired
//                 onChangeText={(value) => updateData('productName', value)}
//               />
//               <Input
//                 label={'Brand '}
//                 value={data?.brand}
//                 isRequired
//                 onChangeText={(value) => updateData('brand', value)}
//               />
//               <Input
//                 label={'Vat / Tax ( 15% )'}
//                 value={data?.vat}
//                 isRequired
//                 onChangeText={(value) => updateData('vat', value)}
//               />

//               <View style={styles.rowInput}>
//                 <View style={styles.colInput}>
//                   <Input
//                     label={'Buying price'}
//                     isRequired
//                     keyboardType="numeric"
//                     value={data?.buyingPrice}
//                     onChangeText={(value) => updateData('buyingPrice', value)}
//                   />
//                 </View>
//                 <View style={styles.colInput}>
//                   <Input
//                     label={'Vat / Tax ( 15% )'}
//                     value={data?.vat}
//                     isRequired
//                     onChangeText={(value) => updateData('vat', value)}
//                   />
//                 </View>
//               </View>
//               <View style={styles.rowInput}>
//                 <View style={styles.colInput}>
//                   <Input
//                     label={'Regular price'}
//                     value={data?.regularPrice}
//                     keyboardType="numeric"
//                     onChangeText={(value) => updateData('regularPrice', value)}
//                   />
//                 </View>
//                 <View style={styles.colInput}>
//                   <Input
//                     label={'Sale price'}
//                     value={data?.salePrice}
//                     isRequired
//                     keyboardType="numeric"
//                     onChangeText={(value) => updateData('salePrice', value)}
//                   />
//                 </View>
//               </View>

//               <View style={styles.viewManager}>
//                 <TextComponent>{'Manage Stock'}</TextComponent>
//                 <Switch
//                   // value={data?.manage_stock}
//                   onValueChange={
//                     (value) => {}
//                     // updateData('manage_stock', value)
//                   }
//                 />
//               </View>

//               <Input
//                 label={'Barcode Digits '}
//                 value={data?.barcode}
//                 onChangeText={(value) => {}}
//               />
//               <SaveButton
//                 title="Scan Bar Code"
//                 size="small"
//                 secondary
//                 buttonStyle={[
//                   {
//                     alignItems: 'center',
//                     width: 300,
//                     alignSelf: 'center',
//                     height: 150,
//                     borderWidth: 0.5,
//                   },
//                 ]}
//                 containerStyle={styles.containerButton}
//                 onPress={() => {
//                   navigate(ROUTES.GetBarCode);
//                 }}
//               />
//               {/* <InputRichText
//                 label={t('inputs:text_description')}
//                 value={data?.description}
//                 onChangeText={(value) => updateData('description', value)}
//               /> */}

//               <InputImage
//                 label={'Product Image'}
//                 value={image}
//                 onChangeImage={(value) => {
//                   updateData('productURI', value);
//                   setImage(value);
//                 }}
//               />
//               <TextComponent
//                 style={[styles.textCatalog, {color: colors.primary}]}>
//                 {'Category'}
//               </TextComponent>
//               <View
//                 style={[
//                   {backgroundColor: colors.secondaryCard},
//                   styles.viewSelectCate,
//                 ]}>
//                 {data.category.map((category) => (
//                   <TouchableOpacity
//                     key={category.id}
//                     style={[
//                       {backgroundColor: colors.background},
//                       styles.btnSelectCate,
//                     ]}
//                     onPress={() => deleteCate(category)}>
//                     <Text key={category.id}>{category.name}</Text>
//                     <Icon
//                       name="close-circle"
//                       size={14}
//                       iconStyle={styles.iconClose}
//                     />
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               <View style={{alignItems: 'center'}}>
//                 <SaveButton
//                   title="Pick Category"
//                   size="small"
//                   secondary
//                   buttonStyle={[styles.SaveButton, {alignItems: 'center'}]}
//                   containerStyle={styles.containerButton}
//                   onPress={() => setModalVisible(true)}
//                 />
//               </View>

//               <TextComponent style={styles.textCatalog}>
//                 {'Catalog Visibility'}
//               </TextComponent>

//               <View
//                 style={[
//                   styles.viewListRadio,
//                   {borderColor: colors.secondaryCard},
//                 ]}>
//                 {listVisibility.map((visibility) => {
//                   const selected = visibility.value === data?.catalogVisibility;
//                   return (
//                     <TouchableOpacity
//                       key={visibility.value}
//                       style={styles.touchVisibility}
//                       onPress={
//                         () => {
//                           updateData('catalogVisibility', visibility.value);
//                         }
//                         // updateData('catalog_visibility', visibility.value)
//                       }>
//                       <IconRadio isSelected={selected} />
//                       <TextComponent
//                         secondary={!selected}
//                         style={[
//                           styles.textVisibility,
//                           selected && {color: colors.primary},
//                         ]}>
//                         {visibility.name}
//                       </TextComponent>
//                     </TouchableOpacity>
//                   );
//                 })}
//               </View>

//               <TextComponent thin style={{color: '#BDBDBD', fontSize: 12}}>
//                 Note : Only simple products can be created in this page. To
//                 create other product types login through the website.,
//               </TextComponent>
//             </View>
//           </View>
//         </ScrollView>
//         <SaveButton
//           title="Save"
//           buttonStyle={styles.SaveButton}
//           containerStyle={styles.containerButton}
//           onPress={saveProduct}
//           loading={loading}
//         />
//         <FilterCategories
//           visitModal={visitModal}
//           setModalVisible={setModalVisible}
//           categories={categories}
//           selectCategory={data.category}
//           clickFilter={(value) => {
//             updateData('category', value);
//           }}
//         />
//       </KeyboardAvoidingView>
//       <Loader isLoading={isLoading} />
//     </View>
//   );
// }

// export default AddProducts;

// <ScrollView>
// <View style={{marginTop: 50}}>
//   {data.map((order) => (
//     <TouchableOpacity
//       onPress={() => {
//         navigate(ROUTES.RecordDeliveredStockTwo);
//       }}>
//       <Androw style={[styles.containerAndroid]}>
//         <Androw
//           style={{
//             marginTop: -5,
//             paddingTop: 12,
//             marginLeft: 10,
//             borderRadius: 12,
//             flexDirection: 'row',
//             paddingBottom: 12,
//             shadowColor: '#000',
//             backgroundColor: '#fff',
//             shadowRadius: 7,
//             shadowOpacity: 0.05,
//             shadowOffset: {
//               width: 0,
//               height: 3,
//             },
//           }}>
//           <View
//             style={{
//               width: '100%',
//               paddingLeft: 16,
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//               }}>
//               <Text
//                 numberOfLines={2}
//                 style={{
//                   color: '#556084',

//                   fontSize: 14,
//                   fontWeight: 'bold',
//                 }}>
//                 Stock Invoice Number :
//               </Text>
//               <Text
//                 numberOfLines={2}
//                 style={{
//                   color: '#556084',

//                   fontSize: 14,
//                   fontWeight: 'bold',
//                 }}>
//                 {'      '}1254785
//               </Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//               }}>
//               <Text
//                 numberOfLines={2}
//                 style={{
//                   color: '#556084',

//                   fontSize: 14,
//                   fontWeight: 'bold',
//                 }}>
//                 Week :
//               </Text>
//               <Text
//                 numberOfLines={2}
//                 style={{
//                   color: '#556084',

//                   fontSize: 14,
//                   fontWeight: 'bold',
//                 }}>
//                 {'      '}14
//               </Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 marginVertical: 5,
//                 paddingRight: 5,
//               }}>
//               <Text
//                 numberOfLines={10}
//                 style={{
//                   color: '#8c93ab',

//                   fontSize: 12,
//                   marginTop: 8,
//                   fontWeight: '600',
//                 }}>
//                 Total Amount
//               </Text>
//               <Text
//                 numberOfLines={10}
//                 style={{
//                   color: '#8c93ab',

//                   fontSize: 12,
//                   marginTop: 8,
//                   fontWeight: '600',
//                 }}>
//                 R 90 000
//               </Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 marginVertical: 5,
//                 paddingRight: 5,
//               }}>
//               <Text
//                 numberOfLines={10}
//                 style={{
//                   color: '#8c93ab',

//                   fontSize: 12,
//                   marginTop: 8,
//                   fontWeight: '600',
//                 }}>
//                 Total items
//               </Text>
//               <Text
//                 numberOfLines={10}
//                 style={{
//                   color: '#8c93ab',

//                   fontSize: 12,
//                   marginTop: 8,
//                   fontWeight: '600',
//                 }}>
//                 524
//               </Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',

//                 marginVertical: 5,
//                 paddingRight: 5,
//               }}>
//               <Text
//                 numberOfLines={10}
//                 style={{
//                   color: '#8c93ab',

//                   fontSize: 12,
//                   marginTop: 8,
//                   fontWeight: '600',
//                 }}>
//                 Date :
//               </Text>
//               <Text
//                 numberOfLines={10}
//                 style={{
//                   color: '#8c93ab',

//                   fontSize: 12,
//                   marginTop: 8,
//                 }}>
//                 {'   '} Thur 23 Aug 2021
//               </Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',

//                 marginVertical: 5,
//                 paddingRight: 5,
//               }}>
//               <Text
//                 numberOfLines={10}
//                 style={{
//                   color: '#8c93ab',

//                   fontSize: 12,
//                   marginTop: 8,
//                   fontWeight: '600',
//                 }}>
//                 Time :
//               </Text>
//               <Text
//                 numberOfLines={10}
//                 style={{
//                   color: '#8c93ab',

//                   fontSize: 12,
//                   marginTop: 8,
//                 }}>
//                 {'   '} 21:00.02
//               </Text>
//             </View>
//           </View>
//         </Androw>
//         <View
//           style={{
//             justifyContent: 'space-around',
//             alignItems: 'center',
//             height: 25,
//             width: 25,
//             borderRadius: 50,
//             marginLeft: 32,
//             marginTop: 8,
//             borderWidth: 1,
//             borderColor: '#ccc',
//           }}>
//           <Text
//             bold
//             numberOfLines={1}
//             style={{
//               color: '#000',
//               fontSize: 10,
//             }}>
//             1
//           </Text>
//         </View>
//       </Androw>

//       {/* // <TouchableOpacity style={{marginHorizontal: 10}}>
//     //   <Text bold>Order Invoice Number : </Text>
//     //   <Text medium style={{left: 180}}>
//     //     256
//     //   </Text> */}
//     </TouchableOpacity>
//   ))}
// </View>
// <View style={{height: 150}} />
// </ScrollView>

import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {CommonContext} from '@context';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
// import Header from 'src/components/Header';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
  IconRadio,
  Errors,
  Dialog,
  Header,
  CustomProgressBar,
  TextComponent as Text,
} from '@components';
import {isEmpty} from '@helpers';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import filter from 'lodash/filter';
import styles from './styles';
import {TextComponent} from '@components';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {CheckBox} from 'react-native-elements';
import {FONTS} from '@utils';

let count = 1;
function EditProduct(props) {
  const {colors} = useTheme();
  const {navigate} = useNavigation();

  const {getCategories, updateProduct, editproducts} = React.useContext(
    CommonContext,
  );
  const {navigation, route} = props;
  const [data, setData] = React.useState(editproducts);
  const [visitModal, setVisitModal] = React.useState(false);
  const [changeImage, setChangeImage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState(data.category);
  const [categoriesList, setCategoriesList] = React.useState([]);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [currenCategoryDelete, setCurrenCategoryDelete] = React.useState(false);

  // React.useEffect(() => {
  //   // setCategory(
  //   //   data.category.map((v) => {
  //   //     return {name: v, id: count++};
  //   //   }),
  //   // );
  //   // setData({...data});
  //   // return () => {
  //   //   DeviceEventEmitter.removeAllListeners("event.mapMarkerSelected")
  //   // };
  // }, []);

  React.useEffect(() => {
    getCategories().then((response) => {
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          id: result.id,
        });
      });
      setCategoriesList(firestoreData);
    });
  }, []);

  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const setModalVisible = (value) => {
    setVisitModal(value);
  };

  const saveProduct = async () => {
    // const valid = isEmpty(data, ['category']);

    if (
      parseInt(data.salePrice) <
      parseInt(data.buyingPrice) / parseInt(data.InCase)
    ) {
      return Errors({
        message: 'Error',
        position: 'bottom',
        autoHide: true,
        description: 'You cant enter a selling prize below the buying price',
      });
    }

    false
      ? Errors({
          message: 'Empty Fields',
          position: 'bottom',
          autoHide: true,
          description: 'Please fill all fields',
        })
      : (async () => {
          setIsLoading(true);

          // changeImage
          //   ? getImageUri(data.productURI, data.productName)
          //       .then((downloadedUrl) => {
          //         data.productURI = downloadedUrl;
          //         updateProduct(data)
          //           .then(() => {
          //             setIsLoading(false);
          //             Errors({
          //               message: 'Successfull...',
          //               description: `${data.productName} Successfull updated into the shop.`,
          //               position: 'bottom',
          //               type: 'success',
          //             });
          //             setTimeout(() => {
          //               if (route?.params?.goBack) {
          //                 route.params.goBack();
          //               }
          //               navigation.goBack();
          //             }, 1500);
          //           })
          //           .catch((error) => {
          //             setIsLoading(false);

          //             Errors({
          //               message: 'Error ocuured',
          //               description: error.message,
          //               position: 'bottom',
          //             });
          //           });
          //       })  onPress={() => {

          //   navigate(ROUTES.ScanBarCode);
          // }}
          //       .catch((e) => {
          //         setIsLoading(false);

          //         Errors({
          //           message: 'Error ocuured',
          //           description: e.message,
          //           position: 'bottom',
          //         });
          //       })
          updateProduct(data)
            .then(() => {
              setIsLoading(false);

              Errors({
                message: 'Successfull!',
                description: `${data.productName} was successfull updated`,
                position: 'bottom',
                type: 'success',
                autoHide: true,
              });
              setTimeout(() => {
                DeviceEventEmitter.emit('event.testEvent', {});
                DeviceEventEmitter.removeAllListeners('event.testEvent');
                navigation.goBack();
              }, 1500);
            })
            .catch((error) => {
              setIsLoading(false);

              Errors({
                message: 'Error ocuured',
                description: error.message,
                position: 'bottom',
              });
            });
        })();
  };

  //   const handleUpdate = async () => {
  //     try {
  //       await services.updateProduct(product.id, {...data, image}, userToken);
  //       setLoading(false);
  //       showMessage({
  //         message: t('message:text_title_update_product'),
  //         description: t('message:text_update_product'),
  //         type: 'success',
  //       });
  //       if (route?.params?.goBack) {
  //         route.params.goBack();
  //       }
  //       navigation.goBack();
  //     } catch (e) {
  //       setLoading(false);
  //       showMessage({
  //         message: t('message:text_title_update_product'),
  //         description: e.message,
  //         type: 'danger',
  //       });
  //     }
  //   };
  //   const handleCreate = async () => {
  //     try {
  //       const result = await services.addProduct({...data, image}, userToken);
  //       if (result.id && data.categories.length > 0) {
  //         await services.updateProduct(
  //           result.id,
  //           {categories: data.categories},
  //           userToken,
  //         );
  //       }
  //       setLoading(false);
  //       showMessage({
  //         message: t('message:text_title_create_product'),
  //         description: t('message:text_create_product'),
  //         type: 'success',
  //       });
  //       if (route?.params?.goBack) {
  //         route.params.goBack();
  //       }
  //       navigation.goBack();
  //     } catch (e) {
  //       setLoading(false);
  //       showMessage({
  //         message: t('message:text_title_create_product'),
  //         description: e.message,
  //         type: 'danger',
  //       });
  //     }
  //   };
  // const deleteCate = (cat) => {
  //   Alert.alert(
  //     'Delelte categories',
  //     'Are you sure ?',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {},
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => setCategory(filter(category, (s) => s.id !== cat.id)),
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };
  const deleteCate = (cat) => {
    setDialogVisible(true);
    setCurrenCategoryDelete(cat.id);
  };
  return (
    <View style={styles.container}>
      <Header></Header>
      <Dialog
        firstButtonTextStyles={{color: colors.primary}}
        secondButtonTextStyles={{color: 'red'}}
        content="`Hold on!', 'Are you sure you want Delete?`"
        title="Delete Category"
        firstButtonOnPress={() => {
          const value = filter(category, (s) => s.id !== currenCategoryDelete);
          setCategory(value);
          updateData('category', value);

          setDialogVisible(false);
        }}
        secondButtonOnPress={() => {
          setDialogVisible(false);
        }}
        onSwipefunc={() => {
          setDialogVisible(false);
        }}
        onTouchOutside={() => {
          setDialogVisible(false);
        }}
        secondButtontext="Cancel"
        firstButtontext="OK"
        modalVisible={dialogVisible}
      />
      <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.viewInput}>
              <Input
                label={'Product Name'}
                value={data?.productName}
                isRequired
                onChangeText={(value) => updateData('productName', value)}
              />

              <Input
                label={'Mass '}
                value={data?.mass}
                isRequired
                onChangeText={(value) => updateData('mass', value)}
              />
              <Input
                label={'in a Case'}
                value={data?.InCase}
                isRequired
                onChangeText={(value) => updateData('InCase', value)}
              />
              <View style={styles.rowInput}>
                <View style={styles.colInput}>
                  <Input
                    label={'Buying price'}
                    isRequired
                    keyboardType="numeric"
                    value={data?.buyingPrice}
                    onChangeText={(value) => updateData('buyingPrice', value)}
                  />
                </View>

                <View style={styles.colInput}>
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
                        setData({...data});
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

              {/* <View style={styles.viewManager}>
                <TextComponent>{'Manage Stock'}</TextComponent>
                <Switch
                  // value={data?.manage_stock}
                  onValueChange={
                    (value) => {}
                    // updateData('manage_stock', value)
                  }
                />
              </View> */}

              <Input
                label={'Barcode Digits '}
                value={`${data?.barcode}`}
                onChangeText={(value) => {}}
              />
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
                containerStyle={styles.containerButton}
                onPress={() => {
                  navigate(ROUTES.ScanBarCode, {type: 'edit'});
                  DeviceEventEmitter.addListener('event.loadbarcode', (res) =>
                    updateData('barcode', res),
                  );
                }}
              />

              {/* <InputImage
                label={'Product Image'}
                value={data.productURI}
                onChangeImage={(value) => {
                  updateData('productURI', value);
                  setChangeImage(true);
                }}
              /> */}
              {/* <TextComponent
                style={[styles.textCatalog, {color: colors.primary}]}>
                {'Category'}
              </TextComponent> */}
              <Text
                style={[
                  styles.textCatalog,
                  {color: colors.primary, marginTop: 100},
                ]}>
                {'Category'}
              </Text>
              <View
                style={[
                  {backgroundColor: colors.secondaryCard},
                  styles.viewSelectCate,
                ]}>
                {category.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      {backgroundColor: colors.background},
                      styles.btnSelectCate,
                    ]}
                    onPress={() => deleteCate(cat)}>
                    <Text key={cat.id}>{cat.name}</Text>
                    <Icon
                      name="close-circle"
                      size={14}
                      iconStyle={styles.iconClose}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{alignItems: 'center'}}>
                <SaveButton
                  title="Pick Category"
                  size="small"
                  secondary
                  buttonStyle={[styles.SaveButton, {alignItems: 'center'}]}
                  containerStyle={styles.containerButton}
                  onPress={() => setModalVisible(true)}
                />
              </View>
              <View style={{height: 200}} />
              {/* <TextComponent thin style={{color: '#BDBDBD', fontSize: 12}}>
                Note : Only simple products can be created in this page. To
                create other product types login through the website.,
              </TextComponent> */}
            </View>
          </View>
        </ScrollView>
        <View style={styles.viewFoot}>
          <View style={styles.footButton}>
            <LinearGradient
              style={{
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              colors={['#F05F3E', '#ED3269']}
              start={{x: 1, y: 0}}
              end={{x: 1, y: 1}}>
              <SaveButton
                title="Save"
                size="small"
                loading={loading}
                buttonStyle={styles.button}
                onPress={saveProduct}
              />
            </LinearGradient>
          </View>
        </View>

        {/* <SaveButton
          title="Save"
          size="small"
          buttonStyle={styles.SaveButton}
          containerStyle={[styles.containerButton]}
          onPress={saveProduct}
          loading={loading}
        /> */}
        <FilterCategories
          visitModal={visitModal}
          setModalVisible={setModalVisible}
          categories={categoriesList}
          selectCategory={category}
          clickFilter={(value) => {
            setCategory(value);
            updateData('category', value);
          }}
        />
      </KeyboardAvoidingView>
      <CustomProgressBar
        category={2}
        loaderText="Updating..."
        loader={7}
        visible={isLoading}
      />
      {/* <Loader isLoading={isLoading} /> */}
    </View>
  );
}

export default EditProduct;

import * as React from 'react';
import {useTheme} from '@react-navigation/native';
// import {useTranslation} from 'react-i18next';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
// import Header from 'src/components/Header';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
} from '@components';
// import InputImage from 'src/containers/InputImage';
// import InputRichText from 'src/containers/InputRichText';
// import IconRadio from 'src/containers/IconRadio';
// import {AuthContext} from 'src/utils/auth-context';
// import services from 'src/services/index';
// import {showMessage} from 'src/utils/message';
// import FilterCategories from './product/FilterCategories';
import filter from 'lodash/filter';
import styles from './styles';
import {TextComponent} from '@components';

function AddWholeSale(props) {
  const {colors} = useTheme();
  //   const {t} = useTranslation();
  //   const {userToken} = React.useContext(AuthContext);
  let batsirai = [];
  const {navigation, route} = props;
  const product = route?.params?.data ?? null;
  const typeForm = product ? 'edit' : 'add';

  const dataForm = {
    name: product?.name ?? '',
    regular_price: product?.regular_price ?? '',
    sale_price: product?.sale_price ?? '',
    description: product?.description ?? '',
    sku: product?.sku ?? '',
    stock_quantity: product?.stock_quantity
      ? product.stock_quantity.toString()
      : '0',
    manage_stock: product?.manage_stock ?? false,
    catalog_visibility: product?.catalog_visibility ?? 'visible',
    categories: product?.categories ?? [],
    type: 'simple',
  };
  const [data, setData] = React.useState(dataForm);
  const [visitModal, setVisitModal] = React.useState(false);
  const [image, setImage] = React.useState(product?.images?.[0]?.src ?? '');
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const listVisibility = [
    {
      value: 'visible',
      name: 'product:text_shop_search',
    },
    {
      value: 'catalog',
      name: 'product:text_shop_only',
    },
    {
      value: 'search',
      name: 'product:text_search_only',
    },
    {
      value: 'hidden',
      name: 'product:text_hidden',
    },
  ];
  //   React.useEffect(() => {
  //     const fetchCategories = async () => {
  //       try {
  //         const dataCategories = await services.getCategories();
  //         setCategories(dataCategories);
  //       } catch (e) {
  //         setLoading(false);
  //       }
  //     };
  //     fetchCategories();
  //   }, []);
  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const setModalVisible = (value) => {
    setVisitModal(value);
  };

  const saveProduct = () => {
    setLoading(true);
    if (product) {
      //   handleUpdate();
    } else {
      //   handleCreate();
    }
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
  const deleteCate = (category) => {
    Alert.alert(
      'Delelte categories',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            updateData(
              'categories',
              filter(data.categories, (s) => s.id !== category.id),
            ),
        },
      ],
      {cancelable: false},
    );
  };
  const batsy = (e, index, name) => {
    data.categories[index].prize = e;
    // if (
    //   batsirai.find((val) => {
    //     return val.index === index;
    //   })
    // ) {
    //   batsirai[index].value = e;
    // } else {
    //   batsirai.push({value: e, index, name});
    // }
    // console.log(batsirai);
    console.log('ghghghghghghghghg', data.categories);
  };

  return (
    <View style={styles.container}>
      {/* <Header
        leftComponent={
          <Icon
            name="arrow-left"
            onPress={() => navigation.goBack()}
            isRotateRTL
          />
        }
        centerComponent={
          <Text h4 medium>
            {typeForm === 'edit'
              ? product?.name
              : t('product:text_add_product')}
          </Text>
        }
      /> */}
      <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.viewInput}>
              <Input
                label={'Shop Name'}
                value={data?.name}
                isRequired
                onChangeText={(value) => updateData('name', value)}
              />
              <Input
                label={'Tel: '}
                value={data?.name}
                isRequired
                onChangeText={(value) => updateData('name', value)}
              />
              <Input
                label={'Cell:'}
                value={data?.name}
                isRequired
                onChangeText={(value) => updateData('name', value)}
              />
              <Input
                label={'Fax:'}
                value={data?.name}
                onChangeText={(value) => updateData('name', value)}
              />
              <Input
                label={'Email'}
                value={data?.name}
                isRequired
                onChangeText={(value) => updateData('name', value)}
              />
              {/* <View style={styles.rowInput}>
                <View style={styles.colInput}>
                  <Input
                    label={'inputs:text_regular'}
                    value={data?.regular_price}
                    keyboardType="numeric"
                    onChangeText={(value) => updateData('regular_price', value)}
                  />
                </View>
                <View style={styles.colInput}>
                  <Input
                    label={'inputs:text_sale'}
                    value={data?.sale_price}
                    keyboardType="numeric"
                    onChangeText={(value) => updateData('sale_price', value)}
                  />
                </View>
              </View>
              <View style={styles.rowInput}>
                <View style={styles.colInput}>
                  <Input
                    label={'inputs:text_sku'}
                    value={data?.sku}
                    onChangeText={(value) => updateData('sku', value)}
                  />
                </View>
                <View style={styles.colInput}>
                  {data?.manage_stock === true ? (
                    <Input
                      label={'inputs:text_quantity'}
                      value={data?.stock_quantity}
                      keyboardType="numeric"
                      onChangeText={(value) =>
                        updateData('stock_quantity', value)
                      }
                    />
                  ) : null}
                </View>
              </View>
             
              */}

              <View style={styles.viewManager}>
                {/* <Text secondary>{'product:text_manager_stock'}</Text> */}
                <Switch
                  value={data?.manage_stock}
                  onValueChange={(value) => updateData('manage_stock', value)}
                />
              </View>
              {/* <InputRichText
                label={t('inputs:text_description')}
                value={data?.description}
                onChangeText={(value) => updateData('description', value)}
              /> */}
              {/* <InputImage
                label={'inputs:text_image'}
                value={image}
                onChangeImage={(value) => setImage(value)}
              /> */}
              <TextComponent
                style={[styles.textCatalog, {color: colors.primary}]}>
                {'Select products Sold by Company'}
              </TextComponent>
              <View
                style={[
                  {backgroundColor: colors.secondaryCard},
                  styles.viewSelectCate,
                ]}>
                {data.categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      {backgroundColor: colors.background},
                      styles.btnSelectCate,
                    ]}
                    onPress={() => deleteCate(category)}>
                    <Text key={category.id}>{category.name}</Text>
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
                  title="Select Products"
                  size="small"
                  secondary
                  buttonStyle={[styles.SaveButton, {alignItems: 'center'}]}
                  containerStyle={styles.containerButton}
                  onPress={() => setModalVisible(true)}
                />
              </View>

              {data.categories.map((category, index) => (
                <View key={index} style={styles.rowInput}>
                  <View style={styles.colInput}>
                    <View
                      style={{
                        alignItems: 'center',
                        backgroundColor: colors.secondaryCard,
                        height: 41,
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 5,
                        borderRadius: 10,
                      }}>
                      <TextComponent style={{color: colors.primary}}>
                        {category.name}
                      </TextComponent>
                    </View>
                    {/* <SaveButton
                      title={category.name}
                      size="small"
                      secondary
                      buttonStyle={[
                        styles.SaveButton,
                        {alignItems: 'center', color: 'red'},
                      ]}
                      containerStyle={styles.containerButton}
                    /> */}
                  </View>
                  <View style={styles.colInput}>
                    <Input
                      label={'Prize'}
                      keyboardType="numeric"
                      onChangeText={(e) => batsy(e, index, category.name)}
                    />
                  </View>
                </View>
              ))}

              {/* <Text h4 medium style={styles.textCatalog}>
                {'product:text_catalog_visibility'}
              </Text>
              <View
                style={[
                  styles.viewListRadio,
                  {borderColor: colors.secondaryCard},
                ]}>
                {listVisibility.map((visibility) => {
                  const selected =
                    visibility.value === data?.catalog_visibility;
                  return (
                    <TouchableOpacity
                      key={visibility.value}
                      style={styles.touchVisibility}
                      onPress={
                        () => {}
                        updateData('catalog_visibility', visibility.value)
                      }>
                      <IconRadio isSelected={selected} />
                      <Text
                        secondary={!selected}
                        style={[
                          styles.textVisibility,
                          selected && {color: colors.primary},
                        ]}>
                        {visibility.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text h6 third>
                {'product:text_note'}
              </Text> */}
            </View>
            <SaveButton
              title="Save"
              buttonStyle={styles.SaveButton}
              containerStyle={styles.containerButton}
              onPress={saveProduct}
              loading={loading}
            />
          </View>
        </ScrollView>
        <FilterCategories
          visitModal={visitModal}
          setModalVisible={setModalVisible}
          categories={[
            {name: 'batsirai', id: '1'},
            {name: 'Dings', id: '2'},
            {name: 'Matthew', id: '3'},
            {name: 'Omega', id: '4'},
          ]}
          selectCategory={data.categories}
          clickFilter={(value) => {
            batsirai = value;
            console.log(batsirai);
            updateData('categories', value);
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export default AddWholeSale;

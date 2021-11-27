import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Platform,
  ImageBackground,
  BackHandler,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
} from 'react-native';
import {
  Modal,
  ModalContent,
  SlideAnimation,
  ModalTitle,
  ModalFooter,
  ModalButton,
  ScaleAnimation,
} from 'react-native-modals';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
  IconRadio,
  Errors,
  CustomProgressBar,
  TextComponent,
  InputRichText,
  Select,
  InputCountry,
  InputMobile,
} from '@components';
import {Container} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation, useTheme} from '@react-navigation/native';
import {isEmpty, isFilled} from '@helpers';
import styles from './styles';
import {AdminContext} from '@context';
import startsWith from 'lodash/startsWith';
import {uploadImage} from '@services';
import {useSelector} from 'react-redux';
import {ROUTES} from '@config';
import {registrationDataFxn, shopsCategory} from '@constants';
import LinearGradient from 'react-native-linear-gradient';
import {AuthActionsCreators} from '@actions';



const CreateShop = (props) => {
  const [data, setData] = React.useState(registrationDataFxn().admin.store);
  const {colors} = useTheme();
  const user = useSelector((state) => state.auth.user);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [setLogo, setSetLogo] = React.useState(false);
  const [mobile, setMobile] = React.useState({
    value: '',
    code: '',
  });
  const [shopsCategoriesAavailable] = React.useState(
    shopsCategory().map((c) => {
      return {
        name: c,
        value: c.toLowerCase(),
      };
    }),
  );
  const {updateUserForShopCreate} = useContext(AdminContext);
  const {navigate, goBack} = useNavigation();
  const onChangeValue = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const onContinue = async () => {
    // data.ownerID = [user.uid];
    // data.creator = user.uid;

    // data.products = 0;

    if (data.storeType.name === 'type') {
      Errors({
        message: 'Choose Store Type',
        floating: true,
        position: 'center',
        description: 'You need to choose shop type for your shop ?',
      });
      return false;
    }
    const valid = isEmpty(data);
    const valid2 = isEmpty(data.address);
    if (valid || valid2) {
      Errors({
        message: 'Error fields empty',
        floating: true,
        position: 'center',
        description: 'Please make sure all the fields are not empty',
      });
      return false;
    }
    // if (setLogo) {
    //   if (data.logo === 'empty') {
    //     Errors({
    //       message: 'Error Choose Logo',
    //       floating: true,
    //       position: 'center',
    //       description:
    //         ' You selected to upload logo so please upload image of logo!',
    //     });
    //     return false;
    //   }
    // }
    setLoading(true);
    // if (data.logo !== 'empty') {
    //   await uploadImage(data.logo, 'Logos').then(async (i) => {
    //     data.logo = i;
    //     await onCreateShop(data);
    //     setLoading(false);
    //     navigate(ROUTES.ShopCreatingSuccessfull);
    //   });
    //   return false;
    // }

    const shopDataReturned = await AuthActionsCreators.onCreateShop(
      data,
      user.uid,
    );

    await updateUserForShopCreate(shopDataReturned);
    setLoading(false);
    navigate(ROUTES.ShopCreatingSuccessfull, {
      type: {...shopDataReturned, myStorename: data.name},
    });

    //   dispatch(AuthActions.onStoreRegistrationData(data));
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //     navigate(ROUTES.PolicySetup);
    //   }, 1000);
  };
  const onChangeAddress = (key, value) => {
    setData({
      ...data,
      address: {
        ...data.address,

        [key]: value,
      },
    });
  };
  const renderView = () => (
    <KeyboardAvoidingView behavior="height" style={{height: '100%'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input
            label={' Name of Store'}
            value={data.name}
            isRequired
            onChangeText={(value) => onChangeValue('name', value)}
          />

          <Input
            label={'Store Email'}
            value={data.email}
            isRequired
            onChangeText={(value) => onChangeValue('email', value)}
          />

          <Input
            label={'Store Mobile Number'}
            value={data.mobileNumber}
            isRequired
            onChangeText={(value) => onChangeValue('mobileNumber', value)}
          />
          {/* <InputMobile
            label={'inputs:text_phone_number'}
            placeholder="- - - - - - - - -"
            value={mobile.value}
            onChangePhoneNumber={(value) => {
              setMobile(value);
              const phone = startsWith(value.value, value.code)
                ? value.value
                : `${value.code}${value.value}`;
              onChangeValue('phone', phone);
              console.log(value);
            }}
          /> */}

          <Select
            type="underline"
            options={shopsCategoriesAavailable}
            valueSelect={data.storeType.value}
            createShop={true}
            onSelect={(value) => onChangeValue('storeType', value)}
            contentStyle={[
              styles.selectContent,
              {backgroundColor: colors.secondaryCard},
            ]}
            // leftComponent={
            //   <Fontisto
            //     style={{marginLeft: 10}}
            //     size={20}
            //     color={colors.primary}
            //     name="shopping-store"
            //   />
            // }
            containerStyle={styles.selectContainer}
            touchStyle={styles.touchContent}
            style={styles.selectMethod}
          />

          <Input
            label={'Store Street Address'}
            value={data.address.streetAddress}
            isRequired
            onChangeText={(value) => onChangeAddress('streetAddress', value)}
          />
          <Input
            label={'Suburb'}
            value={data.address.suburb}
            isRequired
            onChangeText={(value) => onChangeAddress('suburb', value)}
          />
          {/* <InputCountry
            label={'Country'}
            labelState={'State'}
            value={data.address.country}
            valueState={data.address.city}
            onChangeCountry={(value) => {
              const arrKey = Object.keys(value);
              for (const key of arrKey) {
                onChangeAddress(key, value[key]);
              }
            }}
          /> */}
          <Input
            label={'State /City'}
            value={data.address.city}
            isRequired
            onChangeText={(value) => onChangeAddress('city', value)}
          />
          <Input
            label={'Postal Code '}
            value={data.address.postalCode}
            isRequired
            onChangeText={(value) => onChangeAddress('postalCode', value)}
          />
          <Input
            label={'Province'}
            value={data.address.province}
            isRequired
            onChangeText={(value) => onChangeAddress('province', value)}
          />
          <Input
            label={'Country'}
            value={data.address.country}
            isRequired
            onChangeText={(value) => onChangeAddress('country', value)}
          />
          {/* <InputRichText
            label={'Store Slogan'}
            value={data.slogan}
            onChangeText={(value) => onChangeValue('slogan', value)}
          /> */}

          {/* <View style={styles.viewManager}>
            <TextComponent>{'Do you want to upload a Logo'}</TextComponent>
            <Switch
              value={setLogo}
              onValueChange={
                (value) => {
                  setSetLogo(value);
                }
                // updateData('manage_stock', value)
              }
            />
          </View>

          {setLogo ? (
            <InputImage
              label={'Store Logo'}
              // typeGet="object"
              value={data.logo}
              onChangeImage={(value) => {
                onChangeValue('logo', value);
              }}
            />
          ) : null} */}

          <View style={{height: 50}} />
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
              title={'Continue'}
              size="small"
              buttonStyle={styles.button}
              loading={loading}
              onPress={() => {
                // console.log(data);
                onContinue();
              }}
            />
          </LinearGradient>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
  React.useEffect(() => {
    setData({
      ...data,
      storeType: {
        value: 'type',
        name: 'Select Store Category',
        ignore: true,
      },
    });
    shopsCategoriesAavailable.unshift({
      value: 'type',
      name: 'Select Store Category',
      ignore: true,
    });
  }, []);

  return (
    <Container style={styles.container}>
      <CustomProgressBar
        loaderText="Please wait..."
        loader={3}
        visible={loading}
      />
      <View style={styles.listViewBg}>
        <TouchableOpacity style={styles.upperRowMain} onPress={() => {}}>
          <View style={styles.upperRowMain}>
            <Text style={styles.upperListTitle}>Create Shop</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 50}}>{renderView()}</View>
    </Container>
  );
};
export default CreateShop;

import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Switch,
} from 'react-native';
import {
  SaveButton,
  Errors,
  CustomProgressBar,
  TextComponent as Text,
  Select,
  Input,
  InputImage,
  InputRichText,
} from '@components';
import styles from './styles';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {AuthContext} from '@context';
import {registrationDataFxn, shopsCategory} from '@constants';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {isAdmin, ROUTES} from '@config';
import {isEmpty} from '@helpers';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';

const StoreSetup = () => {
  const dispatch = useDispatch();

  const registrationData = useSelector((state) => state.auth.registration);
  const [modal, setModal] = React.useState(false);
  const [setLogo, setSetLogo] = React.useState(false);
  const {
    getAdminDetails,
    userType,
    completeRegistration,
    adminLink,
  } = React.useContext(AuthContext);
  const [selected, setSelected] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [fetching, setfetching] = React.useState(false);

  const [adminData, setAdminData] = React.useState('');
  const [adminShops, setShopsData] = React.useState([]);
  const [
    shopsCategoriesAavailable,
    setShopsCategoriesAavailable,
  ] = React.useState(
    shopsCategory().map((c) => {
      return {
        name: c,
        value: c.toLowerCase(),
      };
    }),
  );

  const [data, setData] = React.useState(
    isAdmin(userType.type)
      ? registrationDataFxn().admin.store
      : registrationDataFxn().user.store,
  );
  const {navigate, goBack} = useNavigation();
  const {colors} = useTheme();

  React.useEffect(() => {
    setfetching(true);
    // data.storeType = {
    //   value: 'type',
    //   name: 'Select Store Category',
    //   ignore: true,
    // };
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

    isAdmin(userType.type)
      ? setfetching(false)
      : userType.subType === 'Worker'
      ? getAdminDetails().then((x) => {
          setAdminData(x.data());
          const arrayData = x.data().myShops.map((x) => x);
          arrayData.unshift({name: 'Select Shop', id: 0, ignore: true});
          setShopsData(arrayData);
          setSelected(arrayData[0].id);
          setfetching(false);
        })
      : setfetching(false);
  }, []);

  const onContinue = async (type) => {
    if (isAdmin(userType.type)) {
      const valid = isEmpty(data);
      if (data.storeType.value === 'type') {
        Errors({
          message: 'Select Category ',
          autoHide: true,
          description: 'Please pick shop category from shop lists',
        });
        return false;
      }
      if (valid) {
        Errors({
          message: 'Error fields empty',
          autoHide: true,
          description:
            'Complete the form to continue, make sure all fields are not empty',
        });
        return false;
      }
      // data.storeType = data.storeType.name;
      // dispatch(AuthActions.onStoreRegistrationData(data));
      setModal(true);

      delete registrationData.start;
      delete registrationData.success;
      delete registrationData.error;

      const userDataInfo = {
        ...registrationData,
        store: data,
      };
      try {
        await completeRegistration(userDataInfo, navigate, setModal);
      } catch (error) {
        alert(error);
      }
    } else {
      if (data.myShops.length === 0) {
        Errors({
          message: 'Pick a store',
          autoHide: true,
          description:
            'You need to choose shop from selector list below to continue ?',
        });
        return false;
      }
      if (data.myShops.length > 1) {
        Errors({
          message: '2 Shops detected ',
          autoHide: true,
          description: 'more than one Shop detected you cant continue ',
        });
        return false;
      }
      // data.storeType = data.storeType.name;

      data.adminLink = [adminLink];
      setModal(true);
      delete registrationData.start;
      delete registrationData.success;
      delete registrationData.error;

      // delete data.myShops[0].type;

      const userDataInfo = {
        ...registrationData,
        ...data,
      };

      try {
        await completeRegistration(userDataInfo, navigate, setModal);
      } catch (error) {
        alert(error);
      }
    }
  };

  const renderClient = () => (
    <KeyboardAvoidingView
      behavior="padding"
      style={{height: '100%', marginTop: 20}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {adminData ? (
            <Text style={{textAlign: 'center', marginBottom: 100}}>
              You have used {adminData.fullName} Link to join his stores, so
              please pick atleast one of his Shops from selector to connect your
              account with one of the Active stores.
            </Text>
          ) : null}

          {adminShops.length > 0 ? (
            <Select
              type="underline"
              options={adminShops}
              valueSelect={selected}
              onSelect={(value) => {
                const index = adminShops.map((x) => x.id).indexOf(value.id);
                setSelected(adminShops[index].id);
                if (data.myShops.map((x) => x.id).includes(value.id)) {
                } else {
                  data.myShops.push(value);
                }
              }}
              contentStyle={[
                styles.selectContent,
                {backgroundColor: colors.secondaryCard},
              ]}
              containerStyle={styles.selectContainer}
              touchStyle={styles.touchContent}
              style={styles.selectMethod}
            />
          ) : null}

          <View
            style={{
              alignItems: 'center',
              marginTop: 100,
              marginHorizontal: 10,
              marginBottom: 50,
              width: '100%',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text caption2 light style={{textAlign: 'center', fontSize: 11}}>
                By continuing, you agree to{'  '}
              </Text>
              <TouchableOpacity
              // onPress={() =>
              //   Linking.openURL(
              //     'https://betterdayzstudio.com/admin/atraders_terms_and_conditions.html',
              //   )
              // }
              >
                <Text semibold style={{color: colors.primary, top: -3}}>
                  {/* {adminData.fullName} */}
                  {adminData.fullName}
                </Text>
              </TouchableOpacity>
            </View>
            <Text caption2 light style={{textAlign: 'center', fontSize: 11}}>
              Policies and that you have read the Policies . The Privacy Notice
              describes how you handled your with your Admin.
            </Text>
            <TouchableOpacity>
              <Text semibold style={{color: colors.primary}}>
                Refund Policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() =>
            //   Linking.openURL(
            //     'https://betterdayzstudio.com/admin/atraders_privacy.html',
            //   )
            // }
            >
              <Text semibold style={{color: colors.primary}}>
                Cancellation /Return Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const onChangeValue = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
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

  const renderAdmin = () => (
    <KeyboardAvoidingView
      behavior="height"
      style={{height: '100%', marginTop: 20}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={{marginVertical: 30}}>
            <Text>Setup your store by Completing the form below</Text>
          </View>
          <Input
            label={' Name of Store'}
            value={data?.name}
            isRequired
            onChangeText={(value) => onChangeValue('name', value)}
          />

          <Input
            label={'Store Email'}
            value={data?.email}
            isRequired
            onChangeText={(value) => onChangeValue('email', value)}
          />

          <Input
            label={'Store Mobile Number'}
            value={data?.mobileNumber}
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
            valueSelect={data?.storeType.value}
            createShop={true}
            onSelect={(value) => {
              onChangeValue('storeType', value);
            }}
            contentStyle={[
              styles.selectContent,
              {backgroundColor: colors.secondaryCard},
            ]}
            leftComponent={
              <Fontisto
                style={{marginLeft: 10}}
                size={20}
                color={'#ccc'}
                name="shopping-store"
              />
            }
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
            <Text>{'Do you want to upload a Logo'}</Text>
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
              value={data?.logo}
              onChangeImage={(value) => {
                onChangeValue('logo', value);
              }}
            />
          ) : null} */}

          <View style={{height: 50}} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.flex}>
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        visible={modal}
      />
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        width={150}
        height={110}
        visible={fetching}
      />
      {isAdmin(userType.type) ? renderAdmin() : renderClient()}

      <View style={styles.viewFoot}>
        <View style={styles.footButton}>
          <SaveButton
            title={'Back'}
            size="small"
            secondary={true}
            onPress={() => {
              goBack();
            }}
          />
        </View>
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
                onContinue(userType.type);
              }}
            />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default StoreSetup;

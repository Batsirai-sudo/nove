import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
  IconRadio,
  Errors,
  Loader,
  CustomProgressBar,
  TextComponent,
  InputRichText,
  InputCountry,
} from '@components';
import {Images} from '@config';
import styles from './styles';
import {Card} from 'react-native-shadow-cards';
import {useSelector} from 'react-redux';
import {FONTS} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {CommonContext} from '@context';
import LinearGradient from 'react-native-linear-gradient';

function EditSettings(props) {
  const {updateSettings} = useContext(CommonContext);
  const {goBack} = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const {
    mobileNumber,
    streetAddress,
    city,
    country,
    familyName,
    fullName,
    givenName,
    uid,
    storeDetails,
    province,
    postalCode,
    streetAddress2,
    emergencyNumber,
    tel,
  } = user;
  const {route} = props;
  //   const {userToken, user} = React.useContext(AuthContext);
  const [data, setData] = useState({
    mobileNumber,
    streetAddress,
    city,
    country,
    familyName,
    fullName,
    givenName,
    uid,
    province,
    storeDetails,
    postalCode,
    streetAddress2,
    emergencyNumber,
    tel,
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [linkGravatar, setLinkGravatar] = React.useState('');
  const [linkMobileBanner, setLinkMobileBanner] = React.useState('');
  const [linkBanner, setLinkBanner] = React.useState('');
  const [loadingSave, setLoadingSave] = React.useState(false);
  const [modal, setModal] = useState(false);

  const selectImage = (key, dataImage) => {
    setData({
      ...data,
      [key]: dataImage.id,
    });
    const funcImage =
      key === 'mobile_banner'
        ? setLinkMobileBanner
        : key === 'banner'
        ? setLinkBanner
        : setLinkGravatar;
    funcImage(dataImage.source_url);
  };
  const initBilling = {
    address_1: '',
    address_2: '',
    city: '',
    company: '',
    country: 'INITIAL_COUNTRY_ADDRESS',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    postcode: '',
    state: 'INITIAL_STATE_ADDRESS',
  };

  const initShipping = {
    address_1: '',
    address_2: '',
    city: '',
    company: '',
    country: 'INITIAL_COUNTRY_ADDRESS',
    first_name: '',
    last_name: '',
    postcode: '',
    state: 'INITIAL_STATE_ADDRESS',
  };
  const [billing, setBilling] = React.useState(initBilling);
  const [shipping, setShipping] = React.useState(initShipping);
  const [typeBilling, setTypeBilling] = React.useState(true);
  const [typeShipping, setTypeShipping] = React.useState(true);
  const mobile = ['emergencyNumber', 'tel', 'mobileNumber'];

  const profileArray = [
    'familyName',
    'givenName',
    'fullName',
    'streetAddress',
    'streetAddress2',
    'country',
    'state',
    'province',
    'postalCode',
    'uid',
  ];

  const saveData = async (dataValue) => {
    setModal(true);
    let updatedtype = {};
    switch (dataValue) {
      case 'mobile':
        Object.keys(data).reduce((object, key) => {
          if (!mobile.includes(key)) {
            delete data[key];
          }
        }, {});
        updatedtype = {
          title: 'Mobile Number updated',
          activity:
            'Your mobile number has been successfull updated. If you did not make these changes or believe unauthorized access your account contact admin.',
        };

        break;
      case 'profile':
        data.fullName = `${data.givenName} ${data.familyName}`;
        Object.keys(data).reduce((object, key) => {
          if (!profileArray.includes(key)) {
            delete data[key];
          }
        }, {});
        updatedtype = {
          title: 'Profile updated',
          activity:
            'Your profile information has been successfull updated. If you did not make these changes or believe unauthorized access your account contact admin.',
        };

        break;
    }

    try {
      data.uid = uid;
      // console.log(data);
      const activity = {
        activity: updatedtype.activity,
        date: new Date(),
        title: updatedtype.title,
        type: 'Settings',
      };
      const result = await updateSettings(data, activity);
      setModal(false);
      Errors({
        message: 'Changes Successfull',
        description: ` Your ${dataValue.toUpperCase()} details were successfull updated`,
        autoHide: true,
        type: 'success',
        // floating: true,
        position: 'bottom',
      });

      setTimeout(() => {
        goBack();
      }, 2000);
    } catch (error) {
      Errors({
        message: 'Changes Successfull',
        description: error.message,
        autoHide: true,
        position: 'center',
      });
    }
  };

  //   const saveData = async () => {
  //     try {
  //       setLoadingSave(true);
  //       const dataUser = {
  //         key: 'wcfmmp_profile_settings',
  //         data: data,
  //       };
  //       const dataStoreName = {
  //         key: 'store_name',
  //         data: data.store_name,
  //       };
  //       const dataWcfmName = {
  //         key: 'wcfmmp_store_name',
  //         data: data.store_name,
  //       };
  //       const dataSave = await services.updateStore(dataUser, userToken);
  //       const dataSaveName = await services.updateStore(dataStoreName, userToken);
  //       const dataSaveWcfmName = await services.updateStore(
  //         dataWcfmName,
  //         userToken,
  //       );
  //       if (dataSave && dataSaveName && dataSaveWcfmName) {
  //         showMessage({
  //           message: 'Update store',
  //           description: 'Update store success',
  //           type: 'success',
  //         });
  //       } else {
  //         showMessage({
  //           message: 'Update store',
  //           description: 'Update store fail',
  //           type: 'danger',
  //         });
  //       }
  //       setLoadingSave(false);
  //     } catch (e) {
  //       showMessage({
  //         message: 'Update store',
  //         description: e.message,
  //         type: 'danger',
  //       });
  //       setLoadingSave(false);
  //     }
  //   };

  const mainRender = () => {
    return route.params.type === 'email'
      ? renderEmail()
      : route.params.type === 'profile'
      ? renderProfile()
      : route.params.type === 'mobile'
      ? renderMobile()
      : null;
  };

  useEffect(() => {}, []);

  const renderProfile = () => (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.viewTitle}
            onPress={() => setTypeBilling(!typeBilling)}>
            <TextComponent style={{fontWeight: '300'}}>
              Personal Information{' '}
            </TextComponent>
            <Icon
              name={typeBilling ? 'chevron-down' : 'chevron-right'}
              size={22}
              isRotateRTL={!typeBilling}
            />
          </TouchableOpacity>
          <View style={styles.form}>
            <View style={styles.rowInput}>
              <View style={styles.colInput}>
                <Input
                  label={'First Name'}
                  value={data.givenName}
                  onChangeText={
                    (value) => {
                      updateData('givenName', value);
                    }
                    // changeBilling({first_name: value})
                  }
                />
              </View>
              <View style={styles.colInput}>
                <Input
                  label={'Last Name'}
                  value={data.familyName}
                  onChangeText={
                    (value) => {
                      updateData('familyName', value);
                    }
                    // changeBilling({last_name: value})
                  }
                />
              </View>
            </View>
            <Input
              label={'Address 1'}
              value={data.streetAddress}
              onChangeText={
                (value) => {
                  updateData('streetAddress', value);
                }
                // changeBilling({address_1: value})
              }
            />
            <Input
              label={'Address 2'}
              value={data.streetAddress2}
              onChangeText={
                (value) => {
                  updateData('streetAddress2', value);
                }
                // changeBilling({address_2: value})
              }
            />
            <InputCountry
              value={data.country}
              valueState={data.city}
              label={'Country'}
              labelState={'State'}
              onChangeCountry={(value) => {
                // console.log(value);
                updateData('state', value);
              }}
            />
            <Input
              label={'Province'}
              value={data.province}
              onChangeText={(value) => {
                updateData('province', value);
              }}
            />
            <Input
              label={'Postal Code'}
              value={data.postalCode}
              onChangeText={(value) => {
                updateData('postalCode', value);
              }}
            />
          </View>
          <View style={styles.viewManagerStore}></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderEmail = () => (
    <View style={styles.email}>
      {user.providerId === 'google.com' ? (
        <>
          <Image source={Images.googleText} style={styles.googlelogo} />
          <TextComponent semibold style={styles.topText}>
            Account Linked with Google
          </TextComponent>
          <TextComponent semibold style={styles.topText}>
            Services
          </TextComponent>
          <TextComponent
            style={{
              marginHorizontal: 40,
              textAlign: 'center',
              fontSize: 11,
              marginVertical: 20,
            }}>
            You register with google account so this account is unique
            identification of your Store Management Account, you cannot change
            it.
          </TextComponent>

          <Card cornerRadius={10} elevation={5} style={styles.card}>
            <TextComponent style={{fontWeight: '600'}}>
              {user.email}
            </TextComponent>
          </Card>
        </>
      ) : user.providerId === 'facebook.com' ? (
        <>
          <Image source={Images.facebookText} style={styles.facebooklogo} />
          <TextComponent bold style={styles.topText}>
            Account Linked with Facebook
          </TextComponent>
          <TextComponent bold style={styles.topText}>
            Services
          </TextComponent>
          <TextComponent
            style={{
              marginHorizontal: 40,
              textAlign: 'center',
              fontSize: 11,
              marginVertical: 20,
            }}>
            You register with facebook account so this account is unique
            identification of your Store Management Account, you cannot change
            it.
          </TextComponent>

          <Card cornerRadius={10} elevation={5} style={styles.card}>
            <TextComponent style={{fontWeight: '600'}}>
              {user.email}
            </TextComponent>
          </Card>
        </>
      ) : (
        <>
          {/* <Image source={Images.facebookText} style={styles.facebooklogo} /> */}
          <TextComponent bold style={styles.topText}>
            Email & Password
          </TextComponent>
          <TextComponent bold style={styles.topText}>
            Account Registered
          </TextComponent>
          <TextComponent bold style={styles.topText}>
            Not Linked to any Social Services
          </TextComponent>
          <TextComponent
            style={{
              marginHorizontal: 40,
              textAlign: 'center',
              fontSize: 11,
              marginVertical: 20,
            }}>
            You register with email & password credentials so this account is
            unique identification of your instore Account, you cannot change it.
          </TextComponent>

          <Card cornerRadius={10} elevation={10} style={styles.card}>
            <TextComponent style={{fontWeight: '600'}}>
              {user.email}
            </TextComponent>
          </Card>
        </>
      )}
    </View>
  );
  const renderMobile = () => (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <TextComponent style={styles.mobileText}>
            Update your contact details
          </TextComponent>
          <Input
            label={'Mobile Number'}
            isRequired
            labelStyle={{fontWeight: '300', fontSize: 12}}
            value={data?.mobileNumber}
            onChangeText={(value) => {
              updateData('mobileNumber', value);
            }}
          />
          <Input
            label={'Emergency Mobile Number'}
            isRequired
            labelStyle={{fontWeight: '300', fontSize: 12}}
            value={data?.emergencyNumber}
            onChangeText={(value) => {
              updateData('emergencyNumber', value);
            }}
          />
          <Input
            label={'Tel'}
            isRequired
            labelStyle={{fontWeight: '300', fontSize: 12}}
            value={data?.tel}
            onChangeText={(value) => {
              updateData('tel', value);
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const updateStoreData = (key, value) => {
    const addressKeys = [
      'storeAddress',
      'storeCity',
      'storeCountry',
      'storePostalCode',
    ];

    const valid = addressKeys.includes(key);
    valid
      ? setData({
          ...data,
          storeDetails: {
            ...data.storeDetails,
            address: {
              ...data.storeDetails.address,
              [key]: value,
            },
          },
        })
      : setData({
          ...data,
          storeDetails: {
            ...data.storeDetails,
            [key]: value,
          },
        });
  };

  return (
    <View style={styles.container}>
      <CustomProgressBar
        category={2}
        loaderText="Updating..."
        loader={7}
        visible={modal}
      />
      {mainRender()}
      {route.params.type === 'email' ? null : (
        <View
          style={{
            paddingHorizontal: 25,
            width: '100%',
            bottom: 5,
            position: 'absolute',
          }}>
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
              title={'Update'}
              size="small"
              buttonStyle={styles.button}
              titleStyle={{fontFamily: FONTS.Regular}}
              onPress={() => {
                saveData(route.params.type);
              }}
              loading={loadingSave}
            />
          </LinearGradient>
        </View>
      )}
    </View>
  );
}

export default EditSettings;

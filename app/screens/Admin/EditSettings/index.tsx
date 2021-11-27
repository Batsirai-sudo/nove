import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
  Switch,
} from 'react-native';
import {
  SaveButton,
  Icon,
  Input,
  Errors,
  CustomProgressBar,
  TextComponent,
  InputRichText,
  InputCountry,
  InputImage,
} from '@components';
import {Images} from '@config';
import styles from './styles';
import {Card} from 'react-native-shadow-cards';
import {useSelector} from 'react-redux';
import {FONTS} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {AdminContext} from '@context';
import {object} from 'prop-types';

function EditSettings(props) {
  const {updateSettings, currentShopEdit, updateShops} = useContext(
    AdminContext,
  );
  const {goBack} = useNavigation();

  const user = useSelector((state) => state.auth.user);
  const {
    mobileNumber,
    province,
    postalCode,
    streetAddress,
    city,
    country,
    familyName,
    fullName,
    givenName,
    uid,
  } = user;
  const {route} = props;

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
  const [shipping, setShipping] = React.useState(initShipping);
  const [typeBilling, setTypeBilling] = React.useState(true);
  const [typeShipping, setTypeShipping] = React.useState(true);
  const [setLogo, setSetLogo] = React.useState(false);
  const profile = {
    mobileNumber,
    streetAddress,
    city,
    country,
    familyName,
    fullName,
    givenName,
    uid,
    province,
    postalCode,
  };
  const [data, setData] = React.useState(
    route.params.type === 'shop' ? currentShopEdit : profile,
  );

  const shopArray = [
    'shopName',
    'shopEmail',
    'shopMobileNumber',
    'shopDescription',
    'uid',
  ];
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
    data.uid = uid;

    switch (dataValue) {
      case 'shop':
        updatedtype = {
          title: 'Store Information updated',
          activity:
            'Your store information has been successfull updated. If you did not make these changes or believe unauthorized access your account contact admin.',
        };
        // return Object.keys(data).reduce(async (object, key) => {
        // if (!shopArray.includes(key)) {
        // console.log(data);
        // delete data[key];

        try {
          const activity = {
            activity: updatedtype.activity,
            date: new Date(),
            title: updatedtype.title,
            type: 'Settings',
          };
          await updateShops(data, activity);
          setModal(false);
          Errors({
            message: 'Changes Successfull',
            description: ` Your ${dataValue.toUpperCase()} details were successfull updated`,
            autoHide: true,
            type: 'success',
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
        return false;
        break;
      case 'mobile number':
        Object.keys(data).reduce((object, key) => {
          if (key !== 'mobileNumber') {
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
      // console.log(data);
      const activity = {
        activity: updatedtype.activity,
        date: new Date(),
        title: updatedtype.title,
        type: 'Settings',
      };

      await updateSettings(data, activity);
      setModal(false);
      Errors({
        message: 'Changes Successfull',
        description: ` Your ${dataValue.toUpperCase()} details were successfull updated`,
        autoHide: true,
        type: 'success',
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
  const mainRender = () => {
    return route.params.type === 'email'
      ? renderEmail()
      : route.params.type === 'shop'
      ? renderShop()
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
            <Text>Personal Information </Text>
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
      <View
        style={{
          paddingHorizontal: 25,
          width: '100%',
          bottom: 0,
          position: 'absolute',
        }}>
        <SaveButton
          title={'Update'}
          titleStyle={{fontFamily: FONTS.Regular}}
          size="small"
          onPress={() => {
            saveData('profile');
          }}
          loading={loadingSave}
        />
      </View>
    </KeyboardAvoidingView>
  );

  const onChangeAddress = (key, value) => {
    setData({
      ...data,
      address: {
        ...data.address,
        [key]: value,
      },
    });
  };

  const renderShop = () => (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <TextComponent style={{textAlign: 'center', marginBottom: 20}}>
            {currentShopEdit.name}
          </TextComponent>
          <Input
            label={' Name of Store'}
            isRequired
            value={data.name}
            onChangeText={(value) => {
              updateData('name', value);
            }}
          />
          <Input
            label={'Store Email'}
            keyboardType="email-address"
            isRequired
            value={data.email}
            onChangeText={(value) => updateData('email', value)}
          />
          <Input
            label={'Store Mobile Number'}
            keyboardType="phone-pad"
            value={data.mobileNumber}
            isRequired
            onChangeText={(value) => updateData('mobileNumber', value)}
          />
          <Input
            label={'Store Street Address'}
            value={data.address.streetAddress}
            isRequired
            onChangeText={(value) => onChangeAddress('streetAddress', value)}
          />
          <Input
            label={'State /City'}
            value={data.address.city}
            isRequired
            onChangeText={(value) => onChangeAddress('city', value)}
          />

          <Input
            label={'Country'}
            value={data.address.country}
            isRequired
            onChangeText={(value) => onChangeAddress('country', value)}
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
          <InputRichText
            label={'Store Slogan'}
            value={data.slogan}
            onChangeText={(value) => updateData('slogan', value)}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <TextComponent>{'Do you want to upload a Logo'}</TextComponent>
            <Switch
              value={setLogo}
              onValueChange={(value) => {
                setSetLogo(value);
              }}
            />
          </View>
          {setLogo ? (
            <InputImage
              label={'Store Logo'}
              value={data.logo}
              onChangeImage={(value) => {
                updateData('logo', value);
              }}
            />
          ) : null}
        </View>
        <View style={{height: 200}} />
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 25,
          width: '100%',
          bottom: 0,
          position: 'absolute',
        }}>
        <SaveButton
          title={'Update'}
          titleStyle={{fontFamily: FONTS.Regular}}
          size="small"
          onPress={() => {
            saveData('shop');
          }}
          loading={loadingSave}
        />
      </View>
    </KeyboardAvoidingView>
  );
  const renderEmail = () => (
    <View style={styles.email}>
      {user.providerId === 'google.com' ? (
        <>
          <Image source={Images.googleText} style={styles.googlelogo} />
          <TextComponent bold style={styles.topText}>
            Account Linked with Google
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
      ) : (
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
      )}
    </View>
  );
  const renderMobile = () => (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <TextComponent style={styles.mobileText}>
            Enter mobile number below
          </TextComponent>
          <Input
            label={'Mobile Number'}
            isRequired
            value={data?.mobileNumber}
            onChangeText={(value) => {
              updateData('mobileNumber', value);
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 25,
          width: '100%',
          marginBottom: 55,
        }}>
        <SaveButton
          title={'Update'}
          titleStyle={{fontFamily: FONTS.Regular}}
          onPress={() => {
            saveData('mobile number');
          }}
          loading={loadingSave}
        />
      </View>
    </KeyboardAvoidingView>
  );

  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  return (
    <View style={styles.container}>
      <CustomProgressBar loader={17} visible={modal} />
      {mainRender()}
    </View>
  );
}

export default EditSettings;

import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
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
  Modal,
  ListItem,
  // InputCountry,
  //   InputMobile,
} from '@components';
import styles from './styles';
import {ROUTES, isAdmin} from '@config';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AuthActions, AuthActionsCreators} from '@actions';
import {isEmpty} from '@helpers';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {FONTS} from '@utils';
import {registrationDataFxn, shopsCategory} from '@constants';
import {AuthContext} from '@context';

const AdditionalInfor = () => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {userType, connectRegisterWithAdmin} = React.useContext(AuthContext);
  const [data, setData] = React.useState(
    isAdmin(userType.type)
      ? registrationDataFxn().admin.additional
      : registrationDataFxn().user.additional,
  );

  const [loading, setLoading] = React.useState(false);
  const {navigate} = useNavigation();
  const [modal, setModal] = React.useState(false);

  const [modalVisible, setModalVisible] = React.useState(false);

  const registrationData = useSelector((state) => state.auth.registration);
  const [userCategory, setUserCategory] = React.useState([
    {type: 'User', name: `Admin's Shop Member`, isSelected: false},
    {type: 'Client', name: 'Client', isSelected: false},
  ]);
  const onChangeValue = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const onContinue = async () => {
    const valid = isEmpty(data);
    if (valid) {
      Errors({
        message: 'Error fields empty',
        autoHide: true,
        description:
          'Please make sure all the fields are not empty, in General Information Tab',
      });
      return false;
    }
    setLoading(true);

    if (!registrationData.email) {
      try {
        const res = await auth().fetchSignInMethodsForEmail(
          data.email ? data.email.trim() : 'email',
        );
        if (res.length) {
          setLoading(false);

          Errors({
            message: 'Email taken',
            autoHide: true,
            description:
              'You cant use this email its already associated with another account.',
          });
          return false;
        }
      } catch (error) {
        setLoading(false);

        Errors({
          message: 'Error occurred',
          autoHide: true,
          description: error.message,
        });
        return false;
      }

      //  if(!data.email){      data: {
      //   name: shop.name,
      //   id: shop.id,
      //   type: {name: shop.storeType.name},
      // },

      //   return false;
      // }
    }

    connectRegisterWithAdmin.status
      ? (() => {
          setModal(true);
          data.store = connectRegisterWithAdmin.data;
          console.log(data);
          console.log(connectRegisterWithAdmin);

          dispatch(
            AuthActionsCreators.onConnectingStoreRegistration(
              {...registrationData, ...data},
              navigate,
              setModal,
            ),
          );
        })()
      : (() => {
          dispatch(AuthActions.onStoreRegistrationData(data));
          setTimeout(() => {
            setLoading(false);
            navigate(ROUTES.StoreSetup);
          }, 1000);
        })();
  };

  return (
    <View style={styles.flex}>
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        visible={modal}
      />
      <KeyboardAvoidingView
        behavior="height"
        style={{height: '100%', marginTop: 20}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* <InputMobile
            //   label={'inputs:text_phone_number'}
            //   placeholder="- - - - - - - - -"
            //   value={mobile.value}
            //   onChangePhoneNumber={(value) => {
            //     setMobile(value);
            //     const phone = startsWith(value.value, value.code)
            //       ? value.value
            //       : `${value.code}${value.value}`;
            //     onChangeValue('phone', phone);
            //   }}
            /> */}
            <TextComponent style={{fontSize: 15}}>
              We just need an extra Information
            </TextComponent>
            <TextComponent style={{marginBottom: 50, fontSize: 15}}>
              to get your Account Setup!
            </TextComponent>
            {registrationData.email && !data.email ? null : (
              <Input
                label={'Email'}
                value={data.email}
                isRequired
                labelStyle={{fontWeight: '300', fontSize: 12}}
                onChangeText={(value) => onChangeValue('email', value)}
              />
            )}
            {/* {registrationData.userCategory && !data.userCategory ? null : (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Input
                  label={'Account Category'}
                  value={data?.userCategory}
                  editable={false}
                  labelStyle={{fontWeight: '300', fontSize: 12}}
                  isRequired
                />
              </TouchableOpacity>
            )} */}
            <Input
              label={'Mobile Number'}
              value={data.mobileNumber}
              isRequired
              labelStyle={{fontWeight: '300', fontSize: 12}}
              onChangeText={(value) => onChangeValue('mobileNumber', value)}
            />

            <Input
              label={'Street Address'}
              value={data.streetAddress}
              isRequired
              labelStyle={{fontWeight: '300', fontSize: 12}}
              onChangeText={(value) => onChangeValue('streetAddress', value)}
            />
            <Input
              label={'Suburb'}
              value={data.suburb}
              isRequired
              labelStyle={{fontWeight: '300', fontSize: 12}}
              onChangeText={(value) => onChangeValue('suburb', value)}
            />

            <Input
              label={'City'}
              value={data.city}
              isRequired
              labelStyle={{fontWeight: '300', fontSize: 12}}
              onChangeText={(value) => onChangeValue('city', value)}
            />

            <Input
              label={'Province'}
              value={data.province}
              isRequired
              labelStyle={{fontWeight: '300', fontSize: 12}}
              onChangeText={(value) => onChangeValue('province', value)}
            />
            <Input
              label={'Postal Code'}
              value={data.postalCode}
              isRequired
              labelStyle={{fontWeight: '300', fontSize: 12}}
              onChangeText={(value) => onChangeValue('postalCode', value)}
            />
            <Input
              label={'Country'}
              value={data.country}
              isRequired
              labelStyle={{fontWeight: '300', fontSize: 12}}
              onChangeText={(value) => onChangeValue('country', value)}
            />
            {/* <InputCountry
              label={'Country'}
              labelState={'State'}
              value={data.address.country}
              valueState={data.address.state}
              onChangeCountry={(value) => {
                const arrKey = Object.keys(value);
                for (const key of arrKey) {
                  onChangeAddress(key, value[key]);
                }
              }}
            /> */}
            <View style={{height: 200}} />
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
                loading={loading}
                buttonStyle={styles.button}
                onPress={() => {
                  onContinue();
                }}
              />
            </LinearGradient>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Modal visible={modalVisible} maxRatio={0.85}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: 25,
              marginBottom: 15,
            }}>
            {userCategory.map((x, i) => (
              <ListItem
                key={i}
                title={x.name}
                bottomDivider
                rightElement={
                  x.isSelected ? (
                    <Icon
                      name={x.isSelected ? 'check' : null}
                      size={22}
                      color={x.isSelected && colors.primary}
                      iconStyle={styles.icon}
                      activeOpacity={1}
                      underlayColor={'transparent'}
                    />
                  ) : null
                }
                titleStyle={[
                  {fontFamily: FONTS.Regular, fontSize: 12},
                  x.isSelected && {color: colors.primary},
                ]}
                onPress={() => {
                  userCategory.map((res, index) => {
                    if (userCategory[index].isSelected === true) {
                      userCategory[index].isSelected = false;
                    }
                  });
                  userCategory[i].isSelected = !userCategory[i].isSelected;
                  setUserCategory([...userCategory]);
                  onChangeValue(
                    'userCategory',
                    userCategory.filter((h) => h.isSelected)[0].type,
                  );
                  setModalVisible(false);
                }}
                type="underline"
                small
              />
            ))}
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default AdditionalInfor;

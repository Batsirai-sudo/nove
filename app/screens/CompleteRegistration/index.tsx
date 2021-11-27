import React, {memo, useContext, useState, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  StatusBar,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {dimensions} from '@utils';
// import {FloatingLabelInput} from 'react-native-floating-label-input';
import {Images} from '@config';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/Fontisto';
import {ShopList, Loader, Errors} from '@components';
import {AuthContext} from '@firestore-methodz/AuthProvider';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {ROUTES} from '@config';

const PAGES = ['Page 1', 'Page 2', 'Page 3'];

const CompleteRegistration = memo(() => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [shopOwner, setShopOwner] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopType, setShopType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.registration);
  const successRegistration = useSelector(
    (state) => state.auth.registration.success,
  );
  const errorRegistration = useSelector(
    (state) => state.auth.registration.error,
  );
  const {completeRegistration} = useContext(AuthContext);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const renderFirstPage = (data) => {
    return (
      <View key={data} style={styles.page}>
        {/* <Text>{data}</Text> */}

        <Image style={styles.profileImage} source={{uri: user.photoURL}} />
        <View style={{marginHorizontal: 20}}>
          <View style={styles.idprovider}>
            <Text>ID Provider :</Text>
            <View style={styles.row}>
              <Text style={styles.bold}>
                {user.providerId === 'google.com' ? 'Google' : 'Facebook'}
              </Text>
              <Image
                style={styles.googleFacebookLogo}
                source={
                  user.providerId === 'google.com'
                    ? Images.google
                    : Images.facebook
                }
              />
            </View>
          </View>

          <View style={styles.table}>
            <Text>Given Name :</Text>
            <View style={styles.row}>
              <Text style={styles.bold}>{user.givenName}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text>Family Name :</Text>
            <View style={styles.row}>
              <Text style={styles.bold}>{user.familyName}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text>ID :</Text>
            <View style={styles.row}>
              <Text style={styles.bold}>{user.socialProviderId}</Text>
            </View>
          </View>

          <View style={styles.table}>
            <Text>Account Registering :</Text>
            <View style={styles.row}>
              <Text style={styles.bold}>
                {user.account === 'Tarven User' ? 'User' : 'Admin'}
              </Text>
              <Icon2
                style={{marginLeft: 10}}
                size={22}
                color="blue"
                name="user"
              />
            </View>
          </View>
        </View>

        <View style={styles.privacyTermsContainer}>
          <Text style={styles.privacyFirstText}>
            By continue this registration you agree to the{' '}
          </Text>
          <View style={styles.row}>
            <Text style={styles.privacySecondText}>Terms & Conditions </Text>
            <Text style={styles.privacyFirstText}>and</Text>
            <Text style={styles.privacySecondText}> Privacy Policy </Text>
          </View>
          <Text style={styles.privacyFirstText}>of the Company</Text>
        </View>
      </View>
    );
  };

  const renderSecondPage = (data) => {
    return (
      <View key={data} style={styles.page}>
        <Text style={{textAlign: 'center', color: 'grey'}}>
          Please complete the Form Below
        </Text>
      </View>
    );
  };

  const successNavigate = useCallback(() => {
    setIsLoading(false);
    navigate(ROUTES.SuccessRegistration);
  }, []);

  const renderThirdPage = (data) => {
    return (
      <View key={data} style={styles.page}>
        <Text style={{textAlign: 'center', marginVertical: 15}}>
          Select Shop Type your are Registering Account
        </Text>

        <ShopList
          Continue={async () => {
            delete user.start;
            delete user.success;
            delete user.error;
            const data = {
              ...user,
              streetAddress,
              city,
              country,
              mobileNumber,
              shopOwner,
              shopName,
              shopType,
            };

            const isEmpty = Object.values(data).some(
              (x) => x === null || x === '',
            );
            if (isEmpty) {
              Errors({
                message: 'Error fields empty',
                floating: true,
                position: 'center',
                description:
                  'Please make sure all the fields are not empty, in General Information Tab',
              });
              return false;
            }

            setIsLoading(true);
            // dispatch(AuthActions.startRegistration());

            await completeRegistration(data);

            successRegistration ? successNavigate : null;
            errorRegistration ? setIsLoading(false) : null;
          }}
          SelectedShop={(val) => {
            setShopType(val);
          }}
        />
      </View>
    );
  };

  const renderViewPagerPage = (data: any) => {
    return (
      <View
        style={{
          height: dimensions.height_screen * 0.6,
          // backgroundColor: 'red',
        }}>
        {data === 'Page 1'
          ? renderFirstPage(data)
          : data === 'Page 2'
          ? renderSecondPage(data)
          : data === 'Page 3'
          ? renderThirdPage(data)
          : null}
      </View>
    );
  };

  const renderLabel = ({
    position,
    label,
    currentPosition,
  }: {
    position: number;
    stepStatus: string;
    label: string;
    currentPosition: number;
  }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }>
        {label}
      </Text>
    );
  };
  // const [focus, setFocus] = useState(false);

  // const onFocus = useCallback(() => {
  //   setFocus(true);
  // }, []);
  // const onBlur = useCallback(() => {
  //   setFocus(false);
  // }, []);
  const labels = ['Profile', 'General Information', 'Shop Type'];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPage}
            labels={labels}
            renderLabel={renderLabel}
            stepCount={3}
          />

          <StatusBar
            barStyle={'light-content'}
            translucent={true}
            hidden={false}
            backgroundColor={'transparent'}
          />
        </View>

        <View
          style={{
            height: dimensions.height_screen * 0.65,
            // backgroundColor: 'red',KeyboardAvoidingView
          }}>
          <Swiper
            style={{}}
            loop={false}
            index={currentPage}
            autoplay={false}
            showsButtons={false}
            showsPagination={false}
            onIndexChanged={(page) => {
              setCurrentPage(page);
            }}>
            {PAGES.map((page) => renderViewPagerPage(page))}
          </Swiper>
        </View>
        <LinearGradient
          colors={['#ED3269', '#F05F3E']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={{height: 100}}
        />
      </KeyboardAvoidingView>
      <Loader isLoading={isLoading} />
    </View>
  );
});

export default CompleteRegistration;

// <FloatingLabelInput
//         //  mask="99/99/9999" // Set mask to your input
//         //  maskType="date" // Set mask type
//         //  staticLabel // Set this to true if you want the label to be always at a set position. Commonly used with hint for displaying both label and hint for your input. For changing the position of the label with this prop as true, use the **customLabelStyles** _topFocused_ and _leftFocused_ to adjust the wanted position. Default false.
//         //  hint="" // Hint displays only when staticLabel prop is set to true. This prop is used to show a preview of the input to the user.
//         //  hintTextColor="#ccc" // Set the color to the hint
//         //  currencyDivider="," // Set currency thousands divider, default is ","
//         //  maxDecimalPlaces={2} // Set maximum decimal places, default is 2
//         //  isFocused={false} // If you override the onFocus/onBlur props, you must handle this prop
//         //  customLabelStyles={{}} // custom Style for position, size and color for label, when it's focused or blurred
//         //  customShowPasswordImage={} // pass the image source to set your custom show image
//         //  customHidePasswordImage={} // pass the image source to set your custom hide image
//         //  labelStyles={{}} // add your styles to the floating label component
//         //  showPasswordImageStyles={{}} // add your styles to the 'show password image' component
//         //  containerStyles={{}} // add your styles to container of whole component
//         //  showPasswordContainerStyles={{}} // add your styles to the 'show password container' component
//         //  inputStyles={{}} // add your styles to inner TextInput component
//         //  isPassword={false} // set this to true if value is password, default false
//         //  darkTheme={false} // color of default 'show password image', default false
//         //  multiline={false} // set this to true to enable multiline support, default false
//         //  maxLength={} // Set maximum number of characters input will accept. Value overridden by mask if present
//         //  showCountdown={false} // Set this to true to show the allowed number of characters remaining, default false
//         //  countdownLabel="" // Set the label to be shown after the allowed number of characters remaining, default is ""
//         //  onSubmit={() => this.yourFunction()} // adds callback to submit
//         //  customShowPasswordComponent={} // Set your own JSX.Element to be the show password element
//         //  customHidePasswordComponent={} // Set your own JSX.Element to be the hide password element
//         label="Placeholder" // required
//         value={value} // required
//         onChange={value => setValue(value)} // required
// //       />

// <View style={{marginHorizontal: 20}}>
// <View style={{marginVertical: 10}}>
//   {/* <FloatingLabelInput
//     label={'Street Address'}
//     value={streetAddress}
//     containerStyles={styles.textInput}
//     leftComponent={
//       <Icon2
//         style={{marginLeft: 10}}
//         size={24}
//         color="grey"
//         name="address"
//       />
//     }
//     editable={true}
//     isPassword={false}
//     onChangeText={(val) => setStreetAddress(val)}
//     style={{marginVertical: 10}}
//     // onFocus={focus}
//     // onBlur={blur}
//     // isFocused={focused}
//     // customShowPasswordComponent={<Text>Show</Text>}
//     // customHidePasswordComponent={<Text>Hide</Text>}
//   /> */}
// </View>

// <View style={{marginVertical: 10}}>
//   <FloatingLabelInput
//     label={'City'}
//     containerStyles={styles.textInput}
//     value={city}
//     leftComponent={
//       <Icon3
//         style={{marginLeft: 10}}
//         size={20}
//         color="grey"
//         name="city"
//       />
//     }
//     editable={true}
//     isPassword={false}
//     onChangeText={(val) => setCity(val)}
//     style={{marginVertical: 10}}
//     // onFocus={focus}
//     // onBlur={blur}
//     // isFocused={focused}
//     // customShowPasswordComponent={<Text>Show</Text>}
//     // customHidePasswordComponent={<Text>Hide</Text>}
//   />
// </View>

// <View style={{marginVertical: 10}}>
//   <FloatingLabelInput
//     label={'Home Country'}
//     containerStyles={styles.textInput}
//     value={country}
//     leftComponent={
//       <Icon4
//         style={{marginLeft: 10}}
//         size={22}
//         color="grey"
//         name="home-city-outline"
//       />
//     }
//     editable={true}
//     isPassword={false}
//     onChangeText={(val) => setCountry(val)}
//     style={{marginVertical: 10}}
//     // onFocus={focus}
//     // onBlur={blur}
//     // isFocused={focused}
//     // customShowPasswordComponent={<Text>Show</Text>}
//     // customHidePasswordComponent={<Text>Hide</Text>}
//   />
// </View>

// <View style={{marginVertical: 10}}>
//   <FloatingLabelInput
//     label={'Mobile Number'}
//     containerStyles={styles.textInput}
//     value={mobileNumber}
//     leftComponent={
//       <Icon3
//         style={{marginLeft: 10}}
//         size={20}
//         color="grey"
//         name="phone"
//       />
//     }
//     editable={true}
//     isPassword={false}
//     onChangeText={(val) => setMobileNumber(val)}
//     style={{marginVertical: 10}}
//     // onFocus={focus}
//     // onBlur={blur}
//     // isFocused={focused}
//     // customShowPasswordComponent={<Text>Show</Text>}
//     // customHidePasswordComponent={<Text>Hide</Text>}
//   />
// </View>
// <View style={{marginVertical: 10}}>
//   <FloatingLabelInput
//     label={'Shop Owner'}
//     containerStyles={styles.textInput}
//     value={shopOwner}
//     leftComponent={
//       <Icon2
//         style={{marginLeft: 10}}
//         size={22}
//         color="grey"
//         name="user"
//       />
//     }
//     editable={true}
//     isPassword={false}
//     onChangeText={(val) => setShopOwner(val)}
//     style={{marginVertical: 10}}
//     // onFocus={focus}
//     // onBlur={blur}
//     // isFocused={focused}
//     // customShowPasswordComponent={<Text>Show</Text>}
//     // customHidePasswordComponent={<Text>Hide</Text>}
//   />
// </View>

// <View style={{marginVertical: 10}}>
//   <FloatingLabelInput
//     label={'Shop Name'}
//     containerStyles={styles.textInput}
//     value={shopName}
//     leftComponent={
//       <Icon5
//         style={{marginLeft: 10}}
//         size={20}
//         color="grey"
//         name="shopping-store"
//       />
//     }
//     editable={true}
//     isPassword={false}
//     onChangeText={(val) => setShopName(val)}
//     style={{marginVertical: 10}}
//     // onFocus={focus}
//     // onBlur={blur}
//     // isFocused={focused}
//     // customShowPasswordComponent={<Text>Show</Text>}
//     // customHidePasswordComponent={<Text>Hide</Text>}
//   />
// </View>
// </View>

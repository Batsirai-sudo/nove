import React, {useContext} from 'react';
import {StyleSheet, Text, View, ScrollView, Switch} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Timeline from 'react-native-beautiful-timeline';
import moment from 'moment';
import {FONTS} from '@utils';
// import Header from 'src/components/Header';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
  IconRadio,
  Errors,
  InputRichText,
} from '@components';
import {Dropdown} from 'react-native-material-dropdown';

import {isEmpty} from '@helpers';
import {useNavigation} from '@react-navigation/native';
import {ROUTES, uniqueid} from '@config';
import filter from 'lodash/filter';
import styles from './styles';
import {TextComponent, CustomProgressBar} from '@components';
import {useSelector} from 'react-redux';
import {dimensions} from '@utils';
import _ from 'lodash';
import {CommonContext} from '@context';
import {uploadImage} from '@services';
import LinearGradient from 'react-native-linear-gradient';

const losses = () => {
  return {
    productName: '',
    amount: '',
    description: '',
    quantity: '',
    mass: '',
    dropDowndescription: '',
    // image: '',
  };
};
const expenses = () => {
  return {
    title: '',
    amount: '',
    description: '',
    // image: '',
  };
};

const Expenses = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const {recordExpenseLosses} = useContext(CommonContext);
  const [loading, setLoading] = React.useState(false);

  const [expensesData, setExpensesData] = React.useState(expenses());
  const [lossesData, setLossesData] = React.useState(losses());
  const [expenLoses, setExpenLoses] = React.useState({
    expenses: false,
    losses: false,
  });
  const updateData = (key, value) => {
    expenLoses.expenses
      ? setExpensesData({
          ...expensesData,
          [key]: value,
        })
      : setLossesData({
          ...lossesData,
          [key]: value,
        });
  };

  const onContinue = async () => {
    expenLoses.expenses
      ? (async () => {
          if (isNaN(expensesData?.amount))
            return Errors({
              message: 'Invalid amount',
              autoHide: true,
              // position: 'center',
              description: 'Please enter avalid number',
            });
          expensesData.createdAt = new Date();
          expensesData.userID = user.uid;
          expensesData.fullName = user.fullName;
          expensesData.invoiceNumber = uniqueid(6);
          expensesData.month = moment().format('MMMM');

          const valid = isEmpty(expensesData);
          if (valid) {
            Errors({
              message: 'Error fields empty',
              autoHide: true,
              // position: 'center',
              description: 'Please make sure all the fields are not empty',
            });
            return false;
          }
          setLoading(true);

          await recordExpenseLosses(expensesData, 'Expenses');
          setLoading(false);
          navigate(ROUTES.ExpenseLossesSuccessfullRecorded);
        })()
      : (async () => {
          lossesData.createdAt = new Date();
          lossesData.userID = user.uid;
          lossesData.fullName = user.fullName;
          lossesData.invoiceNumber = uniqueid(6);
          lossesData.month = moment().format('MMMM');

          const valid = isEmpty(lossesData);
          if (valid) {
            Errors({
              message: 'Error fields empty',
              autoHide: true,
              // position: 'center',
              description: 'Please make sure all the fields are not empty',
            });
            return false;
          }
          setLoading(true);

          // await uploadImage(lossesData.image, 'Losses').then(async (i) => {
          lossesData.image = '';
          await recordExpenseLosses(lossesData, 'Losses');
          setLoading(false);
          navigate(ROUTES.ExpenseLossesSuccessfullRecorded);
          // });
          // recordExpenseLosses(lossesData,'losses');
        })();
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
      <CustomProgressBar
        loaderText="Please wait..."
        loader={3}
        visible={loading}
      />
      <View style={styles.content}>
        <View style={styles.viewInput}>
          <View style={styles.viewManager}>
            <TextComponent>{'Expenses'}</TextComponent>
            <Switch
              value={expenLoses?.expenses}
              onValueChange={(value) => {
                if (expenLoses.losses) {
                  setExpenLoses({
                    expenses: !expenLoses.expenses,
                    losses: false,
                  });
                } else {
                  setExpenLoses({
                    ...expenLoses,
                    expenses: !expenLoses.expenses,
                  });
                }
              }}
            />
          </View>

          <View style={styles.viewManager}>
            <TextComponent>{'Losses'}</TextComponent>
            <Switch
              value={expenLoses?.losses}
              onValueChange={
                (value) => {
                  if (expenLoses.expenses) {
                    setExpenLoses({
                      losses: !expenLoses.losses,
                      expenses: false,
                    });
                  } else {
                    setExpenLoses({
                      ...expenLoses,
                      losses: !expenLoses.losses,
                    });
                  }
                }
                // updateData('manage_stock', value)
              }
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {expenLoses.expenses ? (
              <View>
                <Input
                  label={'Title'}
                  value={expensesData?.title}
                  isRequired
                  onChangeText={(value) => updateData('title', value)}
                />

                <Input
                  label={'Amount '}
                  value={expensesData?.amount}
                  isRequired
                  onChangeText={(value) => updateData('amount', value)}
                />

                <InputRichText
                  label={'Description'}
                  value={expensesData?.description}
                  onChangeText={(value) => updateData('description', value)}
                />
              </View>
            ) : null}
            {expenLoses.losses ? (
              <View>
                <Input
                  label={'Product Name'}
                  value={lossesData?.productName}
                  isRequired
                  onChangeText={(value) => updateData('productName', value)}
                />
                <Input
                  label={'Mass'}
                  value={lossesData?.mass}
                  isRequired
                  onChangeText={(value) => updateData('mass', value)}
                />

                <Input
                  label={'Amount '}
                  value={lossesData?.amount}
                  isRequired
                  onChangeText={(value) => updateData('amount', value)}
                />
                <Input
                  label={'Quantity '}
                  value={lossesData?.quantity}
                  isRequired
                  onChangeText={(value) => updateData('quantity', value)}
                />
                <Dropdown
                  label="Pick a description"
                  data={[
                    {
                      value: 'Damages of Product',
                    },
                    {
                      value: 'Mistakenly destroyed',
                    },
                    {
                      value: 'Leakeage of product after delivered',
                    },
                  ]}
                  //textinputstylesprops
                  style={{fontFamily: FONTS.Regular}}
                  labelTextStyle={{fontFamily: FONTS.Regular}}
                  value={lossesData?.dropDowndescription}
                  overlayStyle={{backgroundColor: 'rgba(0,0,0,0.7)'}}
                  containerStyle={{width: '100%'}}
                  pickerStyle={{borderRadius: 10}}
                  itemTextStyle={{fontFamily: FONTS.Regular}}
                  // rippleOpacity={0.7}
                  onChangeText={(val) => {
                    console.log(val);
                    updateData('dropDowndescription', val);
                  }}
                />
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 20,
                  }}>
                  <TextComponent semibold>OR</TextComponent>
                </View>
                <InputRichText
                  label={'Description'}
                  value={lossesData?.description}
                  onChangeText={(value) => updateData('description', value)}
                />
                {/* <InputImage
                  label={'Product Image'}
                  value={lossesData?.image}
                  onChangeImage={(value) => {
                    updateData('image', value);
                    // setImage(value);
                  }}
                /> */}
              </View>
            ) : null}
            <View style={{height: 500}} />
          </ScrollView>
        </View>
      </View>
      {/* <SaveButton
        title="Save"
        buttonStyle={styles.SaveButton}
        containerStyle={styles.containerButton}
        onPress={onContinue}
        // loading={loading}
      /> */}

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
            title={'Submit'}
            size="small"
            buttonStyle={{
              backgroundColor: 'transparent',
              // width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={{alignItems: 'center'}}
            titleStyle={{fontFamily: FONTS.Regular}}
            onPress={onContinue}

            // loading={loadingSave}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

export default Expenses;

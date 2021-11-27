import React, {useContext} from 'react';
import {StyleSheet, Text, View, ScrollView, Switch} from 'react-native';
import {useTheme} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Timeline from 'react-native-beautiful-timeline';

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

import {isEmpty} from '@helpers';
import {useNavigation} from '@react-navigation/native';
import {ROUTES, uniqueid} from '@config';
import filter from 'lodash/filter';
import styles from './styles';
import {TextComponent, CustomProgressBar} from '@components';
import {useSelector} from 'react-redux';
import {dimensions} from '@utils';
import _ from 'lodash';
import {AdminContext} from '@context';
import {uploadImage} from '@services';

const expenses = () => {
  return {
    title: '',
    amount: '',
    description: '',
  };
};
const losses = () => {
  return {
    productName: '',
    amount: '',
    description: '',
    quantity: '',
    image: '',
  };
};

const Expenses = () => {
  const {colors} = useTheme();
  const {navigate} = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const {recordExpenseLosses} = useContext(AdminContext);
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
          expensesData.createdAt = new Date();
          expensesData.userID = user.uid;
          expensesData.shopID = user.myShops[0];
          expensesData.invoiceNumber = uniqueid(6);

          const valid = isEmpty(expensesData);
          if (valid) {
            Errors({
              message: 'Error fields empty',
              floating: true,
              position: 'center',
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
          lossesData.shopID = user.myShops[0];
          lossesData.invoiceNumber = uniqueid(6);

          const valid = isEmpty(lossesData);
          if (valid) {
            Errors({
              message: 'Error fields empty',
              floating: true,
              position: 'center',
              description: 'Please make sure all the fields are not empty',
            });
            return false;
          }
          setLoading(true);

          await uploadImage(lossesData.image, 'Losses').then(async (i) => {
            lossesData.image = i;
            await recordExpenseLosses(lossesData, 'Losses');
            setLoading(false);
            navigate(ROUTES.ExpenseLossesSuccessfullRecorded);
          });
          // recordExpenseLosses(lossesData,'losses');
        })();

    // if (data.storeType === 'type') {
    //   Errors({
    //     message: 'Choose Store Type',
    //     floating: true,
    //     position: 'center',
    //     description: 'You need to choose shop type for your shop ?',
    //   });
    //   return false;
    // }
    // console.log(data);
    // const valid = isEmpty(data);
    // const valid2 = isEmpty(data.address);
    // if (valid || valid2) {
    //   Errors({
    //     message: 'Error fields empty',
    //     floating: true,
    //     position: 'center',
    //     description: 'Please make sure all the fields are not empty',
    //   });
    //   return false;
    // }
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
    // setLoading(true);
    // if (data.logo !== 'empty') {
    //   await uploadImage(data.logo, 'Logos').then(async (i) => {
    //     data.logo = i;
    //     await onCreateShop(data);
    //     setLoading(false);
    //     navigate(ROUTES.ShopCreatingSuccessfull);
    //   });
    //   return false;
    // }

    // await onCreateShop(data);
    // setLoading(false);
    // navigate(ROUTES.ShopCreatingSuccessfull);

    //   dispatch(AuthActions.onStoreRegistrationData(data));
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //     navigate(ROUTES.PolicySetup);
    //   }, 1000);
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

                <InputRichText
                  label={'Description'}
                  value={lossesData?.description}
                  onChangeText={(value) => updateData('description', value)}
                />
                <InputImage
                  label={'Product Image'}
                  value={lossesData?.image}
                  onChangeImage={(value) => {
                    updateData('image', value);
                    // setImage(value);
                  }}
                />
              </View>
            ) : null}
            <View style={{height: 500}} />
          </ScrollView>
        </View>
      </View>
      <SaveButton
        title="Save"
        buttonStyle={styles.SaveButton}
        containerStyle={styles.containerButton}
        onPress={onContinue}
        // loading={loading}
      />
    </View>
  );
};

export default Expenses;

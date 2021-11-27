import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Input,
  InputRichText,
  CustomProgressBar,
  Errors,
  SaveButton,
} from '@components';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {dataFunctions} from '@services';
import {isEmpty} from '@helpers';
import LinearGradient from 'react-native-linear-gradient';
import {CommonContext} from '@context';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';

const debt = () => {
  return {
    name: '',
    mobile: '',
    amount: '',
    returnDate: '',
    description: '',
    address: '',
  };
};
const index = () => {
  const [data, setData] = useState(debt());
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const {navigate} = useNavigation();
  const [waiting, setwaiting] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const {createDebt} = useContext(CommonContext);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    updateData('returnDate', currentDate);
  };

  const onContinue = () => {
    if (!data.returnDate) {
      return Errors({
        message: 'Pick date',
        description: 'Please pick a date for debt return',
        autoHide: true,
      });
    }
    const valid = isEmpty(data, ['address']);

    if (valid) {
      return Errors({
        message: 'Complete form',
        description: 'Please fill all fields to continue',
        autoHide: true,
      });
    }
    setwaiting(true);

    createDebt(dataFunctions.debts(data, user)).then(() => {
      setwaiting(false);
      navigate(ROUTES.ExpenseLossesSuccessfullRecorded);
    });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const updateData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  return (
    <ScrollView>
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        width={120}
        height={100}
        visible={waiting}
      />
      <View
        style={{
          marginHorizontal: 10,
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
          bottom: 100,
        }}>
        <LinearGradient
          style={{
            borderRadius: 10,
          }}
          colors={['#F05F3E', '#ED3269']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}>
          <SaveButton
            title={'Submit'}
            titleStyle={{textAlign: 'center'}}
            size="small"
            style={{alignItems: 'center'}}
            buttonStyle={{
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              onContinue();
            }}
          />
        </LinearGradient>
      </View>

      <View style={{paddingHorizontal: 25, marginTop: 100, height: '100%'}}>
        <Input
          label={'Name'}
          value={data?.name}
          isRequired
          onChangeText={(value) => updateData('name', value)}
        />
        <Input
          label={'Mobile Number'}
          value={data?.mobile}
          isRequired
          onChangeText={(value) => updateData('mobile', value)}
        />
        <Input
          label={'Address ( optional )'}
          value={data?.address}
          onChangeText={(value) => updateData('address', value)}
        />

        <Input
          label={'Amount '}
          value={data?.amount}
          isRequired
          onChangeText={(value) => updateData('amount', value)}
        />
        <TouchableOpacity onPress={showDatepicker}>
          <Input
            label={'Return Date '}
            value={`${moment(date).format('dddd Do MMM YYYY')}`}
            isRequired
            editable={false}
          />
        </TouchableOpacity>
        <InputRichText
          label={'Description'}
          value={data?.description}
          onChangeText={(value) => updateData('description', value)}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <View style={{height: 200}} />
      </View>
    </ScrollView>
  );
};
export default index;
const styles = StyleSheet.create({});

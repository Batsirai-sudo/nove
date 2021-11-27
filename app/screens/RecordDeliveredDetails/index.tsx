import React, {useCallback, useState, useContext} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {
  SaveButton,
  CustomProgressBar,
  TextComponent,
  CreateOrderPreviewItem,
  HeaderReward,
} from '@components';
import {dimensions, FONTS} from '@utils';
import {keyExtractor} from '@helpers';
import {currencyFormatter} from '@config';
import {useNavigation} from '@react-navigation/native';
import {ROUTES, uniqueid, GenerateProfit, resetToHome} from '@config';
import {useSelector, useDispatch} from 'react-redux';
import {CommonContext} from '@context';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {AdminActions} from '@actions';

const {height_screen, width_screen} = dimensions;

const RecordDeliveredDetails = () => {
  const {navigate} = useNavigation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [orderNumber] = useState(uniqueid(6));
  const {deliveredStock, myCurrentShop, recordDeliveries} = useContext(
    CommonContext,
  );
  const [modal, setModal] = useState(false);
  const [profit] = useState(
    deliveredStock.type !== 'Airtime' ? deliveredStock.statistics.profit : '',
  );
  const user = useSelector((state) => state.auth.user);
  const renderItem = useCallback(({item}) => {
    const {
      quantity,
      name,
      amount,
      mass,
      includingVat,
      vat,
      excludingVat,
    } = item;
    let vatDescrip = '';
    if (includingVat) {
      vatDescrip = `Including Vat (${vat})`;
    }
    if (excludingVat) {
      vatDescrip = `Excluding vat`;
    }

    return (
      <CreateOrderPreviewItem
        deliveredStock={true}
        titlePost={name}
        quantity={`x ${quantity}`}
        amount={currencyFormatter(amount)}
        profit={currencyFormatter(item.profit.amount)}
        mass={mass}
        vatDescrip={vatDescrip}
      />
    );
  }, []);

  const onConvertToPDF = useCallback(() => {
    navigate(ROUTES.ConvertToPdf);
    // navigate(ROUTES.SuccessOrder)
    // dispatch(AdminActions.onCreateBatchOrderPdf(pets));
    // navigation.navigate(ROUTES.ConvertBatchToPDF);
  }, []);

  const onSendOrder = async () => {
    setModal(true);
    const orderData = {
      ...deliveredStock,
      createdAt: new Date(),
      deliveryNumber: orderNumber,
      invoice: uniqueid(10),
      userId: user.uid,
      month: moment().format('MMMM'),
      fullName: user.fullName,
      mobile: user.mobileNumber,
      userCategory: user.userCategory,
      metadata: {
        adminID: user.account === 'Admin' ? user.uid : user.adminID,
        adimFullName: '',
        shopID: myCurrentShop.id,
        storeType: myCurrentShop.storeType,
        shopName: myCurrentShop.name,
      },
    };
    const profitsData = GenerateProfit(orderData, profit);
    recordDeliveries(orderData, profitsData).then(() => {
      dispatch(AdminActions.resetDeliveryStock(myCurrentShop.id));
      setModal(false);
      const params = {
        orderData: {
          orderType: 'Deliveries',
          orderNumber: orderNumber,
          amount:
            deliveredStock.type === 'Airtime'
              ? deliveredStock.products.amount
              : deliveredStock.statistics.totalBuyingAmount,
        },
      };
      resetToHome(navigation, 'RecordDeliveredDetails', params);
      // DeviceEventEmitter.emit('event.reloadHome', '');

      // navigate(ROUTES.SuccessOrder, ,
      // });
    });
  };

  return (
    <View style={{height: '100%'}}>
      <CustomProgressBar
        loaderText="Please wait..."
        loader={3}
        visible={modal}
      />
      <HeaderReward
        deliveredStock={true}
        profit={deliveredStock.statistics.profit}
        amount={
          deliveredStock.type === 'Airtime'
            ? deliveredStock.products.amount
            : deliveredStock.statistics.totalBuyingAmount
        }
      />
      {deliveredStock.type !== 'Airtime' ? (
        <>
          <View
            style={[
              styles.inputShape,
              {
                top: -0.03 * height_screen,
                marginHorizontal: 0.05 * width_screen,
                elevation: 5,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View>
                <TextComponent bold style={styles.topText}>
                  {deliveredStock.statistics.totalItems}
                </TextComponent>
                <TextComponent style={styles.topTextSub}>
                  Total items
                </TextComponent>
              </View>
              <View
                style={{height: 40, width: 1, backgroundColor: '#000'}}></View>
              <View>
                <TextComponent bold style={styles.topText}>
                  #{orderNumber}
                </TextComponent>
                <TextComponent style={styles.topTextSub}>
                  {'Invoice Number'}
                </TextComponent>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.inputShape,
              {
                top: -0.105 * height_screen,
                zIndex: -1,
                marginHorizontal: 0.08 * width_screen,
                elevation: 3,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View>
                <TextComponent>bhbh</TextComponent>
              </View>
              <View
                style={{height: 40, width: 1, backgroundColor: '#000'}}></View>
              <View>
                <TextComponent>bhbh</TextComponent>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <FlatList
              data={deliveredStock.products}
              showsVerticalScrollIndicator={false}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              bounces={false}
              contentContainerStyle={styles.contentContainerStyle}
              ListFooterComponent={() => <View style={{height: 200}}></View>}
            />
          </View>
          {/* <FloatButton bottom={120} bgcolor="#ED3269" onPress={onConvertToPDF}>
            <FontAwesome5 name="file-pdf" size={30} color={iconColor} />
          </FloatButton> */}
        </>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            top: '60%',
          }}>
          <TextComponent semibold style={{fontSize: 30}}>
            {deliveredStock.products.name} Airtime
          </TextComponent>
        </View>
      )}

      <View
        style={{
          marginHorizontal: 10,
          bottom: 2,
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
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
              onSendOrder();
            }}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

export default RecordDeliveredDetails;

const styles = StyleSheet.create({
  footButton: {
    marginHorizontal: 10,
    top: 50,
  },
  inputShape: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    flexDirection: 'row',
    height: 0.085 * height_screen,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0.04 * width_screen,
  },
  txtApply: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#ED3269',
  },
  topText: {textAlign: 'center'},
  topTextSub: {textAlign: 'center', color: '#353B48'},
  container: {
    top: -80,
    height: '70%',
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  block: {
    height: 200,
  },
  firsttxt: {
    fontWeight: '100',
    fontSize: 14,
  },
  secondtxt: {
    fontWeight: '100',
    fontSize: 14,
    color: 'red',
  },
});

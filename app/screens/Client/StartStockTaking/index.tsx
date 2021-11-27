import React, {useRef, useEffect, useContext, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Images} from '@config';
import LottieView from 'lottie-react-native';
import {TextComponent as Text, CustomProgressBar} from '@components';
import {CommonContext} from '@context';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import {useSelector, useDispatch} from 'react-redux';
import {AuthActions, AdminActions} from '@actions';

const StartStockTaking = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const {createStockTaking, checkActiveStockTakings, getProducts} = useContext(
    CommonContext,
  );
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);
  const onCreateStockTaking = async () => {
    setLoading(true);
    const query = {type: ''};

    await getProducts(null, user.myShops[0].id).then(async (res) => {
      const firestoreData = [];
      res.forEach((result) => {
        firestoreData.push({
          key: result.id,
          brand: result.data().brand,
          buyingPrice: result.data().buyingPrice,
          productName: result.data().productName,
          salePrice: result.data().salePrice,
          quantity: '',
        });
      });
      // setProducts(firestoreData);
      // setRefreshing(false);
      await createStockTaking(firestoreData);
      setLoading(false);
      navigate(ROUTES.StockTaking);
    });
  };

  useEffect(() => {
    setLoading(true);
    checkActiveStockTakings().then((response) => {
      setLoading(false);
      response.docs.length > 0
        ? (() => {
            const firestoreData = [];
            response.forEach((result) => {
              firestoreData.push({
                key: result.id,
              });
            });

            dispatch(
              AdminActions.activateStockTakingActive(firestoreData[0].key),
            );
            navigate(ROUTES.StockTaking);
          })()
        : setButton(true);
    });
  }, []);

  return (
    <View>
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        visible={loading}
      />
      <View style={styles.view}>
        {button ? (
          <View style={styles.topText}>
            <Text bold style={styles.realtimetxt}>
              REAL TIME STOCK TAKING
            </Text>
          </View>
        ) : null}

        <LottieView
          style={{height: 200, width: 200}}
          source={Images.stocktaking}
          //   autoPlay
          //   loop
        />
        {button ? (
          <View style={styles.textContainer}>
            <Text style={styles.txt}>
              You can now start your real time stock taking by{' '}
            </Text>
            <Text style={styles.txt}>
              managing to get stock taking from a several devices by different
              users.
            </Text>
          </View>
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.txt}>
              You have an ACTIVE session for STOCK TAKING
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigate(ROUTES.StockTaking);
              }}
              style={styles.rewards}>
              {/* {props.settingsIcon} */}
              <Text medium style={styles.txtRewards}>
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {button ? (
          <TouchableOpacity
            onPress={() => {
              onCreateStockTaking();
            }}
            style={styles.rewards}>
            {/* {props.settingsIcon} */}
            <Text medium style={styles.txtRewards}>
              Create Stock Taking
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default StartStockTaking;

const styles = StyleSheet.create({
  view: {alignItems: 'center', marginTop: 100},
  topText: {marginVertical: 20},
  textContainer: {
    marginVertical: 20,
    marginHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {textAlign: 'center', fontSize: 12, color: '#556084'},
  realtimetxt: {color: '#556084'},
  rewards: {
    width: 200,
    height: 40,
    backgroundColor: '#ED3269',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  txtRewards: {
    fontSize: 12,
    color: '#FFF',
  },
});

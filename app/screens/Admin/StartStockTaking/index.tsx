import React, {useRef, useEffect, useContext, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Images} from '@config';
import LottieView from 'lottie-react-native';
import {TextComponent as Text, CustomProgressBar, Dialog} from '@components';
import {AdminContext} from '@context';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import {useSelector} from 'react-redux';

const StartStockTaking = () => {
  const {navigate} = useNavigation();
  const user = useSelector((state) => state.auth.user);

  const {createStockTaking, checkActiveStockTakings, getProducts} = useContext(
    AdminContext,
  );
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const onCreateStockTaking = async () => {
    setLoading(true);

    await getProducts(null, user.myShops[0].id).then(async (res) => {
      const firestoreData = [];
      if (res.docs.length > 0) {
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
      }
      setLoading(false);
      setDialogVisible(true);
    });
  };

  useEffect(() => {
    setLoading(true);
    checkActiveStockTakings().then((response) => {
      setLoading(false);
      response.docs.length > 0 ? navigate(ROUTES.StockTaking) : setButton(true);
    });
  }, []);

  return (
    <View>
      <CustomProgressBar
        category={2}
        loaderText="Checking..."
        loader={7}
        height={100}
        width={150}
        visible={loading}
      />
      <Dialog
        title="No products"
        content={
          'You dont have any products to create stock taking in the system!'
        }
        // firstButtontext="Delete"
        firstButtonTextStyles={{color: 'red'}}
        firstButtonOnPress={() => {
          setDialogVisible(false);
        }}
        height={170}
        // secondButtontext="Cancel"
        secondButtonOnPress={() => setDialogVisible(false)}
        onSwipefunc={() => setDialogVisible(false)}
        onTouchOutside={() => setDialogVisible(false)}
        modalVisible={dialogVisible}
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
            {loading ? null : (
              <>
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
              </>
            )}
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

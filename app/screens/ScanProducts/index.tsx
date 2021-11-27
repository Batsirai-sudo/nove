import React, {
  useRef,
  useEffect,
  useState,
  memo,
  useCallback,
  useContext,
} from 'react';
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import {ROUTES} from '@config';
import {Dialog} from '@components';
import {RNCamera} from 'react-native-camera';
import {dimensions} from '@utils';
import {ClientContext} from '@context';
import {useNavigation} from '@react-navigation/native';
const ScanProducts = memo(() => {
  const {getScannedProduct} = useContext(ClientContext);
  const {navigate} = useNavigation();
  const [data, setData] = useState({
    is_camera: 1, // START CAMERA
    notification: '',
    value: '',
    opacity: new Animated.Value(1),
    offset: new Animated.Value(0),
    content: '',
    title: 'Results',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const camera = useRef();
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    animation_method();
    const timer = setInterval(() => animation_method(), 6000);
  }, []);

  const onBarCodeReads = useCallback(({barcodes}) => {
    const data = barcodes[0];
    // IF USER COME FROM QR SCREEN
    console.log(JSON.parse(data.data));
    if (JSON.parse(data.data).errorCode === '3') {
    } else {
      getScannedProduct(data.data).then((res) => {
        console.log(res);
        if (res.message === 'product found') {
          navigate(ROUTES.ProductDetails);
        }
        if (res.message === 'product not found') {
          setModalVisible(true);
        }
        // setLoading(false);
        // const firestoreData = [];
        // res.forEach((result) => {
        //   firestoreData.push({
        //     ...result.data(),
        //     key: result.id,
        //   });
        // });
        // setProducts(firestoreData);
        // setRefreshing(false);

        // res.docs.forEach((doc) => {
        //   console.log(doc.data());
        // });
      });

      // setData({
      //   ...data,
      //   [key]: value,
      // });
    }
  });

  const animation_method = () => {
    data.offset.setValue(2 * -1);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(data.opacity, {
          toValue: 1,
          duration: 3000,
        }),
        Animated.timing(data.offset, {
          toValue:
            Platform.OS == 'android'
              ? Dimensions.get('window').height / 3 - 80
              : Dimensions.get('window').height / 3 - 50,
          duration: 3000,
        }),
      ]),

      Animated.delay(0),

      Animated.parallel([
        Animated.timing(data.opacity, {
          toValue: 1,
          duration: 3000,
        }),
        Animated.timing(data.offset, {
          toValue: 2 * -1,
          duration: 3000,
        }),
      ]),
    ]).start();
  };

  const animationStyle = {
    opacity: data.opacity,
    transform: [
      {
        translateY: data.offset,
      },
    ],
  };

  const {height, width} = Dimensions.get('window');
  const maskRowHeight = 30;
  const maskColWidth = (width - 300) / 2;

  return (
    <View
      style={[
        BarcodeStyles.container,
        {position: 'absolute', top: 0, right: 0, bottom: 0, left: 0},
      ]}>
      <RNCamera
        ref={camera}
        onGoogleVisionBarcodesDetected={onBarCodeReads}
        style={BarcodeStyles.cameraView}
        playSoundOnCapture>
        <View style={BarcodeStyles.maskOutter}>
          <View
            style={[
              {flex: maskRowHeight},
              BarcodeStyles.maskRow,
              BarcodeStyles.maskFrame,
            ]}
          />
          <View style={[{flex: 30}, BarcodeStyles.maskCenter]}>
            <View style={[{width: maskColWidth}, BarcodeStyles.maskFrame]} />
            <View style={BarcodeStyles.maskInner} />
            <View style={[{width: maskColWidth}, BarcodeStyles.maskFrame]} />
          </View>

          <View
            style={[
              {flex: maskRowHeight},
              BarcodeStyles.maskRow,
              BarcodeStyles.maskFrame,
            ]}
          />
        </View>
      </RNCamera>

      <Animated.View
        style={[
          BarcodeStyles.animation,
          animationStyle,
          {
            backgroundColor: '#5BBE3F',
            top: Dimensions.get('window').height / 3 - 30,
          },
        ]}></Animated.View>
      <Dialog
        content={'Product Not Found'}
        title={data.title}
        firstButtonOnPress={() => setModalVisible(false)}
        onTouchOutside={() => setModalVisible(false)}
        onSwipefunc={() => setModalVisible(false)}
        // secondButtonOnPress={() => BackHandler.exitApp()}
        secondButtontext="Yes"
        modalVisible={modalVisible}
        width={dimensions.width_screen - 20}
        height={150}
      />
    </View>
  );
});

const BarcodeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animation: {
    position: 'absolute',
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignSelf: 'center',
    height: 2,
    width: Dimensions.get('window').width - 80,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: Dimensions.get('window').width - 5,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {flexDirection: 'row'},
});
export default ScanProducts;

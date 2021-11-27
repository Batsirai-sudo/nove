import React, {Component, PureComponent} from 'react';
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  Platform,
  Animated,
  Easing,
} from 'react-native';
// import { NavigationEvents } from 'react-navigation';
import {Dialog} from '@components';
import {RNCamera} from 'react-native-camera';
import {dimensions} from '@utils';
import {ClientContext} from '@context';
import {ROUTES} from '@config';

class GetBarCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      is_camera: 1, // START CAMERA
      notification: '',
      value: '',
      opacity: new Animated.Value(1),
      offset: new Animated.Value(0),
      modalVisible: false,
      content: '',
      title: 'Results',
    };
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    console.log(this.context.product_barcode);

    // ANIMATION CALL
    this.animation_method();
    this.timer = setInterval(() => this.animation_method(), 6000);
    const unsubscribe = this.props.navigation.addListener('focus', () => {});
    return unsubscribe;
  }
  // BEGIN BARCODE READ DATA METHOD
  onBarCodeReads = (data) => {
    // IF USER COME FROM QR SCREEN
    console.log(JSON.parse(data.data));
    if (JSON.parse(data.data).errorCode === '3') {
    } else {
      this.context.load(data.data);
      this.props.navigation.navigate(ROUTES.AddProducts);
      //   this.setState({modalVisible: true, content: data.data});
    }

    // if (this.props.navigation.getParam('fromview', '') == 'qr') {
    //   this.props.navigation.navigate('ScanResultFromQR', {
    //     scan_result: data.data,
    //     view: 'Qr',
    //   });
    // } else {
    //   // IF USER COME FROM BARCODE SCREEN
    //   this.props.navigation.navigate('ScanResultFromBarcode', {
    //     scan_result: data.data,
    //     view: 'Barcode',
    //   });
    // }
  };
  // END BARCODE READ DATA METHOD

  // BEGIN ANIMATION METHOD
  animation_method() {
    this.state.offset.setValue(2 * -1);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 3000,
        }),
        Animated.timing(this.state.offset, {
          toValue:
            Platform.OS == 'android'
              ? Dimensions.get('window').height / 3 - 80
              : Dimensions.get('window').height / 3 - 50,
          duration: 3000,
        }),
      ]),

      Animated.delay(0),

      Animated.parallel([
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 3000,
        }),
        Animated.timing(this.state.offset, {
          toValue: 2 * -1,
          duration: 3000,
        }),
      ]),
    ]).start();
  }
  // END ANIMATION METHOD

  render() {
    // BEGIN ANIMATION STYLE
    const animationStyle = {
      opacity: this.state.opacity,
      transform: [
        {
          translateY: this.state.offset,
        },
      ],
    };
    // END ANIMATION STYLE

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
          ref={(cam) => {
            this.camera = cam;
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            this.onBarCodeReads(barcodes[0]);
          }}
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
          content={this.state.content}
          title={this.state.title}
          firstButtonOnPress={() => this.setState({modalVisible: false})}
          onTouchOutside={() => this.setState({modalVisible: false})}
          onSwipefunc={() => this.setState({modalVisible: false})}
          // secondButtonOnPress={() => BackHandler.exitApp()}
          secondButtontext="Yes"
          modalVisible={this.state.modalVisible}
          width={dimensions.width_screen - 20}
          height={dimensions.height_screen - 200}
        />
      </View>
    );
  }
}
GetBarCode.contextType = ClientContext;

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
export default GetBarCode;

//  <NavigationEvents
//  onWillFocus={payload =>
//      setTimeout(() => {

//                                            this.setState({
//                                                          is_camera : 1
//                                                          })

//                        },50)
//  } // ON VIEW FOCUS EVENT

//  onWillBlur={payload =>
//      setTimeout(() => {
//                        this.setState({
//                                      is_camera : 0
//                                      })
//                       },50)
// } // ON VIEW BLUR EVENT
// />
// {/* END ONLOAD VIEW METHOD FOR RESTART CAMERA */}

//   {/* BEGIN CAMERA VIEW FOR IOS */}
//   {(this.state.is_camera == 1 && Platform.OS == 'ios') ?
//     <RNCamera
//             ref={cam => {
//                         this.camera = cam;
//                         }}
//             onBarCodeRead={this.onBarCodeReads}
//             style={BarcodeStyles.cameraView}
//             playSoundOnCapture
//     >

//     <View style={BarcodeStyles.maskOutter}>
//       <View style={[{ flex: maskRowHeight  }, BarcodeStyles.maskRow, BarcodeStyles.maskFrame]} />
//       <View style={[{ flex: 30 }, BarcodeStyles.maskCenter]}>
//         <View style={[{ width: maskColWidth }, BarcodeStyles.maskFrame]} />
//         <View style={BarcodeStyles.maskInner} />
//         <View style={[{ width: maskColWidth }, BarcodeStyles.maskFrame]} />
//      </View>

//         <View style={[{ flex: maskRowHeight }, BarcodeStyles.maskRow, BarcodeStyles.maskFrame]} />
//     </View>
//   </RNCamera> : null}
// {/* END CAMERA VIEW FOR IOS */}

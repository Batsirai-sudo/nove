import React, { Component, PureComponent } from 'react';
import {
	Dimensions,
	DeviceEventEmitter,
	StyleSheet,
	// View,
	Platform,
	Animated,
	Vibration,
} from 'react-native';
import { Text, View, Item, Icon, Input, Button } from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
// import { NavigationEvents } from 'react-navigation';
import { Dialog } from '@components';
import { RNCamera } from 'react-native-camera';
import { dimensions } from '@utils';
import { CommonContext } from '@context';
import { ROUTES } from '@config';
import RNBeep from 'react-native-a-beep';
import BarcodeMask from 'react-native-barcode-mask';
// import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

class ScanBarCode extends React.Component {
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
		const unsubscribe = this.props.navigation.addListener('focus', () => {});
		return unsubscribe;
	}
	// BEGIN BARCODE READ DATA METHOD
	makeSoundAndVibrate = () => {
		// Vibrate first
		Vibration.vibrate(200);

		//Sound Seconds
		/**
		 * Favourite sounds list
		 * TONE_CDMA_ALERT_CALL_GUARD
		 * TONE_SUP_RADIO_ACK
		 * TONE_PROP_PROMPT
		 * TONE_PROP_ACK
		 */
		RNBeep.beep(false);
		// RNBeep.beep(false)
		// RNBeep.PlaySysSound(RNBeep.AndroidSoundIDs.TONE_CDMA_CALL_SIGNAL_ISDN_PAT6);
		// RNBeep.PlaySysSound(41);
		// RNBeep.PlaySysSound(RNBeep.iOSSoundIDs.AudioToneBusy);
	};
	onBarCodeReads = (data) => {
		if (data.data.length > 50) {
		} else {
			this.makeSoundAndVibrate();
			if (this.props.route?.params?.type === 'edit') {
				this.context.load(data.data);
				DeviceEventEmitter.emit('event.loadbarcode', data.data);
				DeviceEventEmitter.removeAllListeners('event.loadbarcode');
				return this.props.navigation.navigate(ROUTES.EditProduct);
			}
			if (this.props.route?.params?.type === 'pos') {
				this.context.load(data.data);
				DeviceEventEmitter.emit('event.scanProduct', data.data);
				DeviceEventEmitter.removeAllListeners('event.scanProduct');
				return this.props.navigation.navigate(ROUTES.POSAmount);
			}
			if (this.props.route?.params?.type === 'add') {
				this.context.load(data.data);
				DeviceEventEmitter.emit('event.addProductsLoadbarcode', data.data);
				DeviceEventEmitter.removeAllListeners('event.addProductsLoadbarcode');
				return this.props.navigation.navigate(ROUTES.AddProducts);
			}
			if (this.props.route?.params?.type === 'addPos') {
				this.context.load(data.data);
				DeviceEventEmitter.emit('event.addProductsLoadbarcode', data.data);
				DeviceEventEmitter.removeAllListeners('event.addProductsLoadbarcode');
				return this.props.navigation.goBack();
			}
			// DeviceEventEmitter.emit('event.checkbar', data.data);
			// DeviceEventEmitter.removeAllListeners('event.checkbar');
			// this.context.load(data.data);
			// this.props.navigation.navigate(ROUTES.AddProducts);
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

		const { height, width } = Dimensions.get('window');
		const maskRowHeight = 30;
		const maskColWidth = (width - 300) / 2;

		return (
			<View style={[BarcodeStyles.container, { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }]}>
				<RNCamera
					ref={(cam) => {
						this.camera = cam;
					}}
					androidCameraPermissionOptions={{
						title: 'Permission to use camera',
						message: 'We need your permission to use your camera',
						buttonPositive: 'Ok',
						buttonNegative: 'Cancel',
					}}
					androidRecordAudioPermissionOptions={{
						title: 'Permission to use audio recording',
						message: 'We need your permission to use your audio',
						buttonPositive: 'Ok',
						buttonNegative: 'Cancel',
					}}
					focusDepth={1}
					// autoFocus={RNCamera.Constants.AutoFocus.off}
					autoFocusPointOfInterest={{ x: 0.5, y: 0.5 }}
					onGoogleVisionBarcodesDetected={({ barcodes }) => {
						this.onBarCodeReads(barcodes[0]);
					}}
					style={BarcodeStyles.cameraView}
					playSoundOnCapture
				>
					<BarcodeMask width={'90%'} height={300} showAnimatedLine={true} outerMaskOpacity={0.8} />
				</RNCamera>
				{false ? (
					<View style={styles.lowerSection}>
						<Item>
							<Icon type={'Ionicons'} active name="md-barcode" />
							<Input
								placeholder="Barcode of the item"
								value={this.state.barcode}
								onChangeText={this.handleChange}
							/>
						</Item>
						<Button primary onPress={this.onGetItemPress}>
							<Text>Get Item</Text>
						</Button>
					</View>
				) : null}
				<Dialog
					content={this.state.content}
					title={this.state.title}
					firstButtonOnPress={() => this.setState({ modalVisible: false })}
					onTouchOutside={() => this.setState({ modalVisible: false })}
					onSwipefunc={() => this.setState({ modalVisible: false })}
					secondButtontext="Yes"
					modalVisible={this.state.modalVisible}
					width={dimensions.width_screen - 20}
					height={dimensions.height_screen - 200}
				/>
			</View>
		);
	}
}
ScanBarCode.contextType = CommonContext;
const styles = {
	root: {
		flex: 1,
	},
	upperSection: {
		flex: 1,
	},
	lowerSection: {
		paddingVertical: 30,
		paddingHorizontal: 20,
		backgroundColor: 'white',
	},
	camera: {
		height: '100%',
	},
};
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
	maskCenter: { flexDirection: 'row' },
});
export default ScanBarCode;

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

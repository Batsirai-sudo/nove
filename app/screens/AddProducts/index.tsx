import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { CommonContext } from '@context';
import { View, KeyboardAvoidingView, ScrollView, DeviceEventEmitter, TouchableOpacity, Text } from 'react-native';
import {
	SaveButton,
	Icon,
	Input,
	InputImage,
	FilterCategories,
	IconRadio,
	Errors,
	CustomProgressBar,
	Dialog,
	TextComponent,
} from '@components';
import { isEmpty } from '@helpers';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@config';
import filter from 'lodash/filter';
import styles from './styles';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { CheckBox } from 'react-native-elements';
import { FONTS } from '@utils';
import { UIActivityIndicator } from 'react-native-indicators';

function AddProducts(props) {
	const { colors } = useTheme();
	const { navigate, goBack } = useNavigation();
	const user = useSelector((state) => state.auth.user);
	const { checkBarCode, product_barcode, recordProduct, load, getCategories } = React.useContext(CommonContext);
	const { route } = props;
	const id = route?.params?.data ?? null;
	// const typeForm = product ? 'edit' : 'add';

	const dataForm = () => {
		return {
			productName: '',
			// brand: '',
			salePrice: '',
			mass: '',
			buyingPrice: '',
			barcode: product_barcode,
			// productURI: '',
			// catalogVisibility: '',
			InCase: '',
			category: [],
			cratePrize: true,
			user: {
				fullName: user.fullName,
				id: user.uid,
			},
		};
	};
	const [data, setData] = React.useState(dataForm());
	const [productFound, setproductFound] = React.useState({
		found: false,
		data: {},
	});
	const [category, setCategory] = React.useState([]);
	const [visitModal, setVisitModal] = React.useState(false);
	const [checkBarStatus, setcheckBarStatusl] = React.useState(false);
	const [image, setImage] = React.useState('');
	const [categories, setCategories] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [dialogVisible, setDialogVisible] = React.useState(false);
	const [currenCategoryDelete, setCurrenCategoryDelete] = React.useState(false);

	const listVisibility = [
		{
			value: 'visible',
			name: 'Shop & Search Results (recommended)',
		},
		{
			value: 'catalog',
			name: 'Shop Only',
		},

		{
			value: 'hidden',
			name: 'Hidden',
		},
	];
	React.useEffect(() => {
		updateData('barcode', product_barcode);
		fetchCategory();
	}, [product_barcode]);
	const fetchCategory = () => {
		getCategories().then((response) => {
			setLoading(false);
			const firestoreData = [];
			response.forEach((result) => {
				firestoreData.push({
					...result.data(),
					key: result.id,
				});
			});

			let sorted = _.sortBy(firestoreData, (a) => a.name);
			setCategories(sorted);
			console.log(sorted);
		});
	};
	const updateData = (key, value) => {
		setData({
			...data,
			[key]: value,
		});
	};

	const findProductExist = (id) => {
		setcheckBarStatusl(true);

		checkBarCode(id).then((res) => {
			if (res.docs.length === 2) {
				setData(dataForm());
				load('  ');
				alert('Two products found with the same bar code');
			}

			if (res.docs.length > 0) {
				setproductFound({
					found: true,
					data: res.docs[0].data(),
				});
			}
			setcheckBarStatusl(false);
		});
	};

	const setModalVisible = (value) => {
		setVisitModal(value);
	};
	const saveProduct = async () => {
		const valid = isEmpty(data);
		valid
			? Errors({
					message: 'Empty Fields',
					position: 'bottom',
					autoHide: true,
					description: 'Please fill all fields',
			  })
			: (async () => {
					setIsLoading(true);
					// await getImageUri(data.productURI, data.productName)
					//   .then((downloadedUrl) => {
					// data.productURI = downloadedUrl;
					data.category = category.map((x) => x.name);

					recordProduct(data, user.myShops[0].id)
						.then(() => {
							setIsLoading(false);
							setData(dataForm());
							Errors({
								message: 'Product created',
								description: ` Your ${data.productName} was successfull added into shop`,
								autoHide: true,
								type: 'success',
								position: 'bottom',
							});
							load('');
							setCategory([]);
						})
						.catch((error) => {
							setIsLoading(false);

							Errors({
								message: 'Error ocuured',
								description: error,
								position: 'bottom',
							});
						});
					// })
					// .catch((e) => {
					//   setIsLoading(false);

					//   Errors({
					//     message: 'Error ocuured',
					//     description: e,
					//     position: 'bottom',
					//   });
					// });
			  })();
	};

	const deleteCate = (cat) => {
		setDialogVisible(true);
		setCurrenCategoryDelete(cat.id);
	};

	return (
		<View style={styles.container}>
			{/* <Loader isLoading={isLoading} /> */}
			<CustomProgressBar
				category={2}
				loaderText="Creating..."
				loader={7}
				width={110}
				height={110}
				visible={isLoading}
			/>
			<Dialog
				firstButtonTextStyles={{ color: colors.primary }}
				secondButtonTextStyles={{ color: 'red' }}
				content="`Hold on!', 'Are you sure you want Delete?`"
				title="Delete Category"
				firstButtonOnPress={() => {
					setCategory(filter(category, (s) => s.id !== currenCategoryDelete));
					setDialogVisible(false);
				}}
				secondButtonOnPress={() => {
					setDialogVisible(false);
				}}
				onSwipefunc={() => {
					setDialogVisible(false);
				}}
				onTouchOutside={() => {
					setDialogVisible(false);
				}}
				secondButtontext="Cancel"
				firstButtontext="OK"
				modalVisible={dialogVisible}
			/>
			<Dialog
				firstButtonTextStyles={{ color: colors.primary }}
				secondButtonTextStyles={{ color: 'red' }}
				height={200}
				content={
					<View>
						<TextComponent semibold style={{ textAlign: 'center' }}>
							{productFound.data.productName} ( {productFound.data.mass} )
						</TextComponent>
						<TextComponent>Was found in the system</TextComponent>
					</View>
				}
				title="Product Found"
				firstButtonOnPress={() => {
					setproductFound({ ...productFound, found: false });
					setData(dataForm());
					load('  ');
				}}
				secondButtonOnPress={() => {
					setproductFound({ ...productFound, found: false });
				}}
				onSwipefunc={() => {
					setproductFound({ ...productFound, found: false });
				}}
				onTouchOutside={() => {
					setproductFound({ ...productFound, found: false });
				}}
				secondButtontext="Continue"
				firstButtontext="Reset"
				modalVisible={productFound.found}
			/>
			<KeyboardAvoidingView behavior="height" style={styles.keyboard}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.content}>
						<View style={styles.viewInput}>
							<Input
								label={'Product Name'}
								value={data?.productName}
								isRequired
								onChangeText={(value) => updateData('productName', value)}
							/>

							<Input
								label={'Mass (kg /g /ml /L) '}
								value={data?.mass}
								isRequired
								onChangeText={(value) => updateData('mass', value)}
							/>
							<Input
								label={'In a Case'}
								value={data?.InCase}
								isRequired
								keyboardType="numeric"
								onChangeText={(value) => updateData('InCase', value)}
							/>

							<View style={styles.rowInput}>
								<View style={styles.colInput}>
									<Input
										label={'Buying price/ case'}
										isRequired
										keyboardType="numeric"
										value={data?.buyingPrice}
										onChangeText={(value) => updateData('buyingPrice', value)}
									/>
								</View>
								<View style={styles.colInput}>
									<View>
										<CheckBox
											title={'Crate price'}
											textStyle={{
												fontFamily: FONTS.Regular,
												fontWeight: '400',
												fontSize: 11,
											}}
											checkedIcon="check-square-o"
											uncheckedIcon="square-o"
											checked={data?.cratePrize}
											containerStyle={{
												backgroundColor: 'white',
												width: '95%',
												height: 20,
												borderRadius: 10,
												borderColor: 'white',
											}}
											onPress={() => {
												data.cratePrize = !data.cratePrize;
												setData({ ...data });
											}}
										/>
									</View>
								</View>
							</View>
							{data?.cratePrize ? (
								<Input
									label={'Crate price'}
									value={data?.crate}
									isRequired
									onChangeText={(value) => updateData('crate', value)}
								/>
							) : null}
							<Input
								label={'Sale price'}
								value={data?.salePrice}
								isRequired
								keyboardType="numeric"
								onChangeText={(value) => updateData('salePrice', value)}
							/>

							{/* <View style={styles.viewManager}>
                <TextComponent>{'Manage Stock'}</TextComponent>
                <Switch
                  // value={data?.manage_stock}
                  onValueChange={
                    (value) => {}
                    // updateData('manage_stock', value)
                  }
                />
              </View> */}
							<View>
								<Input
									label={'Barcode Digits '}
									onChangeText={(value) => updateData('barcode', value)}
									value={data?.barcode}
									style={{ width: '70%' }}
								/>
								{checkBarStatus ? (
									<UIActivityIndicator
										style={{ position: 'absolute', top: 30, right: 5 }}
										color="black"
										size={30}
										// dotRadius={10}
									/>
								) : null}
							</View>

							<SaveButton
								title="Scan Bar Code"
								size="small"
								secondary
								buttonStyle={[
									{
										alignItems: 'center',
										width: 300,
										alignSelf: 'center',
										height: 150,
										borderWidth: 0.5,
									},
								]}
								containerStyle={styles.containerButton}
								onPress={() => {
									DeviceEventEmitter.addListener('event.addProductsLoadbarcode', (res) =>
										findProductExist(res)
									);
									navigate(ROUTES.ScanBarCode, { type: 'add' });
								}}
							/>

							{/* <InputImage
                label={'Product Image'}
                value={image}
                onChangeImage={(value) => {
                  updateData('productURI', value);
                  setImage(value);
                }}
              /> */}
							<TextComponent style={[styles.textCatalog, { color: colors.primary }]}>
								{'Category'}
							</TextComponent>
							<View style={[{ backgroundColor: colors.secondaryCard }, styles.viewSelectCate]}>
								{category.map((cat) => (
									<TouchableOpacity
										key={cat.id}
										style={[{ backgroundColor: colors.background }, styles.btnSelectCate]}
										onPress={() => deleteCate(cat)}
									>
										<Text key={cat.id}>{cat.name}</Text>
										<Icon name="close-circle" size={14} iconStyle={styles.iconClose} />
									</TouchableOpacity>
								))}
							</View>

							<View style={{ alignItems: 'center' }}>
								<SaveButton
									title="Pick Category"
									size="small"
									secondary
									buttonStyle={[styles.SaveButton, { alignItems: 'center' }]}
									containerStyle={styles.containerButton}
									onPress={() => setModalVisible(true)}
								/>
							</View>

							{/* <TextComponent style={styles.textCatalog}>
                {'Catalog Visibility'}
              </TextComponent>

              <View
                style={[
                  styles.viewListRadio,
                  {borderColor: colors.secondaryCard},
                ]}>
                {listVisibility.map((visibility) => {
                  const selected = visibility.value === data?.catalogVisibility;
                  return (
                    <TouchableOpacity
                      key={visibility.value}
                      style={styles.touchVisibility}
                      onPress={() => {
                        updateData('catalogVisibility', visibility.value);
                      }}>
                      <IconRadio isSelected={selected} />
                      <TextComponent
                        secondary={!selected}
                        style={[
                          styles.textVisibility,
                          selected && {color: colors.primary},
                        ]}>
                        {visibility.name}
                      </TextComponent>
                    </TouchableOpacity>
                  );
                })}
              </View> */}

							<TextComponent thin style={{ color: '#BDBDBD', fontSize: 12 }}>
								Note : Only simple products can be created in this page. To create other product types
								login through the website.,
							</TextComponent>
						</View>
					</View>
				</ScrollView>
				<View
					style={{
						marginHorizontal: 10,
						bottom: 2,
						position: 'absolute',
						width: '90%',
						alignSelf: 'center',
					}}
				>
					<LinearGradient
						style={{
							// height: 45,
							// marginBottom: 40,
							// marginTop: 20,
							borderRadius: 10,

							// justifyContent: 'center',
							// alignItems: 'center',
						}}
						colors={['#F05F3E', '#ED3269']}
						start={{ x: 1, y: 0 }}
						end={{ x: 1, y: 1 }}
					>
						<SaveButton
							title={'Save'}
							titleStyle={{ textAlign: 'center' }}
							size="small"
							style={{ alignItems: 'center' }}
							loading={loading}
							buttonStyle={{
								backgroundColor: 'transparent',
								// width: '100%',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={saveProduct}
						/>
					</LinearGradient>
				</View>

				<FilterCategories
					visitModal={visitModal}
					setModalVisible={setModalVisible}
					categories={categories}
					selectCategory={category}
					clickFilter={(value) => {
						setCategory(value);
					}}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

export default AddProducts;

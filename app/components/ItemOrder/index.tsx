import * as React from 'react';
import PropTypes from 'prop-types';
import { listStatus } from '@config';
import { useNavigation, useTheme } from '@react-navigation/native';
import { View, TouchableOpacity, ViewPropTypes, DeviceEventEmitter } from 'react-native';
import Text from '../Text';
import Badge from '../Badge';
import Icon from '../Icon';
import Dot from '../Dot';
import { ROUTES } from '@config';
import styles from './styles';
import { currencyFormatter, determineWhichNumber } from '@config';
import moment from 'moment';





function ItemOrder(props) {
	const { colors } = useTheme();
	const { navigate } = useNavigation();

	const { item, goBack, containerStyle, getMySelectedOrders, deliveries, stockOrder } = props;
	if (!item) {
		return null;
	}
	// const {number, status, date_created, line_items, name} = item;
	const { status, orderNumber, metadata, totalItems, createdAt, productsData, totalAmount, invoice, fullName } = item;
	let getStatus;
	if (deliveries) {
	} else {
		if (!props.losses) {
			getStatus = listStatus.find((dataStatus) => dataStatus.value === status.toLowerCase());
		}
	}
	// ?? listStatus[0];
	// let nameProducts = productsData
	//   .map((product) => {
	//     return `${product.name} x ${product.quantity}...`;
	//   })
	//   .join(', ');

	return props.losses ? (
		<TouchableOpacity
			style={[styles.container, containerStyle]}
			onPress={() => {
				props.getLossesExpensesDetails(item);

				navigate(ROUTES.ExpenseDetails);
			}}
		>
			<Icon name="receipt" color="#37C2D0" />
			<View style={[styles.right, { borderColor: colors.border }]}>
				<View style={styles.viewNumber}>
					<Text bold>
						invoice: {'  '} # {item.invoiceNumber}
					</Text>

					{props.losses ? (
						props.expenses ? (
							<Badge value={'Expenses'} type={'error'} containerStyle={styles.badge} />
						) : (
							<Badge value={'Loss'} type={'error'} containerStyle={styles.badge} />
						)
					) : null}

					{/* <Badge
            value={getStatus.name}
            type={getStatus.type}
            containerStyle={styles.badge}
          /> */}
				</View>
				<Text bold style={{ color: '#37C2D0' }}>
					{item.fullName}
				</Text>
				<View style={styles.time}></View>
				{props.expenses ? (
					<>
						<View style={[styles.viewProduct, { alignItems: 'center' }]}>
							<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ color: '#7F8FA6', fontSize: 12 }}> Title{'     '}</Text>
								<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
									{item.title}
								</Text>
							</View>
						</View>
					</>
				) : (
					<>
						<View style={[styles.viewProduct, { alignItems: 'center' }]}>
							<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ color: '#7F8FA6', fontSize: 12 }}> Product{'     '}</Text>
								<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
									{item.productName}
								</Text>
							</View>
						</View>
					</>
				)}

				<View style={[styles.viewProduct, { alignItems: 'center' }]}>
					<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ color: '#7F8FA6', fontSize: 12 }}> Amount {'    '} </Text>
						<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
							{currencyFormatter(item.amount)}
						</Text>
					</View>
				</View>

				{props.expenses ? null : (
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={[styles.viewProduct, { alignItems: 'center' }]}>
							<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ color: '#7F8FA6', fontSize: 12 }}>Quantity {'    '} </Text>
								<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
									{item.quantity}
								</Text>
							</View>
						</View>
					</View>
				)}

				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={[styles.viewProduct, { alignItems: 'center' }]}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ color: '#7F8FA6', fontSize: 12 }}></Text>
							<Text style={{ fontSize: 12 }}></Text>
						</View>
					</View>
					<Text style={{ color: '#7F8FA6', fontSize: 11, top: 5 }}>
						{moment(item.createdAt.toDate()).fromNow()}

						{/* {moment(item.createdAt).format('ddd  Do  MMM  YYYY, hh:mm a')} */}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	) : (
		<TouchableOpacity
			style={[styles.container, containerStyle]}
			onPress={() => {
				props.adminShop
					? (() => {
							stockOrder ? (item.rendertype = 'stock') : (item.rendertype = 'deliveries');
							getMySelectedOrders(item);
							DeviceEventEmitter.addListener('event.reloadDeliveries', () => props.handleRefresh());

							navigate(ROUTES.OrderDetails);
					  })()
					: (() => {})();

				// getMySelectedOrders(item);
				// navigate(ROUTES.OrderDetails);
			}}
		>
			<Icon name="receipt" color="#37C2D0" />
			<View style={[styles.right, { borderColor: colors.border }]}>
				<View style={styles.viewNumber}>
					{deliveries ? <Text bold>invoice: #{invoice}</Text> : <Text bold>Order ID: #{orderNumber}</Text>}
					{stockOrder ? (
						<Badge value={'Stock'} type={'success'} bg={'stock'} containerStyle={styles.badge} />
					) : deliveries ? (
						<Badge value={'Deliveries'} type={'success'} bg={'deliveries'} containerStyle={styles.badge} />
					) : (
						<Badge value={getStatus.name} type={getStatus.type} containerStyle={styles.badge} />
					)}
					{/* <Badge
            value={getStatus.name}
            type={getStatus.type}
            containerStyle={styles.badge}
          /> */}
				</View>
				<Text bold style={{ color: '#37C2D0' }}>
					{stockOrder ? fullName : deliveries ? fullName : metadata.adimFullName}
				</Text>
				<View style={styles.time}>
					<Text>{/* {getTimeDate(date_created)} */}</Text>
				</View>
				{deliveries ? (
					<>
						<View style={[styles.viewProduct, { alignItems: 'center' }]}>
							<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ color: '#7F8FA6', fontSize: 12 }}> Type {'     '}</Text>
								<Text semibold style={{ fontSize: 12 }}>
									{item.type}
								</Text>
							</View>
						</View>

						<View style={[styles.viewProduct, { alignItems: 'center' }]}>
							<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ color: '#7F8FA6', fontSize: 12 }}> Generated Profit {'     '}</Text>
								<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
									{currencyFormatter(
										item.products
											.map(
												(x) =>
													determineWhichNumber(x.salePrice).value *
													determineWhichNumber(x.quantity).value *
													determineWhichNumber(x.InCase).value
											)
											.reduce((a, b) => a + b) -
											item.products
												.map((x) => determineWhichNumber(x.amount).value)
												.reduce((a, b) => a + b)
									)}
								</Text>
							</View>
						</View>
					</>
				) : null}

				<View style={[styles.viewProduct, { alignItems: 'center' }]}>
					<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ color: '#7F8FA6', fontSize: 12 }}> Total Amount {'     '}</Text>
						<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
							{deliveries
								? currencyFormatter(
										item.products
											.map((x) => determineWhichNumber(x.amount).value)
											.reduce((a, b) => a + b)
								  )
								: currencyFormatter(totalAmount)}
						</Text>
					</View>
				</View>

				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={[styles.viewProduct, { alignItems: 'center' }]}>
						<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ color: '#7F8FA6', fontSize: 12 }}>Items {'     '}</Text>
							<Text style={{ fontSize: 12 }}>
								{deliveries
									? item.products
											.map((x) => determineWhichNumber(x.quantity).value)
											.reduce((a, b) => a + b)
									: totalItems}
							</Text>
						</View>
					</View>
					<Text style={{ color: '#7F8FA6', fontSize: 11, top: 5 }}>
						{moment(createdAt.toDate()).fromNow()}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
export function ItemDebt(props) {
	const { colors } = useTheme();
	const { navigate } = useNavigation();

	const { item, goBack, containerStyle, getMySelectedOrders, deliveries, stockOrder } = props;
	if (!item) {
		return null;
	}
	// const {number, status, date_created, line_items, name} = item;
	const { status, orderNumber, metadata, totalItems, createdAt, productsData, totalAmount, invoice, fullName } = item;
	let getStatus;
	if (deliveries) {
	} else {
		if (!props.losses) {
			getStatus = listStatus.find((dataStatus) => dataStatus.value === status.toLowerCase());
		}
	}
	// ?? listStatus[0];
	// let nameProducts = productsData
	//   .map((product) => {
	//     return `${product.name} x ${product.quantity}...`;
	//   })
	//   .join(', ');

	return (
		<TouchableOpacity activeOpacity={1} style={[styles.container, containerStyle]}>
			<Icon name="receipt" color="#37C2D0" />
			<View style={[styles.right, { borderColor: colors.border }]}>
				<View style={styles.viewNumber}>
					<Text bold>{item.name}</Text>

					<Badge value={'Status'} type={'success'} containerStyle={styles.badge} />
				</View>
				<View style={{ flexDirection: 'row', marginBottom: 15 }}>
					<Text style={{ color: '#7F8FA6', fontSize: 11, top: 5 }}>
						{moment(createdAt.toDate()).format('ddd  Do  MMM  YYYY, hh:mm')}
					</Text>
				</View>
				<View style={[styles.viewProduct, { alignItems: 'center' }]}>
					<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ color: '#7F8FA6', fontSize: 12 }}> mobile {'     '}</Text>
						<Text semibold style={{ fontSize: 12 }}>
							{item.mobile}
						</Text>
					</View>
				</View>

				<View style={[styles.viewProduct, { alignItems: 'center' }]}>
					<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ color: '#7F8FA6', fontSize: 12 }}> amount {'     '}</Text>
						<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
							{currencyFormatter(item.amount)}
						</Text>
					</View>
				</View>

				<View style={[styles.viewProduct, { alignItems: 'center' }]}>
					<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ color: '#7F8FA6', fontSize: 12 }}> Return Date {'     '}</Text>
						<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
							{moment(item.returnDate.toDate()).format('ddd  Do  MMM  YYYY, hh:mm')}
						</Text>
					</View>
				</View>

				<View style={[styles.viewProduct, { alignItems: 'center' }]}>
					<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
					<View style={{ flexDirection: 'row' }}>
						<View style={{ width: '50%' }}>
							<Text style={{ color: '#7F8FA6', fontSize: 12 }}> Description {'     '}</Text>
						</View>

						<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
							{item.description}
						</Text>
					</View>
				</View>

				<View style={[styles.viewProduct, { alignItems: 'center' }]}>
					<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
					<View style={{ flexDirection: 'row' }}>
						<View>
							<Text style={{ color: '#7F8FA6', fontSize: 12 }}>
								{console.log(item.metadata)}
								Recorded by {'     '}
							</Text>
						</View>

						<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
							{item.metadata.recordUser.name}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export function ClientsOrdersItem(props) {
	const { colors } = useTheme();
	const { navigate } = useNavigation();

	const { item, goBack, containerStyle, getMySelectedOrders, deliveries, stockOrder } = props;
	if (!item) {
		return null;
	}
	// const {number, status, date_created, line_items, name} = item;
	const { status, orderNumber, metadata, totalItems, createdAt, productsData, totalAmount, invoice, fullName } = item;
	let getStatus;
	if (deliveries) {
	} else {
		if (!props.losses) {
			getStatus = listStatus.find((dataStatus) => dataStatus.value === status.toLowerCase());
		}
	}
	// ?? listStatus[0];
	// let nameProducts = productsData
	//   .map((product) => {
	//     return `${product.name} x ${product.quantity}...`;
	//   })
	//   .join(', ');

	return  (
		<TouchableOpacity
			style={[styles.container, containerStyle]}
			onPress={() => {
				 props.getCurrentFromHomeOrders(item);
				navigate(ROUTES.ClientsOrderDetails);
			}}
		>
			<Icon name="receipt" color="#37C2D0" />
			<View style={[styles.right, { borderColor: colors.border }]}>
				<View style={styles.viewNumber}>
					<Text bold>
						invoice: {'  '} # {item.invoice}
					</Text>

					
							<Badge value={'Pending'} type={'warning'} containerStyle={styles.badge} />
						
   
					{/* <Badge2
            value={getStatus.name}
            type={getStatus.type}
            containerStyle={styles.badge}
          /> */}
				</View>
				<Text bold style={{ color: '#37C2D0' }}>
					{item.fullName}
				</Text>

				<View style={{ backgroundColor: 'rgba(55,194,208,0.4)',width:'30%',marginTop:5,borderRadius:5,marginLeft:25}}>
						{/* <Text  style={{ color: '#000' ,textAlign:'center'}}>

							{item.mobile}  
						</Text> */}
				</View>
				<View style={styles.time}></View>
					{/* <>
						<View style={[styles.viewProduct, { alignItems: 'center' }]}>
							<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ color: '#7F8FA6', fontSize: 12 }}> User{'     '}</Text>
								<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
									{item.title}
								</Text>
							</View>
						</View>
					</> */}
				

				<View style={[styles.viewProduct, { alignItems: 'center' }]}>
					<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
					<View style={{ flexDirection: 'row' }}>
						<Text style={{ color: '#7F8FA6', fontSize: 12 }}> Amount {'    '} </Text>
						<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
							{currencyFormatter(item.totalAmount)}
						</Text>
					</View>
				</View>

				
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={[styles.viewProduct, { alignItems: 'center' }]}>
							<Dot color={colors.border} size={8} borderWidth={0} style={styles.dot} />
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ color: '#7F8FA6', fontSize: 12 }}>Quantity {'    '} </Text>
								<Text semibold style={{ color: '#37C2D0', fontSize: 12 }}>
									{item.totalItems}
								</Text>
							</View>
						</View>
					</View>
			

				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={[styles.viewProduct, { alignItems: 'center' }]}>
						<View style={{ flexDirection: 'row' }}>
							<Text style={{ color: '#7F8FA6', fontSize: 12 }}></Text>
							<Text style={{ fontSize: 12 }}></Text>
						</View>
					</View>
					<Text style={{ color: '#7F8FA6', fontSize: 11, top: 5 }}>
						{moment(item.createdAt.toDate()).fromNow()}

						{/* {moment(item.createdAt).format('ddd  Do  MMM  YYYY, hh:mm a')} */}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

ItemOrder.propTypes = {
	item: PropTypes.object.isRequired,
	containerStyle: ViewPropTypes.style,
};

ItemOrder.defaultProps = {
	containerStyle: {},
};

export default ItemOrder;

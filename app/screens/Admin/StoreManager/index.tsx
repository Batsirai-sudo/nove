import React, {useState, useEffect, useContext} from 'react';
import {
  TouchableOpacity,
  View,
  StatusBar,
  processColor,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {useTheme, useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ROUTES} from '@config';
import {
  TextComponent as Text,
  StoreManagerCard as Card,
  RNParallax,
  SearchBar,
} from '@components';
import {Colors, dimensions, FONTS} from '@utils';
import {PieChart} from 'react-native-charts-wrapper';
import {AdminContext, CommonContext} from '@context';
import LinearGradient from 'react-native-linear-gradient';
import {SvgArrowBack} from '@svg-components';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 84;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const {width_screen} = dimensions;

const screenWidth = width_screen;
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  // strokeWidth: 2, // optional, default 3
  // barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const iconColor = '#5e6367';
const screenData = [
  {
    title: 'Profits',
    icon: <FontAwesome5 name="money-bill-wave" size={29} color={'#9993C1'} />,
    route: ROUTES.ProfitsProfile,
    color: '#E9E7F8',
  },
  {
    title: 'Deliveries',
    icon: (
      <MaterialCommunityIcons name="typewriter" size={29} color={'#E2C69C'} />
    ),
    route: ROUTES.RecordDeliveredStock,
    color: '#FBF5DA',
  },
  {
    title: 'Write Stock ',
    icon: <FontAwesome name="pencil-square-o" size={29} color={'#A0BB49'} />,
    route: ROUTES.WriteStock,
    color: '#F3F8E8',
  },
  {
    title: 'Losses',
    icon: (
      <FontAwesome5 name="sort-amount-down-alt" size={29} color={'#61C7Cb'} />
    ),
    route: ROUTES.LossRecords,
    color: '#E1FDFC',
  },
  {
    title: 'Expenses',
    icon: <MaterialIcons name="trending-down" size={29} color={'#EDA2A5'} />,
    route: ROUTES.ExpenseRecords,
    color: '#FEEEED',
  },
  {
    title: 'Users',
    icon: (
      <MaterialCommunityIcons
        name="account-group"
        size={29}
        color={'#EDA2A5'}
      />
    ),
    route: ROUTES.ShopUsers,
    color: '#FBE7FD',
  },
  {
    title: 'Reports',
    icon: <FontAwesome5 name="coins" size={29} color={'#DBB3E9'} />,
    route: ROUTES.ReportsTabScreenTab,
    color: '#F8F0Fe',
  },
  {
    title: 'Stock Taking',
    icon: <Ionicons name="ios-documents" size={29} color={'#81B6D0'} />,
    route: ROUTES.StartStockTaking,
    color: '#EEF4FE',
  },
  {
    title: 'Debts',
    icon: <Ionicons name="book" size={29} color={'#9993C1'} />,
    route: ROUTES.Credits,
    color: '#E9E7F8',
  },
  {
    title: 'Add Products',
    icon: <FontAwesome5 name="plus" color="#61C7Cb" size={29} />,
    // icon: <FontAwesome5 name="box-open" size={29} color={'#61C7Cb'} />,
    route: ROUTES.AddProducts,
    color: '#E1FDFC',
  },
  {
    title: 'Products',
    icon: <Fontisto name="shopping-basket-add" color="#61C7Cb" size={29} />,
    // icon: <FontAwesome5 name="box-open" size={29} color={'#61C7Cb'} />,
    route: ROUTES.Products,
    color: '#E1FDFC',
  },
];
const StoreManager = () => {
  const {colors} = useTheme();
  const {getSpecificshop, currentShoplistSelected} = useContext(AdminContext);
  const {getMyCurrentShop, createWeek} = useContext(CommonContext);
  const [loading, setLoading] = useState(true);
  const {navigate, goBack} = useNavigation();
  const [data, setData] = useState({});
  const [shopDetails, setShopDetails] = useState({});
  const [shopID, setShopID] = useState();
  const handleSelect = (event) => {
    let entry = event.nativeEvent;

    if (entry == null) {
      setData({...data, selectedEntry: null});
    } else {
      setData({...data, selectedEntry: JSON.stringify(entry)});
    }
  };

  useEffect(() => {
    getSpecificshop(currentShoplistSelected.id).then((response) => {
      setShopDetails(response.data());
      getMyCurrentShop({...response.data(), id: response.id});

      setShopID(response.id);
      setData({
        legend: {
          enabled: true,
          textSize: 15,
          form: 'CIRCLE',

          horizontalAlignment: 'RIGHT',
          verticalAlignment: 'CENTER',
          orientation: 'VERTICAL',
          wordWrapEnabled: true,
        },
        data: {
          dataSets: [
            {
              values: [
                {value: response.data().statistics.profits, label: 'Profits'},
                {value: response.data().statistics.expenses, label: 'Expenses'},
                {value: response.data().statistics.losses, label: 'Losses'},
              ],
              label: 'Usage Dataset',
              config: {
                colors: [
                  processColor('#C0FF8C'),
                  processColor('#FF8C9D'),
                  // processColor('#FFD08C'),
                  processColor('#8CEAFF'),
                  // processColor('#FF8C9D'),
                ],
                valueTextSize: 20,
                valueTextColor: processColor('green'),
                sliceSpace: 5,
                selectionShift: 13,
                // xValuePosition: "OUTSIDE_SLICE",
                // yValuePosition: "OUTSIDE_SLICE",
                valueFormatter: "#.#'%'",
                valueLineColor: processColor('green'),
                valueLinePart1Length: 0.5,
              },
            },
          ],
        },
        highlights: [{x: 2}],
        description: {
          text: ' Pie chart  store statistics description',
          textSize: 15,
          textColor: processColor('darkgray'),
        },
      });
      setLoading(false);
    });
  }, []);

  const renderContent = () => {
    return (
      <View
        style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
        <ScrollView>
          <View style={styles.cardTopView}>
            {screenData.map((s, i) => (
              <CardComponent
                key={i}
                icon={s.icon}
                onPress={() => {
                  s.title === 'Add Products'
                    ? navigate(s.route, {id: shopID})
                    : navigate(s.route);
                }}
                title={s.title}
                color={s.color}
              />
            ))}
          </View>
          <View style={{height: 522, width: '100%'}}>
            <PieChart
              style={{flex: 1}}
              logEnabled={true}
              chartBackgroundColor={processColor(colors.thirdBackground)}
              chartDescription={data.description}
              data={data.data}
              legend={data.legend}
              highlights={data.highlights}
              extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}
              entryLabelColor={processColor('green')}
              entryLabelTextSize={20}
              entryLabelFontFamily={'HelveticaNeue-Medium'}
              drawEntryLabels={true}
              rotationEnabled={true}
              rotationAngle={45}
              usePercentValues={true}
              styledCenterText={{
                text: 'Stats',
                color: processColor('pink'),
                fontFamily: 'HelveticaNeue-Medium',
                size: 20,
              }}
              centerTextRadiusPercent={100}
              holeRadius={40}
              holeColor={processColor('#f0f0f0')}
              transparentCircleRadius={45}
              transparentCircleColor={processColor('#f0f0f088')}
              maxAngle={350}
              onSelect={handleSelect}
              onChange={(event) => console.log(event.nativeEvent)}
            />
          </View>
          {/* )} */}
        </ScrollView>
      </View>
    );
  };
  const renderNavBar = () => (
    <LinearGradient
      style={{height: HEADER_HEIGHT}}
      colors={['#F05F3E', '#ED3269']}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity
          style={{left: 20, top: 10}}
          onPress={() => {
            goBack();
          }}>
          <SvgArrowBack />
        </TouchableOpacity>
        <TouchableOpacity style={{right: 30, top: 13}} onPress={() => {}}>
          <Text medium style={{color: 'white'}}>
            {shopDetails.name}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
  const title = () => {
    return (
      <>
        <Text medium whiteColor style={{bottom: 20, fontSize: 25}}>
          {shopDetails.name}
        </Text>

        <Card cornerRadius={25} style={{height: 50, width: '80%'}}>
          <TouchableOpacity
            onPress={() => {
              navigate(ROUTES.SearchApp);
            }}>
            <SearchBar placeHolder={'Search ...'} editable={false} />
          </TouchableOpacity>
        </Card>
      </>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" hidden={false} translucent={true} />
      <RNParallax
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={250}
        extraScrollHeight={20}
        // navbarColor="#3498db"
        navbarColor="transparent"
        titleStyle={styles.titleStyle}
        title={title()}
        backgroundColor={'#000'}
        // backgroundImage={require('./cube.jpg')}
        //   uri:
        //     // 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
        // }}
        backgroundImageScale={1.2}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        alwaysShowTitle={false}
        alwaysShowNavBar={false}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          onScrollEndDrag: () => console.log('onScrollEndDrag'),
        }}
      />
    </>
  );
};

const CardComponent = (props) => {
  const [elevation] = useState(3);

  return (
    <View style={styles.cardContainer}>
      <Card
        onPress={props.onPress}
        cornerRadius={15}
        elevation={elevation}
        style={[styles.card, {backgroundColor: props.color}]}>
        {props.icon}
      </Card>
      <Text style={{textAlign: 'center', fontSize: 12, color: '#556084'}}>
        {props.title}
      </Text>
    </View>
  );
};

export default StoreManager;

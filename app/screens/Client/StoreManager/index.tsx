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
import {dimensions} from '@utils';
import {PieChart} from 'react-native-charts-wrapper';
import {ClientContext} from '@context';
import LinearGradient from 'react-native-linear-gradient';
import {SvgArrowBack} from '@svg-components';
import ProgressBar from 'react-native-progress/Bar';

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

const data45 = [
  {
    name: 'Profits',
    population: 52,
    color: '#9993C1',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Expenses',
    population: 40,
    color: '#EDA2A5',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Losses',
    population: 80,
    color: '#61C7Cb',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];
const iconColor = '#5e6367';
const screenData = [
  {
    title: 'Profits',
    icon: <FontAwesome5 name="money-bill-wave" size={29} color={'#9993C1'} />,
    route: ROUTES.ProfitsProfile,
    color: '#E9E7F8',
  },
  {
    title: ' Deliveries',
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
    title: 'Losses ',
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
    title: 'Reports',
    icon: <FontAwesome5 name="coins" size={29} color={'#DBB3E9'} />,
    route: ROUTES.Reports,
    color: '#F8F0Fe',
  },
  {
    title: 'Stock Taking',
    icon: <Ionicons name="ios-documents" size={29} color={'#81B6D0'} />,
    route: ROUTES.StartStockTaking,
    color: '#EEF4FE',
  },
  {
    title: 'Credits',
    icon: <Ionicons name="book" size={29} color={'#9993C1'} />,
    route: ROUTES.StartStockTaking,
    color: '#E9E7F8',
  },
  {
    title: 'Add Products',
    icon: <Fontisto name="shopping-basket-add" color="#61C7Cb" size={29} />,
    // icon: <FontAwesome5 name="box-open" size={29} color={'#61C7Cb'} />,
    route: ROUTES.AddProducts,
    color: '#E1FDFC',
  },
  // {
  //   title: 'Daily Deliveries',
  //   icon: <Ionicons name="ios-documents" size={29} color={'#61C7Cb'} />,
  //   route: ROUTES.StockTaking,
  //   color: '#E1FDFC',
  // },
];
const StoreManager = () => {
  const {colors} = useTheme();
  const {getSpecificshop} = useContext(ClientContext);
  const [graphStats, setGraphStats] = useState({});
  const [loading, setLoading] = useState(true);
  const {navigate, goBack} = useNavigation();
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [shopID, setShopID] = useState();

  const [shopDetails, setShopDetails] = useState({});
  const handleSelect = (event) => {
    let entry = event.nativeEvent;

    if (entry == null) {
      setData({...data, selectedEntry: null});
    } else {
      setData({...data, selectedEntry: JSON.stringify(entry)});
    }
  };

  useEffect(() => {
    setLoading(true);

    getSpecificshop().then((response) => {
      setShopDetails(response.data());
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
    // navigation.setOptions({
    //   headerTitle: () => (
    //     <View style={styles.topTxtView}>
    //       <FontAwesome5 name="store" size={29} color={'#37C2D0'} />
    //       <Text medium style={[styles.txt, {color: '#37C2D0', marginLeft: 10}]}>
    //         Tarven
    //       </Text>
    //       <Text medium style={styles.txt}>
    //         Shop
    //       </Text>
    //     </View>
    //   ),
    // });
  }, []);

  const percentageCalculate = () => {};
  const renderContent = () => {
    return (
      <View
        style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
        {/* <View style={styles.topTxtView}>
          <FontAwesome5 name="store" size={29} color={'#37C2D0'} />
          <Text medium style={[styles.txt, {color: '#37C2D0', marginLeft: 10}]}>
            {shopName}
          </Text>
          <Text medium style={styles.txt}>
            Shop
          </Text>
        </View> */}
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
          {/* {loading ? null : ( */}
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
          <Text style={{color: 'white'}}>{shopDetails.name}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
  const title = () => {
    return (
      <>
        <Text style={{color: 'white', fontSize: 30, marginBottom: 20}}>
          {shopDetails.name}
        </Text>

        <Card cornerRadius={25} style={{height: 50, width: '80%'}}>
          <TouchableOpacity
            onPress={() => {
              navigate(ROUTES.SearchApp);
            }}>
            <SearchBar
              placeHolder={'Search ...'}
              editable={false}
              onChangeText={
                (value) => {}
                // handleFilter('search', value)
              }
              // onClear={setValue}
              onFocus={() => {
                // setValue(true);
              }}
            />
          </TouchableOpacity>
        </Card>
        {loading ? (
          <ProgressBar
            style={{position: 'absolute', bottom: -9}}
            progress={0.3}
            color="#9993C1"
            indeterminate={true}
            width={width_screen + 30}
          />
        ) : null}
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
      <Text style={{textAlign: 'center', fontSize: 12}}>{props.title}</Text>
    </View>
  );
};

export default StoreManager;

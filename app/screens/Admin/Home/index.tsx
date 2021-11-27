import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  Button,
  Vibration,
  BackHandler,
  Platform,
} from 'react-native';
import {AdminContext} from '@context';
import {Card} from 'react-native-shadow-cards';
import styles from './styles';
import {useSelector} from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {
  TextComponent,
  CardComponent,
  BottomModal,
  Header,
  SearchBar,
  Dialog,
} from '@components';
import {useNavigation} from '@react-navigation/native';
import {ROUTES, LoopThroughMonths} from '@config';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {AdminActions} from '@actions';
import {useDispatch} from 'react-redux';
// import RNBeep from 'react-native-a-beep';
// import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const filters = [
  {
    name: 'Last 7 days',
    status: '',
  },
  {
    name: 'Last Month',
    status: 'month',
  },
  {
    name: 'Last Year',
    status: 'year',
  },
];

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

const PATTERN_DESC =
  Platform.OS === 'android'
    ? 'wait 1s, vibrate 2s, wait 3s'
    : 'wait 1s, vibrate, wait 2s, vibrate, wait 3s';
const Home = (props) => {
  const {getMyshops, getShopDataArray} = useContext(AdminContext);
  const [type, setType] = useState('');
  const [shops, setShops] = useState([1]);
  const user = useSelector((state) => state.auth.user);
  const [filterType, setFilterType] = useState(filters[0].name);
  const {colors} = useTheme();
  const {navigate} = useNavigation();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(new Date().getDay());

    SplashScreen.hide();
    loadingShops();
  }, []);

  const loadingShops = () => {
    getMyshops().then((response) => {
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          key: result.id,
          storeType: result.data().storeType,
          profit: result.data().statistics.profits,
          name: result.data().name,
        });
      });
      getShopDataArray(firestoreData);

      const first = [...new Set(firestoreData.map((x) => x.storeType.name))];
      let getNewSet = [];
      first.map((x) => {
        firestoreData.map((y) => {
          if (y.storeType.name === x) {
            return getNewSet.map((z) => z.storeType).includes(x)
              ? getNewSet.map((w, i) => {
                  getNewSet[i].totalProfit = firestoreData
                    .filter((g) => g.storeType.name === w.storeType)
                    .map((o) => o.profit)
                    .reduce((a, b) => a + b);
                })
              : getNewSet.push({storeType: y.storeType.name, totalProfit: ''});
          }
        });
      });

      setShops(getNewSet);

      setVisible(true);
    });
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        setDialogVisible(true);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View>
      <Header
        leftComponent={
          <TouchableOpacity
            style={{
              left: -10,
              height: 50,
              width: 50,
              alignItems: 'center',
              top: -5,
            }}
            onPress={() => navigation.openDrawer()}>
            <AntDesign style={{}} name="menu-unfold" size={24} color="white" />
          </TouchableOpacity>
        }
      />
      <Dialog
        firstButtonTextStyles={{color: colors.primary, fontWeight: '600'}}
        secondButtonTextStyles={{color: 'red', fontWeight: '600'}}
        content="Hold on!', 'Are you sure you want to Exit App?"
        title="Exit App "
        titleTextStyles={{fontWeight: '600'}}
        firstButtonOnPress={() => BackHandler.exitApp()}
        secondButtonOnPress={() => setDialogVisible(false)}
        onSwipefunc={() => setDialogVisible(false)}
        onTouchOutside={() => setDialogVisible(false)}
        secondButtontext="Cancel"
        firstButtontext="Yes"
        modalVisible={dialogVisible}
        animation="scale"
      />
      <ScrollView
        contentContainerStyle={[
          styles.mainContainer,
          {backgroundColor: colors.thirdBackground},
        ]}>
        <View style={styles.secondTopView}>
          <View>
            <TextComponent regular style={styles.accountText}>
              All Reports {user.uid}
            </TextComponent>
          </View>
        </View>
        {/* <Button
          onPress={() => {
            RNBeep.beep();
          }}
          title="Beep Success"></Button>
        <Button
          onPress={() => {
            RNBeep.beep(false);
          }}
          title="Beep Fail"></Button>
        <Button
          onPress={() => {
            RNBeep.PlaySysSound(RNBeep.AndroidSoundIDs.TONE_CDMA_ABBR_ALERT);
          }}
          title="Beep Android Custom"></Button>
        <Button
          onPress={() => {
            RNBeep.PlaySysSound(41);
          }}
          title="Beep Something"></Button>
        <Button
          onPress={() => {
            RNBeep.PlaySysSound(RNBeep.iOSSoundIDs.AudioToneBusy);
          }}
          title="Beep iOS Custom"></Button>
        */}

        <View style={styles.cardContainer}>
          <View style={styles.container}>
            {shops.map((shop, index) => (
              <ShimmerPlaceHolder
                visible={visible}
                shimmerStyle={{
                  // alignSelf: 'center',
                  marginHorizontal: 7,
                  marginVertical: 7,
                  borderRadius: 15,
                  width: 140,
                  height: 140,
                }}>
                {visible ? (
                  <CardComponent
                    key={index}
                    shopType={`${shop.storeType} Shops`}
                    isClients={false}
                    onPress={() => {
                      navigate(ROUTES.AdminShopList, {
                        type: shop.storeType,
                      });
                    }}
                    profits={shop.totalProfit}>
                    <Ionicons name="ios-beer" size={24} color="white" />
                  </CardComponent>
                ) : null}
              </ShimmerPlaceHolder>
            ))}

            <CardComponent
              // isClients={true}
              onPress={() => {
                navigate(ROUTES.SelectedShop, {type: 'POS'});
              }}
              orders="POINT"
              subtitle="OF SELL">
              <Fontisto name="shopping-pos-machine" size={30} color="white" />
            </CardComponent>
            <CardComponent
              // isClients={true}
              onPress={() =>
                navigate(ROUTES.OrdersTabScreen, {type: 'clients'})
              }
              orders="MANAGE"
              subtitle="ORDERS"
              // productScan="ORDERS"
              orderstag="You have">
              <View>
                <Entypo name="text-document" size={24} color="white" />
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#E32378',
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    left: 25,
                    top: -10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TextComponent bold style={{fontSize: 10, color: '#fff'}}>
                    1
                  </TextComponent>
                </View>
              </View>
            </CardComponent>
            <CardComponent
              // isClients={true}
              orders="EXPENSES "
              subtitle="& LOSSES"
              onPress={() => {
                navigate(ROUTES.SelectedShop, {type: 'expenses'});
              }}>
              <View>
                <MaterialCommunityIcons
                  name="account-group"
                  size={24}
                  color="white"
                />
              </View>
            </CardComponent>
          </View>
        </View>

        <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons
            style={styles.filter}
            name="tune"
            size={28}
            color="black"
          />
        </TouchableOpacity>
        <View>
          <Card style={styles.chartCart}>
            <Text>{filterType}</Text>
            <LineChart
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ],
                datasets: [
                  {
                    data: [
                      1 * 100,
                      2 * 100,
                      3 * 100,
                      4 * 100,
                      5 * 100,
                      6 * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get('window').width - 60}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgb(220, 220, 220)`,
                labelColor: (opacity = 1) => `#696969`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: '#696969',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </Card>
        </View>
      </ScrollView>
      <View
        style={{
          height: 50,
          position: 'absolute',
          top: 100,
          width: '100%',
          flexDirection: 'row',
        }}>
        <Card cornerRadius={25} style={{left: 15, height: 50, width: '75%'}}>
          <TouchableOpacity
            onPress={() => {
              navigate(ROUTES.SearchApp);
            }}>
            <SearchBar placeHolder={'Search App...'} editable={false} />
          </TouchableOpacity>
        </Card>
        <TouchableOpacity
          onPress={() => {
            navigate(ROUTES.Notifications);
          }}
          style={{width: '25%'}}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#E32378',
              height: 16,
              width: 16,
              borderRadius: 10,
              left: 25,
              top: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextComponent bold style={{fontSize: 10, color: '#fff'}}>
              1
            </TextComponent>
          </View>
          <LottieView source={require('./animation.json')} autoPlay loop />
        </TouchableOpacity>
      </View>

      <View style={{position: 'absolute', top: 30, zIndex: 100}}>
        <LottieView source={require('./animation.json')} autoPlay loop />
      </View>
      <BottomModal
        // visitModal={modal}
        filters={filters}
        valueSelect={type}
        clickFilter={(value) => {
          setType(value);
          if (value === '') {
            setFilterType(filters[0].name);
          }
          if (value === 'month') {
            setFilterType(filters[1].name);
          }
          if (value === 'year') {
            setFilterType(filters[2].name);
          }
        }}
      />
    </View>
  );
};

export default Home;

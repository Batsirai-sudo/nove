import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {AdminContext} from '../../../context/adminContext';
import {Card} from 'react-native-shadow-cards';
import styles from './styles';
import {Images} from '@config';
import {useSelector} from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {FONTS} from '@utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {
  TextComponent,
  CardComponent,
  BottomModal,
  CustomProgressBar,
} from '@components';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import SplashScreen from 'react-native-splash-screen';

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

const Home = ({route, navigation}) => {
  const {adminKey} = useContext(AdminContext);
  const [elevation] = useState(1);
  const [type, setType] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [filterType, setFilterType] = useState(filters[0].name);
  const {colors} = useTheme();
  const {navigate} = useNavigation();
  const setModalVisible = (value) => {
    setTimeout(() => {
      // setModal(false);
    }, 5000);
    setModal(value);
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        hidden={false}
        backgroundColor="#ED3269"
      />

      <ScrollView
        contentContainerStyle={[
          styles.mainContainer,
          {backgroundColor: colors.thirdBackground},
        ]}>
        <View style={styles.topView}>
          <TextComponent regular style={styles.greatingText}>
            Hie, {user.givenName}
          </TextComponent>
          {/* <Image source={Images.power} style={styles.power} /> */}
          <View>
            <MaterialIcons
              style={styles.iconAccount}
              name="notifications-active"
              size={40}
              color="#37C2D0"
            />

            <View
              style={{
                position: 'absolute',
                backgroundColor: 'red',
                height: 18,
                width: 18,
                borderRadius: 18,
                justifyContent: 'center',
                alignItems: 'center',
                left: -5,
              }}>
              <Text style={{color: 'white'}}>1</Text>
            </View>
            {/* <Text style={[styles.accountText, {color: colors.primary}]}>
              {user.account}
            </Text> */}
          </View>
        </View>

        <View style={styles.secondTopView}>
          {/* <TextComponent regular>This Month Reports</TextComponent> */}
          {/* <Image source={Images.power} style={styles.power} /> */}

          <View>
            <TextComponent regular style={styles.accountText}>
              All Reports
            </TextComponent>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.container}>
            <CardComponent
              shopType="Tarven Shop"
              onPress={() => {
                navigate(ROUTES.Tarven);
              }}
              profits="90.00">
              <Ionicons name="ios-beer" size={24} color="white" />
            </CardComponent>

            <CardComponent
              onPress={() => {
                navigate(ROUTES.Grocery);
              }}
              shopType="Grocery Shop"
              profits="90.00">
              <Fontisto name="shopping-store" size={24} color="white" />
            </CardComponent>
            {/* <Card cornerRadius={15} elevation={elevation} style={styles.card}>
              <TouchableOpacity style={styles.touch}>
                <Text style={{fontFamily: FONTS.Regular}}>
                  Open up App.js to start working on your app!
                </Text>
                <Text style={{fontFamily: FONTS.Regular}}>
                  Changes you make will automatically reload.
                </Text>
              </TouchableOpacity>
            </Card>
            <Card cornerRadius={15} elevation={elevation} style={styles.card}>
              <TextComponent regular>
                Open up App.js to start working on your app
              </TextComponent>
              <Text>Changes you make will automatically reload.</Text>
            </Card> */}

            {/* <Card style={{padding: 10, margin: 10}}>
          <Button
            onPress={() => {}}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </Card>
        <Card style={{padding: 10, margin: 10, height: 50}}></Card> */}
          </View>

          <View style={styles.container}>
            <CardComponent
              onPress={() => {
                navigate(ROUTES.ScanProducts);
              }}
              shopType="Scan Product">
              <AntDesign name="scan1" size={24} color="white" />
            </CardComponent>

            <CardComponent shopType="Orders" orders="24" orderstag="You have">
              <View>
                <Entypo name="text-document" size={24} color="white" />
                <View
                  style={{
                    position: 'absolute',
                    height: 15,
                    width: 62,
                    left: 25,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}>
                  <TextComponent bold style={{fontSize: 10, color: 'white'}}>
                    new orders
                  </TextComponent>
                </View>
              </View>
            </CardComponent>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
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
              width={Dimensions.get('window').width - 60} // from react-native
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

      <BottomModal
        // visitModal={modal}
        setModalVisible={setModalVisible}
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
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default Home;

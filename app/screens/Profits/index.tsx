import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ViewPropTypes,
  Animated,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Card} from 'react-native-shadow-cards';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TextComponent as Text} from '@components';
import {CommonContext} from '@context';
import {currencyFormatter} from '@config';
import moment from 'moment';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Profits = () => {
  const {colors} = useTheme();
  const [availableProfit, setAvailableProfit] = useState('');
  const [visible, setVisible] = useState(false);
  const [recentProfitCalcu, setRecentProfitCalcu] = useState('');
  const {getAvailableProfit, getRecentProfitCalculation} = useContext(
    CommonContext,
  );

  useEffect(() => {
    setVisible(false);
    Promise.all([getAvailableProfit(), getRecentProfitCalculation()]).then(
      (response) => {
        setAvailableProfit(response[0].data().statistics.profits);
        setRecentProfitCalcu(
          response[1].docs.length > 0 ? response[1].docs[0].data() : '',
        );
        setVisible(true);
      },
    );
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
      <View>
        <ShimmerPlaceHolder style={{left: 40, marginTop: 10}} visible={visible}>
          <Text>Recent Profit Report</Text>
        </ShimmerPlaceHolder>
        <ShimmerPlaceHolder
          visible={visible}
          contentStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 15,
            marginLeft: 20,
            marginBottom: 15,
          }}
          shimmerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 15,
            marginLeft: 20,
            marginBottom: 15,
            width: '90%',
          }}>
          <View>
            <Text ultraLight style={{fontSize: 12}}>
              {recentProfitCalcu
                ? moment(recentProfitCalcu.createdAt.toDate()).format(
                    'ddd Do MMM YYYY, hh:mm a',
                  )
                : null}
            </Text>
          </View>
          <View
            style={{
              elevation: 5,
              borderRadius: 10,
              height: 20,
              width: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text bold style={{fontSize: 12}}>
              1
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#556084',
              height: 2,
              width: '50%',
            }}
          />
        </ShimmerPlaceHolder>
      </View>
      <ShimmerPlaceHolder
        visible={visible}
        shimmerStyle={{
          alignSelf: 'center',
          marginVertical: 15,
          width: '90%',
          height: 360,
        }}>
        <ScrollView contentContainerStyle={{height: '100%'}}>
          {recentProfitCalcu ? (
            <View style={styles.trans}>
              <View
                style={{
                  width: '90%',
                  marginVertical: 20,
                  marginHorizontal: 20,
                  height: 10,
                }}>
                <Text style={{color: '#556084'}}>
                  Weekly Number: {'    '}
                  <Text semibold>{recentProfitCalcu.week}</Text>
                </Text>
              </View>
              <TouchableOpacity style={styles.row1}>
                <View style={styles.smallBar} />
                <View style={styles.monthTxt}>
                  <Text style={{color: '#556084'}}>Weekly Summary</Text>
                </View>
                <View style={styles.smallBar} />
              </TouchableOpacity>

              <View style={styles.rowContainer}>
                {recentProfitCalcu.dailyDeliveries ? (
                  <View>
                    <View style={styles.row}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.text}>
                          <Text style={{color: '#556084'}}>
                            Daily Deliveries{' '}
                          </Text>
                        </View>
                      </View>
                      <Text medium>
                        {currencyFormatter(
                          recentProfitCalcu.dailyDeliveries
                            .map((x) => x.totalBuyingAmount)
                            .reduce((a, b) => a + b),
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: '#556084',
                        height: 1,
                      }}
                    />

                    <View style={[styles.row, {marginBottom: 20}]}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.text}>
                          <Text bold style={{color: '#556084', left: 60}}>
                            Generated Profit7
                          </Text>
                        </View>
                      </View>
                      <Text
                        medium
                        style={{color: '#556084', fontWeight: '600'}}>
                        {currencyFormatter(recentProfitCalcu.overalProfit)}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {recentProfitCalcu.weeklyDeliveries ? (
                  <View>
                    <View style={styles.row}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.text}>
                          <Text style={{color: '#556084'}}>
                            Weekly Deliveries{' '}
                          </Text>
                        </View>
                      </View>
                      <Text medium>
                        {currencyFormatter(
                          recentProfitCalcu.weeklyDeliveries
                            .map((x) => x.totalBuyingAmount)
                            .reduce((a, b) => a + b),
                        )}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        backgroundColor: '#556084',
                        height: 1,
                      }}
                    />

                    <View style={[styles.row, {marginBottom: 20}]}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.text}>
                          <Text bold style={{color: '#556084', left: 60}}>
                            Generated Profit
                          </Text>
                        </View>
                      </View>
                      <Text
                        medium
                        style={{color: '#556084', fontWeight: '600'}}>
                        {currencyFormatter(recentProfitCalcu.overalProfit)}
                      </Text>
                    </View>
                  </View>
                ) : null}

                <View style={[styles.row, {marginBottom: 5}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.text}>
                      <Text style={{color: '#556084'}}>Expenses</Text>
                    </View>
                  </View>
                  <Text medium style={{color: 'red'}}>
                    - {currencyFormatter(recentProfitCalcu.expenses)}
                  </Text>
                </View>

                <View style={[styles.row, {marginBottom: 40}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.text}>
                      <Text style={{color: '#556084'}}>Losses</Text>
                    </View>
                  </View>
                  <Text medium style={{color: 'red'}}>
                    - {currencyFormatter(recentProfitCalcu.losses)}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                height: '50%',
                backgroundColor: 'white',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text medium style={{fontSize: 15}}>
                No Profit recorded
              </Text>
              <Text medium style={{fontSize: 15}}>
                this week
              </Text>
            </View>
          )}
          <CardComponent
            icon={
              <FontAwesome5
                name="money-bill-wave"
                size={29}
                color={'#9993C1'}
              />
            }
            style={{marginBottom: 20}}
            onPress={() => {}}
            title={'s.title'}>
            <View style={styles.flex}>
              <View style={{width: '100%', alignItems: 'center'}}>
                <Text style={{fontSize: 25, fontWeight: '600'}}>
                  {currencyFormatter(recentProfitCalcu.overalProfit)}
                </Text>
                <Text style={{fontSize: 10, top: 5, left: 5}}>
                  {currencyFormatter(recentProfitCalcu.overalProfit) === 0
                    ? 'No profit available in shop this week'
                    : 'Shop Available Profit'}
                </Text>
              </View>
            </View>
          </CardComponent>
        </ScrollView>
      </ShimmerPlaceHolder>
      <ShimmerPlaceHolder
        visible={visible}
        shimmerStyle={{height: 100, width: '90%', alignSelf: 'center', top: 10}}
      />
    </View>
  );
};

export default Profits;

const CardComponent = (props) => {
  const [elevation] = useState(10);

  return (
    <View style={styles.cardContainer}>
      <Card
        cornerRadius={5}
        elevation={elevation}
        style={[styles.card, props.style]}>
        {props.children}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {alignItems: 'center'},
  avatar: {
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 40,
    height: 40,
    width: 40,
    backgroundColor: '#37C2D0',
    marginRight: 20,
  },
  rowContainer: {marginHorizontal: 20},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  card: {
    width: '90%',
    padding: 10,
    height: 100,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: '100%',
  },
  flex: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  trans: {
    backgroundColor: 'white',
    marginBottom: 2,
  },
  smallBar: {
    width: '30%',
    backgroundColor: '#556084',
    height: 2,
    alignSelf: 'center',
  },
  monthTxt: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row1: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

function ShimmerItemProduct(props) {
  const [opacity] = React.useState(new Animated.Value(0.3));
  const {colors} = useTheme();
  const {children, style} = props;
  React.useEffect(() => {
    function animateOpacity() {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }).start(animateOpacity);
      });
    }
    animateOpacity();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        shimmerStyles.container,
        style,
        {opacity, backgroundColor: colors.border},
      ]}>
      {children}
    </Animated.View>
  );
}

const shimmerStyles = {
  container: {
    flexGrow: 1,
  },
  image: (color) => ({
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: color,
  }),
  right: (borderColor) => ({
    height: '100%',
    flex: 1,
    marginLeft: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor,
  }),
  line: (color) => ({
    backgroundColor: color,
    borderRadius: 2,
  }),
  name: {
    height: 19,
    marginTop: 12,
  },
  viewPrice: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    height: 24,
    width: 100,
  },
  status: {
    height: 18,
    width: 40,
  },
};

ShimmerItemProduct.propTypes = {
  style: ViewPropTypes.style,
};

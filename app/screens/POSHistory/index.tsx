import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {
  VirtualKeyboard,
  TextComponent as Text,
  SearchBar,
  ShimmerLoading,
  ShimmerHistory,
} from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonContext} from '@context';
import {keyExtractor} from '@helpers';
import moment from 'moment';
import {currencyFormatter, ROUTES} from '@config';
import {useNavigation} from '@react-navigation/native';

const index = () => {
  const {getShopSells, setPosDetailHistory} = useContext(CommonContext);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [loading, setLoading] = useState(true);
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const {navigate} = useNavigation();

  // useEffect(() => {

  //       // this._unsubscribe = this.props.navigation.addListener('focus', () => {

  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetch(currentMonth);
    });
    return unsubscribe;
  }, [navigation]);

  const fetch = (x) => {
    setLoading(true);
    getShopSells(x).then((response) => {
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
        });
      });
      setData(firestoreData);
      setFullData(firestoreData);
      setLoading(false);
      setRefreshing(false);
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetch(currentMonth);
  };

  return (
    <View>
      <SearchBar
        placeHolder={'Search by receipt #, bill...'}
        // value={query}
        onChangeText={(value) => {
          //   handleSearch(value);
        }}
        onClear={(value) => {
          //   handleSearch(value);
        }}
        onFocus={() => {
          //   setValue(true);
        }}
        style={{width: '80%'}}
      />
      {loading ? (
        <ShimmerLoading
          Component={ShimmerHistory}
          style={{marginHorizontal: 15, top: 20}}
          height={110}
        />
      ) : (
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={({item}) => (
            <View style={{}}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  marginTop: 25,
                  marginBottom: 10,
                }}>
                <Text style={{fontSize: 11, color: '#556084'}}>
                  {/* Monday, 19 April 2021 */}
                  {moment(item.createdAt.toDate()).format('dddd, D MMM YYYY')}
                </Text>
                <Text style={{fontSize: 11, color: '#556084'}}>
                  {currencyFormatter(item.todayTotalAmount)}
                </Text>
              </View>
              {item.dailySells.reverse().map((x, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setPosDetailHistory(x);
                    navigate(ROUTES.POSHistoryDetail);
                  }}
                  style={{
                    marginVertical: 5,
                    height: 80,
                    borderWidth: 1,
                    borderColor: '#E8EDF0',
                    width: '100%',
                    backgroundColor: '#F8F9FB',
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{alignItems: 'center', right: 10}}>
                    <Ionicons
                      key={i}
                      name="ios-cash-outline"
                      size={25}
                      color="#85BE79"
                    />
                    <Text style={{fontSize: 10, color: '#85BE79'}}>
                      Approved
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width: '85%',
                    }}>
                    <View style={{left: 5}}>
                      <Text style={{fontSize: 11}}>
                        {moment(x.createdAt.toDate()).format('hh:mm a')}
                        {/* 1:49 am */}
                      </Text>
                      <Text
                        semibold
                        style={{fontSize: 11, marginTop: 10, color: '#556084'}}>
                        {x.user.name}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <View style={{}}>
                        <Text semibold style={{fontSize: 11, color: '#556084'}}>
                          {currencyFormatter(x.totalAmount)}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#556084',
                            marginTop: 10,
                          }}>
                          {x.invoice}
                        </Text>
                      </View>

                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#556084"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListFooterComponent={() => <View style={{height: 200}} />}
        />
      )}

      {/* {data.map((x) => (
           ))} */}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

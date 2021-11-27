import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {
  VirtualKeyboard,
  TextComponent as Text,
  SearchBar,
  Header,
  ShimmerHistory,
} from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {CommonContext} from '@context';
import {keyExtractor} from '@helpers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {currencyFormatter} from '@config';
import {useNavigation} from '@react-navigation/native';

const index = () => {
  const {posDetailHistory} = useContext(CommonContext);
  const [data] = useState(posDetailHistory);

  //'#D3E4EB'
  return (
    <View style={{backgroundColor: '#D5E3F0', height: '100%'}}>
      <Header
        arrow={true}
        color="#000"
        textTitle={{color: '#000'}}
        notGradient={true}
        title={`Sale at ${moment(data.createdAt.toDate()).format('hh:mm a')}`}
      />
      {/* <SearchBar
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
      /> */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',

          backgroundColor: '#fff',
          height: 100,
        }}>
        <View style={{alignItems: 'center', left: 10}}>
          <Ionicons name="ios-cash-outline" size={30} color="#85BE79" />
          <Text style={{fontSize: 10, color: '#85BE79'}}>Approved</Text>
          <Text style={{fontSize: 11, color: '#556084', top: 10, left: 10}}>
            Monday, 19 April 2021
            {/* {moment(item.createdAt.toDate()).format('dddd, D MMM YYYY')} */}
          </Text>
        </View>

        <Text style={{fontSize: 30, color: '#556084', right: 10}}>
          {currencyFormatter(data.totalAmount)}
          {/* {currencyFormatter(item.todayTotalAmount)} */}
        </Text>
      </View>

      <FlatList
        keyExtractor={keyExtractor}
        contentContainerStyle={{marginTop: 10}}
        data={data.items}
        renderItem={({item}) => (
          <View style={{}}>
            <TouchableOpacity
              // onPress={this.props.onPress}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 100,
                alignItems: 'center',
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F8F9FB',
                  height: 100,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    backgroundColor: '#0B3F80',
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    marginLeft: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text bold whiteColor>
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '85%',
                  }}>
                  <View style={{width: 150}}>
                    <Text numberOfLines={1} style={{left: 15, fontSize: 12}}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      numberOfLines={1}
                      style={{fontSize: 12, color: 'grey'}}>
                      @{item.quantity}
                    </Text>
                  </View>

                  <View style={{}}>
                    <Text semibold style={{color: '#0B3F80'}}>
                      {currencyFormatter(item.salePrice)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{}}>
            <View
              // onPress={this.props.onPress}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F8F9FB',
                  height: 69,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '90%',
                  }}>
                  <View style={{width: 150}}>
                    <Text numberOfLines={1} style={{left: 15, fontSize: 13}}>
                      Total Items
                    </Text>
                  </View>
                  <View style={{}}>
                    {/* <Text numberOfLines={1} style={{fontSize: 13}}>
                      0%
                    </Text> */}
                  </View>

                  <View style={{}}>
                    <Text semibold style={{color: '#0B3F80'}}>
                      {data.totalItems}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              // onPress={this.props.onPress}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F8F9FB',
                  height: 69,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '90%',
                  }}>
                  <View style={{width: 150}}>
                    <Text numberOfLines={1} style={{left: 15, fontSize: 13}}>
                      Vat
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text numberOfLines={1} style={{fontSize: 13}}>
                      0%
                    </Text>
                  </View>

                  <View style={{}}>
                    <Text semibold style={{color: '#0B3F80'}}>
                      {currencyFormatter(0)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              // onPress={this.props.onPress}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F8F9FB',
                  height: 69,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '90%',
                  }}>
                  <View style={{width: 150}}>
                    <Text numberOfLines={1} style={{left: 15, fontSize: 13}}>
                      Total (incl. tax)
                    </Text>
                  </View>
                  <View style={{}}></View>

                  <View style={{}}>
                    <Text semibold style={{color: '#0B3F80'}}>
                      {currencyFormatter(data.totalAmount)}{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              // onPress={this.props.onPress}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#67CD75',
                  height: 69,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '90%',
                  }}>
                  <View style={{width: 150}}>
                    <Text
                      whiteColor
                      semibold
                      numberOfLines={1}
                      style={{left: 15, fontSize: 13}}>
                      PAID
                    </Text>
                  </View>
                  <View style={{}}></View>

                  <View style={{}}>
                    <Text whiteColor semibold>
                      {currencyFormatter(data.totalAmount)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              // onPress={this.props.onPress}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#D5E3F0',
                  height: 69,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <Text>TRANSACTION</Text>
              </View>
            </View>

            <View
              // onPress={this.props.onPress}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F8F9FB',
                  height: 69,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    // backgroundColor: ,
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    marginLeft: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#D5E3F0',
                    borderWidth: 1,
                  }}>
                  <AntDesign name="user" color="#0B3F80" size={30} />
                </View>

                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '90%',
                  }}>
                  <View>
                    <View>
                      <Text semibold style={{left: 15, fontSize: 13}}>
                        {data.user.name}
                      </Text>
                      <Text style={{left: 15, fontSize: 13}}>
                        {data.user.mobile}
                      </Text>
                    </View>
                  </View>
                  <Entypo
                    name="dots-three-vertical"
                    color="#000"
                    size={25}
                    style={{right: 40, top: 7}}
                  />
                </View>
              </View>
            </View>

            <View
              // onPress={this.props.onPress}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F8F9FB',
                  height: 69,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '90%',
                  }}>
                  <View style={{width: 150}}>
                    <Text numberOfLines={1} style={{left: 15, fontSize: 12}}>
                      Invoice Number
                    </Text>
                  </View>
                  <View style={{}}></View>

                  <View style={{}}>
                    <Text semibold style={{color: '#0B3F80', fontSize: 12}}>
                      {data.invoice}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              // onPress={this.props.onPress}
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#F8F9FB',
                  height: 69,
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '90%',
                  }}>
                  <View style={{width: 150}}>
                    <Text numberOfLines={1} style={{left: 15, fontSize: 12}}>
                      Sell Number
                    </Text>
                  </View>
                  <View style={{}}></View>

                  <View style={{}}>
                    <Text semibold style={{color: '#0B3F80', fontSize: 12}}>
                      {data.saleNumber}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{height: 100}} />
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{height: 1, backgroundColor: '#D5E3F0', width: '100%'}}
          />
        )}
      />

      {/* {data.map((x) => (
           ))} */}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

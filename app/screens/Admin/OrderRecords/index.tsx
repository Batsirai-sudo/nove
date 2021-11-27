import React, {useRef, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  TextComponent,
  SearchBar,
  Datatable,
  Header,
  StoreManagerCard as Card,
} from '@components';
// import {Card} from 'react-native-shadow-cards';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, useTheme} from '@react-navigation/native';
import {currencyFormatter} from '@config';
import {keyExtractor} from '@helpers';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {AdminContext} from '@context';
import moment from 'moment';
import _ from 'lodash';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const OrderRecords = () => {
  const {colors} = useTheme();
  const {goBack} = useNavigation();
  const modalizeRef = useRef<Modalize>(null);
  const {stockOrdershistory} = useContext(AdminContext);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [query, setQuery] = useState('');
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [setMonths, setSetMonths] = useState(() =>
    months.map((x) => {
      if (x === moment().format('MMMM')) {
        return {name: x, isSelected: true};
      }
      return {name: x, isSelected: false};
    }),
  );

  const containsQuery = ({orderNumber}, query) => {
    // const {first, last} = name;
    if (orderNumber.toLowerCase().includes(query)) {
      return true;
    }
    // if (name.includes(query) || last.includes(query) || email.includes(query)) {
    //   return true;
    // }

    return false;
  };

  const handleSearch = (value) => {
    const formattedQuery = value.toLowerCase();
    const data = _.filter(fullData, (x) => {
      return containsQuery(x, formattedQuery);
    });
    setQuery(value);
    setData(data);
  };
  const fetch = (b) => {
    stockOrdershistory(b).then((response) => {
      // setLoading(false);
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
        });
      });
      // setFullData(firestoreData);
      setData(firestoreData);
      setFullData(firestoreData);
    });
  };
  useEffect(() => {
    fetch(currentMonth);
  }, []);

  const changeMonth = (i) => {
    const z = months.map((x, index) => {
      if (index === i) {
        return {name: x, isSelected: true};
      }
      return {name: x, isSelected: false};
    });
    const r = z.filter((x) => {
      if (x.isSelected) {
        return x.name;
      }
    })[0].name;
    setCurrentMonth(r);
    setSetMonths([...z]);

    modalizeRef.current?.close();
    fetch(r);
  };

  const renderItem = ({item}) => (
    <View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Card
          cornerRadius={5}
          elevation={1}
          style={{height: 150, width: '90%', marginTop: 5, padding: 15}}>
          <View
            style={{
              borderBottomWidth: 0.5,
              height: 30,
              borderBottomColor: '#556084',
            }}>
            <TextComponent style={{color: '#556084'}}>
              {moment(item.createAt.toDate()).format('ddd Do MMM, HH:mm')}
            </TextComponent>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              // borderBottomWidth: 0.5,
              height: 50,
              // borderBottomColor: '#556084',
              width: '100%',
            }}>
            <Ionicons name="ios-document-text" size={40} color="#39965b" />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <View style={{left: 10}}>
                <TextComponent
                  style={{color: '#000', fontSize: 17, fontWeight: '600'}}>
                  #{item.orderNumber}
                </TextComponent>
                <TextComponent style={{color: '#556084', fontSize: 11}}>
                  Stock Order Number
                </TextComponent>
              </View>
              <View style={{left: 10, width: '30%'}}>
                <TextComponent
                  style={{color: '#000', fontSize: 17, fontWeight: '600'}}>
                  {item.totalItems}
                </TextComponent>
                <TextComponent style={{color: '#556084', fontSize: 11}}>
                  items
                </TextComponent>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 50,
              // borderBottomColor: '#556084',
            }}>
            <View style={{left: 20}}>
              <TextComponent style={{color: '#39965b', fontSize: 11}}>
                success
              </TextComponent>
            </View>

            <View style={{left: 10}}>
              <TextComponent
                style={{color: '#556084', fontSize: 17, fontWeight: '600'}}>
                {currencyFormatter(item.totalAmount)}
              </TextComponent>
            </View>
          </View>

          <View></View>
        </Card>
      </View>
    </View>
  );
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <View style={{backgroundColor: colors.thirdBackground, height: '100%'}}>
      <Header
        title={'Orders History'}
        leftComponent={
          <TouchableOpacity
            style={{
              left: -20,
              height: 50,
              width: 50,
              alignItems: 'center',
              top: -5,
            }}
            onPress={() => {
              goBack();
            }}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        }>
        <TouchableOpacity
          style={
            {
              // backgroundColor: 'red',
              // left: -20,
              // height: 50,
              // width: 50,
              // alignItems: 'center',
              // top: -5,
              // justifyContent: 'center',
            }
          }
          onPress={() => {}}>
          <MaterialCommunityIcons
            name="tune-vertical"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </Header>
      <Card
        cornerRadius={25}
        style={{alignSelf: 'center', height: 50, width: '90%', marginTop: 10}}>
        <TouchableOpacity onPress={() => {}}>
          <SearchBar
            placeHolder={'Search App...'}
            editable={true}
            value={query}
            onChangeText={(value) => {
              handleSearch(value);
            }}
            onFocus={() => {}}
          />
        </TouchableOpacity>
      </Card>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Card
          onPress={onOpen}
          cornerRadius={5}
          elevation={3}
          style={{
            height: 50,
            width: '60%',
            marginTop: 5,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <TextComponent style={{color: '#556084'}}>
            {currentMonth} 2021
          </TextComponent>
          <Entypo name="chevron-down" size={24} color="#000" />
        </Card>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{}}
        ListFooterComponent={() => <View style={{height: 100}}></View>}
      />
      <Portal>
        <Modalize ref={modalizeRef}>
          <ScrollView contentContainerStyle={{marginTop: 30}}>
            {setMonths.map((x, index) =>
              !x.isSelected ? (
                <TouchableOpacity
                  onPress={() => changeMonth(index)}
                  key={index}
                  style={{alignItems: 'center', marginVertical: 15}}>
                  <TextComponent key={index} style={{color: '#556084'}}>
                    {x.name}
                  </TextComponent>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => changeMonth(index)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 15,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#556084',
                      height: 1,
                      width: '30%',
                    }}
                  />
                  <View
                    key={index}
                    style={{alignItems: 'center', marginVertical: 15}}>
                    <TextComponent
                      key={index}
                      style={{
                        color: '#556084',
                        fontWeight: '600',
                        fontSize: 15,
                      }}>
                      {x.name}
                    </TextComponent>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#556084',
                      height: 1,
                      width: '30%',
                    }}
                  />
                </TouchableOpacity>
              ),
            )}
          </ScrollView>
        </Modalize>
      </Portal>
    </View>
  );
};

export default OrderRecords;

const styles = StyleSheet.create({});

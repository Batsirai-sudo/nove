// import React, {useState, useContext, useEffect} from 'react';
// import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import {Card} from 'react-native-shadow-cards';
// import {TextComponent as Text} from '@components';
// import {ClientContext} from '@context';
// import moment from 'moment';
// import {currencyFormatter} from '@config';

// const ExpenseRecords = () => {
//   const {colors} = useTheme();
//   const {getExpensesHistory} = useContext(ClientContext);
//   const [data, setData] = useState([]);
//   const [totalAmount, setTotalAmount] = useState();

//   useEffect(() => {
//     getExpensesHistory().then((response) => {
//       // setLoading(false);
//       const firestoreData = [];
//       response.forEach((result) => {
//         firestoreData.push({
//           ...result.data(),
//           key: result.id,
//         });
//       });
//       setData(firestoreData);
//       getTotals(firestoreData);
//       console.log(firestoreData);
//     });
//   }, []);

//   const getTotals = (c) => {
//     const y = c.map((x) => x.amount);
//     const total = y.reduce((a, b) => a + b);
//     setTotalAmount(total);
//   };

//   return (
//     <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
//       <TouchableOpacity style={[styles.row, {marginTop: 30, height: 30}]}>
//         <View style={[styles.smallBar, {width: '30%'}]} />
//         <View style={styles.monthTxt}>
//           <Text style={{color: '#556084'}}>12 - 20 Nov 2021</Text>
//         </View>
//         <View style={[styles.smallBar, {width: '30%'}]} />
//       </TouchableOpacity>
//       <Text
//         medium
//         style={{
//           fontSize: 25,
//           color: '#984cf8',
//           alignSelf: 'center',
//           marginTop: 20,
//         }}>
//         {currencyFormatter(totalAmount)}
//       </Text>
//       <Text
//         style={{
//           fontSize: 11,
//           color: '#556084',
//           alignSelf: 'center',
//           marginTop: 5,
//         }}>
//         Expense Total Amount
//       </Text>
//       <ScrollView style={{marginTop: 20}}>
//         {data.map((x) => (
//           <View style={{marginBottom: 30}}>
//             <TouchableOpacity style={styles.trans}>
//               <View style={styles.row1}>
//                 <View style={[styles.monthTxt, {flexDirection: 'row'}]}>
//                   <Text medium style={{color: '#556084'}}>
//                     {x.title}
//                   </Text>
//                 </View>
//                 <View style={[styles.smallBar, {width: '40%'}]} />
//               </View>

//               <View style={styles.rowContainer}>
//                 <View style={styles.row}>
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     <View style={styles.text}>
//                       <Text style={{color: '#556084'}}>Description</Text>
//                     </View>
//                   </View>
//                   <View style={{width: '50%'}}>
//                     <Text medium style={{color: '#556084'}}>
//                       {x.description.split(/[<div>,</div>]+/)}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.row}>
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     <View style={styles.text}>
//                       <Text style={{color: '#556084'}}>Amount</Text>
//                     </View>
//                   </View>
//                   <Text medium style={{color: '#556084'}}>
//                     {currencyFormatter(x.amount)}
//                   </Text>
//                 </View>
//                 <View style={styles.row}>
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     <View style={styles.text}>
//                       <Text style={{color: '#556084'}}>Invoice Number</Text>
//                     </View>
//                   </View>
//                   <Text bold style={{color: '#556084'}}>
//                     # {x.invoiceNumber}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//             <Text style={{textAlign: 'center', color: '#ccc', fontSize: 12}}>
//               {moment(x.createdAt.toDate()).format(
//                 'Do ddd, MMMM YYYYY HH:mm a',
//               )}
//             </Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default ExpenseRecords;

// const styles = StyleSheet.create({
//   cardContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 10,
//   },
//   text: {alignItems: 'center'},
//   avatar: {
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderRadius: 40,
//     height: 40,
//     width: 40,
//     backgroundColor: '#37C2D0',
//     marginRight: 20,
//   },
//   rowContainer: {marginHorizontal: 20},
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   card: {
//     width: '90%',
//     padding: 10,
//     height: 100,
//     margin: 10,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     height: '100%',
//   },
//   flex: {
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   trans: {
//     backgroundColor: 'white',

//     elevation: 1,
//   },
//   smallBar: {
//     backgroundColor: '#556084',
//     height: 2,
//     alignSelf: 'center',
//   },
//   monthTxt: {
//     width: '40%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   row1: {
//     flexDirection: 'row',
//     width: '100%',
//     justifyContent: 'space-between',
//     marginTop: 12,
//   },
// });

import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  TextComponent,
  SearchBar,
  Datatable,
  Header,
  StoreManagerCard as Card,
} from '@components';
import {keyExtractor} from '@helpers';
import {AdminContext} from '@context';
import moment from 'moment';
import {currencyFormatter} from '@config';
import {Modalize} from 'react-native-modalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
const ExpenseRecords = () => {
  const {colors} = useTheme();
  const {getExpensesHistory} = useContext(AdminContext);
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [sections, setsections] = useState([]);

  const modalizeRef = useRef<Modalize>(null);
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
    getExpensesHistory().then((response) => {
      // setLoading(false);
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
        });
      });
      setData(firestoreData);
      getTotals(firestoreData);
      console.log(firestoreData);
    });
  };
  useEffect(() => {
    fetch(currentMonth);
    // createSections();
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

  const getTotals = (c) => {
    const y = c.map((x) => x.amount);
    const total = y.reduce((a, b) => a + b);
    setTotalAmount(total);
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
              {item.title}
            </TextComponent>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              height: 50,
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
                  # {item.invoiceNumber}
                </TextComponent>
                <TextComponent style={{color: '#556084', fontSize: 11}}>
                  Invoice Number
                </TextComponent>
              </View>
              {/* <View style={{left: 10, width: '30%'}}>
                <TextComponent
                  style={{color: '#000', fontSize: 17, fontWeight: '600'}}>
                  {item.quantity}
                </TextComponent>
                <TextComponent style={{color: '#556084', fontSize: 11}}>
                  Quantity
                </TextComponent>
              </View> */}
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
            <View style={{left: 0, width: '30%', flexDirection: 'row'}}>
              <TextComponent
                style={{color: '#556084', fontSize: 11, fontWeight: '600'}}
                numberOfLines={2}
                medium>
                Description :{'  '}
              </TextComponent>
              <TextComponent
                style={{color: '#556084', fontSize: 11}}
                numberOfLines={2}>
                successgdhdfghdfghdgjhfgjdgfgjdfgmfgmfgjfgjhfgjfg
              </TextComponent>
            </View>

            <View style={{left: 10}}>
              <TextComponent
                style={{color: '#556084', fontSize: 17, fontWeight: '600'}}>
                {currencyFormatter(item.amount)}
              </TextComponent>
            </View>
          </View>

          <View></View>
        </Card>
      </View>
      <TextComponent style={{textAlign: 'center', color: '#ccc', fontSize: 12}}>
        {moment(item.createdAt.toDate()).fromNow()}
        {/* {moment(createdAt.toDate()).fromNow()} */}
      </TextComponent>
    </View>
  );
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <View style={{backgroundColor: colors.thirdBackground, height: '100%'}}>
      <Header
        title={currencyFormatter(totalAmount)}
        leftComponent={
          <TouchableOpacity
            style={{
              left: -20,
              height: 50,
              width: 50,
              alignItems: 'center',
              top: -5,
            }}
            onPress={() => {}}>
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
          {/* <TextComponent
            medium
            style={{
              // fontSize: 25,
              color: '#ffffff',
              // alignSelf: 'center',
              // marginTop: 20,
            }}>
            {currencyFormatter(totalAmount)}
          </TextComponent> */}
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
          <TextComponent style={{color: '#556084', left: 40}}>
            12 - 20 Nov 2021
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
    </View>
  );
  // return (
  //   <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
  //     <TouchableOpacity style={[styles.row, {marginTop: 30, height: 30}]}>
  //       <View style={[styles.smallBar, {width: '30%'}]} />
  //       <View style={styles.monthTxt}>
  //         <Text style={{color: '#556084'}}>12 - 20 Nov 2021</Text>
  //       </View>
  //       <View style={[styles.smallBar, {width: '30%'}]} />
  //     </TouchableOpacity>
  //     <Text
  //       medium
  //       style={{
  //         fontSize: 25,
  //         color: '#984cf8',
  //         alignSelf: 'center',
  //         marginTop: 20,
  //       }}>
  //       {currencyFormatter(totalAmount)}
  //     </Text>
  //     <Text
  //       style={{
  //         fontSize: 11,
  //         color: '#556084',
  //         alignSelf: 'center',
  //         marginTop: 5,
  //       }}>
  //       Losses Total Amount
  //     </Text>
  //     <ScrollView style={{marginTop: 20}}>
  //       {data.map((x) => (
  //         <View style={{marginBottom: 30}}>
  //           <TouchableOpacity style={styles.trans}>
  //             <View style={styles.row1}>
  //               <View style={[styles.monthTxt, {flexDirection: 'row'}]}>
  //                 <Text medium style={{color: '#556084'}}>
  //                   {x.productName} ({x.mass})
  //                 </Text>
  //               </View>
  //               <View style={[styles.smallBar, {width: '40%'}]} />
  //             </View>

  //             <View style={styles.rowContainer}>
  //               <View style={styles.row}>
  //                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //                   <View style={styles.text}>
  //                     <Text style={{color: '#556084'}}>Amount</Text>
  //                   </View>
  //                 </View>
  //                 <Text medium style={{color: '#556084'}}>
  //                   {currencyFormatter(x.amount)}
  //                 </Text>
  //               </View>

  //               <View style={styles.row}>
  //                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //                   <View style={styles.text}>
  //                     <Text style={{color: '#556084'}}>Quantity</Text>
  //                   </View>
  //                 </View>
  //                 <Text medium style={{color: '#556084'}}>
  //                   {x.quantity}
  //                 </Text>
  //               </View>
  //               <View style={styles.row}>
  //                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //                   <View style={styles.text}>
  //                     <Text style={{color: '#556084'}}>Invoice Number</Text>
  //                   </View>
  //                 </View>
  //                 <Text bold style={{color: '#556084'}}>
  //                   # {x.invoiceNumber}
  //                 </Text>
  //               </View>
  //               <View style={styles.row}>
  //                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //                   <View style={styles.text}>
  //                     <Text style={{color: '#556084'}}>Description</Text>
  //                   </View>
  //                 </View>
  //                 <View style={{width: '50%'}}>
  //                   <Text medium style={{color: '#556084'}} numberOfLines={2}>
  //                     {x.description.split(/[<div>,</div>]+/)}
  //                   </Text>
  //                 </View>
  //               </View>
  //             </View>
  //           </TouchableOpacity>
  //           <Text style={{textAlign: 'center', color: '#ccc', fontSize: 12}}>
  //             {moment(x.createdAt.toDate()).format(
  //               'Do ddd, MMMM YYYYY HH:mm a',
  //             )}
  //           </Text>
  //         </View>
  //       ))}
  //     </ScrollView>
  //   </View>
  // );
};

export default ExpenseRecords;

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

    elevation: 1,
  },
  smallBar: {
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
    marginTop: 12,
  },
});

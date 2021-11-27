import React, {useContext, useRef, useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {
  TextComponent,
  Datatable,
  StoreManagerCard as Card,
  SearchBar,
} from '@components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ClientContext} from '@context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import _ from 'lodash';
import {DataTable as Tab} from 'react-native-paper';
import {currencyFormatter} from '@config';

const arrayColor = ['#d6f3ff', '#ffffff'];
let fullData = [];
const StockTaking = (props) => {
  const [data, setData] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [totals, setTotals] = useState({buying: '', selling: ''});
  const user = useSelector((state) => state.auth.user);
  const activeStockTakingID = useSelector(
    (state) => state.admin.activeStockTakingID,
  );
  const modalizeRef = useRef<Modalize>(null);
  const claculationsModalizeRef = useRef<Modalize>(null);
  const [query, setQuery] = useState('');
  let content = () => {};

  // let counter = 1;

  // React.useEffect(() => {
  //   getList(firstIndex, secondIndex);
  // }, []);

  // const getList = (firstValue, lastValue) =>
  //   setData(slicing(firstValue, lastValue));

  // const lowListLeft = () => {
  //   if (getLength() - globalLength < 10) {
  //     getList(getLength() - leftItems, getLength() - 1);
  //   } else {
  //     return true;
  //   }
  // };

  useEffect(() => {
    getProducts();
  }, []);

  const snap = firestore()
    .collection('Shops')
    .doc(user.myShops[0])
    .collection('StockTaking')
    .doc(activeStockTakingID)
    .collection('Products');
  const snapDoc = firestore()
    .collection('Shops')
    .doc(user.myShops[0])
    .collection('StockTaking')
    .doc(activeStockTakingID);

  const getProducts = () => {
    snap.onSnapshot((querySnapshot) => {
      const products = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added' || type === 'modified')
        .map(({doc, type, oldIndex}, newIndex) => {
          console.log('oldIndex,', oldIndex);
          console.log('newIndex,', newIndex);

          const p = doc.data();
          return {
            ...p,
            id: doc.id,
            type,
            oldIndex,
          };
        });

      if (products[0].type === 'modified') {
        // // const f = data.map((v) => v.id).indexOf(products[0].id);
        // console.log('****modified****', products[0].oldIndex);
        // console.log('****modified****', products[0]);
        // console.log('****getProductsDaat****', fullData);
        // console.log('****all modified****', products);
        // console.log(
        //   '****data[products[0].oldIndex];****',
        //   data[products[0].oldIndex],
        // );
        fullData[products[0].oldIndex].quantity = products[0].quantity;
        setData([...fullData]);

        return false;
      }
      setData(products);
      fullData = products;
    });
  };

  const onChangeText = (text, index, id) => {
    console.log(text);
    data[index].quantity = text;

    const f = fullData.map((v) => v.id).indexOf(id);
    fullData[f].quantity = text;
    console.log(data);
    // data[index].amount = calculateIndividualAmount(
    //   text,
    //   data[index].buyingPrice,
    // );

    // const fullDataindex = fullData.map((x) => x.id).indexOf(id);
    // fullData[fullDataindex].value = text;
    setData([...data]);
    // calculateTotalBuyingAmount();
  };

  const onEndEdit = (item, value) => {
    snap.doc(item.id).update({quantity: value});
  };

  // const onNextList = () => {
  //   const valid = lowListLeft();
  //   setUpdateClick(true);
  //   if (valid) {
  //     setGlobalLength(globalLength + 5);
  //     setLeftItems(leftItems - 5);
  //     const firstValue = secondIndex;
  //     const lastValue = secondIndex + 5;
  //     setFirstIndex(firstValue);
  //     setSecondIndex(lastValue);
  //     getList(firstValue, lastValue);

  //     console.log(firstIndex, secondIndex, globalLength, firstValue, lastValue);
  //   }
  // };
  // const onPreviousList = () => {
  //   setUpdateClick(true);

  //   if (globalLength > 5) {
  //     setGlobalLength(globalLength - 5);
  //     setLeftItems(leftItems + 5);

  //     const firstValue = firstIndex - 5;
  //     const lastValue = firstIndex;
  //     setFirstIndex(firstValue);
  //     setSecondIndex(lastValue);
  //     getList(firstValue, lastValue);
  //     console.log(firstIndex, secondIndex, globalLength, firstValue, lastValue);
  //   }

  //   // setData(slicing(firstValue, lastValue));
  // };

  // const isInt = (n) => {
  //   return Number(n) === n && n % 1 === 0;
  // };

  // const getTotalAmountForItems = (a, b, c) => {
  //   return a * b * c;
  // };

  // const reduceAllTotalAmountForItems = (y) => {
  //   const value = y.map((d) => d.amount);
  //   updateClick
  //     ? (() => {
  //         value.push(stockTackingTotal);
  //         setUpdateClick(false);
  //       })()
  //     : null;
  //   const total = value.reduce((a, b) => a + b);
  //   setstockTaking(total);
  // };

  // const updateData = (index, value) => {
  //   data[index].quantity = value;
  //   let sellPrice;
  //   isInt(data[index].sellUnitPrize)
  //     ? (sellPrice = data[index].sellUnitPrize)
  //     : (sellPrice = data[index].sellUnitPrize);
  //   data[index].amount = getTotalAmountForItems(
  //     value,
  //     data[index].case,
  //     sellPrice,
  //   );
  //   setData([...data]);
  //   reduceAllTotalAmountForItems(data);
  // };
  // const [total, setTotal] = useState(0);
  // // const [clicks, setClicks] = useState(
  // //   isInt(getLength() / 5) ? getLength() / 5 : parseInt(getLength() / 5),
  // // );
  // // console.log(clicks);
  // const renderView = () => (
  //   <View>
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         alignSelf: 'center',
  //         // backgroundColor: 'red',
  //         width: '100%',
  //         justifyContent: 'space-between',
  //         paddingHorizontal: 10,
  //       }}>
  //       <View style={{width: '25%', justifyContent: 'center'}}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             onPreviousList();
  //           }}
  //           style={{
  //             alignSelf: 'flex-start',

  //             // backgroundColor: 'red',
  //             width: '60%',
  //             height: 50,
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           }}>
  //           <FontAwesome name="chevron-left" size={20} color="#000" />
  //         </TouchableOpacity>
  //       </View>

  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           width: '50%',
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //         }}>
  //         <TextComponent
  //           bold
  //           numberOfLines={1}
  //           style={{textAlign: 'center', fontSize: 20, marginVertical: 15}}>
  //           {currencyFormatter(stockTackingTotal)}
  //         </TextComponent>
  //       </View>
  //       <View style={{width: '25%', justifyContent: 'center'}}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             onNextList();
  //           }}
  //           style={{
  //             alignSelf: 'flex-end',
  //             right: 15,
  //             // backgroundColor: 'red',
  //             width: '60%',
  //             height: 50,
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           }}>
  //           <FontAwesome name="chevron-right" size={20} color="#000" />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //     <TextComponent style={{textAlign: 'center', fontSize: 10}}>
  //       Total Stock Amount
  //     </TextComponent>
  //     <ScrollView
  //       contentContainerStyle={{width: '130%'}}
  //       showsVerticalScrollIndicator={false}
  //       horizontal={true}>
  //       <DataTable style={{width: '100%'}}>
  //         <DataTable.Header>
  //           <DataTable.Title sortDirection="descending">Items</DataTable.Title>
  //           <DataTable.Title numeric>Mass</DataTable.Title>
  //           <DataTable.Title numeric> Quantity</DataTable.Title>
  //           <DataTable.Title numeric>Case </DataTable.Title>

  //           <DataTable.Title numeric>Amount</DataTable.Title>
  //         </DataTable.Header>
  //         <KeyboardAvoidingView behavior="height" style={{width: '100%'}}>
  //           <ScrollView>
  //             {data.map((item, index) => (
  //               <DataTable.Row>
  //                 <DataTable.Cell
  //                 // style={{backgroundColor: 'red', color: 'white'}}
  //                 >
  //                   {/* {counter++})  */}
  //                   {counter++}) {item.item}
  //                 </DataTable.Cell>
  //                 <DataTable.Cell numeric>{item.mass}</DataTable.Cell>
  //                 <TextInput
  //                   keyboardType="numeric"
  //                   style={{
  //                     width: 50,
  //                     backgroundColor: '#ddd',
  //                     marginLeft: 50,
  //                     marginVertical: 5,
  //                   }}
  //                   value={`${item.quantity}`}
  //                   onChangeText={(value) => {
  //                     updateData(index, value);
  //                   }}
  //                 />

  //                 <DataTable.Cell numeric>{item.case}</DataTable.Cell>

  //                 <DataTable.Cell numeric>
  //                   <Text style={{color: 'blue'}}>R {item.amount}</Text>
  //                 </DataTable.Cell>
  //               </DataTable.Row>
  //             ))}

  //             <View style={{height: 200}} />
  //           </ScrollView>
  //         </KeyboardAvoidingView>
  //         <DataTable.Pagination
  //           page={page}
  //           numberOfPages={Math.floor(items.length / itemsPerPage)}
  //           onPageChange={(page) => setPage(page)}
  //           label={`${from + 1}-${to} of ${items.length}`}
  //         />
  //       </DataTable>
  //     </ScrollView>
  //     <View
  //       style={{
  //         backgroundColor: 'white',
  //         position: 'absolute',
  //         bottom: 50,
  //         alignSelf: 'center',
  //       }}>
  //       <View
  //         style={{
  //           width: 100,
  //           backgroundColor: 'white',
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //         }}>
  //         <TextComponent style={{marginVertical: 15, fontSize: 12}}>
  //           {globalLength} of {getLength()}
  //         </TextComponent>
  //         <TextComponent style={{marginVertical: 15, fontSize: 12}}>
  //           {leftItems}
  //         </TextComponent>
  //       </View>
  //     </View>
  //   </View>
  // );

  const calculateTotalsForData = () => {
    data.map((x, i) => {
      data[i].totalBuyingAmount =
        parseInt(x.buyingPrice) * parseInt(x.quantity);
      data[i].totalSellingAmount = parseInt(x.salePrice) * parseInt(x.quantity);
    });
    const alltotalBuyingAmount = data
      .map((x) => x.totalBuyingAmount)
      .reduce((a, b) => a + b);
    const alltotalSellingAmount = data
      .map((x) => x.totalSellingAmount)
      .reduce((a, b) => a + b);
    setTotals({buying: alltotalBuyingAmount, selling: alltotalSellingAmount});

    setData([...data]);
    console.log(data);
  };

  const table = () => (
    <View style={{marginTop: 20}}>
      <Datatable.DataTable
        dataSource={data}
        renderHeader={() => (
          <Datatable.Header style={{left: 10}}>
            <Datatable.Cell width={3}>
              <TextComponent bold>Item</TextComponent>
            </Datatable.Cell>

            <Datatable.Cell>
              <TextComponent bold> Mass</TextComponent>
            </Datatable.Cell>
            <Datatable.Cell>
              <TextComponent bold> Amount</TextComponent>
            </Datatable.Cell>
          </Datatable.Header>
        )}
        renderRow={({item, index}) => {
          return (
            <Datatable.Row
              style={{
                backgroundColor: arrayColor[index % arrayColor.length],
              }}>
              <Datatable.Cell width={3} style={{}}>
                <TextComponent> {item.productName}</TextComponent>
              </Datatable.Cell>
              <Datatable.Cell>
                <TextComponent> item.mass</TextComponent>
              </Datatable.Cell>
              <Datatable.EditableCell
                onEndEditing={(value) => {
                  value === null
                    ? console.log('No value entered')
                    : onEndEdit(item, value);
                }}
                changTxt={(text, i) => {
                  onChangeText(text, i, item.id);
                }}
                value={item.quantity}
                index={index}
              />
            </Datatable.Row>
          );
        }}
      />
      {/* <View style={{height: 500}}></View> */}
    </View>
  );

  const calculations = () => (
    <Portal>
      <Modalize
        ref={claculationsModalizeRef}
        scrollViewProps={{stickyHeaderIndices: [0]}}>
        <View>
          <Tab.Header style={{backgroundColor: 'white'}}>
            <Tab.Title sortDirection="descending">Items product</Tab.Title>
            <Tab.Title numeric> Quantity</Tab.Title>
            <Tab.Title numeric> Total Amount</Tab.Title>

            {/* <DataTable.Title numeric>Buying Price</DataTable.Title> */}
          </Tab.Header>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'white',
              height: 50,
              flexDirection: 'row',
              paddingHorizontal: 30,
            }}>
            <View style={{alignItems: 'center'}}>
              <TextComponent style={{fontSize: 15}} semibold>
                {currencyFormatter(totals.buying)}
              </TextComponent>
              <TextComponent style={{fontSize: 10}}>
                total buying Amount
              </TextComponent>
            </View>
            <View
              style={{height: 20, width: 1, backgroundColor: 'grey'}}></View>
            <View style={{alignItems: 'center'}}>
              <TextComponent style={{fontSize: 15}} semibold>
                {currencyFormatter(totals.selling)}
              </TextComponent>
              <TextComponent style={{fontSize: 10}}>
                total selling Amount
              </TextComponent>
            </View>
          </View>
        </View>
        <Tab>
          {data.map((x) => (
            <Tab.Row style={{height: 100}}>
              <Tab.Cell style={{flex: 2}}>
                <TextComponent style={{fontSize: 12}}>
                  {x.productName}
                </TextComponent>
                <TextComponent style={{fontSize: 12}}>(x.mass)</TextComponent>
              </Tab.Cell>

              <Tab.Cell style={{justifyContent: 'center'}}>
                <TextComponent>{x.quantity}</TextComponent>
              </Tab.Cell>
              <Tab.Cell numeric>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <TextComponent style={{color: 'red'}} semibold>
                      B{' '}
                    </TextComponent>
                    <TextComponent semibold>
                      {currencyFormatter(x.totalBuyingAmount)}
                    </TextComponent>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TextComponent style={{color: 'red'}} semibold>
                      S{' '}
                    </TextComponent>
                    <TextComponent semibold>
                      {currencyFormatter(x.totalSellingAmount)}
                    </TextComponent>
                  </View>
                </View>
              </Tab.Cell>
            </Tab.Row>
          ))}
        </Tab>
      </Modalize>
    </Portal>
  );

  const onOpenJoinedUser = () => {
    snapDoc.get().then((v) => {
      setActiveUsers(v.data().usersJoined);
    });
    modalizeRef.current?.open();
  };

  const userJoinedView = () => (
    <Portal>
      <Modalize ref={modalizeRef}>
        <Tab>
          <Tab.Header>
            <Tab.Title sortDirection="descending">Name</Tab.Title>
            <Tab.Title numeric> Status</Tab.Title>

            {/* <DataTable.Title numeric>Buying Price</DataTable.Title> */}
          </Tab.Header>
          <View style={{marginTop: 30}}>
            <View style={{marginVertical: 15, alignItems: 'center'}}>
              <TextComponent semibold style={{color: '#556084'}}>
                Active User in Stock Taking
              </TextComponent>
            </View>

            {activeUsers.map((x) => (
              <Tab.Row>
                <Tab.Cell>
                  <TextComponent style={{color: '#556084'}}>
                    {x.name}
                  </TextComponent>
                </Tab.Cell>

                <Tab.Cell numeric>
                  <Ionicons name="help-circle-sharp" size={15} color="green" />
                </Tab.Cell>
              </Tab.Row>
            ))}
          </View>
        </Tab>
      </Modalize>
    </Portal>
  );

  const onOpenCalculations = () => {
    calculateTotalsForData();
    claculationsModalizeRef.current?.open();
  };
  const onOpenControls = () => {
    // calculateTotalsForData();
    // claculationsModalizeRef.current?.open();
  };

  const containsQuery = ({productName}, query) => {
    // const {first, last} = name;
    if (productName.toLowerCase().includes(query)) {
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
  return (
    <View>
      <View>
        <ScrollView horizontal={true} contentContainerStyle={styles.horizontal}>
          {[
            {
              name: 'Users Joined',
              icon: (
                <MaterialCommunityIcons
                  name="account-group"
                  size={40}
                  color="#000"
                />
              ),
              route: onOpenJoinedUser,
            },
            {
              name: 'Controls',
              icon: <Octicons name="tools" size={40} color="#000" />,
              route: onOpenControls,
            },
            {
              name: 'Calculations',
              icon: (
                <MaterialCommunityIcons
                  name="calculator-variant"
                  size={40}
                  color="#000"
                />
              ),
              route: onOpenCalculations,
            },
          ].map((item, index) => (
            <TouchableOpacity
              style={{width: '30.3%', alignItems: 'center'}}
              onPress={item.route}>
              <View style={styles.topNavButtons}>{item.icon}</View>
              <TextComponent style={styles.txt}>{item.name}</TextComponent>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Card
          cornerRadius={25}
          style={{
            alignSelf: 'center',
            height: 50,
            width: '90%',
            marginTop: 10,
          }}>
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
      </View>
      {table()}
      {userJoinedView()}
      {calculations()}
    </View>
  );
};
export default StockTaking;

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
    marginTop: 5,
    height: 70,
  },
  topNavButtons: {
    height: 50,
    width: 50,
    borderRadius: 52,
    // backgroundColor: 'red',
    marginHorizontal: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txt: {textAlign: 'center', fontSize: 11},
});

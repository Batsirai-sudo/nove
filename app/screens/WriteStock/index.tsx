import React, {useContext, useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {
  TextComponent,
  SearchBar,
  Datatable,
  Header,
  CustomProgressBar,
  Dialog,
  Errors,
} from '@components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {currencyFormatter, ROUTES} from '@config';
import {CommonContext} from '@context';
import {Card} from 'react-native-shadow-cards';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {ClientActions, AdminActions} from '@actions';
import {UIActivityIndicator} from 'react-native-indicators';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import isArray from 'lodash/isArray';

const arrayColor = ['#d6f3ff', '#ffffff'];
let counter = 1;

const WriteStock = () => {
  const {navigate, goBack} = useNavigation();
  const dispatch = useDispatch();
  const [fetching, setfetching] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const [showLeft, setShowLeft] = useState(false);
  const [arrayLength, setArrayLength] = useState({
    current: 0,
    full: 0,
  });
  const {getProducts, myCurrentShop} = useContext(CommonContext);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setItems] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const reduxWriteStock = useSelector((state) => state.admin?.writtenStock);

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const onGetProducts = () => {
    setfetching(true);

    getProducts().then((response) => {
      const firestoreData = [];
      let count = 1;
      response.forEach((result) => {
        firestoreData.push({
          id: result.id,
          name: result.data().productName,
          InCase: result.data().InCase,
          value: '',
          salePrice: result.data().salePrice,
          buyingPrice: result.data().buyingPrice,
          mass: result.data().mass,
          amount: '',
          count: count++,
        });
      });
      setFullData(firestoreData);
      setData(firestoreData.slice(0, 20));
      setArrayLength({full: firestoreData.length, current: 20});
      setTotalAmount(0);
      setItems(0);
      setfetching(false);
    });
  };
  useEffect(() => {
    if (isArray(reduxWriteStock)) {
      const v = reduxWriteStock?.filter((x) => x.id === myCurrentShop.id);
      if (v.length > 0) {
        const del = v[0];
        del?.saved
          ? (() => {
              setfetching(true);
              setData(del.data.slice(0, 20));
              setFullData(del.data);
              setArrayLength({full: del.data.length, current: 20});
              setTotalAmount(del.totalAmount);
              console.log(del);
              setItems(del.totalItems);
              setfetching(false);
            })()
          : onGetProducts();
      } else {
        onGetProducts();
      }
    } else {
      onGetProducts();
    }
  }, []);

  const filteredTobeSavedProducts = () => {
    const filteredData = fullData.filter((x) => x.value !== '');
    const productsData = {
      productsData: [...filteredData],
      totalItems,
      totalAmount,
      type: 'Stock',
      admin: {
        adminID: user.account === 'Admin' ? user.uid : user.adminID,
        fullName: '',
      },
      shop: {
        shopID: user.myShops[0].id,
        name: user.myShops[0].name,
        storeType: '',
      },
    };
    return productsData;
  };

  const dispatchingActionToSave = (v) => {
    dispatch(ClientActions.onStoreOrder(v));
  };

  const onSave = () => {
    if (filteredTobeSavedProducts().productsData.length <= 0) {
      return Errors({
        message: 'Empty fileds',
        description: 'Seems you havent entered anything you cant to continue',
        autoHide: true,
      });
    }
    dispatchingActionToSave(filteredTobeSavedProducts());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(ROUTES.PreviewOrder);
    }, 2000);
  };

  const calculateTotalBuyingAmount = () => {
    const x = fullData;
    const value = x.map((d) => Number(d.value) * Number(d.buyingPrice));
    const total = value.reduce((a, b) => a + b);

    const z = x.map((d) => Number(d.value));
    const y = z.reduce((a, b) => a + b);

    setTotalAmount(total);
    setItems(y);
    return {total, y};
  };
  const containsQuery = ({name}, query) => {
    // const {first, last} = name;
    if (name.toLowerCase().includes(query)) {
      return true;
    }
    // if (name.includes(query) || last.includes(query) || email.includes(query)) {
    //   return true;
    // }

    return false;
  };
  const handleSearch = (value) => {
    const formattedQuery = value.toLowerCase();
    const data = _.filter(fullData, (product) => {
      return containsQuery(product, formattedQuery);
    });
    setQuery(value);
    setData(data);
  };
  const calculateIndividualAmount = (quantity, buyingprice) => {
    return quantity * Number(buyingprice);
  };
  const onChangeText = (text, index, id) => {
    data[index].value = text;
    data[index].amount = calculateIndividualAmount(
      text,
      data[index].buyingPrice,
    );
    const fullDataindex = fullData.map((x) => x.id).indexOf(id);
    fullData[fullDataindex].value = text;
    setData([...data]);
    const tc = calculateTotalBuyingAmount();
    dispatch(
      AdminActions.onSaveShopStockOrder({
        data: fullData,
        id: myCurrentShop.id,
        totalItems: tc.y,
        totalAmount: tc.total,
      }),
    );
  };
  const renderView = () => {
    return (
      <KeyboardAvoidingView behavior="height" style={{height: '100%'}}>
        <View>
          <Card
            cornerRadius={25}
            style={{left: 15, height: 50, width: '90%', marginTop: 20}}>
            <TouchableOpacity onPress={() => {}}>
              <SearchBar
                placeHolder={'Search product....'}
                editable={true}
                onChangeText={(value) => {
                  handleSearch(value);
                }}
                onFocus={() => {
                  handleSearch(query);
                }}
              />
            </TouchableOpacity>
          </Card>
          {data.length > 0 ? (
            <>
              <View
                style={{
                  marginVertical: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: '100%',
                  // backgroundColor: 'red',
                }}>
                <View style={{width: '50%', alignItems: 'center'}}>
                  <TextComponent style={{fontSize: 20}} bold>
                    {totalItems}
                  </TextComponent>
                  <TextComponent style={{fontSize: 10, top: 10}}>
                    Total items
                  </TextComponent>
                </View>

                <View
                  style={{
                    height: 50,
                    backgroundColor: '#000',
                    width: 1,
                  }}></View>
                <View style={{width: '50%', alignItems: 'center'}}>
                  <TextComponent style={{fontSize: 20}} bold>
                    {currencyFormatter(totalAmount)}
                  </TextComponent>
                  <TextComponent style={{fontSize: 10, top: 10}}>
                    Total Amount
                  </TextComponent>
                </View>
              </View>
              <View style={{marginVertical: 10}}>
                <Datatable.DataTable
                  dataSource={data}
                  renderRow={({item, index}) => {
                    return (
                      <Datatable.Row
                        style={{
                          backgroundColor:
                            arrayColor[index % arrayColor.length],
                        }}>
                        <Datatable.Cell width={3} style={{}}>
                          <TextComponent>
                            <TextComponent style={{fontSize: 11}}>
                              {item.count})
                            </TextComponent>
                            {'  '}
                            {item.name}
                          </TextComponent>
                        </Datatable.Cell>
                        <Datatable.Cell>
                          <TextComponent> {item.mass}</TextComponent>
                        </Datatable.Cell>
                        <Datatable.EditableCell
                          onEndEditing={(val, l) => {}}
                          changTxt={(text, i) => {
                            onChangeText(text, i, item.id);
                          }}
                          value={item.value}
                          index={index}
                        />
                      </Datatable.Row>
                    );
                  }}
                />
                {/* <View style={{height: 500}}></View> */}
              </View>
            </>
          ) : (
            <View style={{position: 'absolute', top: 300, left: 100}}>
              {fetching ? null : (
                <TextComponent>No products add products !</TextComponent>
              )}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <View style={{height: '100%'}}>
      <CustomProgressBar
        category={2}
        loaderText="Fetching products..."
        loader={7}
        width={175}
        height={110}
        visible={fetching}
      />
      <Dialog
        title="Option Alert"
        titleTextStyles={{}}
        content={
          <View style={{height: 60}}>
            <TextComponent style={{color: 'red'}}>
              Reset saved work
            </TextComponent>
            <TextComponent semibold style={{textAlign: 'center'}}>
              OR
            </TextComponent>
            <TextComponent style={{}}>Continue submittion</TextComponent>
          </View>
        }
        firstButtontext="Reset"
        firstButtonTextStyles={{color: 'red'}}
        secondButtonTextStyles={{fontWeight: '600'}}
        firstButtonOnPress={() => {
          setDialogVisible(false);
          dispatch(AdminActions.onResetShopStockOrder(myCurrentShop.id));
          onGetProducts();
        }}
        secondButtontext="Continue"
        secondButtonOnPress={() => {
          setDialogVisible(false);
          onSave();
          // navigate(ROUTES.RegisterAccount);
        }}
        onSwipefunc={() => setDialogVisible(false)}
        onTouchOutside={() => setDialogVisible(false)}
        modalVisible={dialogVisible}
        height={200}
      />
      <Header
        title={'Create Stock Order'}
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
        {loading ? (
          <UIActivityIndicator
            style={{height: 10, width: 10}}
            size={30}
            color="white"
          />
        ) : data.length > 0 ? (
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
            onPress={() => setDialogVisible(true)}
            // onPress={() => onSave()}
          >
            <AntDesign name="check" size={24} color="white" />
          </TouchableOpacity>
        ) : null}
        {/* {loadingChats ? (
            <ComponentLoader
              style={{height: 10, width: 10}}
              size={30}
              color="white"
            />
          ) : null} */}
      </Header>
      {renderView()}
      <LinearGradient
        style={{
          height: 30,
          width: 100,
          position: 'absolute',
          borderRadius: 50,
          bottom: 10,
          right: 230,
          elevation: 10,
          zIndex: 100,

          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#F05F3E', '#ED3269']}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}>
        <TouchableOpacity
          onPress={() => {
            const first = arrayLength.current;
            const last = 20 + arrayLength.current;
            if (arrayLength.current > arrayLength.full) return false;
            setData([...fullData.slice(first, last)]);
            setArrayLength({
              ...arrayLength,
              current: last,
            });
            setShowLeft(true);
          }}>
          <View style={{flexDirection: 'row'}}>
            <TextComponent whiteColor>
              {arrayLength.current > arrayLength.full
                ? arrayLength.full
                : arrayLength.current}{' '}
            </TextComponent>
            <TextComponent semibold whiteColor style={{marginRight: 5}}>
              / {arrayLength.full}
            </TextComponent>
            <AntDesign name="arrowright" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      {showLeft ? (
        <LinearGradient
          style={{
            height: 30,
            width: 50,
            position: 'absolute',
            borderRadius: 50,
            bottom: 10,
            left: 15,
            elevation: 10,
            zIndex: 100,

            justifyContent: 'center',
            alignItems: 'center',
          }}
          colors={['#F05F3E', '#ED3269']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}>
          <TouchableOpacity
            onPress={() => {
              const first = arrayLength.current;
              const last = arrayLength.current - 20;

              setData([...fullData.slice(last, first)]);
              if (arrayLength.current == 20) return setShowLeft(false);

              setArrayLength({
                ...arrayLength,
                current: last,
                clicks: arrayLength.clicks - 1,
              });
            }}>
            <View style={{flexDirection: 'row'}}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ) : null}
    </View>
  );
};

export default WriteStock;

// const contains = ({name, email}, query) => {
//   const {first, last} = name;
//   if (first.includes(query) || last.includes(query) || email.includes(query)) {
//     return true;
//   }

//   return false;
// };

// const getUsers = (limit = 20, query = '') => {
//   return new Promise((resolve, reject) => {
//     if (query.length === 0) {
//       resolve(_.take(users, limit));
//     } else {
//       const formattedQuery = query.toLowerCase();
//       const results = _.filter(users, (user) => {
//         return contains(user, formattedQuery);
//       });
//       resolve(_.take(results, limit));
//     }
//   });
// };

// // export default getUsers;

// class SeachComponents extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: false,
//       data: [],
//       error: null,
//       query: '',
//       fullData: [],
//     };
//   }

//   componentDidMount() {
//     this.makeRemoteRequest();
//   }

//   makeRemoteRequest = () => {
//     this.setState({loading: true});

//     getUsers()
//       .then((users) => {
//         console.log(users);
//         this.setState({
//           loading: false,
//           data: users,
//           fullData: users,
//         });
//       })
//       .catch((error) => {
//         this.setState({error, loading: false});
//       });
//   };

//   renderSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 1,
//           width: '86%',
//           backgroundColor: '#CED0CE',
//           marginLeft: '14%',
//         }}
//       />
//     );
//   };

//   renderHeader = () => {
//     return (
//       <Search
//         onChangeText={(text) => {
//           this.handleSearch(text);
//         }}
//         value={this.state.query}
//         placeholder="Type Here..."
//         lightTheme
//         round
//       />
//     );
//   };

//   handleSearch = (text) => {
//     const formattedQuery = text.toLowerCase();
//     const data = _.filter(this.state.fullData, (user) => {
//       return contains(user, formattedQuery);
//     });

//     this.setState({query: text, data});
//   };

//   renderFooter = () => {
//     if (!this.state.loading) return null;

//     return (
//       <View
//         style={{
//           paddingVertical: 20,
//           borderTopWidth: 1,
//           borderColor: '#CED0CE',
//         }}>
//         <ActivityIndicator animating size="large" />
//       </View>
//     );
//   };

//   render() {
//     return (
//       <SafeAreaView>
//         {/* <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}> */}
//         <FlatList
//           data={this.state.data}
//           renderItem={({item}) => (
//             <ListItem>
//               <Avatar rounded source={{uri: item.picture.thumbnail}} />
//               <ListItem.Content>
//                 <ListItem.Title>{`${item.name.first} ${item.name.last}`}</ListItem.Title>
//                 <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
//               </ListItem.Content>
//             </ListItem>
//           )}
//           keyExtractor={(item) => item.email}
//           ItemSeparatorComponent={this.renderSeparator}
//           ListHeaderComponent={this.renderHeader}
//           ListFooterComponent={this.renderFooter}
//         />
//         {/* </List> */}
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({});

// const itemsPerPage = 2;

// const items = [
//   {
//     key: 1,
//     name: 'Page 1',
//   },
//   {
//     key: 2,
//     name: 'Page 2',
//   },
//   {
//     key: 3,
//     name: 'Page 3',
//   },
//   {
//     key: 4,
//     name: 'Page 1',
//   },
//   {
//     key: 5,
//     name: 'Page 2',
//   },
//   {
//     key: 6,
//     name: 'Page 3',
//   },
// ];
// const MyComponent = (props) => {
//   const [page, setPage] = React.useState(0);
//   const {setstockTaking, stockTackingTotal} = useContext(ClientContext);
//   const from = page * itemsPerPage;
//   const to = (page + 1) * itemsPerPage;
//   const [data, setData] = useState([]);
//   const [firstIndex, setFirstIndex] = useState(0);
//   const [secondIndex, setSecondIndex] = useState(5);
//   const [globalLength, setGlobalLength] = useState(5);
//   const [leftItems, setLeftItems] = useState(getLength());
//   const [updateClick, setUpdateClick] = useState();

//   let counter = 1;

//   React.useEffect(() => {
//     getList(firstIndex, secondIndex);
//   }, []);

//   const getList = (firstValue, lastValue) =>
//     setData(slicing(firstValue, lastValue));

//   const lowListLeft = () => {
//     if (getLength() - globalLength < 10) {
//       getList(getLength() - leftItems, getLength() - 1);
//     } else {
//       return true;
//     }
//   };

//   const onNextList = () => {
//     const valid = lowListLeft();
//     setUpdateClick(true);
//     if (valid) {
//       setGlobalLength(globalLength + 5);
//       setLeftItems(leftItems - 5);
//       const firstValue = secondIndex;
//       const lastValue = secondIndex + 5;
//       setFirstIndex(firstValue);
//       setSecondIndex(lastValue);
//       getList(firstValue, lastValue);

//       console.log(firstIndex, secondIndex, globalLength, firstValue, lastValue);
//     }
//   };
//   const onPreviousList = () => {
//     setUpdateClick(true);

//     if (globalLength > 5) {
//       setGlobalLength(globalLength - 5);
//       setLeftItems(leftItems + 5);

//       const firstValue = firstIndex - 5;
//       const lastValue = firstIndex;
//       setFirstIndex(firstValue);
//       setSecondIndex(lastValue);
//       getList(firstValue, lastValue);
//       console.log(firstIndex, secondIndex, globalLength, firstValue, lastValue);
//     }

//     // setData(slicing(firstValue, lastValue));
//   };

//   const isInt = (n) => {
//     return Number(n) === n && n % 1 === 0;
//   };

//   const getTotalAmountForItems = (a, b, c) => {
//     return a * b * c;
//   };

//   const reduceAllTotalAmountForItems = (y) => {
//     const value = y.map((d) => d.amount);
//     updateClick
//       ? (() => {
//           value.push(stockTackingTotal);
//           setUpdateClick(false);
//         })()
//       : null;
//     const total = value.reduce((a, b) => a + b);
//     setstockTaking(total);
//   };

//   const updateData = (index, value) => {
//     data[index].quantity = value;
//     let sellPrice;
//     isInt(data[index].sellUnitPrize)
//       ? (sellPrice = data[index].sellUnitPrize)
//       : (sellPrice = data[index].sellUnitPrize);
//     data[index].amount = getTotalAmountForItems(
//       value,
//       data[index].case,
//       sellPrice,
//     );
//     setData([...data]);
//     reduceAllTotalAmountForItems(data);
//   };
//   const [total, setTotal] = useState(0);
//   // const [clicks, setClicks] = useState(
//   //   isInt(getLength() / 5) ? getLength() / 5 : parseInt(getLength() / 5),
//   // );
//   // console.log(clicks);
//   return (
//     <View>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignSelf: 'center',
//           backgroundColor: 'red',
//           width: '100%',
//           justifyContent: 'space-between',
//           paddingHorizontal: 10,
//         }}>
//         {/* <View style={{width: '25%', justifyContent: 'center'}}>
//           <TouchableOpacity
//             onPress={() => {
//               onPreviousList();
//             }}
//             style={{
//               alignSelf: 'flex-start',

//               // backgroundColor: 'red',
//               width: '60%',
//               height: 50,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <FontAwesome name="chevron-left" size={20} color="#000" />
//           </TouchableOpacity>
//         </View> */}

//         <View
//           style={{
//             flexDirection: 'row',
//             width: '50%',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <TextComponent
//             bold
//             numberOfLines={1}
//             style={{textAlign: 'center', fontSize: 20, marginVertical: 15}}>
//             {currencyFormatter(stockTackingTotal)}
//           </TextComponent>
//         </View>
//         {/* <View style={{width: '25%', justifyContent: 'center'}}>

//           <TouchableOpacity
//             onPress={() => {
//               onNextList();
//             }}
//             style={{
//               alignSelf: 'flex-end',
//               right: 15,
//               // backgroundColor: 'red',
//               width: '60%',
//               height: 50,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <FontAwesome name="chevron-right" size={20} color="#000" />
//           </TouchableOpacity>
//         </View> */}
//       </View>
//       <TextComponent style={{textAlign: 'center', fontSize: 10}}>
//         Total Stock Amount
//       </TextComponent>
//       <ScrollView
//         contentContainerStyle={{width: '130%'}}
//         showsVerticalScrollIndicator={false}
//         horizontal={true}>
//         <DataTable style={{width: '100%'}}>
//           <DataTable.Header>
//             <DataTable.Title sortDirection="descending">Items</DataTable.Title>
//             <DataTable.Title numeric>Mass</DataTable.Title>
//             <DataTable.Title numeric> Quantity</DataTable.Title>
//             <DataTable.Title numeric>Case </DataTable.Title>

//             <DataTable.Title numeric>Amount</DataTable.Title>
//           </DataTable.Header>
//           <KeyboardAvoidingView behavior="height" style={{width: '100%'}}>
//             <ScrollView>
//               {data.map((item, index) => (
//                 <DataTable.Row>
//                   <DataTable.Cell
//                   // style={{backgroundColor: 'red', color: 'white'}}
//                   >
//                     {/* {counter++})  */}
//                     {counter++}) {item.item}
//                   </DataTable.Cell>
//                   <DataTable.Cell numeric>{item.mass}</DataTable.Cell>
//                   <TextInput
//                     keyboardType="numeric"
//                     style={{
//                       width: 50,
//                       backgroundColor: '#ddd',
//                       marginLeft: 50,
//                       marginVertical: 5,
//                     }}
//                     value={`${item.quantity}`}
//                     onChangeText={(value) => {
//                       updateData(index, value);
//                     }}
//                   />

//                   <DataTable.Cell numeric>{item.case}</DataTable.Cell>

//                   <DataTable.Cell numeric>
//                     <Text style={{color: 'blue'}}>R {item.amount}</Text>
//                   </DataTable.Cell>
//                 </DataTable.Row>
//               ))}

//               <View style={{height: 200}} />
//             </ScrollView>
//           </KeyboardAvoidingView>
//           <DataTable.Pagination
//             page={page}
//             numberOfPages={Math.floor(items.length / itemsPerPage)}
//             onPageChange={(page) => setPage(page)}
//             label={`${from + 1}-${to} of ${items.length}`}
//           />
//         </DataTable>
//       </ScrollView>
//       <View
//         style={{
//           backgroundColor: 'white',
//           position: 'absolute',
//           bottom: 50,
//           alignSelf: 'center',
//         }}>
//         <View
//           style={{
//             width: 100,
//             backgroundColor: 'white',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <TextComponent style={{marginVertical: 15, fontSize: 12}}>
//             {globalLength} of {getLength()}
//           </TextComponent>
//           <TextComponent style={{marginVertical: 15, fontSize: 12}}>
//             {leftItems}
//           </TextComponent>
//         </View>
//       </View>
//     </View>
//   );
// };

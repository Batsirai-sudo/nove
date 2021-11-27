// import React, {
//   useContext,
//   useCallback,
//   useState,
//   useEffect,
//   Component,
// } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TextInput,
//   KeyboardAvoidingView,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   SafeAreaView,
//   BackHandler,
// } from 'react-native';
// // import {DataTable} from 'react-native-paper';
// import {
//   TextComponent,
//   SearchBar,
//   Datatable,
//   Header,
//   CustomProgressBar,
// } from '@components';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {currencyFormatter, ROUTES} from '@config';
// import slicing, {getLength} from './data';
// import {CommonContext} from '@context';
// import {Card} from 'react-native-shadow-cards';
// import _ from 'lodash';
// import users from './users';
// import {ListItem, Avatar, SearchBar as Search} from 'react-native-elements';
// import {useNavigation} from '@react-navigation/native';
// import {useDispatch} from 'react-redux';
// import {ClientActions} from '@actions';
// import {UIActivityIndicator} from 'react-native-indicators';

// const arrayColor = ['#d6f3ff', '#ffffff'];
// let counter = 1;

// const CreateOrder = () => {
//   const productsCounter = () => {
//     return counter++;
//   };
//   const {navigate, goBack} = useNavigation();
//   const dispatch = useDispatch();

//   const {getProductsForOrders, sendOrderData} = useContext(CommonContext);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setfetching] = useState(true);
//   const [callable, setCallable] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [totalItems, setItems] = useState(0);

//   const [data, setData] = useState([]);
//   const [query, setQuery] = useState('');
//   const [fullData, setFullData] = useState([]);
//   const onGetProducts = () => {
//     getProductsForOrders(sendOrderData.shop.shopID).then((response) => {
//       const firestoreData = [];
//       response.forEach((result) => {
//         firestoreData.push({
//           id: result.id,
//           name: result.data().productName,
//           value: '',
//           salePrice: result.data().salePrice,
//           buyingPrice: result.data().buyingPrice,
//           mass: result.data().mass,
//           InCase: result.data().InCase,
//           amount: '',
//         });
//       });
//       setTimeout(() => {
//         setfetching(false);
//         setFullData(firestoreData);
//         setData(firestoreData);
//         console.log(firestoreData);
//       }, 2000);
//     });
//   };
//   useEffect(() => {
//     onGetProducts();
//     // const backHandler = BackHandler.addEventListener(
//     //   'hardwareBackPress',
//     //   () => {
//     //     BackgroundTimer.stopBackgroundTimer();
//     //   },
//     // );
//     // Timer();
//   }, []);

//   // const Timer = () => {
//   //   BackgroundTimer.runBackgroundTimer(() => {
//   //     dispatchingActionToSave(filteredTobeSavedProducts());
//   //   }, 10000);
//   // };

//   const onEndEditing = () => {
//     dispatchingActionToSave(filteredTobeSavedProducts());
//   };

//   const filteredTobeSavedProducts = () => {
//     const filteredData = fullData.filter((x) => x.value !== '');
//     const productsData = {
//       productsData: [...filteredData],
//       totalItems,
//       totalAmount,
//       type: 'Order',
//       ...sendOrderData,
//     };
//     return productsData;
//   };

//   const dispatchingActionToSave = (v) => {
//     dispatch(ClientActions.onStoreOrder(v));
//   };

//   const onSave = () => {
//     // BackgroundTimer.stopBackgroundTimer();
//     dispatchingActionToSave(filteredTobeSavedProducts());
//     console.log(filteredTobeSavedProducts());
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       navigate(ROUTES.PreviewOrder);
//     }, 2000);
//   };

//   const calculateTotalBuyingAmount = () => {
//     const x = fullData;
//     const value = x.map((d) => Number(d.value) * Number(d.buyingPrice));
//     const total = value.reduce((a, b) => a + b);

//     const z = x.map((d) => Number(d.value));
//     const y = z.reduce((a, b) => a + b);
//     // const total = fullData.reduce((a, b) => {
//     //   return parseInt(a.value) + parseInt(b.value);
//     // });
//     setTotalAmount(total);
//     setItems(y);
//   };

//   const containsQuery = ({name}, query) => {
//     // const {first, last} = name;
//     if (name.toLowerCase().includes(query)) {
//       return true;
//     }
//     // if (name.includes(query) || last.includes(query) || email.includes(query)) {
//     //   return true;
//     // }

//     return false;
//   };

//   const handleSearch = (value) => {
//     const formattedQuery = value.toLowerCase();
//     const data = _.filter(fullData, (product) => {
//       return containsQuery(product, formattedQuery);
//     });
//     setQuery(value);
//     setData(data);
//   };

//   const calculateIndividualAmount = (quantity, buyingprice) => {
//     return quantity * Number(buyingprice);
//   };

//   const onChangeText = (text, index, id) => {
//     data[index].value = text;
//     data[index].amount = calculateIndividualAmount(
//       text,
//       data[index].buyingPrice,
//     );
//     const fullDataindex = fullData.map((x) => x.id).indexOf(id);
//     fullData[fullDataindex].value = text;
//     setData([...data]);
//     calculateTotalBuyingAmount();
//   };
//   const renderView = () => {
//     return (
//       <KeyboardAvoidingView behavior="height" style={{height: '100%'}}>
//         <View>
//           <CustomProgressBar
//             category={2}
//             loaderText="Fetching ..."
//             loader={7}
//             visible={fetching}
//           />
//           <Card
//             cornerRadius={25}
//             style={{left: 15, height: 50, width: '90%', marginTop: 20}}>
//             <TouchableOpacity onPress={() => {}}>
//               <SearchBar
//                 placeHolder={'Search App...'}
//                 editable={true}
//                 onChangeText={(value) => {
//                   handleSearch(value);
//                 }}
//                 onFocus={() => {}}
//               />
//             </TouchableOpacity>
//           </Card>
//           <View
//             style={{
//               marginVertical: 10,
//               alignItems: 'center',
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignSelf: 'center',
//               width: '60%',
//             }}>
//             <TextComponent style={{fontSize: 20}} bold>
//               {totalItems}
//             </TextComponent>
//             <View
//               style={{height: 50, backgroundColor: '#000', width: 1}}></View>
//             <TextComponent style={{fontSize: 20}} bold>
//               {currencyFormatter(totalAmount)}
//             </TextComponent>
//           </View>
//           <View style={{marginVertical: 40}}>
//             <Datatable.DataTable
//               dataSource={data}
//               renderRow={({item, index}) => {
//                 return (
//                   <Datatable.Row
//                     style={{
//                       backgroundColor: arrayColor[index % arrayColor.length],
//                     }}>
//                     <Datatable.Cell width={3} style={{}}>
//                       <TextComponent> {item.name}</TextComponent>
//                     </Datatable.Cell>
//                     <Datatable.Cell>
//                       <TextComponent> {item.mass}</TextComponent>
//                     </Datatable.Cell>
//                     <Datatable.EditableCell
//                       onEndEditing={(val, l) => {
//                         onEndEditing();
//                       }}
//                       changTxt={(text, i) => {
//                         onChangeText(text, i, item.id);
//                       }}
//                       value={item.value}
//                       index={index}
//                     />
//                   </Datatable.Row>
//                 );
//               }}
//             />
//             {/* <View style={{height: 500}}></View> */}
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     );
//   };

//   return (
//     <View>
//       <Header
//         // title={'adminInformation.fullName'}
//         leftComponent={
//           <TouchableOpacity
//             style={{
//               left: -20,
//               height: 50,
//               width: 50,
//               alignItems: 'center',
//               top: -5,
//             }}
//             onPress={() => {
//               goBack();
//             }}>
//             <AntDesign name="arrowleft" size={24} color="white" />
//           </TouchableOpacity>
//         }>
//         {loading ? (
//           <UIActivityIndicator
//             style={{height: 10, width: 10}}
//             size={30}
//             color="white"
//           />
//         ) : (
//           <TouchableOpacity
//             style={
//               {
//                 // backgroundColor: 'red',
//                 // left: -20,
//                 // height: 50,
//                 // width: 50,
//                 // alignItems: 'center',
//                 // top: -5,
//                 // justifyContent: 'center',
//               }
//             }
//             onPress={() => onSave()}>
//             <AntDesign name="check" size={24} color="white" />
//           </TouchableOpacity>
//         )}
//         {/* {loadingChats ? (
//             <ComponentLoader
//               style={{height: 10, width: 10}}
//               size={30}
//               color="white"
//             />
//           ) : null} */}
//       </Header>
//       {renderView()}
//     </View>
//   );
// };

// export default CreateOrder;

import React, {createRef} from 'react';
import {View, Dimensions, TouchableOpacity, Keyboard} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {
  TextComponent as Text,
  SearchBar,
  ShimmerLoading,
  ShimmerHistory,
  Header,
  Input,
} from '@components';
import {CommonContext} from '@context';
import {currencyFormatter, determineWhichNumber} from '@config';
import {connect} from 'react-redux';
import {AdminActions} from '@actions';
import _ from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UIActivityIndicator} from 'react-native-indicators';
import {
  Modal,
  ModalContent,
  ScaleAnimation,
  ModalTitle,
  ModalFooter,
  ModalButton,
} from 'react-native-modals';
import {FONTS, dimensions} from '@utils';
import isArray from 'lodash/isArray';
import {ROUTES} from '@config';

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};
let containerCount = 0;

class CellContainer extends React.Component {
  constructor(args) {
    super(args);
    this._containerId = containerCount++;
    this.state = {};
  }
  render() {
    const {count, name, mass, key, quantity} = this.props.data;

    return (
      <View
        // onPress={this.props.onPress}
        style={{
          width: '95%',
          alignSelf: 'center',
          height: 65,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            backgroundColor: '#F8F9FB',
            height: 65,
            width: '100%',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <View
            style={{
              backgroundColor: '#0B3F80',
              width: 40,
              height: 40,
              borderRadius: 30,
              marginLeft: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text whiteColor>{count}</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '85%',
            }}>
            <View style={{width: 150, top: 20}}>
              <Text numberOfLines={1} style={{left: 15, fontSize: 11}}>
                {name}
              </Text>
            </View>
            <View style={{top: 20}}>
              <Text numberOfLines={1} style={{fontSize: 11}}>
                ( {mass} )
              </Text>
            </View>

            <View style={{width: 50, top: 5}}>
              <Input
                style={{}}
                value={`${quantity}`}
                keyboardType="numeric"
                onChangeText={(value) => this.props.onChangeValue(value, key)}
              />
            </View>
          </View>
        </View>
      </View>

      // <View {...this.props}>
      //   {this.props.children}
      //   <Text>Cell Id: {this._containerId}</Text>
      // </View>
    );
  }
}
class RecycleTestComponent extends React.PureComponent {
  static contextType = CommonContext;

  constructor(props) {
    super(props);
    let {width} = Dimensions.get('window');
    // this.searchRef = createRef();
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }),
      routes: [
        {key: 'first', title: 'Current Cart'},
        {key: 'second', title: 'Saved Carts'},
      ],
      loading: true,
      empty: false,
      fullData: [],
      totalItems: 0,
      totalAmount: 0,
      checkout: false,
      update: true,
      modal: false,
      data: [],
    };
    this._layoutProvider = new LayoutProvider(
      (index) => {
        return ViewTypes.FULL;
      },
      (type, dim) => {
        dim.width = width;
        dim.height = 80;
      },
    );

    this._rowRenderer = this._rowRenderer.bind(this);
  }

  _generateArray(n) {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = i;
    }
    return arr;
  }

  componentDidMount() {
    if (isArray(this.props?.clientsRequestOrders)) {
      const reduxData = this.props?.clientsRequestOrders?.filter(
        (x) => x.id === this.context.sendOrderData.shop.shopID,
      );

      reduxData?.length === 0
        ? this.getProductsFromServer()
        : this.setState({
            data: reduxData[0].data,
            loading: false,
            fullData: reduxData[0].data,
            totalItems: reduxData[0].totalItems,
            totalAmount: reduxData[0].totalAmount,
          });
    } else {
      this.getProductsFromServer();
    }
  }

  getProductsFromServer = () => {
    const {getProductsForOrders, sendOrderData} = this.context;
    // this.props.clearCart(myCurrentShop.id);
    getProductsForOrders(sendOrderData.shop.shopID).then((response) => {
      const productsData = [];
      let count = 1;
      response.forEach((result) => {
        productsData.push({
          key: result.id,
          name: result.data().productName,
          mass: result.data().mass,
          quantity: '',
          count: count++,
          buyingPrice: result.data().buyingPrice,
          salePrice: result.data().salePrice,
          InCase: result.data().InCase,
          category: result.data().category,
        });
      });

      this.setState({
        data: productsData,
        loading: false,
        fullData: productsData,
        totalItems: 0,
        totalAmount: 0,
      });
    });
  };

  _rowRenderer(type, data) {
    //You can return any view here, CellContainer has no special significance
    return (
      <CellContainer
        onChangeValue={(val, key) => this.onChangeText(val, key)}
        onPress={() => {
          // const {currentCart} = this.state;
          // const {setproductsCart} = this.context;
          // if (_.isEmpty(currentCart)) {
          //   this.setState({
          //     currentCart: {
          //       data: [data],
          //       id: this.context.myCurrentShop.id,
          //       totalItems: 1,
          //       totalAmount: data.salePrice * Number(data.quantity),
          //     },
          //   });
          //   const saveToCartData = {
          //     data: [data],
          //     id: this.context.myCurrentShop.id,
          //     totalItems: 1,
          //     totalAmount: data.salePrice * Number(data.quantity),
          //   };
          //   setproductsCart(saveToCartData);
          //   return this.props.saveCart(saveToCartData);
          // }
          // if (currentCart?.data.map((x) => x.key).includes(data.key)) {
          //   const dataIndex = currentCart.data
          //     .map((x) => x.key)
          //     .indexOf(data.key);
          //   //
          //   //
          //   currentCart.data[dataIndex].quantity =
          //     parseInt(currentCart.data[dataIndex].quantity) + 1;
          //   const clickValues2 = this.clicksCalculateAmountUtems(data, 'same');
          //   const saveToCartData2 = {
          //     data: currentCart.data,
          //     id: this.context.myCurrentShop.id,
          //     totalItems: clickValues2.items,
          //     totalAmount: clickValues2.totalAmount,
          //   };
          //   setproductsCart(saveToCartData2);
          //   this.props.saveCart(saveToCartData2);
          //   return false;
          // }
          // const clickValues = this.clicksCalculateAmountUtems(data);
          // const saveToCartData3 = {
          //   data: clickValues.data,
          //   id: this.context.myCurrentShop.id,
          //   totalItems: clickValues.items,
          //   totalAmount: clickValues.totalAmount,
          // };
          // setproductsCart(saveToCartData3);
          // this.props.saveCart(saveToCartData3);
        }}
        data={data}
        style={styles.containerGridLeft}
      />
    );
  }

  containsQuery = ({name}, query) => {
    if (name.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  handleSearch = (value) => {
    const formattedQuery = value.toLowerCase();
    const data = _.filter(this.state.fullData, (x) => {
      return this.containsQuery(x, formattedQuery);
    });
    if (data.length === 0) {
      return this.setState({empty: true});
    }
    this.setState({
      data: data,
      empty: false,
    });
    // handleLoad();
  };
  onChangeText = (value, id) => {
    let results = '';
    this.setState((prevState) => {
      const val = prevState.data.map((x) => {
        x.amount =
          determineWhichNumber(x.salePrice).value *
          determineWhichNumber(value).value;
        if (x.key === id) {
          return {...x, quantity: value};
        }
        return x;
      });
      //  this.calculateTotalBuyingAmount(val);
      results = this.filteredTobeSavedProducts(value, 'saving', id);
      return {
        data: val,
        totalItems: results.totalItems,
        totalAmount: results.totalAmount,
      };
    });
  };

  calculateTotalBuyingAmount = (x) => {
    const value = x.map(
      (d) =>
        determineWhichNumber(d.quantity).value *
        determineWhichNumber(d.buyingPrice).value,
    );
    const totalAmount = value.reduce((a, b) => a + b);
    const itemsArray = x.map((d) => determineWhichNumber(d.quantity).value);
    const totalItems = itemsArray.reduce((a, b) => a + b);

    return {
      totalItems,
      totalAmount,
    };
  };

  filteredTobeSavedProducts = (value, type, id) => {
    const index = this.state.fullData.map((x) => x.key).indexOf(id);
    const fullData = this.state.fullData;

    let productsData = '';
    type === 'saving'
      ? null
      : (() => {
          const filteredData = fullData.filter((x) => x.quantity !== '');
          const admin = this.context.sendOrderData.admin;
          const shop = this.context.sendOrderData.shop;
          delete admin.adminShops;
          shop.ownerID = shop.ownerID[0];
          productsData = {
            data: filteredData,
            totalItems: this.state.totalItems,
            totalAmount: this.state.totalAmount,
            type: 'User_Orders',
            admin,
            shop,
          };
        })();
    if (type === 'saving') {
      fullData[index].quantity = value;
      const results = this.calculateTotalBuyingAmount(fullData);

      productsData = {
        data: this.state.fullData,
        totalItems: results.totalItems,
        totalAmount: results.totalAmount,
        id: this.context.sendOrderData.shop.shopID,
      };
      this.dispatchingActionToSaveOrder(productsData);
      return results;
    } else {
      return productsData;
    }
  };
  dispatchingActionToSaveOrder = (v) => {
    this.props.saveOrder(v);
  };

  onSave = () => {
    const data = this.filteredTobeSavedProducts(null, 'continue');
    data.save = false
    this.context.setStoreClientsOrder(data);
    this.props.navigation.navigate(ROUTES.CreateOrderDetails);
  };

  onDone = () => {
    Keyboard.dismiss();
    this.setState({modal: true});
  };
  onReset = () => {
    this.setState({
      loading: true,
    });
    this.props.resetOrder(this.context.sendOrderData.shop.shopID);
    this.getProductsFromServer();
  };

  render() {
    const {
      loading,
      empty,
      checkout,
      totalAmount,
      totalItems,
      data,
    } = this.state;
    return (
      <View style={{height: '100%'}}>
        <Header
          // title={'adminInformation.fullName'}
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
                this.props.navigation.goBack();
              }}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          }>
          {checkout ? (
            <UIActivityIndicator
              style={{height: 10, width: 10}}
              size={30}
              color="white"
            />
          ) : (
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
              onPress={() => this.onDone()}>
              <Text semibold whiteColor>
                Done
              </Text>
              {/* <AntDesign name="check" size={24} color="white" /> */}
            </TouchableOpacity>
          )}
          {/* {loadingChats ? (
            <ComponentLoader
              style={{height: 10, width: 10}}
              size={30}
              color="white"
            />
          ) : null} */}
        </Header>
        <DiscountModal
          modalDialog={this.state.modal}
          setModal={(val) => this.setState({modal: val})}
          onReset={this.onReset}
          onContinue={this.onSave}
          totalDiscount={this.state.totalDiscount}
        />
        <SearchBar
          // inputRef={this.searchRef}
          // ref={this.searchRef}
          placeHolder={'Search product...'}
          // value={query}
          onChangeText={(value) => {
            this.handleSearch(value);
          }}
          onClear={(value) => {
            //   handleSearch(value);
          }}
          onFocus={(e) => {
            // console.log(e.onFocus());
            // this.searchRef.focus();
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
        ) : empty ? (
          <View style={{alignSelf: 'center', marginTop: 50}}>
            <Text style={{color: 'red'}}>
              Product not Found search for another ...!
            </Text>
          </View>
        ) : (
          <>
            <View
              style={{
                marginVertical: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                width: '60%',
              }}>
              <Text style={{fontSize: 20}} bold>
                {totalItems}
              </Text>
              <View
                style={{height: 50, backgroundColor: '#000', width: 1}}></View>
              <Text style={{fontSize: 20}} bold>
                {currencyFormatter(totalAmount)}
              </Text>
            </View>

            <RecyclerListView
              keyboardShouldPersistTaps="always"
              layoutProvider={this._layoutProvider}
              dataProvider={this.state.dataProvider.cloneWithRows(data)}
              rowRenderer={this._rowRenderer}
              renderFooter={() => <View style={{height: 200}} />}
              style={{height: '100%', width: '100%'}}
            />
          </>
        )}
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {clientsRequestOrders: state?.admin?.clientsRequestOrders};
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveOrder: (data) => {
      dispatch(AdminActions.saveClientsRequestOrders(data));
    },
    resetOrder: (id) => {
      dispatch(AdminActions.resetClientsRequestOrders(id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecycleTestComponent);
const styles = {
  actionButtonIcon: {
    fontSize: 20,
    height: 25,
    color: 'white',
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00a1f1',
  },
  containerGridLeft: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffbb00',
  },
  containerGridRight: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#7cbb00',
  },
};

export const DiscountModal = (props) => {
  return (
    <Modal
      visible={props.modalDialog} //discountModal
      onTouchOutside={() => {
        props.setModal(false);
      }}
      width={dimensions.width_screen - 40}
      height={150}
      modalTitle={
        <ModalTitle
          textStyle={{fontSize: 15, fontFamily: FONTS.Regular}}
          title={'Confirm'}
        />
      }
      modalAnimation={
        new ScaleAnimation({
          initialValue: 0, // optional
          animationDuration: 150, // optional
          useNativeDriver: true, // optional
        })
      }
      footer={
        <ModalFooter>
          <ModalButton
            textStyle={{
              color: 'red',
              fontWeight: '600',
              fontSize: 14,
              fontFamily: FONTS.Regular,
            }}
            bordered={true}
            text={'Discard'}
            onPress={() => {
              props.onReset();
              props.setModal(false);
            }}
          />
          <ModalButton
            textStyle={{
              fontWeight: '600',
              fontSize: 14,
              fontFamily: FONTS.Regular,
            }}
            text={'Continue'}
            onPress={() => {
              props.setModal(false);
              props.onContinue();
            }}
          />
        </ModalFooter>
      }
      swipeDirection={['up', 'down', 'left', 'right']} // can be string or an array
      swipeThreshold={200} // default 100
      onSwipeOut={() => {
        props.setModal(false);
      }}>
      <ModalContent>
        <View>
          <View>
            <View
              style={{
                // height: 40,
                width: '100%',
                alignSelf: 'center',
                borderRadius: 5,
                top: 10,
              }}>
              <Text style={{textAlign: 'center'}}>
                Are you sure you want to continue
              </Text>
            </View>
          </View>
        </View>
      </ModalContent>
    </Modal>
  );
};

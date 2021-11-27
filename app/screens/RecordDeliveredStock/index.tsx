import React, {useState, useContext, useEffect, useRef, memo} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  SaveButton,
  Icon,
  Input,
  Dialog,
  SearchBar,
  Select,
  Header,
  TextComponent as Text,
  Autocomplete,
  Errors,
} from '@components';
import _ from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';
import {DataTable} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS} from '@utils';
import {handleSearch, keyGenerator, currencyFormatter} from '@config';
import {CheckBox} from 'react-native-elements';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ROUTES, uniqueid, checkWhichWeek, determineWhichNumber} from '@config';
import {calculateProfit} from '@services';
import {getAirtime} from '@constants';
import {getDeliveries} from '@constants';
import {useDispatch, useSelector} from 'react-redux';
import {CommonContext} from '@context';
import {AdminActions} from '@actions';
import {keyExtractor} from '@helpers';
import isArray from 'lodash/isArray';

const RecordDeliveredStock = memo(() => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {navigate, goBack} = useNavigation();
  const [search, setSearch] = useState('');
  const {
    getDeliveredStock,
    getRecentRecordedStock,
    getProducts,
    weeklyDeliveries,
    checkWeek,
    myCurrentShop,
  } = useContext(CommonContext);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [arrayLength, setArrayLength] = useState({
    current: 0,
    full: 0,
    clicks: 0,
  });
  const reduxDeliveries = useSelector((state) => state.admin.deliveries);
  const [airtime, setAirtime] = useState('type');
  const [meat, setMeat] = useState([
    {name: '', mass: '', amount: '', count: 1},
  ]);
  const [component, setComponent] = useState('');
  const [content, setContent] = useState('');
  const [showLeft, setShowLeft] = useState(false);
  const [dataDeliveries, setDataDeliveries] = useState(
    getDeliveries().map((x, i) => {
      return {name: x, isSelected: false, id: i + 2};
    }),
  );
  const [globalDeleteIndex, setGlobalDeleteIndex] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [weekStatus, setWeekStatus] = useState('');
  const modalizeRef = useRef<Modalize>(null);
  const continueModalizeRef = useRef<Modalize>(null);
  const selectDelivery = useRef<Modalize>(null);
  const [loading, setLoading] = useState(false);
  const onOpen = async () => {
    setFetchingProducts(true);
    getProducts().then(async (response) => {
      setLoading(false);
      const firestoreData = [];
      let count = 1;
      response.forEach((result) => {
        firestoreData.push({
          key: result.id,
          name: result.data().productName,
          mass: result.data().mass,
          quantity: '',
          vat: 15,
          includingVat: true,
          excludingVat: false,
          count: count++,
          amount: '',
          buyingPrice: result.data().buyingPrice,
          salePrice: result.data().salePrice,
          isSelected: false,
          InCase: result.data().InCase,
        });
      });
      await setData(firestoreData.slice(0, 5));
      await setFullData(firestoreData);
      setArrayLength({full: firestoreData.length, current: 5});
      setFetchingProducts(false);
    });
  };

  useEffect(() => {
    if (isArray(reduxDeliveries)) {
      const v = reduxDeliveries.filter((x) => x.id === myCurrentShop.id);
      if (v.length > 0) {
        const del = v[0];
        del.saved
          ? (() => {
              setIndicator(true);
              setComponent(del.component);
              setData(del.data.slice(0, 5));
              setFullData(del.data);
              setArrayLength({full: del.data.length, current: 5});
              setIndicator(false);
            })()
          : null;
      }
    }
    checkWhichWeek(checkWeek, myCurrentShop.id);
  }, []);

  // const fetchRecentOrder = async (x) => {
  //   getRecentRecordedStock().then((response) => {
  //     // setLoading(false);
  //     const firestoreData = [];
  //     let count = 1;

  //     response.docs.length > 0
  //       ? response.docs[0].data().productsData.forEach((result) => {
  //           firestoreData.push({
  //             name: result.name,
  //             mass: result.mass,
  //             quantity: '',
  //             amount: '',
  //             buyingPrice: result.buyingPrice,
  //             salePrice: result.salePrice,
  //             isSelected: false,
  //             includingVat: true,
  //             excludingVat: false,
  //             count: count++,
  //             vat: 15,
  //             key: keyGenerator(),
  //             InCase: result.InCase,
  //           });
  //         })
  //       : null;
  //     setData(firestoreData);
  //     setComponent(x);
  //     setIndicator(false);
  //     setDisabled(false);
  //   });
  // };
  const SelectRecord = () => (
    <View
      style={{height: '90%', alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          marginHorizontal: 40,
        }}>
        <Text style={{color: '#556084', textAlign: 'center', top: -50}}>
          Please click the button to select the delivery you want to record into
          the system{' '}
        </Text>
      </View>
    </View>
  );
  const calculateBuyingAndSellingPrize = (o, type) => {
    if (type === 'meat') {
      const totalBuyingAmount = o
        .map(
          (s) =>
            determineWhichNumber(s.amount).value *
            determineWhichNumber(s.quantity).value,
        )
        .reduce((a, b) => a + b);
      const totalSellingAmount = o
        .map(
          (s) =>
            determineWhichNumber(s.salePrice).value *
            determineWhichNumber(s.quantity).value *
            determineWhichNumber(s.InCase).value,
        )
        .reduce((a, b) => a + b);
      const totalItems = o
        .map((s) => determineWhichNumber(s.quantity).value)
        .reduce((a, b) => a + b);

      return {
        totalBuyingAmount,
        totalSellingAmount,
        totalItems,
      };
    }

    const totalBuyingAmount = o
      .map((s) => {
        if (s.includingVat) {
          // const vatPercaentage = s.vat / 100;
          // const val =
          //   determineWhichNumber(vatPercaentage).value *
          //   determineWhichNumber(s.amount).value;
          const second = determineWhichNumber(s.amount).value;
          return second * determineWhichNumber(s.quantity).value;
        }
        return (
          determineWhichNumber(s.amount).value *
          determineWhichNumber(s.quantity).value
        );
      })
      .reduce((a, b) => a + b);
    const totalSellingAmount = o
      .map(
        (s) =>
          determineWhichNumber(s.salePrice).value *
          determineWhichNumber(s.quantity).value *
          determineWhichNumber(s.InCase).value,
      )
      .reduce((a, b) => a + b);
    const totalItems = o
      .map((s) => determineWhichNumber(s.quantity).value)
      .reduce((a, b) => a + b);

    //////

    // obj.includingVat
    // ? (() => {
    //     const first =
    //       parseInt(obj.salePrice) *
    //       parseInt(obj.quantity) *
    //       parseInt(obj.InCase);
    //     const vatPercaentage = obj.vat / 100;
    //     const second = parseInt(obj.amount) + vatPercaentage;
    //     const third = second * parseInt(obj.quantity);
    //     const totalProf = first - third;
    //     v = totalProf;
    //   })()
    // : (() => {
    //     const h =
    //       parseInt(obj.salePrice) *
    //       parseInt(obj.quantity) *
    //       parseInt(obj.InCase);
    //     const e = parseInt(obj.amount) * parseInt(obj.quantity);
    //     const z = h - e;
    //     v = z;
    //   })();

    ///////////////

    return {
      totalBuyingAmount,
      totalSellingAmount,
      totalItems,
      profit: totalSellingAmount - totalBuyingAmount,
    };
  };
  const deleteCate = (index) => {
    setContent(`Do you want to remove ${data[index].name}`);
    setDialogVisible(true);
    setGlobalDeleteIndex(index);
  };
  const checkNegativeProfit = (x) => {
    const v = x.find((b) => {
      return b.profit.status === false;
    });

    if (v) {
      return true;
    }
    if (!v) {
      return false;
    }
  };
  const onContinue = (y) => {
    setLoading(true);
    // const y = data.map((x) => {
    //   if (x.includingVat) {
    //     return {
    //       ...x,
    //       includingVat: x.amount,
    //       excludingVat: parseInt(x.amount) - parseInt(x.amount) * (x.vat / 100),
    //     };
    //   }
    //   if (x.excludingVat) {
    //     return {
    //       ...x,
    //       excludingVat: x.amount,
    //       includingVat: parseInt(x.amount) + parseInt(x.amount) * (x.vat / 100),
    //     };
    //   }
    // });

    // const t = data.map((i) => parseInt(i.amount)).reduce((a, b) => a + b);
    // setCheckdata(y);
    // setTotalAmount(t);
    // // setData(y);
    // setTimeout(() => {
    //   continueModalizeRef.current?.open();
    //   setLoading(false);
    // }, 1000);
    // setLoading(true);
    // VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 9869.7138671875, "dt": 6830, "prevDt": 4940}
    let results;
    let filteredData;
    switch (y) {
      case getDeliveries()[0]:
        //BulkStockDelivery
        filteredData = fullData
          .filter((x) => {
            if (x.profit) {
              if (currencyFormatter(x.profit) === 0) {
                return (
                  (x.amount !== '' && x.quantity !== '') ||
                  isNaN(x.profit.amount) !== true
                );
              }
            }
            return x.amount !== '' || x.quantity !== '';
          })
          .map((u, v) => {
            delete u.isSelected;
            return u;
          });

        const chekPro = checkNegativeProfit(filteredData);

        if (chekPro) {
          setLoading(false);
          Errors({
            message: 'Inproper amounts',
            autoHide: true,
            description:
              'Please check and correct the amounts you entered you cant have a negative profit ',
          });

          return null;
        }
        // return false;
        if (filteredData.length <= 0) {
          Errors({
            message: 'Empty fileds',
            description: 'You cant submit you havent entered anything',
            autoHide: true,
          });
          setLoading(false);

          return false;
        }

        results = calculateBuyingAndSellingPrize(filteredData);
        getDeliveredStock({
          products: filteredData,
          statistics: results,
          type: component,
          weekStatus,
        });
        navigate(ROUTES.RecordDeliveredDetails);
        break;
      case getDeliveries()[1]:
        // Meat

        filteredData = meat
          .filter((x) => x.amount !== '' || x.mass !== '')
          .map((u, v) => {
            u.key = keyGenerator();
            return u;
          });

        if (filteredData.length <= 0) {
          Errors({
            message: 'Empty fileds',
            description: 'You cant submit you havent entered anything',
            autoHide: true,
          });
          setLoading(false);

          return false;
        }

        results = calculateBuyingAndSellingPrize(meat, 'meat');

        getDeliveredStock({
          products: filteredData,
          statistics: results,
          type: component,
          weekStatus,
        });
        navigate(ROUTES.RecordDeliveredDetails);
        break;
      case getDeliveries()[2]:
        delete airtime.value;
        airtime.quantity = 1;
        airtime.key = keyGenerator();
        // key
        //Airtime
        getDeliveredStock({
          products: airtime,
          type: component,
          weekStatus,
        });
        navigate(ROUTES.RecordDeliveredDetails);
        break;
      case getDeliveries()[3]:
        //Drink
        filteredData = fullData
          .filter((x) => x.amount !== '' || x.quantity !== '')
          .map((u, v) => {
            delete u.isSelected;

            return u;
          });

        results = calculateBuyingAndSellingPrize(filteredData);
        getDeliveredStock({
          products: filteredData,
          statistics: results,
          type: component,
          weekStatus,
        });
        break;
      case getDeliveries()[4]:
        //Bread
        filteredData = fullData
          .filter((x) => x.amount !== '' || x.quantity !== '')
          .map((u, v) => {
            delete u.isSelected;
            return u;
          });
        if (filteredData.length <= 0) {
          Errors({
            message: 'Empty fileds',
            description: 'You cant continue you havent entered anything',
            autoHide: true,
          });
          setLoading(false);

          return false;
        }
        results = calculateBuyingAndSellingPrize(filteredData);
        getDeliveredStock({
          products: filteredData,
          statistics: results,
          type: component,
          weekStatus,
        });
        break;
    }
    setLoading(false);
  };
  const updateData = (index, value, key, id) => {
    let fullDataindex;
    switch (key) {
      case 'amount':
        data[index].amount = value;
        fullDataindex = fullData.map((x) => x.key).indexOf(id);
        fullData[fullDataindex].amount = value;

        break;
      case 'vat':
        data[index].vat = value;
        fullDataindex = fullData.map((x) => x.key).indexOf(id);
        fullData[fullDataindex].vat = value;
        break;
      case 'quantity':
        data[index].quantity = value;
        fullDataindex = fullData.map((x) => x.key).indexOf(id);
        fullData[fullDataindex].quantity = value;
        break;
    }

    let v;
    const obj = data[index];

    obj.includingVat
      ? (() => {
          // Total selling prize
          const first =
            determineWhichNumber(obj.salePrice).value *
            determineWhichNumber(obj.quantity).value *
            determineWhichNumber(obj.InCase).value;
          // gettting vat percentage to include

          // const vatPercaentage = obj.vat / 100;

          // const val =
          //   determineWhichNumber(vatPercaentage).value *
          //   determineWhichNumber(obj.amount).value;

          const second = determineWhichNumber(obj.amount).value;
          const third = second * determineWhichNumber(obj.quantity).value;
          const totalProf = third === 0 ? 0 : first - third;

          // console.log(typeof determineWhichNumber(obj.quantity).value);
          // console.log(typeof determineWhichNumber(obj.InCase).value);
          // console.log(typeof determineWhichNumber(vatPercaentage).value);
          // console.log(determineWhichNumber(first).value);
          // console.log(determineWhichNumber(val).value);
          // console.log(determineWhichNumber(obj.amount).value);
          // console.log(determineWhichNumber(second).value);
          // console.log(determineWhichNumber(third).value);

          v = totalProf;
        })()
      : (() => {
          const h =
            determineWhichNumber(obj.salePrice).value *
            determineWhichNumber(obj.quantity).value *
            determineWhichNumber(obj.InCase).value;
          const e =
            determineWhichNumber(obj.amount).value *
            determineWhichNumber(obj.quantity).value;

          const z = e === 0 ? 0 : h - e;
          v = z;
        })();

    data[index].profit = {
      amount: v,
      status: v > 0 ? true : false,
    };
    data[index].showProfit = true;
    setData([...data]);
    dispatch(
      AdminActions.saveDeliveryStock({
        data: fullData,
        component,
        id: myCurrentShop.id,
      }),
    );
    // setFullData(fullData);
    // setData([...data]);
  };

  const onSave = async () => {
    const profit = calculateProfit(data);
    await weeklyDeliveries({
      products: data,
      profit: profit.profit,
      invoiceNumber: uniqueid(10),
      transactionID: uniqueid(15),
      createdAt: new Date(),
      profitsData: {
        totalSellingAmount: profit.totalSellingAmount,
        totalBuyingAmount: profit.totalBuyingAmount,
      },
    });
    continueModalizeRef.current?.close();
    navigate(ROUTES.RecordDeliveredStockSuccess);
  };
  const Airtime = () => (
    <View style={{height: '90%', justifyContent: 'center'}}>
      <View style={{top: -50, marginHorizontal: 20}}>
        <View
          style={{
            marginHorizontal: 40,

            // justifyContent: 'center',
          }}>
          <Text style={{color: '#556084', textAlign: 'center', top: -30}}>
            Enter the Airtime and Amount below
          </Text>
        </View>
        <Select
          type="underline"
          options={getAirtime()}
          createShop={true}
          valueSelect={airtime.value}
          onSelect={(value) => {
            setAirtime(value);
          }}
          contentStyle={[
            styles.selectContent,
            {backgroundColor: colors.secondaryCard},
          ]}
          containerStyle={styles.selectContainer}
          touchStyle={styles.touchContent}
          style={styles.selectMethod}
        />
        <Input
          label={'Amount'}
          // value={`${item?.vat}`}
          keyboardType="numeric"
          isRequired
          style={{}}
          onChangeText={(value) => setAirtime({...airtime, amount: value})}
        />
      </View>
    </View>
  );

  const updateMeatData = (key, value, index, item) => {
    if (key === 'name') {
      meat[index].name = value;
      meat[index].buyingPrice = item.buyingPrice;
      meat[index].salePrice = item.salePrice;
    }
    if (key === 'amount') {
      meat[index].amount = value;
    }
    if (key === 'mass') {
      meat[index].mass = value;
      meat[index].quantity = value;
    }
    setMeat([...meat]);
  };
  // END
  const [filmsData, setfilms] = useState({
    films: [],
    query: '',
    showHide: false,
  });

  const findFilm = (query) => {
    if (query === '') {
      return [];
    }

    const {films} = filmsData;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter((film) => film.productName.search(regex) >= 0);
  };

  const {query, showHide} = filmsData;
  const films = findFilm(query);
  const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
  // START
  const Meat = () => (
    <FlatList
      data={meat}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={({item, index}) => {
        const x = item;
        const i = index;
        return (
          <View>
            <Text bold>{x.count}</Text>
            <View style={{marginBottom: 80}}>
              <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                listContainerStyle={{borderRadius: 10}}
                listStyle={{height: 30}}
                containerStyle={styles.autocompleteContainer}
                // style={{backgroundColor: 'red'}}
                data={
                  films.length === 1 && comp(query, films[0].productName)
                    ? []
                    : films
                }
                defaultValue={x.name}
                inputContainerStyle={{
                  height: 46,
                  paddingHorizontal: 7,
                  // fontSize: 15,
                  // textAlignVertical: 'top',
                  // paddingTop: 14,
                  // paddingBottom: 14,
                  // lineHeight: 15,
                  borderRadius: 10,
                  // marginBottom: 200,
                }}
                // style={{marginBottom: 20}}
                onChangeText={(text) =>
                  setfilms({...filmsData, query: text, showHide: true})
                }
                placeholder="Enter meat"
                renderItem={(t) =>
                  showHide ? (
                    <TouchableOpacity
                      onPress={
                        () => {
                          setfilms({
                            ...filmsData,
                            query: '',
                            showHide: false,
                          });
                          updateMeatData('name', t.item.productName, i, t.item);
                        }
                        // this.setState({query: item.title, showHide: false})
                      }>
                      <Text style={styles.itemText}>
                        {t.item.productName}
                        {/* ({item.release_date.split('-')[0]}) */}
                      </Text>
                    </TouchableOpacity>
                  ) : null
                }
              />
            </View>
            {/* <View style={styles.descriptionContainer}>
      {films.length > 0 ? (
        renderFilm(films[0])
      ) : (
        <Text style={styles.infoText}>Enter Title of a Star Wars movie</Text>
      )}
    </View> */}
            {/* <Input
              label={'Meat'}
              value={`${x?.name}`}
              // keyboardType="numeric"
              isRequired
              style={{}}
              onChangeText={(value) => updateMeatData('name', value, i)}
            /> */}
            <Input
              label={"Kg's'"}
              value={`${x?.mass}`}
              keyboardType="numeric"
              isRequired
              // style={{marginTop: 10}}
              onChangeText={(value) => updateMeatData('mass', value, i)}
            />
            <Input
              label={'Amount'}
              value={`${x?.amount}`}
              keyboardType="numeric"
              isRequired
              style={{}}
              onChangeText={(value) => updateMeatData('amount', value, i)}
            />
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#ddd',
                marginVertical: 40,
              }}
            />
          </View>
        );
      }}
      bounces={false}
      contentContainerStyle={{marginTop: 10, marginHorizontal: 20}}
      ListHeaderComponent={() => (
        <View
          style={{
            marginHorizontal: 40,

            // justifyContent: 'center',
          }}>
          <Text style={{color: '#556084', textAlign: 'center'}}>
            Enter the Amount and the Mass of the meat below
          </Text>
        </View>
      )}
      ListFooterComponent={() => (
        <>
          <LinearGradient
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              // bottom: 100,
              // right: 30,
              elevation: 10,
              zIndex: 100,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            colors={['#F05F3E', '#ED3269']}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}>
            <TouchableOpacity
              onPress={() => {
                meat.push({
                  name: '',
                  mass: '',
                  amount: '',
                  count: meat.length + 1,
                });
                setMeat([...meat]);
              }}>
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          </LinearGradient>
          <View style={{height: 500}}></View>
        </>
      )}
    />
    // <View style={{height: '90%'}}>
    //   <ScrollView contentContainerStyle={{marginTop: 50}}>
    //     <View style={{marginTop: 10, marginHorizontal: 20}}>
    //       <View
    //         style={{
    //           marginHorizontal: 40,

    //           // justifyContent: 'center',
    //         }}>
    //         <Text style={{color: '#556084', textAlign: 'center'}}>
    //           Enter the Amount and the Mass of the meat below
    //         </Text>
    //       </View>
    //       {meat.map((x, i) => (
    //         <View>
    //           <Text bold>{x.count}</Text>
    //           <Autocomplete
    //             autoCapitalize="none"
    //             autoCorrect={false}
    //             containerStyle={styles.autocompleteContainer}
    //             data={
    //               films.length === 1 && comp(query, films[0].productName)
    //                 ? []
    //                 : films
    //             }
    //             defaultValue={query}
    //             onChangeText={(text) =>
    //               setfilms({...filmsData, query: text, showHide: true})
    //             }
    //             placeholder="Enter Star Wars film title"
    //             renderItem={({item}) =>
    //               showHide ? (
    //                 <TouchableOpacity
    //                   onPress={
    //                     () =>
    //                       setfilms({
    //                         ...filmsData,
    //                         query: item.productName,
    //                         showHide: false,
    //                       })
    //                     // this.setState({query: item.title, showHide: false})
    //                   }>
    //                   <Text style={styles.itemText}>
    //                     {item.productName}
    //                     {/* ({item.release_date.split('-')[0]}) */}
    //                   </Text>
    //                 </TouchableOpacity>
    //               ) : null
    //             }
    //           />
    //           {/* <View style={styles.descriptionContainer}>
    //     {films.length > 0 ? (
    //       renderFilm(films[0])
    //     ) : (
    //       <Text style={styles.infoText}>Enter Title of a Star Wars movie</Text>
    //     )}
    //   </View> */}
    //           {/* <Input
    //             label={'Meat'}
    //             value={`${x?.name}`}
    //             // keyboardType="numeric"
    //             isRequired
    //             style={{}}
    //             onChangeText={(value) => updateMeatData('name', value, i)}
    //           /> */}
    //           <Input
    //             label={"Kg's'"}
    //             value={`${x?.mass}`}
    //             keyboardType="numeric"
    //             isRequired
    //             style={{}}
    //             onChangeText={(value) => updateMeatData('mass', value, i)}
    //           />
    //           <Input
    //             label={'Amount'}
    //             value={`${x?.amount}`}
    //             keyboardType="numeric"
    //             isRequired
    //             style={{}}
    //             onChangeText={(value) => updateMeatData('amount', value, i)}
    //           />
    //           <View
    //             style={{
    //               width: '100%',
    //               height: 1,
    //               backgroundColor: '#ddd',
    //               marginVertical: 40,
    //             }}
    //           />
    //         </View>
    //       ))}

    //       <LinearGradient
    //         style={{
    //           height: 50,
    //           width: 50,
    //           borderRadius: 50,
    //           // bottom: 100,
    //           // right: 30,
    //           elevation: 10,
    //           zIndex: 100,
    //           marginTop: 20,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         }}
    //         colors={['#F05F3E', '#ED3269']}
    //         start={{x: 1, y: 0}}
    //         end={{x: 1, y: 1}}>
    //         <TouchableOpacity
    //           onPress={() => {
    //             meat.push({
    //               name: '',
    //               mass: '',
    //               amount: '',
    //               count: meat.length + 1,
    //             });
    //             setMeat([...meat]);
    //           }}>
    //           <AntDesign name="plus" size={24} color="white" />
    //         </TouchableOpacity>
    //       </LinearGradient>
    //     </View>
    //     <View style={{height: 500}}></View>
    //   </ScrollView>
    // </View>
  );

  const BulkStockDelivery = () => {
    return (
      <View>
        <FlatList
          data={data}
          contentContainerStyle={{marginTop: 50}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            // <Text>{item.text}</Text>
            <View key={index}>
              <View style={{}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text bold style={{textAlign: 'center', marginLeft: 10}}>
                    {item.count}
                  </Text>
                  <TouchableOpacity
                    style={[styles.btnSelectCate]}
                    onPress={() => deleteCate(index)}>
                    <Text>
                      {item.name} ({item.mass})
                    </Text>
                    <Icon
                      name="close-circle"
                      size={14}
                      iconStyle={styles.iconClose}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: 15}}>
                  <View style={styles.rowInput}>
                    <View style={styles.colInput}>
                      <Input
                        label={'Quantity'}
                        isRequired
                        keyboardType="numeric"
                        value={`${item?.quantity}`}
                        onChangeText={(value) =>
                          updateData(index, value, 'quantity', item.key)
                        }
                      />
                    </View>
                    <View style={styles.colInput}>
                      <Input
                        label={'Vat / Tax ( 15% )'}
                        value={`${item?.vat}`}
                        keyboardType="numeric"
                        isRequired
                        onChangeText={(value) =>
                          updateData(index, value, 'vat', item.key)
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.rowInput}>
                    <View style={styles.colInput}>
                      <Input
                        label={'Amount'}
                        value={`${item?.amount}`}
                        isRequired
                        // onEndEditing={() => onDoneEditing(index)}
                        keyboardType="numeric"
                        onChangeText={(value) =>
                          updateData(index, value, 'amount', item.key)
                        }
                      />
                    </View>
                    <View style={styles.colInput}>
                      <View>
                        <CheckBox
                          title={'Including Vat'}
                          textStyle={{
                            fontFamily: FONTS.Regular,
                            fontWeight: '400',
                            fontSize: 12,
                          }}
                          // checkedIcon="dot-circle-o"
                          // uncheckedIcon="circle-o"
                          checkedIcon="check-square-o"
                          uncheckedIcon="square-o"
                          checked={item.includingVat}
                          containerStyle={{
                            backgroundColor: colors.thirdBackground,
                            width: '95%',
                            height: 15,
                            borderRadius: 10,
                            borderColor: colors.thirdBackground,
                          }}
                          onPress={() => {
                            data[index].excludingVat = !data[index]
                              .excludingVat;
                            data[index].includingVat = !data[index]
                              .includingVat;

                            setData([...data]);
                          }}
                        />
                        {item.showProfit ? (
                          <View
                            style={{
                              left: 20,
                              width: 100,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  color: item.profit.status ? 'green' : 'red',
                                }}>
                                {' '}
                                {currencyFormatter(item.profit.amount)}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 11,
                                  left: 10,
                                  top: 5,
                                  color: item.profit.status ? 'green' : 'red',
                                }}>
                                profit
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <Text
                                semibold
                                style={{
                                  textAlign: 'center',
                                }}>
                                {' '}
                                {currencyFormatter(item.salePrice)}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 11,
                                  left: 10,
                                  top: 5,
                                }}>
                                sale price
                              </Text>
                            </View>
                          </View>
                        ) : null}
                        {/* <CheckBox
                      title={'Excluding Vat'}
                      textStyle={{
                        fontFamily: FONTS.Regular,
                        fontWeight: '400',
                      }}
                      // checkedIcon="dot-circle-o"
                      // uncheckedIcon="circle-o"
                      checkedIcon="check-square-o"
                      uncheckedIcon="square-o"
                      checked={item.excludingVat}
                      containerStyle={{
                        backgroundColor: colors.thirdBackground,
                        width: '95%',
                        height: 20,
                        borderRadius: 10,
                        borderColor: colors.thirdBackground,
                      }}
                      onPress={
                        () => {
                          data[index].excludingVat = !data[index]
                            .excludingVat;
                          data[index].includingVat = !data[index]
                            .includingVat;
                          setData([...data]);
                        }
                        // this.setState({checked: !this.state.checked})
                      }
                    /> */}
                      </View>
                      {/* <Input
                    label={'Excluding Vat'}
                    value={`${item?.excludingVat}`}
                    isRequired
                    keyboardType="numeric"
                    onChangeText={(value) =>
                      updateData(index, value, 'includingVat')
                    }
                  /> */}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#556084',
                    height: 1,
                    alignSelf: 'center',
                    width: '80%',
                    marginVertical: 20,
                  }}
                />
              </View>
            </View>
          )}
          ListFooterComponent={() => <View style={{height: 500}}></View>}
          // onEndReached={() => getMoreProducts()}
        />
        {/* <ScrollView contentContainerStyle={{marginTop: 50}}>
          {data.map((item, index) => (
             ))}

          <View style={{height: 500}} />
        </ScrollView> */}
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.thirdBackground}]}>
      <Header
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
        {/* <TouchableOpacity
          onPress={() => {
            disabled ? null : onOpen();
          }}>
          {fetchingProducts ? (
            <UIActivityIndicator
              style={{height: 10, width: 10, top: 8, left: -10}}
              size={30}
              color="white"
            />
          ) : (
            <MaterialCommunityIcons
              name="plus"
              size={30}
              color={disabled ? '#aaa' : 'white'}
            />
          )}
        </TouchableOpacity> */}
      </Header>
      <Dialog
        title="Remove Alert"
        content={content}
        firstButtontext="Delete"
        firstButtonTextStyles={{color: 'red'}}
        firstButtonOnPress={() => {
          data.splice(globalDeleteIndex, 1);
          setData([...data]);
          setDialogVisible(false);
        }}
        secondButtontext="Cancel"
        secondButtonOnPress={() => setDialogVisible(false)}
        onSwipefunc={() => setDialogVisible(false)}
        onTouchOutside={() => setDialogVisible(false)}
        modalVisible={dialogVisible}
        height={170}
      />
      {indicator ? (
        <ActivityIndicator
          style={{position: 'absolute', top: 400, left: '45%'}}
          size="large"
          color="black"
        />
      ) : null}

      <LinearGradient
        style={{
          height: 30,
          width: 100,
          position: 'absolute',
          borderRadius: 50,
          top: 160,
          right: 20,
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
            // if (arrayLength.current === 5) {
            //   return false;
            // }
            const first = arrayLength.current;
            const last = 5 + arrayLength.current;

            if (arrayLength.current > arrayLength.full) return false;

            setData([...fullData.slice(first, last)]);
            setArrayLength({
              ...arrayLength,
              current: last,
              clicks: arrayLength.clicks++,
            });
            setShowLeft(true);

            // await setFullData(firestoreData);
            // selectDelivery.current.open();
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text whiteColor>
              {arrayLength.current > arrayLength.full
                ? arrayLength.full
                : arrayLength.current}{' '}
            </Text>
            <Text semibold whiteColor style={{marginRight: 5}}>
              / {arrayLength.full}
            </Text>
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
            top: 160,
            left: 20,
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
              const last = arrayLength.current - 5;

              setData([...fullData.slice(last, first)]);
              if (arrayLength.current == 5) return setShowLeft(false);

              setArrayLength({
                ...arrayLength,
                current: last,
                clicks: arrayLength.clicks - 1,
              });
            }}>
            <View style={{flexDirection: 'row'}}>
              <AntDesign name="arrowleft" size={20} color="white" />

              {/* <Text whiteColor>{arrayLength.current} </Text>
            <Text semibold whiteColor style={{marginRight: 5}}>
              / {arrayLength.full}
            </Text> */}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ) : null}
      <LinearGradient
        style={{
          height: 50,
          width: 50,
          position: 'absolute',
          borderRadius: 50,
          bottom: 100,
          right: 30,
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
            selectDelivery.current.open();
          }}>
          <AntDesign name="select1" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.flex}>
        <SearchBar
          placeHolder={'Search product...'}
          editable={true}
          value={search}
          onChangeText={(value) => {
            setSearch(value);
            setData([
              ...handleSearch(fullData, value, 'deliveries').slice(0, 5),
            ]);
          }}
          onClear={(value) => {
            setData([
              ...handleSearch(fullData, value, 'deliveries').slice(0, 5),
            ]);
          }}
          onFocus={() => {}}
        />
        {/* <Text style={{top: 5}}>{component}</Text> */}
      </View>

      {component === getDeliveries()[0]
        ? BulkStockDelivery()
        : component === getDeliveries()[1]
        ? Meat()
        : component === getDeliveries()[2]
        ? Airtime()
        : component === getDeliveries()[3]
        ? BulkStockDelivery()
        : component === getDeliveries()[4]
        ? BulkStockDelivery()
        : SelectRecord()}

      <View
        style={{
          marginHorizontal: 10,
          bottom: 2,
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
        }}>
        <LinearGradient
          style={{
            // height: 45,
            // marginBottom: 40,
            // marginTop: 20,
            borderRadius: 10,

            // justifyContent: 'center',
            // alignItems: 'center',
          }}
          colors={['#F05F3E', '#ED3269']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}>
          <SaveButton
            title={'Continue'}
            titleStyle={{textAlign: 'center'}}
            size="small"
            // disabled={disabled}
            style={{alignItems: 'center'}}
            loading={loading}
            buttonStyle={{
              backgroundColor: 'transparent',
              // width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => onContinue(component)}
          />
        </LinearGradient>
      </View>

      <Portal>
        <Modalize ref={modalizeRef}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title sortDirection="descending">
                Items product
              </DataTable.Title>
              <DataTable.Title numeric> Mass</DataTable.Title>
              <DataTable.Title numeric>
                {/* {loadingDataToUI ? (
                  <UIActivityIndicator
                    style={{height: 10, width: 10}}
                    size={30}
                    color="black"
                  />
                ) : (
                  // <TouchableOpacity onPress={() => onloadingDataToUIFxn()}>
                  //   <AntDesign name="checkcircle" size={20} color={'black'} />
                  // </TouchableOpacity>
                )} */}
              </DataTable.Title>

              {/* <DataTable.Title numeric>Buying Price</DataTable.Title> */}
            </DataTable.Header>
            {/* <SearchBar
              placeHolder={'Search App...'}
              editable={true}
              value={search}
              onChangeText={(value) => {
                handleSearch(value);
              }}
              onFocus={() => {}}
            /> */}
            <ScrollView contentContainerStyle={{marginTop: 30}}>
              {products.map((x, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setProducts((prevState) => {
                      let newState = [...prevState];
                      newState[index].isSelected = !newState[index].isSelected;
                      return newState;
                    });
                    // products.push();
                    // setProducts(
                    //   products.map((item, i) =>
                    //     i === index
                    //       ? {
                    //           ...item,
                    //           // name: x.productName,
                    //           // mass: x.mass,
                    //           // quantity: '',
                    //           // vat: 15,
                    //           // includingVat: true,
                    //           // excludingVat: false,
                    //           // count: data.length + 1,
                    //           isSelected: true,
                    //         }
                    //       : item,
                    //   ),
                    // );
                    // modalizeRef.current?.close();
                  }}>
                  <DataTable.Row>
                    <DataTable.Cell style={{flex: 2}}>
                      <Text style={{color: x.isSelected ? 'green' : 'black'}}>
                        {x.name}
                      </Text>
                    </DataTable.Cell>

                    <DataTable.Cell numeric>
                      <Text style={{color: x.isSelected ? 'green' : 'black'}}>
                        {x.mass}
                      </Text>
                    </DataTable.Cell>

                    <DataTable.Cell numeric>
                      {x.isSelected ? (
                        <AntDesign name="check" size={20} color="green" />
                      ) : null}
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </DataTable>
        </Modalize>
      </Portal>

      <Portal>
        <Modalize ref={selectDelivery}>
          <DataTable>
            <View style={{alignItems: 'center', top: 20}}>
              <Text>Select from list below</Text>
              {/* <Text>what you want to record</Text> */}
            </View>
            <View style={{marginTop: 100}}>
              {dataDeliveries.map((x, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={
                    () => {
                      dataDeliveries.map((b, i) => {
                        if (b.id !== x.id) {
                          dataDeliveries[i].isSelected = false;
                        } else {
                          dataDeliveries[i].isSelected = true;
                        }
                      });
                      setDataDeliveries([...dataDeliveries]);
                      selectDelivery.current.close();
                      setIndicator(true);
                      setTimeout(() => {
                        if (x.name === getDeliveries()[0]) {
                          // fetchRecentOrder(x.name);
                          return false;
                        }
                        if (x.name === getDeliveries()[5]) {
                          onOpen();

                          setComponent('Bulk Delivered Stock');
                          setData([]);
                          setIndicator(false);
                          setDisabled(false);

                          return false;
                        }
                        if (x.name === getDeliveries()[4]) {
                          onOpen();
                          setData([]);
                          setComponent(x.name);
                          setIndicator(false);
                          setDisabled(false);
                          return false;
                        }
                        if (x.name === getDeliveries()[3]) {
                          onOpen();
                          setData([]);
                          setComponent(x.name);
                          setIndicator(false);
                          setDisabled(false);
                          return false;
                        }
                        setComponent(x.name);
                        setIndicator(false);
                        setDisabled(false);
                      }, 1000);
                    }
                    // changeMonth(index)
                  }
                  style={
                    {
                      // flexDirection: 'row',
                      // justifyContent: 'space-between',
                      // alignItems: 'center',
                      // marginHorizontal: 15,
                    }
                  }>
                  <DataTable.Row>
                    <DataTable.Cell>
                      <Text style={{color: x.isSelected ? 'green' : '#556084'}}>
                        {x.name}
                      </Text>
                    </DataTable.Cell>

                    <DataTable.Cell numeric>
                      {x.isSelected ? (
                        <AntDesign name="check" size={20} color="green" />
                      ) : null}
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>
              ))}
            </View>
            {/* <View style={{marginVertical: 20, marginHorizontal: 25}}>
              <SaveButton
                title={'Save'}
                size="small"
                style={{alignItems: 'center'}}
                // loading={loading}
                onPress={onSave}
              />
            </View> */}
          </DataTable>
        </Modalize>
      </Portal>
    </View>
  );
});

export default RecordDeliveredStock;

const styles = StyleSheet.create({
  container22: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25,
  },
  infoText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  openingText: {
    textAlign: 'center',
  },
  btnSelectCate: {
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    height: 35,
    width: '90%',
    justifyContent: 'space-between',
    elevation: 3,
  },
  selectMethod: {
    minHeight: 30,
    paddingVertical: 0,
    height: 50,
  },
  selectContainer: {
    width: '100%',
    marginBottom: 10,
  },
  touchContent: {
    paddingLeft: 14,
    paddingRight: 7,
  },
  selectContent: {
    marginBottom: 0,
    borderBottomWidth: 0,
    borderRadius: 8,
  },
  flex: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  iconClose: {
    marginLeft: 10,
  },
  container: {
    height: '100%',
  },
  rowInput: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  colInput: {
    flex: 1,
    marginHorizontal: 6,
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  card: {
    width: '90%',
    padding: 10,
    height: 70,
    margin: 10,
    backgroundColor: 'white',

    // marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dollarsIcon: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  txtAmount: {
    fontSize: 30,
    color: '#fff',
  },
  amount: {
    flexDirection: 'row',
    marginTop: 10,
    // left: -20,
    alignItems: 'center',
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
});

// // <View>
// {/* <Text style={{left: 20, marginTop: 10, fontSize: 11}}>
//   You can now record your Deliveries
// </Text>
// <Text style={{left: 20, fontSize: 11}}>
//   here in this section to calculate profit
// </Text> */}

// {/* <View
//   style={{
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 15,
//     marginLeft: 20,
//     // marginBottom: 15,
//   }}>
//   <View>
//     <Text ultraLight style={{fontSize: 12}}>
//       {moment(new Date()).format('ddd Do MMM YYYY, hh:mm a')}
//     </Text>
//   </View>
//   <View
//     style={{
//       elevation: 5,
//       borderRadius: 10,
//       height: 20,
//       width: 20,
//       backgroundColor: '#fff',
//       justifyContent: 'center',
//       alignItems: 'center',
//       left: 20,
//     }}></View>
//   <View
//     style={{
//       backgroundColor: '#556084',
//       height: 1,
//       width: '50%',
//     }}
//   />
// </View>
// </View> */}

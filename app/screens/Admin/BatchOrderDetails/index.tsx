import React, {useState, useContext, useCallback, useEffect} from 'react';
import {View, ScrollView, FlatList, TouchableOpacity, Text} from 'react-native';
import {
  SaveButton,
  Icon,
  Input,
  InputImage,
  FilterCategories,
  IconRadio,
  Errors,
  Loader,
  TextComponent,
  SearchBar,
  HotKeys,
  ActivityIndicator,
  ShimmerItemOrder,
  shimmerItemOrderHeight,
  Dot,
  GrayCard,
  FloatButton,
} from '@components';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-shadow-cards';
import styles from './styles';
import {Colors, dimensions, FONTS} from '@utils';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useTheme} from '@react-navigation/native';
import _ from 'lodash';
import {ROUTES} from '@config';
import CheckBox from 'react-native-check-box';
import {useDispatch} from 'react-redux';
import {AdminActions} from '@actions';
import {AdminContext} from '../../../context/adminContext';

const {width_screen, height_screen} = dimensions;
const BatchOrderDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {IncludePrizePdf} = useContext(AdminContext);

  const [elevation] = useState(5);
  const {colors} = useTheme();
  const [columns, setColumns] = useState([
    'Description',
    'Items',
    'Quantity',
    'Prize',
  ]);

  const [direction, setDirection] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [pets, setPets] = useState([
    {
      description: '12  x  220ml',
      item: 'Henken',
      quantity: '300',
      prize: '30 000',
    },
    {
      description: '24  x  500ml',
      item: 'Blacks',
      quantity: '400',
      prize: '70 000',
    },
    {
      description: '10  x  250ml',
      item: 'Corona',
      quantity: '100',
      prize: '100 000',
    },
  ]);

  const sortTable = (column) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc';
    const sortedData = _.orderBy(pets, [column], [newDirection]);
    setSelectedColumn(column);
    setDirection(newDirection);
    setPets(sortedData);
  };

  useEffect(() => {
    IncludePrizePdf(false);
    setIsChecked(false);
  }, []);

  const onConvertToPDF = useCallback(() => {
    dispatch(AdminActions.onCreateBatchOrderPdf(pets));
    navigation.navigate(ROUTES.ConvertBatchToPDF);
  }, [navigation]);

  const tableHeader = () => (
    <>
      <View style={styles.topView}>
        <MaterialIcons name="batch-prediction" size={30} color="green" />
        <TextComponent style={{fontWeight: '600'}}>BATCH ORDER</TextComponent>
        <TextComponent style={{fontSize: 10, textAlign: 'center'}}>
          Weekly Orders detail page with full information of all the orders for
          the week.
        </TextComponent>
        <TextComponent
          style={{
            fontWeight: '600',
            color: 'green',
            letterSpacing: 3,
          }}>
          Number: #123456
        </TextComponent>
        <TextComponent
          style={{
            fontWeight: '600',
            color: 'green',
            letterSpacing: 3,
          }}>
          Week: 1
        </TextComponent>
      </View>

      <View style={styles.tableHeader}>
        {columns.map((column, index) => {
          {
            return (
              <TouchableOpacity
                key={index}
                style={styles.columnHeader}
                onPress={() => sortTable(column)}>
                <TextComponent regular style={styles.columnHeaderTxt}>
                  {column + ' '}
                  {selectedColumn === column && (
                    <MaterialCommunityIcons
                      name={
                        direction === 'desc'
                          ? 'arrow-down-drop-circle'
                          : 'arrow-up-drop-circle'
                      }
                    />
                  )}
                </TextComponent>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </>
  );

  const footer = () => (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          top: 15,
          marginHorizontal: 20,
          borderTopWidth: 0.5,
          // borderBottomWidth: 0.5,
        }}>
        <TextComponent bold>Total Amout</TextComponent>
        <TextComponent
          bold
          style={{
            textDecorationLine: 'underline',
            color: 'green',
            borderTopWidth: 0.5,
            // fontSize: 17,
          }}>
          R 52 000.00
        </TextComponent>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          top: 25,
          marginHorizontal: 20,
          borderTopWidth: 0.5,
        }}>
        <TextComponent bold style={{left: 10}}>
          Total Items
        </TextComponent>
        <TextComponent bold style={{color: 'red'}}>
          125
        </TextComponent>
        <View style={{width: 80}}></View>
      </View>

      <View>
        <CheckBox
          style={{
            flex: 1,
            padding: 10,
            marginVertical: 40,
            marginHorizontal: 30,
          }}
          onClick={() => {
            isChecked
              ? (() => {
                  setIsChecked(false);
                  IncludePrizePdf(false);
                })()
              : (() => {
                  setIsChecked(true);
                  IncludePrizePdf(true);
                })();
          }}
          isChecked={isChecked}
          // leftText={'Include Price'}
          rightText={'Include Prize in PDF'}
          rightTextStyle={{fontWeight: 'bold'}}
          checkBoxColor="#37C2D0"
        />
      </View>

      <TextComponent style={{marginTop: 70, left: 15, fontWeight: '600'}}>
        Batch Order Clients
      </TextComponent>
      <View
        style={{
          width: width_screen - 35,

          borderWidth: 0.5,
          marginTop: 10,
          borderRadius: 10,
          alignSelf: 'center',
          borderColor: '#BDBDBD',
        }}>
        <GrayCard bgcolor="#37C2D0" style={styles.greyBG}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextComponent bold style={{color: '#fff', fontSize: 12}}>
              MLAMBO SHOP
            </TextComponent>
          </View>
          <View
            style={{
              flexDirection: 'row',

              marginTop: 5,
            }}>
            <TextComponent style={{fontSize: 12, color: '#fff'}}>
              Time :
            </TextComponent>
            <TextComponent style={{left: 40, fontSize: 12, color: '#fff'}}>
              04:20:03
            </TextComponent>
          </View>
          <View
            style={{
              flexDirection: 'row',

              marginTop: 5,
            }}>
            <TextComponent style={{fontSize: 12, color: '#fff'}}>
              Date :
            </TextComponent>
            <TextComponent style={{left: 40, fontSize: 12, color: '#fff'}}>
              Thur 18 Feb 2020
            </TextComponent>
          </View>
          <View
            style={{
              flexDirection: 'row',

              marginTop: 5,
            }}>
            <TextComponent style={{fontSize: 12, color: '#fff'}}>
              Mobile Number :
            </TextComponent>
            <TextComponent style={{left: 40, fontSize: 12, color: '#fff'}}>
              +27737971797
            </TextComponent>
          </View>
        </GrayCard>

        <View style={{paddingHorizontal: 10, marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 30,
            }}>
            <View style={{flexDirection: 'row', top: 2}}>
              <Dot
                color={colors.border}
                size={8}
                borderWidth={0}
                style={{top: 5}}
              />
              <TextComponent style={{fontSize: 11, left: 10}}>
                Batsirai Muchareva
              </TextComponent>
            </View>

            <View
              style={{
                backgroundColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
                width: 130,
                borderRadius: 30,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextComponent
                style={{fontSize: 10, fontWeight: '600', color: '#fff'}}>
                Mlambo Home
              </TextComponent>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 30,
            }}>
            <View style={{flexDirection: 'row', top: 2}}>
              <Dot
                color={colors.border}
                size={8}
                borderWidth={0}
                style={{top: 5}}
              />
              <TextComponent style={{fontSize: 11, left: 10}}>
                Matthew Mlambo
              </TextComponent>
            </View>

            <View
              style={{
                backgroundColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
                width: 130,
                borderRadius: 30,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextComponent
                style={{fontSize: 10, fontWeight: '600', color: '#fff'}}>
                Mlambo Tarven
              </TextComponent>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 30,
            }}>
            <View style={{flexDirection: 'row', top: 2}}>
              <Dot
                color={colors.border}
                size={8}
                borderWidth={0}
                style={{top: 5}}
              />
              <TextComponent style={{fontSize: 11, left: 10}}>
                Tawanda Mateu
              </TextComponent>
            </View>

            <View
              style={{
                backgroundColor: Colors.BOTTOM_ACTIVE_TAB_BACKGROUND_COLOR,
                width: 130,
                borderRadius: 30,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextComponent
                style={{fontSize: 10, fontWeight: '600', color: '#fff'}}>
                Talent Tarven
              </TextComponent>
            </View>
          </View>
        </View>
      </View>

      <View style={{height: 350}}></View>
    </View>
  );
  const iconColor = 'black';
  return (
    <View style={styles.container}>
      <View style={styles.containert}>
        <FlatList
          data={pets}
          style={{width: '100%'}}
          keyExtractor={(item, index) => index + ''}
          ListHeaderComponent={tableHeader}
          ListFooterComponent={footer}
          // stickyHeaderIndices={[0]}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  ...styles.tableRow,
                  backgroundColor: index % 2 == 1 ? '#F0FBFC' : 'white',
                }}>
                <TextComponent
                  numberOfLines={1}
                  style={{...styles.columnRowTxt, fontWeight: 'bold'}}>
                  {item.description}
                </TextComponent>
                <TextComponent style={styles.columnRowTxt}>
                  {item.item}
                </TextComponent>
                <TextComponent style={[styles.columnRowTxt]}>
                  {item.quantity}
                </TextComponent>
                {/* <TextComponent style={styles.columnRowTxt}>
                  {item.InCase}
                </TextComponent> */}
                <TextComponent style={[styles.columnRowTxt, {color: 'green'}]}>
                  {item.prize}
                </TextComponent>
              </View>
            );
          }}
        />
      </View>
      <FloatButton bottom={180} bgcolor="#37C2D0">
        <AntDesign name="edit" size={30} color={iconColor} />
      </FloatButton>
      <FloatButton bottom={250} bgcolor="#37C2D0" onPress={onConvertToPDF}>
        <FontAwesome5 name="file-pdf" size={30} color={iconColor} />
      </FloatButton>

      <FloatButton
        bottom={100}
        bgcolor="#37C2D0"
        onPress={() => {
          alert(12);
        }}>
        <AntDesign name="delete" size={30} color={iconColor} />
      </FloatButton>
    </View>
  );
};

export default BatchOrderDetails;

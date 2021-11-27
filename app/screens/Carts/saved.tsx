import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {TextComponent as Text, Input} from '@components';
import {currencyFormatter, determineWhichNumber} from '@config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import {dimensions} from '@utils';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AntDesign from 'react-native-vector-icons/AntDesign';

const cartOptions = ['Saved', 'Note', 'Clear'];

const FirstRoute = (props) => {
  const [data, setData] = React.useState(props.productsdata.data);
  const [totalAmount, setTotalAmount] = React.useState('');
  const [totalItems, setTotalItems] = React.useState('');

  React.useEffect(() => {
    const newData = data?.map((x) => {
      x.productTotalAmount = saleQuanity(x);
      return x;
    });
    calculate(newData);
  }, []);

  const saleQuanity = (x) => {
    const sale = determineWhichNumber(x.salePrice).value;
    const quantity = determineWhichNumber(x.quantity).value;
    return sale * quantity;
  };

  const calculate = (newData) => {
    if (newData.length === 0) {
      setTotalItems(0);

      return setTotalAmount(0);
    }
    const amount = newData
      .map((x) => x.productTotalAmount)
      .reduce((a, b) => a + b);

    const items = newData.map((x) => x.quantity).reduce((a, b) => a + b);

    setTotalAmount(amount);
    setTotalItems(items);
  };

  const incrementToClass = (x, id) => {
    props.inrement(x, id);
  };
  return (
    <View
      style={{
        flex: 1,
        height: dimensions.height_screen - 170,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {cartOptions.map((x) => (
          <TouchableOpacity
            onPress={() => {
              if (x === 'Clear') {
                props.clearCart(props.shopid);
                setData([]);
                props.cartState();
              }
            }}
            style={{
              backgroundColor: '#E8E9EE',
              height: 40,
              width: 100,
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: x === 'Clear' ? '#ED3269' : '#1F4657'}}>
              {x}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={{marginTop: 30}}>
        {data?.map((x, i) => (
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
                backgroundColor: '#F8F9FB',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Menu>
                  <MenuTrigger>
                    <View
                      style={{
                        height: 45,
                        width: 45,
                        backgroundColor: '#065281',
                        margin: 10,
                        borderRadius: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 30,
                          width: 30,
                          borderRadius: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text bold style={{}}>
                          {x.quantity}
                        </Text>
                      </View>
                    </View>
                  </MenuTrigger>
                  <MenuOptions
                    customStyles={{
                      optionsContainer: [
                        {width: 130, marginLeft: 80, marginTop: 40, height: 70},
                      ],
                    }}>
                    <MenuOption
                    // onSelect={() => alert(`Save`)}
                    // text="Discount"
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                        }}>
                        <View style={{top: -5}}>
                          <AntDesign
                            name="minus"
                            color="black"
                            size={15}
                            onPress={() => {
                              if (data[i].quantity === 0) {
                                return false;
                              }
                              data[i].quantity = data[i].quantity - 1;
                              data[i].productTotalAmount = saleQuanity(data[i]);
                              calculate(data);
                              setData([...data]);
                            }}
                          />
                        </View>
                        <View style={{width: 50}}>
                          <Input
                            value={`${x.quantity}`}
                            onChangeText={(value) => {
                              data[i].quantity = Number(value);
                              data[i].productTotalAmount = saleQuanity(data[i]);
                              calculate(data);
                              incrementToClass(data, data[i].key);
                              setData([...data]);
                            }}
                          />
                        </View>
                        <View style={{top: -5}}>
                          <AntDesign
                            name="plus"
                            color="black"
                            onPress={() => {
                              data[i].quantity = Number(data[i].quantity) + 1;
                              data[i].productTotalAmount = saleQuanity(data[i]);
                              calculate(data);
                              setData([...data]);
                            }}
                            size={15}
                          />
                        </View>
                      </View>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{width: 150}}>
                    <Text numberOfLines={1} style={{fontSize: 11}}>
                      {x.name}
                    </Text>
                  </View>

                  <Text style={{textAlign: 'center', fontSize: 11}}>
                    ( {x.mass} )
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  semibold
                  style={{textAlign: 'center', fontSize: 11, color: '#0B3F80'}}>
                  {currencyFormatter(x.productTotalAmount)}
                </Text>
                <Menu>
                  <MenuTrigger>
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={24}
                      color="#000"
                    />
                  </MenuTrigger>
                  <MenuOptions
                    customStyles={{
                      optionsContainer: [
                        {height: 160, justifyContent: 'center'},
                      ],
                    }}>
                    <MenuOption
                      onSelect={() => alert(`Save`)}
                      // text="Discount"
                    >
                      <Text style={{left: 10, marginVertical: 5}}>
                        Discount
                      </Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={() => alert(`Not called`)}
                      // disabled={true}
                      // text="Note"
                    >
                      <Text style={{left: 10, marginVertical: 5}}>Note</Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={() => {
                        const id = data[i].key;
                        const z = data.filter((d) => d.key !== id);
                        setData([...z]);
                        calculate(z);

                        props.removeProducts(id);
                      }}>
                      <Text style={{color: 'red', left: 10, marginVertical: 5}}>
                        Remove
                      </Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </View>
        ))}
        <View style={{height: 250}} />
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            height: 30,
            marginVertical: 5,
            borderBottomColor: '#D2D2D2',
          }}>
          <Text style={{}}>Discount</Text>
          {false ? (
            <Text style={{}}>2</Text>
          ) : (
            <AntDesign
              name="pluscircleo"
              color="black"
              onPress={() => {}}
              size={24}
            />
          )}
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
          }}>
          <Text style={{}}>Total</Text>
          <Text semibold style={{}}>
            {currencyFormatter(totalAmount)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={(val) => {}}
          style={{
            height: 40,
            width: '90%',
            backgroundColor: '#65D006',
            alignSelf: 'center',
            marginTop: 10,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text semibold whiteColor style={{fontSize: 15}}>
            Charge {currencyFormatter(totalAmount)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstRoute;

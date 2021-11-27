import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {
  TextComponent,
  SearchBar,
  Datatable,
  Header,
  StoreManagerCard as Card,
} from '@components';
import {DataTable as Tab} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import {AdminContext} from '@context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {UIActivityIndicator} from 'react-native-indicators';
import {ROUTES} from '@config';

const index = () => {
  const {getAllUsers, getBroadcastMessageIDs} = useContext(AdminContext);
  const [data, setData] = useState([]);
  const {navigate, goBack} = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    getAllUsers().then((response) => {
      //   setLoading(false);
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
          isChecked: false,
        });
      });
      console.log(firestoreData);
      setData(firestoreData);
      //   setRefreshing(false);
    });
  };

  const onSave = () => {
    setLoading(true);

    // BackgroundTimer.stopBackgroundTimer();
    // dispatchingActionToSave(filteredTobeSavedProducts());
    // console.log(filteredTobeSavedProducts());

    const z = data.filter((x) => x.isChecked === true).map((v) => v.uid);
    if (z.length < 1) {
      setLoading(false);

      alert('select at least 2 individuals');
      return false;
    }
    console.log(z);
    getBroadcastMessageIDs(z);
    setTimeout(() => {
      setLoading(false);
      navigate(ROUTES.BroadCastMessaging);
    }, 2000);
  };

  return (
    <View style={{height: '90%'}}>
      <Header
        // title={'My Stock'}
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
            onPress={() => onSave()}>
            <AntDesign name="check" size={24} color="white" />
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

      <Tab>
        <Tab.Header>
          <Tab.Title sortDirection="descending">
            Select users for Broadcast Messaging
          </Tab.Title>
          {/* <Tab.Title numeric> Status</Tab.Title> */}

          {/* <DataTable.Title numeric>Buying Price</DataTable.Title> */}
        </Tab.Header>
        <View style={{marginTop: 30}}>
          <View style={{alignItems: 'center'}}>
            {/* <TextComponent semibold style={{color: '#556084'}}>
              Active User in Stock Taking
            </TextComponent> */}
          </View>
          <ScrollView>
            {data.map((x, i) => (
              <Tab.Row>
                <Tab.Cell style={{width: '50%'}}>
                  <TextComponent style={{color: '#556084'}}>
                    {x.fullName}
                  </TextComponent>
                </Tab.Cell>

                <Tab.Cell
                  numeric
                  style={{
                    width: '30%',
                    justifyContent: 'flex-end',
                  }}>
                  <CheckBox
                    onClick={() => {
                      data[i].isChecked = !x.isChecked;
                      setData([...data]);
                    }}
                    isChecked={x.isChecked}
                    rightTextStyle={{fontWeight: 'bold'}}
                    checkBoxColor="#37C2D0"
                  />
                </Tab.Cell>
              </Tab.Row>
            ))}
            <View style={{height: 100}} />
          </ScrollView>
        </View>
      </Tab>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

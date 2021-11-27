import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {UserItem, Header, SearchBar, TextComponent} from '@components';
import {keyExtractor} from '@helpers';
import {Card} from 'react-native-shadow-cards';
import {AdminContext} from '@context';
import _ from 'lodash';

const AllUsersList = memo(() => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const {getAllUsers, getShopCurrentUser} = useContext(AdminContext);
  useEffect(() => {
    getAllUsers().then((response) => {
      // setLoading(false);
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
          image: {uri: result.data().photoURL},
          name: result.data().fullName,
          date: result.data().date,
        });
      });
      setData(firestoreData);
      setFullData(firestoreData);
      // setRefreshing(false);
    });
  }, []);
  const containsQuery = ({name, email}, query) => {
    // const {first, last} = name;
    if (
      name.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query)
    ) {
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

  const renderItem = useCallback(({item}) => {
    const {image, name, date, mobileNumber, email} = item;
    return (
      <UserItem
        mobileNumber={mobileNumber}
        isAllUsers={true}
        image={image}
        name={name}
        date={date}
        email={email}
        data={item}
        getShopCurrentUser={getShopCurrentUser}
      />
    );
  }, []);
  return (
    <>
      <View>
        <Header
          leftComponent={
            <TextComponent style={{color: '#fff'}}>
              My Users & Clients
            </TextComponent>
          }
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.container}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={() => <View style={{height: 200}} />}
      />
      <View
        style={{
          height: 50,
          position: 'absolute',
          top: 100,
          width: '100%',
          flexDirection: 'row',
        }}>
        <Card cornerRadius={25} style={{left: 15, height: 50, width: '90%'}}>
          <SearchBar
            placeHolder={'Search App...'}
            editable={true}
            value={query}
            onClear={(value) => {
              handleSearch(value);
            }}
            onChangeText={
              (value) => {
                handleSearch(value);
              }
              // handleFilter('search', value)
            }
            // onClear={setValue}
            onFocus={() => {
              // setValue(true);
            }}
          />
        </Card>
      </View>
    </>
  );
});

export default AllUsersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    top: 65,
  },
  topTxtView: {
    marginTop: 20,
    marginLeft: 30,
    flexDirection: 'row',
    marginVertical: 42,
  },
  txt: {
    fontSize: 20,
    fontWeight: '600',
    // color: '#E9E7F8',
  },
});

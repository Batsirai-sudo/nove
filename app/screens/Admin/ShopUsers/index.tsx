import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  TextComponent as Text,
  UserItem,
  ShimmerUsers,
  shimmerHeight,
  ShimmerLoading,
} from '@components';
import {keyExtractor} from '@helpers';
import {AdminContext, CommonContext} from '@context';

const ShopUsers = memo(() => {
  const {getUsersForSpecificShop, getShopCurrentUser} = useContext(
    AdminContext,
  );
  const {myCurrentShop} = useContext(CommonContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    getUsersForSpecificShop(
      {
        id: myCurrentShop.id,
        name: myCurrentShop.name,
      },
      myCurrentShop,
    ).then((response) => {
      setData(response);

      setLoading(false);
    });
  }, []);

  const renderItem = useCallback(({item}) => {
    const {image, name, date, email, account} = item;
    return (
      <UserItem
        data={item}
        getShopCurrentUser={getShopCurrentUser}
        image={
          'https://ui-avatars.com/api/?name=John+Doe&background=EDA2A5&color=fff'
        }
        name={name}
        date={date}
        email={email}
        account={account}
      />
    );
  }, []);
  return (
    <>
      <View style={styles.topTxtView}>
        <Text medium style={styles.txt}>
          {myCurrentShop.name} Members
        </Text>
      </View>
      {loading ? (
        <ShimmerLoading
          style={styles.item}
          Component={ShimmerUsers}
          height={100}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.container}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </>
  );
});

export default ShopUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  item: {
    paddingHorizontal: 25,
  },
});

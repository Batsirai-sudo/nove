import React, {memo, useContext, useEffect, useState, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {DataTable as Tab} from 'react-native-paper';
import {
  TextComponent,
  HeaderPeopleProfile,
  ActivityItem,
  SearchBar,
} from '@components';
import Header from './Header';
import {SvgChatOption} from '@svg-components';
import {dimensions} from '@utils';
import {permissions} from '@config';
import {AdminContext} from '@context';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import CheckBox from 'react-native-check-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UIActivityIndicator} from 'react-native-indicators';

const getPermissionsArray = () => {
  return permissions.map((p) => {
    return {name: p, isChecked: false};
  });
};

const {width_screen, height_screen} = dimensions;
export enum TYPE_ACTIVITY {
  JOINED,
  BOUGHT,
}
const item = {
  coverImage: require('./img.png'),
  avatar: require('./Charlotte.png'),
  userName: 'Charlotte Gregory',
  address: 'Manhattan, NY',
  followers: '1.5M',
  following: 5,
  interested: ['#art', '#festival', '#fashion', '#expo…'],
};

const ShopUsersDetail = memo(() => {
  const {
    shopCurrentUser,
    getCurrentChatID,
    gettActivities,
    updateUserPermissions,
  } = useContext(AdminContext);
  const scrollY = new Animated.Value(0);
  const [data, setData] = useState([]);
  const [permArray, setPermArray] = useState(getPermissionsArray());
  const [permissions, setPermissions] = useState(shopCurrentUser.permissions);
  const [loadingSetPermissions, setLoadingSetPermissions] = useState(false);
  const [loading, setLoading] = useState(true);
  const modalizeRef = useRef<Modalize>(null);
  const dateRef = useRef<Modalize>(null);

  useEffect(() => {
    gettActivities(shopCurrentUser.uid).then((val) => {
      const firestoreData = [];
      val.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
        });
      });
      setData(firestoreData);
      setLoading(false);
    });
  }, []);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  console.log('scrollY', scrollY, shopCurrentUser.permissions);

  const onSave = async () => {
    setLoadingSetPermissions(true);
    const z = permArray.filter((x) => x.isChecked);
    await updateUserPermissions({uid: shopCurrentUser.uid, permissions: z});
    setPermissions(z);
    console.log('z', z);
    modalizeRef.current?.close();
    setLoadingSetPermissions(false);
  };

  return (
    <View style={styles.container}>
      <Header
        svgGoBack={true}
        onPress={() => null}
        svg={<SvgChatOption />}
        scrollY={scrollY}
        title={shopCurrentUser.fullName}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        style={{zIndex: 10}}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollY}},
            },
          ],
          {useNativeDriver: false},
        )}
        bounces={false}>
        <HeaderPeopleProfile
          coverImage={item.coverImage}
          avatar={{uri: shopCurrentUser.photoURL}}
          userName={shopCurrentUser.fullName}
          getCurrentChatID={getCurrentChatID}
          address={shopCurrentUser.streetAddress}
          city={shopCurrentUser.city}
          email={shopCurrentUser.email}
          mobileNumber={shopCurrentUser.mobileNumber}
          account={shopCurrentUser.account}
          userCategory={shopCurrentUser.userCategory}
          registrationDate={shopCurrentUser.date}
          country={shopCurrentUser.country}
          shopsManaging={shopCurrentUser.myShops.length}
          postalCode={shopCurrentUser.postalCode}
          province={shopCurrentUser.province}
          uid={shopCurrentUser.uid}
          providerId={shopCurrentUser.providerId}
          interested={item.interested}
          onOpenPermissions={onOpen}
          permissions={permissions}
          dateRef={dateRef}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{top: 50}} />
        ) : (
          data.map((item, index) => {
            const {
              // typeActivity,
              // time_Do_Activity,
              // img,
              // titlePost,
              // timePost,

              activity,
              date,
              title,
              type,
            } = item;
            return (
              <ActivityItem
                // typeActivity={typeActivity}
                // time_Do_Activity={time_Do_Activity}
                // img={img}
                activityTab={true}
                // titlePost={titlePost}
                // timePost={timePost}
                activity={activity}
                date={date}
                title={title}
                type={type}
                key={index}
              />
            );
          })
        )}
        <View style={{height: 150}} />
      </Animated.ScrollView>
      <Portal>
        <Modalize ref={modalizeRef}>
          <ScrollView contentContainerStyle={{marginTop: 30}}>
            <Tab>
              <Tab.Header>
                <Tab.Title
                  style={{
                    // backgroundColor: 'red',
                    flex: 3,
                    justifyContent: 'center',
                    paddingLeft: 80,
                  }}>
                  Permissions
                </Tab.Title>
                <Tab.Title numeric>
                  {loadingSetPermissions ? (
                    <UIActivityIndicator
                      style={{height: 10, width: 10, left: -5}}
                      size={30}
                      color="#000"
                    />
                  ) : (
                    <TouchableOpacity onPress={() => onSave()}>
                      <AntDesign name="check" size={24} color="#000" />
                    </TouchableOpacity>
                  )}
                </Tab.Title>

                {/* <DataTable.Title numeric>Buying Price</DataTable.Title> */}
              </Tab.Header>
              <View style={{marginTop: 30}}>
                <View style={{alignItems: 'center'}}>
                  {/* <TextComponent semibold style={{color: '#556084'}}>
              Active User in Stock Taking
            </TextComponent> */}
                </View>
                <ScrollView>
                  {permArray.map((x, i) => (
                    <Tab.Row>
                      <Tab.Cell style={{width: '50%'}}>
                        <TextComponent style={{color: '#556084'}}>
                          {x.name}
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
                            permArray[i].isChecked = !x.isChecked;
                            setPermArray([...permArray]);
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
          </ScrollView>
        </Modalize>
      </Portal>
      <Portal>
        <Modalize ref={dateRef}>
          <ScrollView contentContainerStyle={{marginTop: 30}}>
            {/* {setMonths.map((x, index) =>
              !x.isSelected ? (
                <TouchableOpacity
                  onPress={() => changeMonth(index)}
                  key={index}
                  style={{alignItems: 'center', marginVertical: 15}}>
                  <TextComponent key={index} style={{color: '#556084'}}>
                    {x.name}
                  </TextComponent>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={index}
                  onPress={() => changeMonth(index)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 15,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#556084',
                      height: 1,
                      width: '30%',
                    }}
                  />
                  <View
                    key={index}
                    style={{alignItems: 'center', marginVertical: 15}}>
                    <TextComponent
                      key={index}
                      style={{
                        color: '#556084',
                        fontWeight: '600',
                        fontSize: 15,
                      }}>
                      {x.name}
                    </TextComponent>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#556084',
                      height: 1,
                      width: '30%',
                    }}
                  />
                </TouchableOpacity>
              ),
            )} */}
          </ScrollView>
        </Modalize>
      </Portal>
    </View>
  );
});
export default ShopUsersDetail;
const HEADER_IMAGE_HEIGHT = (height_screen * 30) / 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: getBottomSpace() + 5,
  },
  /*header style*/
  headerLeftIcon: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: (width_screen * 2) / 100,
  },
  headerRightIcon: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: (width_screen * 2) / 100,
  },
  headerStyle: {
    paddingTop: getStatusBarHeight(true),
    height: 56 + getStatusBarHeight(true),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    position: 'absolute',
  },
  headerTitle: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: 17,
    flex: 1,
  },
  /*Top Image Style*/
  headerImageStyle: {
    height: HEADER_IMAGE_HEIGHT,
    width: '100%',
    top: 0,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: 'blue',
  },
  /*profile image style*/
  profileImage: {
    position: 'absolute',
    zIndex: 100,
  },
  /*profile title style*/
  profileTitle: {
    position: 'absolute',
    zIndex: 100,
    textAlign: 'center',
    color: '#000000',
    top: (height_screen * 35) / 100,
    left: 0,
    right: 0,
    fontSize: 24,
  },
  /*song count text style*/
  songCountStyle: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: '400',
    top: (height_screen * 40) / 100,
    left: 0,
    right: 0,
    fontSize: 17,
  },
  artistCardContainerStyle: {
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowRadius: 3,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    padding: 15,
    marginVertical: (width_screen * 1) / 100,
    marginHorizontal: (width_screen * 2) / 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistImage: {
    height: (width_screen * 15) / 100,
    width: (width_screen * 15) / 100,
    borderRadius: (width_screen * 7.5) / 100,
  },
  songTitleStyle: {
    fontSize: 17,
    color: '#000000',
  },
  cardTextContainer: {
    flex: 1,
    margin: (width_screen * 3) / 100,
  },
});

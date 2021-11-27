import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import LinearGradient from 'react-native-linear-gradient';
import {TextComponent as Text, InboxItem, RNParallax} from '@components';
import {SvgArrowBack} from '@svg-components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AdminContext} from '@context';
import {useSelector} from 'react-redux';
import {ROUTES} from '@config';
import {useNavigation, useTheme} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 84;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const renderNavBar = () => (
  <LinearGradient
    style={{height: HEADER_HEIGHT}}
    colors={['#F05F3E', '#ED3269']}
    start={{x: 1, y: 0}}
    end={{x: 1, y: 1}}>
    <View style={styles.statusBar} />
    <View style={styles.navBar}>
      <TouchableOpacity style={{left: 20, top: 10}} onPress={() => {}}>
        <SvgArrowBack />
      </TouchableOpacity>
      <TouchableOpacity style={{right: 30, top: 13}} onPress={() => {}}>
        <Text style={{color: 'white'}}>Messages</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

const Inbox = () => {
  const {getCurrentChatID} = useContext(AdminContext);
  const [userMessages, setUserMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const {navigate, goBack} = useNavigation();

  const snap = firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('UsersMessages');

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    snap.orderBy('lastMsgTime', 'desc').onSnapshot((querySnapshot) => {
      const data = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added' || type === 'modified')
        .map(({doc, type, oldIndex}) => {
          const vs = doc.data();
          return {
            ...vs,
            key: doc.id,
            type,
            oldIndex,
          };
        });
      if (data[0].type === 'modified') {
        userMessages[data[0].oldIndex] = data[0];
        setUserMessages([...userMessages]);
        return false;
      }
      setUserMessages(data);
      console.log(data);
    });
    // unsubscribe();
  };
  const renderContent = () => {
    return (
      <View style={{marginBottom: 200}}>
        {userMessages.map((item, i) => {
          const {
            avatar,
            fullName,
            unreadMessages,
            lastMessage,
            lastMsgTime,
            key,
          } = item;

          return (
            <InboxItem
              key={i}
              image={avatar}
              nameUser={fullName}
              numberMessage={unreadMessages}
              message={lastMessage}
              time={lastMsgTime}
              pressChat={getCurrentChatID}
              id={key}
            />
          );
        })}
      </View>
    );
  };

  const title = () => {
    return (
      <>
        <View>
          <Text style={{color: 'white', fontSize: 25}}>Messages</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigate(ROUTES.SelectUsersForBroadcast)}
          style={{
            backgroundColor: 'white',
            height: 60,
            width: 60,
            borderRadius: 50,
            position: 'absolute',
            bottom: -20,
            right: 20,
            elevation: 2,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Octicons name="broadcast" size={30} color="#000" />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <>
      <StatusBar barStyle="light-content" hidden={false} translucent={true} />
      <RNParallax
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={250}
        extraScrollHeight={20}
        // navbarColor="#3498db"
        navbarColor="transparent"
        titleStyle={styles.titleStyle}
        title={title()}
        backgroundColor={'#000'}
        // backgroundImage={require('./cube.jpg')}
        //   uri:
        //     // 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
        // }}
        backgroundImageScale={1.2}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        alwaysShowTitle={false}
        alwaysShowNavBar={false}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
          onScrollEndDrag: () => console.log('onScrollEndDrag'),
        }}
      />
    </>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    // marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

// import keyExtractor from 'ultis/keyExtractor';

// const data = [
//   {
//     image: require('assets/Inbox/Raymond.png'),
//     nameUser: 'Raymond Tyler',
//     numberMessage: 4,
//     message: "It's going well! How about you?",
//     time: '2 HOURS AGO',
//   },
//   {
//     image: require('assets/Inbox/Kyle.png'),
//     nameUser: 'Kyle McKenzie',
//     numberMessage: 0,
//     message: "I'm a dentist.",
//     time: '5 HOURS AGO',
//   },
//   {
//     image: require('assets/Inbox/Linnie.png'),
//     nameUser: 'Linnie Lyons',
//     numberMessage: 0,
//     message: 'What do you do for a living?',
//     time: 'MAR. 1,2018',
//   },
//   {
//     image: require('assets/Inbox/Callie.png'),
//     nameUser: 'Callie Holland',
//     numberMessage: 0,
//     message: "It's going well! How about you?",
//     time: 'FEB. 18,2018',
//   },
//   {
//     image: require('assets/Inbox/Chris.png'),
//     nameUser: 'Chris Austin',
//     numberMessage: 2,
//     message: 'Pardon me?',
//     time: 'FEB. 19,2018',
//   },
//   {
//     image: require('assets/Inbox/Mildred.png'),
//     nameUser: 'Mildred Nelson',
//     numberMessage: 0,
//     message: 'Hi! Nice to meet you.',
//     time: 'MAR. 1,2018',
//   },
//   {
//     image: require('assets/Inbox/Chester.png'),
//     nameUser: 'Chester Wheeler',
//     numberMessage: 0,
//     message: "It's going well! How about you?",
//     time: 'FEB. 18,2018',
//   },
//   {
//     image: require('assets/Inbox/Callie.png'),
//     nameUser: 'Lelia Sparks',
//     numberMessage: 0,
//     message: "It's going well!",
//     time: 'FEB. 19,2018',
//   },
//   {
//     image: require('assets/Inbox/Millie.png'),
//     nameUser: 'Millie May',
//     numberMessage: 0,
//     message: ' How about you?',
//     time: 'FEB. 26,2018',
//   },
// ];

// const InboxIt = memo(() => {
//   const renderItem = useCallback(({item}) => {
//     const {image, nameUser, numberMessage, massage, time} = item;
//     return (
//       <InboxItem
//         image={image}
//         nameUser={nameUser}
//         numberMessage={numberMessage}
//         message={massage}
//         time={time}
//       />
//     );
//   }, []);

//   return (
//     <FlatList
//       showsVerticalScrollIndicator={false}
//       style={styles.container}
//       data={data}
//       keyExtractor={keyExtractor}
//       renderItem={renderItem}
//     />
//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

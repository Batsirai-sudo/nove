import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import {Images} from '@config';
import {Header} from '@components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {AdminContext} from '@context';
import {UIActivityIndicator} from 'react-native-indicators';
import firebase from '@react-native-firebase/app';

const Inbox = () => {
  const ComponentLoader = UIActivityIndicator;
  const [input, setInput] = useState('');
  const {currentChatID} = useContext(AdminContext);
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const [loadingChats, setloadingChats] = useState(true);
  const [adminInformation, setAdminInformation] = useState({});
  const snap = firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('UsersMessages')
    .doc(currentChatID.id)
    .collection('Messages');

  const updateUser = firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('UsersMessages')
    .doc(currentChatID.id);

  const {goBack} = useNavigation();

  useEffect(() => {
    updateUser.update({
      unreadMessages: 0,
    });
    getMessages();
  }, []);

  const getMessages = () => {
    snap
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot((querySnapshot) => {
        const messagesFirestore = querySnapshot
          .docChanges()
          .filter(({type}) => type === 'added')
          .map(({doc}) => {
            const messages = doc.data();
            return {
              ...messages,
              _id: doc.id,
              createdAt: messages.createdAt.toDate(),
              received: true,
              // sent: true,
            };
          });

        appendMessages(messagesFirestore);
        setloadingChats(false);
      });
    // unsubscribe();
  };

  const appendMessages = useCallback((msg) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
  });

  const onSend = (messages) => {
    snap.add(messages[0]);

    updateUser.update({
      lastMessage: messages[0].text,
      lastMsgID: messages[0]._id,
      AdminUnreadMessages: firebase.firestore.FieldValue.increment(1),
      AdminfullName: messages[0].user.name,
      lastMsgTime: messages[0].createdAt,
      seen: false,
    });
  };

  return (
    <View>
      <SafeAreaView style={{height: '100%'}} forceInset={{top: 'always'}}>
        <Header
          title={currentChatID.name}
          leftComponent={
            <TouchableOpacity
              style={{
                // backgroundColor: 'red',
                left: -20,
                height: 50,
                width: 50,
                alignItems: 'center',
                top: -5,
                // justifyContent: 'center',
              }}
              onPress={() => goBack()}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          }>
          {loadingChats ? (
            <ComponentLoader
              style={{height: 10, width: 10}}
              size={30}
              color="white"
            />
          ) : null}
        </Header>
        {loadingChats ? (
          <ComponentLoader color="black" />
        ) : (
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: user.uid,
              avatar: user.photoURL,
              name: user.fullName,
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({});

//   {/* <Header
//         style={{height: 67}}
//         title={t('')}
//         renderLeft={() => {
//           return (
//             <Icon
//               name="arrow-left"
//               size={20}
//               color={colors.primary}
//               enableRTL={true}
//             />
//           );
//         }}
//         renderRightSecond={() => {
//           return (
//             <View
//               style={{
//                 top: 15,
//                 flexDirection: 'row',
//               }}>
//               {/* {adminStatus ?  <View
//                 style={{
//                   backgroundColor: 'green',
//                   width: 13,
//                   height: 13,
//                   borderRadius: 13,
//                 }}
//               />: <View
//               style={{
//                 backgroundColor: 'red',
//                 width: 13,
//                 height: 13,
//                 borderRadius: 13,
//               }}
//             />}  */}

//               {/* <Text style={{top: -4, left: 5}} footnote numberOfLines={1}>
//                {adminStatus ? 'online':'offline'}
//               </Text> */}

//               </View>
//               );
//             }}
//             renderRight={() => {
//               return (
//                 <Image
//                   source={Images.avata1}
//                   style={[styles.avatar, {borderColor: colors.border}]}
//                 />
//               );
//             }}
//             onPressLeft={() => {
//               navigation.goBack();
//             }}
//           />

// const admin_online = ()=>{

//     firestore()
//       .collection('Admin_Statistics')
//       .doc('A_one').get().then((response)=>{

//         setAdminStatus(response.data().Admin_online)
//       })
//   }

// {
//   _id: 1,
//   text: 'My message',
//   createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
//   user: {
//     _id: 2,
//     name: 'React Native',
//     avatar: 'https://facebook.github.io/react/img/logo_og.png',
//   },
//   image: 'https://facebook.github.io/react/img/logo_og.png',
//   // You can also add a video prop:
//   video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
//   // Mark the message as sent, using one tick
//   sent: true,
//   // Mark the message as received, using two tick
//   received: true,
//   // Mark the message as pending with a clock loader
//   pending: true,
//   // Any additional custom parameters are passed through
// }
// setMessages(doc);
// console.log('zzfgxxghxcgcjhcvjhcvjhvjvjhjhb', messages);

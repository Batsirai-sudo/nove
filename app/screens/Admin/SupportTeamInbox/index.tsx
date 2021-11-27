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

const SupportTeamInbox = () => {
  const ComponentLoader = UIActivityIndicator;
  const [input, setInput] = useState('');
  const {currentChatID} = useContext(AdminContext);
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const [loadingChats, setloadingChats] = useState(true);
  const [adminInformation, setAdminInformation] = useState({});
  const snap = firestore()
    .collection('SupportTeam')
    .doc('support-team-store-manager')
    .collection('Users')
    .doc(user.uid)
    .collection('Messages');

  const updateUser = firestore()
    .collection('SupportTeam')
    .doc('support-team-store-manager')
    .collection('Users')
    .doc(user.uid);

  const {goBack} = useNavigation();

  useEffect(() => {
    // updateUser.update({
    //   unreadMessages: 0,
    // });
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

    updateUser.set(
      {
        lastMessage: messages[0].text,
        lastMsgID: messages[0]._id,
        unreadMessages: firebase.firestore.FieldValue.increment(1),
        fullName: messages[0].user.name,
        lastMsgTime: messages[0].createdAt,
        seen: false,
      },
      {merge: true},
    );
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

export default SupportTeamInbox;

const styles = StyleSheet.create({});

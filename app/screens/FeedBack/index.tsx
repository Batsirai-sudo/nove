import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import {CommentItem, Rating} from '@components';
import {SvgSend} from '@svg-components';
import {keyExtractor} from '@helpers';
import styles from './styles';
import {CommonContext} from '@context';
import moment from 'moment';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const FeedBack = memo(() => {
  const {postFeedback, getFeedback} = useContext(CommonContext);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(4);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // getFeedbackResponses().then((response) => {
    //   setData(response);
    // });

    // const snap = firestore()
    //   .collection('Feedback')
    //   .where('id', '==', user.uid)
    //   .orderBy('createdAt', 'desc');

    try {
      // snap.onSnapshot((querySnapshot) => {
      //   console.log('messagesFirestore', querySnapshot);
      //   querySnapshot
      //     ? (() => {
      //         const FeedbackData = querySnapshot
      //           .docChanges()
      //           .filter(({type}) => type === 'added')
      //           .map(({doc}) => {
      //             const data = doc.data();
      //             return {
      //               ...data,
      //               _id: doc.id,
      //             };
      //           });
      //         setData([...FeedbackData, ...data]);
      //       })()
      //     : null;
      // });

      getFeedback().then((response) => {
        const firestoreData = [];
        response.forEach((result) => {
          firestoreData.push({
            ...result.data(),
            _id: result.id,
            // status: result.data().name,
          });
        });

        setData(firestoreData);
        setLoading(false);
      });
    } catch (error) {
      alert(error.message);
    }
  }, []);

  const onSendFeedback = () => {
    setComment('');
    const feedback = {
      rate,
      comment,
      isLike: false,
      name: user.fullName,
      numberLike: 0,
      createdAt: new Date(),
      id: user.uid,
      avatar: user.avatarUrl,
    };
    postFeedback(feedback);
  };

  const onChangeValue = (text) => {
    setComment(text);
  };
  const renderItem = useCallback(({item}) => {
    const {name, rate, comment, isLike, numberLike, createdAt} = item;
    return (
      <CommentItem
        isLike={isLike}
        name={name}
        comment={comment}
        time={moment(createdAt.toDate()).format(
          'ddd-DD  MMM YYYY,  HH:mm:ss a',
        )}
        // numberReply={numberReply}
        numberLike={numberLike}
        rate={rate}
        avatar={user.avatarUrl}
      />
    );
  }, []);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={52}
      style={styles.keyAvoid}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.commentView}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
        <View style={styles.writeComment}>
          <Rating
            rating={(value: number) => {
              setRate(value);
              console.log(value);
            }}
            rate={rate}
          />
          <View style={styles.line} />
          <View style={styles.writeAndSend}>
            <TextInput
              style={styles.textInput}
              placeholder={'Write a Feedback...'}
              value={comment}
              onChangeText={(text: string) => {
                onChangeValue(text);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                onSendFeedback();
              }}>
              <SvgSend />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
});

export default FeedBack;

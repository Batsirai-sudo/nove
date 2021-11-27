import React, {memo, useCallback, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import InactiveRate from '../inactiveRate';
import {SvgUnlike, SvgLike, SvgReply, SvgReport} from '@svg-components';
import Text from '../Text';
import styles from './styles';

interface CommentProps {
  isLike: boolean;
  name: string;
  comment: string;
  time: string;
  numberReply: number;
  numberLike: number;
  rate: number;
  avatar: any;
}

const CommentItem = memo((props: CommentProps) => {
  const [isLike, setLike] = useState(props.isLike);
  const [numberLike, setNumLike] = useState(props.numberLike);
  const [numReply, setNumReply] = useState(props.numberReply);

  const onLike = useCallback(() => {
    if (isLike) {
      setNumLike(numberLike - 1);
    } else {
      setNumLike(numberLike + 1);
    }
    setLike(!isLike);
  }, [isLike]);
  const onReply = useCallback(() => {}, []);
  const onReport = useCallback(() => {}, []);

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <Image source={{uri: props.avatar}} style={styles.bigAvatar} />
        <View style={styles.commentView}>
          <Text medium style={styles.textName}>
            {props.name}
          </Text>
          <InactiveRate rate={props.rate} />
          <Text style={styles.textComment}>{props.comment}</Text>
          <View style={styles.timeView}>
            <Text medium style={styles.textTime}>
              {props.time}
            </Text>
            {/* {props.numberReply > 0 ? (
              <Text medium style={styles.textTime}>
                {numReply} reply
              </Text>
            ) : null} */}
            {/* <Text medium style={styles.textTime} onPress={onReply}>
              reply
            </Text> */}
          </View>
        </View>
        <Text style={styles.textNumberLikes}>{numberLike}</Text>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={onLike}
          activeOpacity={0.8}>
          {isLike ? <SvgLike /> : <SvgUnlike />}
        </TouchableOpacity>
      </View>
      <View style={styles.optionView}>
        <TouchableOpacity style={styles.buttonOption} onPress={onReply}>
          <SvgReply />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOption} onPress={onReport}>
          <SvgReport />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});

export default CommentItem;

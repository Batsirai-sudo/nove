import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {SvgCart, SvgJoin} from '@svg-components';
import Text from '../Text';
import styles from './styles';
import moment from 'moment';
export enum TYPE_ACTIVITY {
  JOINED,
  BOUGHT,
}

interface Props {
  typeActivity: TYPE_ACTIVITY;
  time_Do_Activity: string;
  img: any;
  userDetail: any;
  titlePost: string;
  timePost: string;
  activityTab: boolean;
  key: any;
  title: string;
  activity: string;
  date: any;
}

const ActivityItem = (props: Props) => {
  return (
    <TouchableOpacity key={props.key} style={styles.activityItem}>
      {/* {props.userDetail ? null : props.typeActivity === 0 ? ( */}
      <SvgJoin style={styles.svg} />
      {/* ) : (
        <SvgCart style={styles.svg} />
      )} */}

      <View style={styles.container}>
        {/* {props.typeActivity === 0 ? ( */}
        <Text style={styles.txtJoin}>{props.title}</Text>
        {/* // ) : (
        //   <Text style={styles.txtBought}>Bought tickets:</Text>
        // )} */}
        <Text style={styles.txtTime_Do}>
          {moment(props.date.toDate()).format('MMMM D, YYYY')}
        </Text>
      </View>

      <View style={styles.content}>
        {props.activityTab ? null : props.userDetail ? null : (
          <Image style={styles.img} source={props.img} />
        )}
        <View>
          <Text medium style={styles.txtTitlePost}>
            {props.activity}
          </Text>
          <Text style={styles.txtTimePost}>
            {moment(props.date.toDate()).format('dddd, - HH:mm:ss')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityItem;

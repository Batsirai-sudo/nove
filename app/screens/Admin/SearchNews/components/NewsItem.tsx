import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {height_screen, width_screen} from 'ultis/dimensions';
import FONTS from 'ultis/fonts';

interface Props {
  imgEvent: any;
  event: string;
  time: string;
}

const NewsItem = (props: Props) => {
  return (
    <View style={styles.newItem}>
      <Image style={styles.img} source={props.imgEvent} />
      <View style={styles.content}>
        <Text style={styles.txtEvent}>{props.event}</Text>
        <Text style={styles.txtTime}>{props.time}</Text>
      </View>
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  newItem: {
    flexDirection: 'row',
    marginHorizontal: 0.065 * width_screen,
    marginVertical: 0.02 * height_screen,
  },
  img: {
    borderRadius: 10,
  },
  content: {
    justifyContent: 'center',
    marginLeft: 0.065 * width_screen,
  },
  txtEvent: {
    fontFamily: FONTS.Medium,
    fontSize: 14,
    color: '#353B48',
    marginBottom: 0.03 * height_screen,
  },
  txtTime: {
    fontFamily: FONTS.Regular,
    fontSize: 12,
    color: '#7F8FA6',
  },
});

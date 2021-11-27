import React, {memo} from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import Text from '../Text';

interface Props {
  source: any;
  title: string;
  des: string;
}

const Page = memo((props: Props) => {
  return (
    <View style={styles.page}>
      <Image source={props.source} style={styles.image} blurRadius={7} />
      <Text medium style={styles.title}>
        {props.title}
      </Text>
      <Text style={styles.des}>{props.des}</Text>
    </View>
  );
});

export default Page;

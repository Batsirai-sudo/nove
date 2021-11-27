import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Text from '../Text';
import styles from './styles';

interface Props {
  img: any;
  deliveredStock: any;
  titlePost: string;
  timePost: string;
  quantity: string;
  Incase: string;
  status: string;
  mass: string;
  vatDescrip: string;
  amount: number;
  profit: any;
}

const CreateOrderPreviewItem = (props: Props) => {
  return (
    <>
      <TouchableOpacity style={styles.ticketItem}>
        {/* <Image style={styles.img} source={props.img} /> */}
        <View>
          <Text style={styles.txtTitlePost}>
            {props.titlePost}{' '}
            <Text style={{fontSize: 11}}>
              {props.status === 'price increased' ||
              props.status === 'price decreased'
                ? `( ${props.status} )`
                : ''}
            </Text>
          </Text>
          {props.deliveredStock ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '75%',
              }}>
              <Text medium style={styles.txtTitlePost}>
                {props.mass}
              </Text>
              <Text medium style={[styles.txtTitlePost, {color: 'green'}]}>
                {props.profit}{' '}
                <Text style={{fontSize: 11, color: 'green'}}>profit</Text>
              </Text>
            </View>
          ) : (
            <Text style={styles.txtTitlePost}>{props.Incase} per case</Text>
          )}
          {props.deliveredStock ? (
            props.vatDescrip ? (
              <Text
                style={[
                  styles.txtTitlePost,
                  {
                    color:
                      props.vatDescrip === 'Excluding vat'
                        ? '#353B48'
                        : '#ED3269',
                  },
                ]}>
                {props.vatDescrip}
              </Text>
            ) : null
          ) : (
            <Text medium style={styles.txtTitlePost}>
              {props.mass}
            </Text>
          )}
          <View style={styles.flex}>
            <View style={styles.row}>
              <Text semibold style={{}}>
                Qty
              </Text>
              <Text style={styles.txtTimePost}>{props.quantity}</Text>
            </View>
            <Text semibold style={styles.amount}>
              {props.amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: '90%',
          height: 0.8,
          backgroundColor: '#000',
          alignSelf: 'center',
        }}
      />
    </>
  );
};

export default CreateOrderPreviewItem;

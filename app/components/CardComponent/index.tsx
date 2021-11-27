import React, {memo, useState} from 'react';
import TextComponent from '../Text';
import {StyleSheet, TouchableOpacity, Platform, View} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import {dimensions} from '@utils';
import {currencyFormatter} from '@config';

const {width_screen} = dimensions;

const CardComponent = memo((props) => {
  const [elevation] = useState(3);

  return props.isClients ? (
    <StoreManagerCard
      cornerRadius={15}
      elevation={elevation}
      onPress={props.onPress}
      style={[styles.card, props.styles]}>
      <View style={{alignItems: 'center'}}>
        {props.notifications ? (
          <View style={[styles.iconContainer, {width: 50}]}>
            {props.children}
          </View>
        ) : (
          <View style={[styles.iconContainer, {backgroundColor: '#37C2D0'}]}>
            {props.children}
          </View>
        )}
      </View>

      <View style={{alignItems: 'center'}}>
        <View style={styles.currencyContainer}>
          {props.profits ? (
            <>
              <TextComponent style={styles.profits}>
                {props.profits}
              </TextComponent>
            </>
          ) : null}
          {props.orders ? (
            props.productScan ? (
              <View>
                <TextComponent bold style={{textAlign: 'center'}}>
                  {props.orders}
                </TextComponent>
                <TextComponent
                  bold
                  style={{textAlign: 'center', letterSpacing: 5}}>
                  {props.productScan}
                </TextComponent>
              </View>
            ) : (
              <>
                <TextComponent bold style={{textAlign: 'center'}}>
                  {props.orders}
                </TextComponent>
              </>
            )
          ) : null}
        </View>
        <View style={styles.shopType}>
          <TextComponent style={{fontSize: 11}}>{props.shopType}</TextComponent>
        </View>
      </View>
    </StoreManagerCard>
  ) : (
    <StoreManagerCard
      touchOpacity={props.touchOpacity}
      cornerRadius={15}
      elevation={elevation}
      onPress={props.onPress}
      style={styles.card}>
      <View style={styles.rowContainer}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: '#37C2D0', borderRadius: 50},
          ]}>
          {props.children}
        </View>
        {props.orders ? null : (
          <TextComponent regular style={styles.message}>
            +Weekly%
          </TextComponent>
        )}
      </View>
      <View style={styles.profitsContainer}>
        <View style={styles.currencyContainer}>
          {props.profits ? (
            <>
              {/* <TextComponent regular style={styles.rands}>
                R
              </TextComponent> */}
              <TextComponent style={[styles.profits, {color: '#E32378'}]}>
                {currencyFormatter(props.profits)}
              </TextComponent>
              {/* <TextComponent regular style={styles.profits2}>
                profits
              </TextComponent> */}
            </>
          ) : null}
          {props.orders ? (
            <>
              {/* <TextComponent style={styles.rands}>
                {props.orderstag}
              </TextComponent> */}
              <TextComponent style={[styles.profits]}>
                {props.orders}
              </TextComponent>
              <TextComponent style={styles.profits2}>
                {props.subtitle}
              </TextComponent>
            </>
          ) : null}
        </View>
        <View style={styles.shopType}>
          <TextComponent regular style={{fontSize: 11}}>
            {props.shopType}
          </TextComponent>
        </View>
      </View>
    </StoreManagerCard>
  );
});

export default CardComponent;

export const StoreManagerCard = (props) => {
  const {
    children,
    elevation,
    opacity,
    cornerRadius,
    onPress,
    touchOpacity,
  } = props;

  const cardStyle = Platform.select({
    ios: () =>
      StyleSheet.create({
        container: {
          shadowRadius: elevation,
          shadowOpacity: opacity,
          shadowOffset: {width: 0, height: elevation},
          borderRadius: cornerRadius,
          backgroundColor: props.backgroundColor,
          width: width_screen - 40,
        },
      }),
    android: () =>
      StyleSheet.create({
        container: {
          elevation: elevation,
          borderRadius: cornerRadius,
          backgroundColor: props.backgroundColor,
          width: width_screen - 40,
        },
      }),
  })();

  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      onPress={onPress}
      style={[cardStyle.container, props.style]}>
      {children}
    </TouchableOpacity>
  );
};

StoreManagerCard.prototype = {
  backgroundColor: PropTypes.string,
  elevation: PropTypes.number,
  cornerRadius: PropTypes.number,
  opacity: PropTypes.number,
};

StoreManagerCard.defaultProps = {
  backgroundColor: '#ffffff',
  elevation: 3,
  cornerRadius: 5,
  opacity: 0.5,
};

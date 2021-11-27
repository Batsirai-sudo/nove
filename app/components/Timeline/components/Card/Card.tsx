import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import moment from 'moment';
import Androw from 'react-native-androw';
import styles, {
  _cardContainer,
  _cardShadowContainer,
  _titleStyle,
  _subtitleStyle,
  _dateStyle,
  _shadowStyle,
} from './Card.style';
import Icon from '../../../Icon';
import Text from '../../../Text';
import {isAndroid} from '@freakycoder/react-native-helpers';
import {currencyFormatter} from '@config';

const Card = (props) => {
  const {
    data,
    date,
    title,
    isCard,
    subtitle,
    dateStyle,
    titleStyle,
    shadowColor,
    subtitleStyle,
    dateFontColor,
    titleFontColor,
    dateFontFamily,
    titleFontFamily,
    subtitleFontColor,
    subtitleFontFamily,
    cardBackgroundColor,
    fontWeight,
    isExpenses,
    isLosses,
    DescriptionfontWeight,
    profits,
  } = props;

  const renderProfits = () => (
    <Androw
      style={[
        styles.container,
        isAndroid && _shadowStyle(isCard, shadowColor, cardBackgroundColor),
      ]}>
      <Androw style={_cardContainer(isCard, shadowColor, cardBackgroundColor)}>
        <View style={styles.cardContainerGlue}>
          <View style={styles.title}>
            <Text
              numberOfLines={2}
              style={titleStyle || _titleStyle(titleFontColor)}>
              {data.title}
            </Text>
            <Text
              numberOfLines={2}
              style={titleStyle || _titleStyle(titleFontColor)}>
              {data.invoice}
            </Text>
          </View>

          <View style={styles.title}>
            <Text
              numberOfLines={2}
              style={titleStyle || _titleStyle(titleFontColor)}>
              {/* Week : */}
            </Text>
            <Text
              numberOfLines={2}
              style={titleStyle || _titleStyle(titleFontColor)}>
              {'  '}
              {data.week}
            </Text>
          </View>

          <View style={styles.subTitleView}>
            <Text
              numberOfLines={10}
              style={subtitleStyle || _subtitleStyle(subtitleFontColor)}>
              Trans ID
            </Text>
            <Text
              numberOfLines={10}
              style={subtitleStyle || _subtitleStyle(subtitleFontColor)}>
              {data.transactionID}
            </Text>
          </View>

          <View style={styles.subTitleView}>
            <Text
              numberOfLines={10}
              style={subtitleStyle || _subtitleStyle(subtitleFontColor)}>
              Stock Total Amount
            </Text>
            <Text
              numberOfLines={10}
              style={subtitleStyle || _subtitleStyle(subtitleFontColor)}>
              {currencyFormatter(data.totalBuyingAmount)}
            </Text>
          </View>

          <View style={styles.subTitleView}>
            <Text
              numberOfLines={10}
              style={subtitleStyle || _subtitleStyle(subtitleFontColor)}>
              Generated Profit
            </Text>
            <Text
              medium
              numberOfLines={10}
              style={[
                subtitleStyle || _subtitleStyle(subtitleFontColor),
                {color: '#556084'},
              ]}>
              {currencyFormatter(data.weeklyDeliveredProfit)}
            </Text>
          </View>
        </View>
      </Androw>
      <Text
        numberOfLines={1}
        style={dateStyle || _dateStyle(dateFontColor, isCard)}>
        {moment(data.date.toDate()).format('DD ddd, MMMM YYYY HH:mm a')}
      </Text>
    </Androw>
  );

  return profits ? (
    renderProfits()
  ) : (
    <Androw
      style={[
        styles.container,
        isAndroid && _shadowStyle(isCard, shadowColor, cardBackgroundColor),
      ]}>
      <Androw style={_cardContainer(isCard, shadowColor, cardBackgroundColor)}>
        <View style={styles.cardContainerGlue}>
          <View style={styles.title}>
            <Text
              numberOfLines={1}
              style={titleStyle || _titleStyle(titleFontColor)}>
              {data.productName}
              {data.title}
            </Text>
            {/* <Text
              numberOfLines={2}
              style={
                titleStyle || _titleStyle(titleFontColor, titleFontFamily)
              }>
              {data.invoice}
            </Text> */}
          </View>
          {/* 
          <View style={styles.title}>
            <Text
              numberOfLines={2}
              style={
                titleStyle ||
                _titleStyle(titleFontColor, titleFontFamily, fontWeight)
              }>
              Week :
            </Text>
            <Text
              numberOfLines={2}
              style={
                titleStyle || _titleStyle(titleFontColor, titleFontFamily)
              }>
              {'  '}
              {data.week}
            </Text>
          </View> */}

          {isLosses ? (
            <>
              <View style={styles.subTitleView}>
                <Text
                  numberOfLines={10}
                  style={subtitleStyle || _subtitleStyle(subtitleFontColor)}>
                  Image Included
                </Text>
                {/* <Text
              numberOfLines={10}
              style={
                subtitleStyle ||
                _subtitleStyle(subtitleFontColor, subtitleFontFamily)
              }>
              R 90 000
            </Text> */}
                <Icon
                  name={
                    data.imageIncludec
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  size={22}
                  iconStyle={[
                    {color: data.imageIncludec ? '#984cf8' : '#80879A'},
                  ]}
                  activeOpacity={1}
                  underlayColor={'transparent'}
                  // onPress={() => handleSelect(category)}
                />
              </View>

              <View style={styles.subTitleView}>
                <Text
                  numberOfLines={10}
                  style={subtitleStyle || _subtitleStyle(subtitleFontColor)}>
                  Quantity
                </Text>
                <Text
                  numberOfLines={10}
                  style={subtitleStyle || _subtitleStyle(subtitleFontColor)}>
                  {data.quantity}
                </Text>
              </View>
            </>
          ) : null}
          {isExpenses ? (
            <>
              <Text
                numberOfLines={1}
                style={[
                  titleStyle || _titleStyle(titleFontColor),
                  {marginTop: 10},
                ]}>
                Description ~
              </Text>
              <Text
                numberOfLines={5}
                style={subtitleStyle || _subtitleStyle(subtitleFontColor)}>
                {data.description}
              </Text>
            </>
          ) : null}

          <View style={styles.subTitleView}>
            <Text
              numberOfLines={10}
              style={subtitleStyle || _subtitleStyle(subtitleFontColor)}>
              Total Amount
            </Text>
            <Text
              numberOfLines={10}
              style={[
                subtitleStyle || _subtitleStyle(subtitleFontColor),
                {color: '#984cf8', fontWeight: 'bold'},
              ]}>
              {data.amount}
            </Text>
          </View>
        </View>
      </Androw>
      <Text
        numberOfLines={1}
        style={dateStyle || _dateStyle(dateFontColor, isCard)}>
        {moment(data.date).format('DD dddd, HH:mm')}
      </Text>
    </Androw>
  );
};

Card.propTypes = {
  date: PropTypes.string,
  isCard: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  shadowColor: PropTypes.string,
  dateFontColor: PropTypes.string,
  dateFontFamily: PropTypes.string,
  titleFontColor: PropTypes.string,
  subtitleFontColor: PropTypes.string,
  subtitleFontFamily: PropTypes.string,
  cardBackgroundColor: PropTypes.string,
  fontWeight: PropTypes.string,
};

Card.defaultProps = {
  isCard: true,
  shadowColor: '#000',
  date: 'Tue 16, 19:09',
  dateFontColor: '#ccc',
  titleFontColor: '#556084',
  cardBackgroundColor: '#fff',
  subtitleFontColor: '#8c93ab',
  title: 'React Native Beautiful Timeline',
  subtitle: 'Etiam volutpat ligula metus, quis.',
  // fontWeight: 'bold',
  DescriptionfontWeight: '600',
};

export default Card;

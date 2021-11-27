import React from 'react';
import {View, ScrollView, Image, Animated, Dimensions} from 'react-native';
import {SaveButton, TextComponent} from '@components';
import {Images} from '@config';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import concat from 'lodash/concat';
import SplashScreen from 'react-native-splash-screen';
import {ROUTES} from '@config';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '@context';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const pad = 40;
const widthImage = width - 2 * pad;

const Tour = ({route}) => {
  const {getAdminLink} = React.useContext(AuthContext);
  const {navigate} = useNavigation();
  const {colors} = useTheme();
  const [scrollX] = React.useState(new Animated.Value(0));
  const scrollRef = React.useRef(null);
  const [current, setCurrent] = React.useState(0);
  const data = [
    {
      image: Images.getting1,
      title: 'Store Management',
      subTitle:
        'Now have total control over your stores and manage them with ease.',
    },
    {
      image: Images.getting2,
      title: 'Simplified Dashboard',
      subTitle:
        'This app makes it easier for your clients  to reach you with their orders and you have a snapshot of every activity.',
    },
    {
      image: Images.getting3,
      title: 'Real Time Reporting',
      subTitle:
        'Keeping Track of Profits, Expenses,Losses and Orders with real-time notifications',
    },
  ];
  const clickScroll = () => {
    const currentTo = current + 1;
    if (currentTo === data.length) {
      navigate(ROUTES.Login);
      // closeGettingStart();
    } else {
      if (scrollRef?.current?.scrollTo) {
        scrollRef.current.scrollTo({
          x: currentTo * width,
          y: 0,
          animated: true,
        });
        setCurrent(currentTo);
      }
    }
  };
  const position = Animated.divide(scrollX, width);
  let dots = [];

  for (let i = 0; i < data.length; i++) {
    let sizeDot = position.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: [6, 26, 6],
      extrapolate: 'clamp',
    });
    let colorDot = position.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: [colors.border, '#ED3269', colors.border],
      extrapolate: 'clamp',
    });
    dots = concat(
      dots,
      <Animated.View
        key={i}
        style={[
          styles.dot,
          {
            width: sizeDot,
            backgroundColor: colorDot,
          },
        ]}
      />,
    );
  }

  React.useEffect(() => {
    SplashScreen.hide();
    if (typeof route.params !== 'undefined') {
      getAdminLink(route.params.admin_id);
    } else {
    }
  }, []);

  const renderContent = () => (
    <View style={{top: height / 5}}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          scrollEnabled={true}
          scrollEventThrottle={16}
          ref={scrollRef}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              listener: (event) => {
                const indexScroll = Math.round(
                  event.nativeEvent.contentOffset.x / width,
                );
                if (current !== indexScroll) {
                  setCurrent(indexScroll);
                }
              },
              useNativeDriver: false,
            },
            {useNativeDriver: false},
          )}>
          {data.map((value, index) => (
            <View key={index} style={styles.item}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.viewInfo}>
                  <Image source={value.image} style={styles.image} />
                  <View style={styles.viewTextItem}>
                    <TextComponent
                      bold
                      style={[styles.textItem, styles.textTitle]}>
                      {value.title}
                    </TextComponent>
                    <TextComponent
                      style={[styles.textItem, {color: '#80879A'}]}>
                      {value.subTitle}
                    </TextComponent>
                  </View>
                </View>
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <LinearGradient
          style={{
            height: 45,
            marginBottom: 40,
            marginTop: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          colors={['#F05F3E', '#ED3269']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}>
          <SaveButton
            title={current < data.length - 1 ? 'Next' : 'Get Start'}
            onPress={clickScroll}
            size="small"
            buttonStyle={styles.button}
            containerStyle={styles.containerButton}
          />
        </LinearGradient>

        <View style={styles.viewDot}>{dots.map((dot) => dot)}</View>
      </View>
    </View>
  );
  return <View>{renderContent()}</View>;
};

export default Tour;

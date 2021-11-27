import React, {memo, useEffect, useState} from 'react';
import {View, ScrollView, Image, Dimensions, BackHandler} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {SaveButton, TextComponent, Dialog} from '@components';
// import {AuthContext} from 'src/utils/auth-context';
import {ROUTES, Images} from '@config';

const {width} = Dimensions.get('window');
const widthImage = width - 50;

const SuccessRegistration = memo(() => {
  const user = useSelector((state) => state.auth.registration);
  const {navigate} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // const {signInSuccess} = React.useContext(AuthContext);

  useEffect(() => {
    const backAction = () => {
      setModalVisible(true);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.flex}>
      <Dialog
        content="Hold on!', 'Are you sure you want to Exit App?"
        title="Exit App"
        firstButtonOnPress={() => setModalVisible(false)}
        secondButtonOnPress={() => BackHandler.exitApp()}
        secondButtontext="Yes"
        modalVisible={modalVisible}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image source={Images.welcome} style={styles.image} />
          <View style={{marginHorizontal: 20}}>
            <TextComponent style={styles.title}>{'We are done!'}</TextComponent>
            <TextComponent style={styles.description}>
              {
                'Your store management is ready. Its time to experience the things more Easily and Peacefully.Add your products and start counting sales,have fun '
              }
            </TextComponent>
          </View>
          <View
            style={{
              paddingHorizontal: 25,
              width: '100%',
              bottom: 5,
              position: 'absolute',
            }}>
            <LinearGradient
              style={{
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              colors={['#F05F3E', '#ED3269']}
              start={{x: 1, y: 0}}
              end={{x: 1, y: 1}}>
              <SaveButton
                title={'Go to Dashboard'}
                size="small"
                containerStyle={styles.buttonView}
                buttonStyle={styles.button}
                onPress={() => navigate(ROUTES.Loading)}
              />
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
});

export default SuccessRegistration;

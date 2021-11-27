import React from 'react';
import {View} from 'react-native';
import {TextComponent as Text, StoreManagerCard} from '@components';
import {configLink, Images} from '@config';
import styles from './styles';
import Share from 'react-native-share';
import {DEEP_LINK as FIREBASE_DEEP_LINK} from '@env';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import {FilterCategories} from '@components';

const AdminLink = () => {
  const user = useSelector((state) => state.auth.user);
  const [visitModal, setVisitModal] = React.useState(false);
  const [shops] = React.useState(user.myShops);
  const [selectedShop, setSelectedShop] = React.useState([]);
  const setModalVisible = (value) => {
    setVisitModal(value);
  };
  const openModal = () => {
    setVisitModal(true);
  };
  const onShare = (type, value) => {
    let options;
    if (type === 'registration') {
      options = {
        message: 'Registration Link from 	✅ ' + user.fullName,
        url: constructLink(configLink.urlIndexes[0], user.uid),
      };
    }
    if (type === 'connect') {
      options = {
        message: `Connect to ${value.name} shop by link`,
        url: constructLink(configLink.urlIndexes[2], value.id),
      };
    }

    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };
  const constructLink = (x, id) => {
    const link = `${FIREBASE_DEEP_LINK}/${x}/${id}`;
    return link;
  };

  const renderEmail = () => (
    <View style={styles.email}>
      <Text semibold style={styles.topText}>
        Get to Manage your Users with
      </Text>
      <Text semibold style={styles.topText}>
        Link Services
      </Text>
      <Text
        style={{
          marginHorizontal: 40,
          textAlign: 'center',
          fontSize: 11,
          marginVertical: 20,
        }}>
        You need to share your link to your users for them to start connecting
        to you .Any user that register with your link will be under you and you
        will start to manage and control those users in your shops.
      </Text>
      <LottieView
        // ref={animation}
        source={Images.share}
        autoPlay
        loop
        style={{height: 200, width: 200, top: 50}}
      />
      <StoreManagerCard
        onPress={() => onShare('registration')}
        cornerRadius={10}
        elevation={5}
        style={[styles.card, {bottom: 10}]}>
        <Text style={{fontWeight: '600'}}>
          Workers & Clients registration link
        </Text>
      </StoreManagerCard>
      <StoreManagerCard
        onPress={() => openModal()}
        cornerRadius={10}
        elevation={5}
        style={[styles.card, {bottom: 80, borderColor: '#ED3269'}]}>
        <Text style={{fontWeight: '600', color: '#ED3269'}}>
          Admin shop connecting link
        </Text>
      </StoreManagerCard>
      <FilterCategories
        visitModal={visitModal}
        setModalVisible={setModalVisible}
        categories={shops}
        selectCategory={selectedShop}
        clickFilter={(value) => {
          setSelectedShop(value);
          onShare('connect', value[0]);
          // console.log(value);
        }}
      />
    </View>
  );

  return <View>{renderEmail()}</View>;
};

export default AdminLink;

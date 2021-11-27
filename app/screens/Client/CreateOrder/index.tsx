// export default CreateOrder;

import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {
  Modal,
  SlideAnimation,
  ModalTitle,
  ModalFooter,
  ModalButton,
} from 'react-native-modals';
import {Header, Input, Errors, CustomProgressBar} from '@components';
import {TextComponent, SaveButton} from '@components';
import {Container} from 'native-base';
import styles from './styles';
import {CommonContext} from '@context';
import {dimensions} from '@utils';
import _ from 'lodash';
import {UIActivityIndicator} from 'react-native-indicators';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const Index = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productValue, setProductValue] = useState(true);
  const [modal, setModal] = useState(false);
  const {navigate} = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const [shopId, setShopId] = useState(
    user.account === 'User' ? user.myShops[0] : '',
  );

  const {getAdmins, getSendOrderData} = useContext(CommonContext);

  useEffect(() => {
    fetchAdmins();
  }, []);
  const fetchAdmins = () => {
    getAdmins().then((response) => {
      setData(response);
      setLoading(false);
    });
  };
  const onTabPress = (item) => {
    navigate(ROUTES.CreateOrder3);
    getSendOrderData({
      admin: {
        adminID: item.key,
        fullName: item.fullName,
        adminShops: item.myShops,
        mobile: item.mobileNumber,
      },
    });
    // getShopId_Data({item, shopId});
  };

  const renderLowerRow = (rowData) => {
    var rowData = rowData.item;
    return (
      <View>
        <TouchableOpacity
          style={styles.upperRowMain}
          onPress={() => onTabPress(rowData)}>
          <View style={styles.upperRowMain}>
            <TextComponent semibold style={styles.upperListTitle}>
              {rowData.fullName}
            </TextComponent>
          </View>
        </TouchableOpacity>
        {/* <TextComponent style={{textAlign: 'center'}}>Sugar</TextComponent> */}
      </View>
    );
  };
  const Footer = () => {
    return (
      <ModalFooter>
        <ModalButton
          textStyle={styles.secondtxt}
          text="Cancel"
          onPress={() => {
            setModalVisible(false);
          }}
        />
        <ModalButton
          textStyle={styles.firsttxt}
          bordered={true}
          text="Create"
          onPress={() => {
            onCreateCategory();
            setModalVisible(false);
          }}
        />
      </ModalFooter>
    );
  };
  const Title = () => {
    return <ModalTitle textStyle={styles.title} title="Create Category" />;
  };
  const onTouchOutside = () => {
    setModalVisible(false);
  };
  return (
    <Container style={styles.container}>
      <Header arrow={true} />

      <CustomProgressBar
        category={2}
        loaderText="Updating..."
        loader={7}
        visible={modal}
      />
      {loading ? (
        <UIActivityIndicator
          style={{
            alignSelf: 'center',
            position: 'absolute',
            right: '45%',
            top: '50%',
            elevation: 10,
            zIndex: 100,
          }}
          size={30}
          color="#000"
        />
      ) : null}
      <View style={{alignSelf: 'center', marginVertical: 25}}>
        <TextComponent style={{textAlign: 'center'}}>
          Please Select Admin
        </TextComponent>
        <TextComponent style={{textAlign: 'center'}}>
          you want to send Order to
        </TextComponent>
      </View>
      <FlatList
        contentContainerStyle={styles.lowerListContent}
        data={data}
        renderItem={renderLowerRow}
        // stickyHeaderIndices={[0]}

        ListFooterComponent={() => <View style={{height: 400}} />}
      />
    </Container>
  );
};
export default Index;

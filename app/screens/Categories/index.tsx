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
import {TextComponent as Text} from '@components';
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
import AntDesign from 'react-native-vector-icons/AntDesign';

const Categories = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productValue, setProductValue] = useState('');
  const [modal, setModal] = useState(false);
  const {navigate} = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const [shopId, setShopId] = useState(
    user.account === 'User' ? user.myShops[0] : '',
  );

  const {createCategory, getCategories, getShopId_Data} = useContext(
    CommonContext,
  );

  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = () => {
    getCategories().then((response) => {
      const firestoreData = [];
      response.forEach((result) => {
        firestoreData.push({
          ...result.data(),
          key: result.id,
        });
      });

      let sorted = _.sortBy(firestoreData, (a) => a.name);
      setCategories(sorted);
      setLoading(false);
    });
  };
  const onTabPress = (item) => {
    navigate(ROUTES.SingleCategory);
    getShopId_Data({item, shopId});
  };
  const onCreateCategory = () => {
    setModal(true);
    createCategory({name: productValue, id: categories.length + 1})
      .then(() => {
        Errors({
          message: 'Successfully Created',
          type: 'success',
          description: `${productValue} Category was successfully created`,
          autoHide: true,
          position: 'bottom',
        });
        fetchCategory();
        setProductValue('');
        setModal(false);
      })
      .catch((error) => {
        Errors({message: error.message});
      });
  };
  const renderLowerRow = (rowData) => {
    var rowData = rowData.item;
    return (
      <View>
        <TouchableOpacity
          style={styles.upperRowMain}
          onPress={() => onTabPress(rowData)}>
          <View style={styles.upperRowMain}>
            <Text style={styles.upperListTitle}>{rowData.name}</Text>
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
      {/* <Header arrow={true}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <TextComponent bold style={{color: 'white'}}>
            Add Category
          </TextComponent>
        </TouchableOpacity>
      </Header> */}

      <LinearGradient
        style={{
          height: 50,
          width: 50,
          position: 'absolute',
          borderRadius: 50,
          bottom: 100,
          right: 30,
          elevation: 10,
          zIndex: 100,

          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#F05F3E', '#ED3269']}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <CustomProgressBar
        category={2}
        loaderText="Creating..."
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
      {categories.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.lowerListContent}
          data={categories}
          renderItem={renderLowerRow}
          enableEmptySections
          ListFooterComponent={() => <View style={{height: 400}} />}
        />
      ) : (
        <View style={{position: 'absolute', top: '40%', left: '15%'}}>
          <Text>No Categories click Add button to add!</Text>
        </View>
      )}

      <Modal
        visible={modalVisible}
        footer={Footer()}
        onTouchOutside={onTouchOutside}
        width={dimensions.width_screen - 30}
        height={190}
        modalTitle={Title()}
        modalAnimation={
          new SlideAnimation({
            initialValue: 0,
            slideFrom: 'bottom',
            useNativeDriver: true,
          })
        }
        swipeDirection={['up', 'down', 'left', 'right']}
        swipeThreshold={200}
        onSwipeOut={() => {
          setModalVisible(false);
        }}>
        <View style={{marginHorizontal: 15}}>
          <Input
            label={''}
            value={productValue}
            containerStyle={{marginTop: 15}}
            onChangeText={(value) => {
              setProductValue(value);
            }}
          />
        </View>
      </Modal>
    </Container>
  );
};
export default Categories;

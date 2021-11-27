import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextComponent as Text,
  StoreManagerCard as Card,
  SaveButton,
  Dialog,
} from '@components';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import {AuthContext} from '@context';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {accountsTypes} from '@constants';

const Index = () => {
  const {navigate} = useNavigation();
  const [userType, setUserType] = useState(accountsTypes()[1].type);
  const [userWorker, setuserWorker] = useState(false);
  const [userWorkerType, setuserWorkerType] = useState(
    accountsTypes()[1].subType[0].type,
  );
  const radius = 1;
  const [dialogVisible, setDialogVisible] = useState(false);

  const {getUserType, adminLink} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Dialog
        title="Admin Link Required"
        content={
          'You need to attain  Admin Link from your Admin to proceed creating Account'
        }
        // firstButtontext="Delete"
        firstButtonTextStyles={{color: 'red'}}
        firstButtonOnPress={() => {
          setDialogVisible(false);
        }}
        height={170}
        // secondButtontext="Cancel"
        secondButtonOnPress={() => setDialogVisible(false)}
        onSwipefunc={() => setDialogVisible(false)}
        onTouchOutside={() => setDialogVisible(false)}
        modalVisible={dialogVisible}
      />
      <Text style={{textAlign: 'center', color: 'black', marginVertical: 40}}>
        Choose your Account Type
      </Text>
      <View style={styles.row}>
        <View>
          <Card
            onPress={() => {
              setUserType(accountsTypes()[1].type);
            }}
            cornerRadius={radius}
            elevation={5}
            style={[styles.card, {backgroundColor: 'transparent'}]}>
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                // marginBottom: 40,
                // // marginTop: 200,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              colors={
                userType === accountsTypes()[1].type
                  ? ['#F05F3E', '#ED3269']
                  : ['#fff', '#fff']
              }
              start={{x: 1, y: 0}}
              end={{x: 1, y: 1}}>
              <Entypo
                name="users"
                size={50}
                color={userType === accountsTypes()[1].type ? 'white' : 'black'}
              />
              <Text
                semibold
                style={{
                  textAlign: 'center',
                  top: 20,
                  color:
                    userType === accountsTypes()[1].type ? 'white' : 'black',
                }}>
                Users
              </Text>
            </LinearGradient>
          </Card>
        </View>
        <View style={styles.or}>
          <View style={styles.orCard}>
            <Text semibold style={{textAlign: 'center'}}>
              OR
            </Text>
          </View>
        </View>
        <View>
          <Card
            onPress={() => {
              setUserType('Admin');
              setuserWorker(false);
            }}
            cornerRadius={radius}
            elevation={5}
            style={[styles.card, {backgroundColor: 'transparent'}]}>
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                // marginBottom: 40,
                // // marginTop: 200,
                // borderRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              colors={
                userType === accountsTypes()[0].type
                  ? ['#F05F3E', '#ED3269']
                  : ['#fff', '#fff']
              }
              start={{x: 1, y: 0}}
              end={{x: 1, y: 1}}>
              <Entypo
                name="user"
                size={50}
                color={userType === accountsTypes()[0].type ? 'white' : 'black'}
              />
              <Text
                semibold
                style={{
                  textAlign: 'center',
                  top: 20,
                  color:
                    userType === accountsTypes()[0].type ? 'white' : 'black',
                }}>
                Admin Account
              </Text>
            </LinearGradient>
          </Card>
        </View>
      </View>

      <View style={{height: 130, alignItems: 'center', width: '100%', top: 50}}>
        {userWorker ? (
          <>
            <View style={{marginTop: 30, left: -20}}>
              <Text
                style={{
                  color: 'black',

                  fontSize: 10,
                }}>
                <Text semibold>Worker</Text>
                {' ~ '}
                The one who works and manages Admin's store
              </Text>
              <Text
                style={{
                  color: 'black',

                  fontSize: 10,
                }}>
                <Text semibold>Client</Text>
                {' ~ '}
                This Account is for sending and managing Orders
              </Text>
            </View>
            <View
              style={[
                {
                  top: 20,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '70%',
                },
              ]}>
              <View>
                <Card
                  onPress={() => {
                    setuserWorkerType(accountsTypes()[1].subType[0].type);
                  }}
                  cornerRadius={10}
                  elevation={5}
                  style={[
                    styles.card2,
                    {backgroundColor: 'transparent', left: 20},
                  ]}>
                  <LinearGradient
                    style={{
                      height: '100%',
                      width: '100%',
                      // marginBottom: 40,
                      // // marginTop: 200,
                      // borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    colors={
                      userWorkerType === accountsTypes()[1].subType[0].type
                        ? ['#F05F3E', '#ED3269']
                        : ['#fff', '#fff']
                    }
                    start={{x: 1, y: 0}}
                    end={{x: 1, y: 1}}>
                    <FontAwesome5
                      name="house-user"
                      size={30}
                      color={
                        userWorkerType === accountsTypes()[1].subType[0].type
                          ? 'white'
                          : 'black'
                      }
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        top: 10,
                        color:
                          userWorkerType === accountsTypes()[1].subType[0].type
                            ? 'white'
                            : 'black',
                      }}>
                      Worker
                    </Text>
                  </LinearGradient>
                </Card>
              </View>

              <View>
                <Card
                  onPress={() => {
                    setuserWorkerType(accountsTypes()[1].subType[1].type);
                  }}
                  cornerRadius={10}
                  elevation={5}
                  style={[styles.card2, {backgroundColor: 'transparent'}]}>
                  <LinearGradient
                    style={{
                      height: '100%',
                      width: '100%',
                      // marginBottom: 40,
                      // // marginTop: 200,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    colors={
                      userWorkerType === accountsTypes()[1].subType[1].type
                        ? ['#F05F3E', '#ED3269']
                        : ['#fff', '#fff']
                    }
                    start={{x: 1, y: 0}}
                    end={{x: 1, y: 1}}>
                    <FontAwesome5
                      name="user-alt"
                      size={30}
                      color={
                        userWorkerType === accountsTypes()[1].subType[1].type
                          ? 'white'
                          : 'black'
                      }
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        top: 10,
                        color:
                          userWorkerType === accountsTypes()[1].subType[1].type
                            ? 'white'
                            : 'black',
                      }}>
                      Client
                    </Text>
                  </LinearGradient>
                </Card>
              </View>
            </View>
          </>
        ) : null}
      </View>

      <LinearGradient
        style={{
          height: 45,
          marginBottom: 40,
          marginTop: 200,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#F05F3E', '#ED3269']}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}>
        <SaveButton
          title={'Continue'}
          onPress={() => {
            userType === 'User' && !userWorker
              ? (() => {
                  setuserWorker(true);
                })()
              : (() => {
                  userType === 'User'
                    ? adminLink
                      ? (() => {
                          getUserType({
                            type: userType,
                            subType: userWorkerType,
                          });
                          navigate(ROUTES.RegisterAccount);
                        })()
                      : setDialogVisible(true)
                    : (() => {
                        getUserType({type: userType});
                        navigate(ROUTES.RegisterAccount);
                      })();
                })();
          }}
          size="small"
          buttonStyle={styles.button}
          //   containerStyle={styles.containerButton}
        />
      </LinearGradient>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  button: {
    width: 200,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  or: {
    height: 20,
    position: 'absolute',
    elevation: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orCard: {
    height: 20,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 10,
  },
  card: {
    width: 150,
    // padding: 10,
    height: 150,
    margin: 1,

    // marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card2: {
    width: 100,
    // padding: 10,
    height: 100,
    margin: 1,

    // marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: 100,
  },
  text: {
    // fontFamily: 'Avenir Next',
    color: '#1D2029',
  },
  socialButton: {
    flexDirection: 'row',
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(171, 180, 189, 0.65)',
    borderRadius: 4,
    backgroundColor: '#fff',
    shadowColor: 'rgba(171, 180, 189, 0.35)',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  socialLogo: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  link: {
    color: '#FF1654',
    // fontSize: 14,
    fontWeight: '500',
  },
  submitContainer: {
    // backgroundColor: '#FF1654',
    fontSize: 16,
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    shadowColor: 'rgba(255, 22, 84, 0.24)',
    shadowOffset: {width: 0, height: 9},
    shadowOpacity: 1,
    shadowRadius: 20,
  },
});

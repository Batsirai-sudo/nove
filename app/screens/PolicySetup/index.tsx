import * as React from 'react';
import {KeyboardAvoidingView, StyleSheet, View, ScrollView} from 'react-native';
import {
  SaveButton,
  Input,
  Errors,
  CustomProgressBar,
  TextComponent,
  InputRichText,
} from '@components';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '@config';
import {useSelector} from 'react-redux';
import {AuthActions} from '@actions';
import {isEmpty} from '@helpers';
import {AuthContext} from '@context';
import LinearGradient from 'react-native-linear-gradient';

function PolicySetup(props) {
  const {completeRegistration} = React.useContext(AuthContext);

  const {navigate, goBack} = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const registrationData = useSelector((state) => state.auth.registration);

  const [policy, setPolicy] = React.useState({
    refundPolicy: '',
    cancellationReturnPolicy: '',
    policyLabel: '',
  });
  const onChangeValue = (key, value) => {
    setPolicy({
      ...policy,
      [key]: value,
    });
  };

  const onContinue = async () => {
    const valid = isEmpty(policy);

    if (valid) {
      Errors({
        message: 'Error fields empty',
        floating: true,
        position: 'center',
        description:
          'Please make sure all the fields are not empty, in General Information Tab',
      });
      return false;
    }
    setModal(true);
    delete registrationData.start;
    delete registrationData.success;
    delete registrationData.error;

    const data = {
      ...registrationData,
      policy,
      createdAt: new Date(),
    };
    try {
      await completeRegistration(data, navigate, setModal);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={{height: '92%'}}>
      <CustomProgressBar
        category={2}
        loaderText="Please wait..."
        loader={7}
        visible={modal}
      />

      <KeyboardAvoidingView
        behavior="height"
        style={{height: '100%', marginTop: 50}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginBottom: 100}}>
          <View style={styles.content}>
            <TextComponent style={{marginBottom: 50, fontSize: 12}}>
              Setup up your Store Policies to complete your registration
            </TextComponent>
            <Input
              label={'Policy Label'}
              value={policy.policyLabel}
              onChangeText={(value) => onChangeValue('policyLabel', value)}
            />

            <InputRichText
              label={'Refund Policy'}
              value={policy.refundPolicy}
              onChangeText={(value) => onChangeValue('refundPolicy', value)}
            />
            <InputRichText
              label={'Cancellation/Return/Exchange Policy'}
              value={policy.cancellationReturnPolicy}
              onChangeText={(value) =>
                onChangeValue('cancellationReturnPolicy', value)
              }
            />
          </View>
        </ScrollView>
        <View style={styles.viewFoot}>
          <View style={styles.footButton}>
            <SaveButton
              title={'Back'}
              size="small"
              secondary={true}
              onPress={() => {
                goBack();
              }}
            />
          </View>
          <View style={styles.footButton}>
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
                title={'Continue'}
                size="small"
                buttonStyle={styles.button}
                loading={loading}
                onPress={() => {
                  onContinue();
                }}
              />
            </LinearGradient>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
  },
  content: {
    marginHorizontal: 25,
    marginTop: 10,
  },
  viewFoot: {
    marginTop: 20,
    // marginBottom: 100,
    marginHorizontal: -10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
  },
  footButton: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default PolicySetup;

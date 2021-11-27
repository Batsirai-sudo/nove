import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {Icon} from '@components';
import {useTheme} from '@react-navigation/native';

const Index = (props) => {
  const [secure, setSecure] = React.useState(props.isSecure);

  const {colors} = useTheme();

  return (
    <View style={props.style}>
      <Text style={styles.inputTitle}>{props.title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
          placeholder={props.placeholderText}
          secureTextEntry={secure}
          style={styles.input}
          onChangeText={props.onChangeText}
          value={props.value}
        />
        {props.secureTextEntry ? (
          <Icon
            name={secure ? 'eye' : 'eye-off'}
            size={25}
            color={secure ? colors.thirdText : colors.primary}
            onPress={() => setSecure(!secure)}
          />
        ) : null}
      </View>

      <View style={{borderBottomColor: '#D8D8D8', borderBottomWidth: 1}} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  inputTitle: {
    color: '#ABB4BD',
    fontSize: 14,
  },
  input: {
    paddingVertical: 12,
    color: '#1D2029',
    fontSize: 14,
    fontFamily: 'Avenir Next',
    // backgroundColor: 'red',
    width: '90%',
  },
});

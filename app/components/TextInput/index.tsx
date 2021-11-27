import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
// import {FloatingLabelInput} from 'react-native-floating-label-input';

const TextInput: React.FC = (props) => {
  const [cont, setCont] = useState('');
  const [show, setShow] = useState(false);
  // const {onPress, value} = props;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(!show);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <View style={{padding: 50, flex: 1, backgroundColor: '#fff'}}>
      {/* <FloatingLabelInput
        //  togglePassword={show}
        //  mask="99/99/9999" // Set mask to your input
        //  maskType="date" // Set mask type
        //  staticLabel // Set this to true if you want the label to be always at a set position. Commonly used with hint for displaying both label and hint for your input. For changing the position of the label with this prop as true, use the **customLabelStyles** _topFocused_ and _leftFocused_ to adjust the wanted position. Default false.
        //  hint="" // Hint displays only when staticLabel prop is set to true. This prop is used to show a preview of the input to the user.
        //  hintTextColor="#ccc" // Set the color to the hint
        //  currencyDivider="," // Set currency thousands divider, default is ","
        //  maxDecimalPlaces={2} // Set maximum decimal places, default is 2
        //  isFocused={false} // If you override the onFocus/onBlur props, you must handle this prop
        //  customLabelStyles={{}} // custom Style for position, size and color for label, when it's focused or blurred
        //  customShowPasswordImage={} // pass the image source to set your custom show image
        //  customHidePasswordImage={} // pass the image source to set your custom hide image
        //  labelStyles={{}} // add your styles to the floating label component
        //  showPasswordImageStyles={{}} // add your styles to the 'show password image' component
        //  containerStyles={{}} // add your styles to container of whole component
        //  showPasswordContainerStyles={{}} // add your styles to the 'show password container' component
        //  inputStyles={{}} // add your styles to inner TextInput component
        //  isPassword={false} // set this to true if value is password, default false
        //  darkTheme={false} // color of default 'show password image', default false
        //  multiline={false} // set this to true to enable multiline support, default false
        //  maxLength={} // Set maximum number of characters input will accept. Value overridden by mask if present
        //  showCountdown={false} // Set this to true to show the allowed number of characters remaining, default false
        //  countdownLabel="" // Set the label to be shown after the allowed number of characters remaining, default is ""
        //  onSubmit={() => this.yourFunction()} // adds callback to submit
        //  customShowPasswordComponent={} // Set your own JSX.Element to be the show password element
        //  customHidePasswordComponent={} // Set your own JSX.Element to be the hide password element
        label="Placeholder" // required
        value={value} // required
        onChange={onPress} // required
      /> */}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

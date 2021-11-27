import React, {memo, useCallback, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {SvgClose, SvgSearch} from '@svg-components';
import styles from './styles';

interface Props {
  onChangeText?: (text: string) => void;
  onClear?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeHolder?: string;
  editable?: boolean;
  inputRef?: any;
}

const SearchBar = memo((props: Props) => {
  const [value, setValue] = useState();

  const onChangeText = useCallback(
    (text) => {
      setValue(text);
      props.onChangeText && props.onChangeText(text);
    },
    [props],
  );

  const onClear = useCallback(() => {
    // @ts-ignore
    setValue();
    props.onClear && props.onClear('');
  }, [props]);

  return (
    <View style={styles.container}>
      <SvgSearch />
      <TextInput
        style={styles.txtInput}
        placeholder={props.placeHolder}
        placeholderTextColor={'#7F8FA6'}
        value={value}
        onChangeText={onChangeText}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        editable={props.editable}
        {...props}
      />
      {value ? (
        <TouchableOpacity onPress={onClear}>
          <SvgClose />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});

export default SearchBar;

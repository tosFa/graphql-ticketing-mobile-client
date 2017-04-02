import React from 'react';
import { Text, View, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  }
});

const InputContainer = styled.View`
  margin-top: 20;  
`;

const StyledInput = styled.TextInput`
  height: 100;
   
`;

export default ({ input, meta: { submitFailed, touched, error }, ...inputProps }) => (
  <InputContainer>
    <StyledInput
      {...inputProps}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}
      style={[styles.input]}
    />
    {
      (submitFailed && touched && error) ?
        <Text style={ { color: 'red' } }>{ error }</Text> : null
    }
  </InputContainer>
);
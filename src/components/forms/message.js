import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { isEmail } from 'validator';
import Container from '../layout/container';
import { TextInput } from './elements'


const validate = (values) => {
  let errors = {};

  if (!values.text) {
    errors.text = 'Text can\'t be blank'
  }

  return errors;
};

export const MessageForm = ({ handleSubmit, onSubmit, }) =>
  <Container>
    <View>
      <Field
        name="text"
        component={TextInput}
        placeholder="Text"
      />

      <Button
        onPress={ handleSubmit(onSubmit) }
        title="Submit"
        color="#841584"
      />
    </View>
  </Container>

export default reduxForm({form: 'message', validate})(MessageForm);
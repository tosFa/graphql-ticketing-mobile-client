import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { isEmail } from 'validator';
import Container from '../layout/container';
import { TextInput } from './elements'


const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = 'E-mail can\'t be blank'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid E-mail'
  }

  if (!values.password) {
    errors.password = 'Password can\'t be blank'
  }

  return errors;
};

export const LoginForm = ({ handleSubmit, onSubmit, }) =>
  <Container>
    <View>
      <Field
        name="email"
        component={TextInput}
        placeholder="Email"
      />
      <Field
        name="password"
        component={TextInput}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button
        onPress={ handleSubmit(onSubmit) }
        title="Submit"
        color="#841584"
      />
    </View>
  </Container>

export default reduxForm({form: 'login', validate})(LoginForm);
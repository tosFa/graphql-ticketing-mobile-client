import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import LoginForm from '../forms/login';

const PATIENT_QUERY = gql`query PatientAccount{
  patients {
    email
  }
}`;

const SIGNIN_QUERY = gql`mutation Tokens($email: String!, $password: String!) {
  tokens(email: $email, password: $password){
    key
  }
}`;

const withData = graphql(PATIENT_QUERY, {
  props: ({ data }) => ({ apollo: data }),
});

const withMutation = graphql(SIGNIN_QUERY, {
  props: ({ ownProps, mutate }) => ({
    signin: ({ email, password }) => {
      return mutate({
        variables: { email, password }
      })
    }

  })
})

class Login extends Component {

  onSubmit = async (values) => {
    const { signin } = this.props;
    try {
      const response = await signin(values);
      console.log({ response });
    } catch(e) {
      alert('error');
    }



    alert('finished');
  }

  render() {
    return (
     <LoginForm onSubmit={this.onSubmit}/>
    );
  }
}

export default withMutation(withData(Login));
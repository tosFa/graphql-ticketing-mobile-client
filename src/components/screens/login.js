import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import { create } from '../../apollo/mutations/token';
import LoginForm from '../forms/login';

const withMutation = graphql(create, {
  props: ({ ownProps, mutate }) => ({
    create: ({ email, password, loginAs = 'customer' }) => mutate({ variables: { email, password, loginAs } })
  })
});

export class Login extends Component {
  static navigationOptions = {
    title: 'Ticket monkey',
  }

  handleLoginResponse = (response) => {
    if (response.error) {
      alert('error');
    }

    AsyncStorage.setItem('chat-auth-token', response.data.token.auth_token);
    this.props.navigation.navigate('Issues');
  }

  handleLoginSubmit = (values) => this.props.create(values).then(this.handleLoginResponse)

  render() {
    return (
      <LoginForm
        initialValues={ { email: "cutomer1@customer.com", password: "password1" } }
        onSubmit={this.handleLoginSubmit}
      />
    );
  }
}

export default withMutation(Login);

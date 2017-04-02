import React, { Component } from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { graphql } from 'react-apollo';

import Container from '../layout/container';
import { event } from '../../apollo/subscriptions/event';
import { create } from '../../apollo/mutations/message';
import { list } from '../../apollo/queries/message';
import { entity as issue_query } from '../../apollo/queries/issue';
import MessageForm from '../forms/message'

const withData = graphql(issue_query, {
  props: ({ data, match }) => ({
    apollo: data,

    loadMoreEntries(lastItem = '') {
      return data.fetchMore({
        query: list,
        variables: {
          issueUuid: data.issue.uuid,
          limit: 30,
          lastItem,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.data) {
            return previousResult;
          }
          return fetchMoreResult;
        },
      });
    },
  }),
  options: (props) => ({
    variables: {
      uuid: props.navigation.state.params.uuid,
      limit: 30
    }
  }),
});

const withMutation = graphql(create, {
  props: ({ ownProps, mutate }) => ({
    create: ({ text }) =>
      mutate({ variables: { text, issueUuid: ownProps.navigation.state.params.uuid } })
  })
});


export class Issue extends Component {
  static navigationOptions = {
    title: ({ state, ...rest }) =>  `Issue ${state.params.title}`,
  }

  constructor(props) {
    super(props);

    this.state = { messages: [] };
  }

  componentDidMount() {
    this.subscribe();
  }

  subscribe = () => {
    const { uuid } = this.props.navigation.state.params;

    this.props.apollo.subscribeToMore({
      document: event,
      variables: { group: `ISSUE_${uuid}`, types: ['NEW_MESSAGE'], timestamp: +new Date()},

      // this is where the magic happens.
      updateQuery: (previousResult, { subscriptionData }) => {
        const payload = JSON.parse(subscriptionData.data.event.payload);
        this.setState({ messages: [...this.state.messages, payload.message] });
      },
      onError: (err) => console.error(err),
    });
  }

  loadMoreMessages = () => {
    this.props.loadMoreEntries(this.state.messages[0].uuid)
      .then(fetchMoreResult => {
        this.setState({
          messages: [
            ...fetchMoreResult.data.messages,
            ...this.state.messages,
          ]
        })
      });
  }

  refetch = () => {
    this.props.apollo.refetch()
      .then((response) => this.setState({ messages: response.data.messages }))
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.apollo.loading) {
      this.setState({ messages: nextProps.apollo.messages });
    }
  }
  render() {
    if (this.props.apollo.loading) {
      return null;
    }
    return (
      <Container>
        <FlatList
          data={this.state.messages.map(item => ({ ...item, key: item.uuid }))}
          renderItem={({item}) => <Text>{item.text}</Text>}
        />
        <Button onPress={ this.loadMoreMessages } title="Load more messages" color="#841584"/>
        <MessageForm onSubmit={values => this.props.create(values) } />
        <Button onPress={ this.refetch } title="Reload messages" color="#841522"/>

      </Container>
    );
  }
}

export default withMutation(withData(Issue));
